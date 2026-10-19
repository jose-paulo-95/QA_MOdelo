import { APIRequestContext } from '@playwright/test';

export class ContasClient {
  constructor(private readonly api: APIRequestContext) {}

  async consultarSaldo(conta: string, token: string): Promise<number> {
    const resposta = await this.api.get(`/contas/${conta}/saldo`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!resposta.ok()) {
      throw new Error(`Falha ao consultar saldo de ${conta}: ${resposta.status()}`);
    }
    const corpo = await resposta.json();
    return Number(corpo.saldo);
  }

  async consultarLancamentos(transactionId: string, token: string) {
    const resposta = await this.api.get(`/lancamentos`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { transactionId },
    });
    if (!resposta.ok()) {
      throw new Error(`Falha ao consultar lançamentos: ${resposta.status()}`);
    }
    return resposta.json();
  }
}
