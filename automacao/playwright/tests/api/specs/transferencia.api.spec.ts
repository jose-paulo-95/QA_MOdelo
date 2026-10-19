import { test, expect } from '@playwright/test';
import { TransferenciaClient } from '../clients/transferencia.client';
import { ContasClient } from '../clients/contas.client';
import { requireEnv } from '../../support/env';
import massa from '../../support/data/transferencia.hml.json';

/**
 * Exemplo oficial do padrão.
 * Substitua paths e campos pelo contrato real do produto.
 * Título = ID do caso no Azure Test Plans.
 */
test('TC-CORE-TRF-001 debita origem e credita destino uma unica vez @regressao', async ({
  request,
}) => {
  const token = requireEnv('TOKEN_TITULAR');
  const transferencia = new TransferenciaClient(request);
  const contas = new ContasClient(request);
  const chave = `${massa.chaveIdempotenciaBase}-001`;

  const saldoOrigemAntes = await contas.consultarSaldo(massa.origem, token);
  const saldoDestinoAntes = await contas.consultarSaldo(massa.destino, token);

  const primeira = await transferencia.transferir({
    origem: massa.origem,
    destino: massa.destino,
    valor: massa.valorValido,
    chaveIdempotencia: chave,
    token,
  });
  expect(primeira.status(), 'HTTP da primeira transferência').toBe(201);
  const corpo = await primeira.json();
  expect(corpo.transactionId, 'transactionId obrigatório').toBeTruthy();

  const lancamentos = await contas.consultarLancamentos(corpo.transactionId, token);
  expect(lancamentos, 'um débito e um crédito').toHaveLength(2);

  const segunda = await transferencia.transferir({
    origem: massa.origem,
    destino: massa.destino,
    valor: massa.valorValido,
    chaveIdempotencia: chave,
    token,
  });
  expect([200, 201]).toContain(segunda.status());
  expect((await segunda.json()).transactionId).toBe(corpo.transactionId);

  expect(await contas.consultarSaldo(massa.origem, token)).toBe(
    saldoOrigemAntes - massa.valorValido,
  );
  expect(await contas.consultarSaldo(massa.destino, token)).toBe(
    saldoDestinoAntes + massa.valorValido,
  );
});
