export class TransferenciaScreen {
  get menuTransferir() {
    return $('~menu-transferir');
  }

  get campoOrigem() {
    return $('~conta-origem');
  }

  get campoDestino() {
    return $('~conta-destino');
  }

  get campoValor() {
    return $('~valor');
  }

  get botaoConfirmar() {
    return $('~confirmar-transferencia');
  }

  get transactionId() {
    return $('~transaction-id');
  }

  async abrir() {
    await this.menuTransferir.waitForDisplayed();
    await this.menuTransferir.click();
  }

  async preencher(origem: string, destino: string, valor: string) {
    await this.campoOrigem.waitForDisplayed();
    await this.campoOrigem.setValue(origem);
    await this.campoDestino.setValue(destino);
    await this.campoValor.setValue(valor);
  }

  async confirmar() {
    await this.botaoConfirmar.click();
  }

  async lerTransactionId(): Promise<string> {
    await this.transactionId.waitForDisplayed();
    const texto = await this.transactionId.getText();
    if (!texto?.trim()) {
      throw new Error('Comprovante sem transactionId');
    }
    return texto.trim();
  }
}
