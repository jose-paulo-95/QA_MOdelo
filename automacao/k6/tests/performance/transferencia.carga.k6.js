import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

/**
 * TC-CORE-TRF-001-PERF — exemplo de carga.
 * Substitua metas e massa pelos valores do produto.
 */
const duracao = new Trend('transferencia_duration');

export const options = {
  scenarios: {
    carga: {
      executor: 'constant-arrival-rate',
      rate: 50,
      timeUnit: '1s',
      duration: '2m',
      preAllocatedVUs: 20,
      maxVUs: 100,
      tags: { testcase: 'TC-CORE-TRF-001-PERF' },
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<800'],
    checks: ['rate>0.99'],
  },
};

export default function () {
  const baseUrl = __ENV.BASE_URL;
  const token = __ENV.TOKEN_PERF;
  if (!baseUrl || !token) {
    throw new Error('BASE_URL e TOKEN_PERF são obrigatórios');
  }

  const chave = `perf-${__VU}-${__ITER}`;
  const resposta = http.post(
    `${baseUrl}/transferencias`,
    JSON.stringify({
      origem: String(1000 + __VU),
      destino: '9000',
      valor: 1,
    }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': chave,
      },
    },
  );

  duracao.add(resposta.timings.duration);
  check(resposta, {
    'status 201': (r) => r.status === 201,
    'tem transactionId': (r) => !!r.json('transactionId'),
  });
  sleep(0.1);
}
