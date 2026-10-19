export const TransferenciaPage = {
  abrir() {
    cy.visit('/transferencias/nova');
  },

  preencher(origem: string, destino: string, valor: string) {
    cy.get('[data-testid="conta-origem"]').clear().type(origem);
    cy.get('[data-testid="conta-destino"]').clear().type(destino);
    cy.get('[data-testid="valor"]').clear().type(valor);
  },

  confirmar() {
    cy.get('[data-testid="confirmar-transferencia"]').click();
  },

  comprovante() {
    return cy.get('[data-testid="transaction-id"]');
  },
};
