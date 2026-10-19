import { transferirValor } from '../../support/flows/transferir-valor.flow';
import { requireEnv } from '../../support/env';
import massa from '../../fixtures/transferencia.hml.json';

describe('Transferencia interna', () => {
  it(
    'TC-CORE-TRF-010 operador conclui transferencia e ve o comprovante @regressao',
    { tags: '@regressao' },
    () => {
      const token = requireEnv('TOKEN_TITULAR');

      transferirValor(massa.origem, massa.destino, massa.valorValido).then((transactionId) => {
        const id = transactionId.trim();

        // Se a API oficial já estiver no Playwright, remova este request
        // e prove o oráculo no job de API da mesma build.
        cy.request({
          url: `/lancamentos?transactionId=${id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .its('body')
          .should('have.length', 2);
      });
    },
  );
});
