import { Page } from '@playwright/test';
import { TransferenciaPage } from '../pages/transferencia.page';

/** Operação de negócio reutilizável pela spec. */
export async function transferirValor(
  page: Page,
  input: { origem: string; destino: string; valor: string },
): Promise<{ transactionId: string }> {
  const tela = new TransferenciaPage(page);
  await tela.abrir();
  await tela.preencher(input.origem, input.destino, input.valor);
  await tela.confirmar();
  return { transactionId: await tela.lerTransactionId() };
}
