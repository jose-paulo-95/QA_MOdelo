import { transferirValor } from '../../support/flows/transferir-valor.flow';
import massa from '../../fixtures/transferencia.hml.json';

describe('Transferencia interna', () => {
  it('TC-CORE-TRF-010 operador conclui transferencia e ve o comprovante @regressao', () => {
    transferirValor(massa.origem, massa.destino, String(massa.valorValido)).then(
      (transactionId) => {
        expect(transactionId.trim()).to.have.length.greaterThan(0);

        // Se a API oficial já estiver no Playwright, remova este request
        // e prove o oráculo no job de API da mesma build.
        cy.request({
          url: `/lancamentos?transactionId=${transactionId.trim()}`,
          headers: {
            Authorization: `Bearer ${Cypress.env('TOKEN_TITULAR')}`,
          },
        })
          .its('body')
          .should('have.length', 2);
      },
    );
  });
});
