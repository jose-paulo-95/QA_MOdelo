import { test, expect } from '@playwright/test';
import { transferirValor } from '../flows/transferir-valor.flow';
import { ContasClient } from '../../api/clients/contas.client';
import { requireEnv } from '../../support/env';
import massa from '../../support/data/transferencia.hml.json';

test('TC-CORE-TRF-010 operador conclui transferencia e ve o comprovante @regressao', async ({
  page,
  request,
}) => {
  const token = requireEnv('TOKEN_TITULAR');
  const contas = new ContasClient(request);

  const { transactionId } = await transferirValor(page, {
    origem: massa.origem,
    destino: massa.destino,
    valor: String(massa.valorValido),
  });

  await expect(page.getByRole('heading', { name: /comprovante/i })).toBeVisible();
  await expect(page.getByText(transactionId)).toBeVisible();

  const lancamentos = await contas.consultarLancamentos(transactionId, token);
  expect(lancamentos, 'oráculo de core via API').toHaveLength(2);
});
