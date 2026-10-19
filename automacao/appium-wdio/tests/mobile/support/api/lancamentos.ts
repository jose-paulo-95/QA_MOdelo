/**
 * Oráculo de core via HTTP — mesmo contrato da suíte Playwright.
 * Ajuste o path ao produto real.
 */
export async function consultarLancamentos(
  transactionId: string,
  token: string,
): Promise<unknown[]> {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error('API_BASE_URL não definida');
  }
  const resposta = await fetch(
    `${baseUrl}/lancamentos?transactionId=${encodeURIComponent(transactionId)}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!resposta.ok) {
    throw new Error(`Falha ao consultar lançamentos: ${resposta.status}`);
  }
  return resposta.json() as Promise<unknown[]>;
}
