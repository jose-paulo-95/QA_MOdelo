import { APIRequestContext, APIResponse } from '@playwright/test';

export type TransferenciaInput = {
  origem: string;
  destino: string;
  valor: number;
  chaveIdempotencia: string;
  token: string;
};

export class TransferenciaClient {
  constructor(private readonly api: APIRequestContext) {}

  transferir(input: TransferenciaInput): Promise<APIResponse> {
    return this.api.post('/transferencias', {
      headers: {
        Authorization: `Bearer ${input.token}`,
        'Idempotency-Key': input.chaveIdempotencia,
        'Content-Type': 'application/json',
      },
      data: {
        origem: input.origem,
        destino: input.destino,
        valor: input.valor,
      },
    });
  }
}
