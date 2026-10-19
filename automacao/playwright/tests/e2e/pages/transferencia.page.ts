import { Page, expect } from '@playwright/test';

/** Seletores e ações de tela. Specs não usam locator direto. */
export class TransferenciaPage {
  constructor(private readonly page: Page) {}

  async abrir() {
    await this.page.goto('/transferencias/nova');
    await expect(this.page.getByRole('heading', { name: /transfer/i })).toBeVisible();
  }

  async preencher(origem: string, destino: string, valor: string) {
    await this.page.getByLabel(/origem/i).fill(origem);
    await this.page.getByLabel(/destino/i).fill(destino);
    await this.page.getByLabel(/valor/i).fill(valor);
  }

  async confirmar() {
    await this.page.getByRole('button', { name: /confirmar/i }).click();
  }

  async lerTransactionId(): Promise<string> {
    const comprovante = this.page.getByTestId('transaction-id');
    await expect(comprovante).toBeVisible();
    const texto = await comprovante.innerText();
    if (!texto.trim()) {
      throw new Error('Comprovante sem transactionId');
    }
    return texto.trim();
  }
}
