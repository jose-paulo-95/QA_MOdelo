import { TransferenciaPage } from '../pages/transferencia.page';

export function transferirValor(origem: string, destino: string, valor: string) {
  cy.intercept('POST', '**/transferencias').as('criarTransferencia');
  TransferenciaPage.abrir();
  TransferenciaPage.preencher(origem, destino, valor);
  TransferenciaPage.confirmar();
  cy.wait('@criarTransferencia').its('response.statusCode').should('eq', 201);
  return TransferenciaPage.comprovante().invoke('text');
}
