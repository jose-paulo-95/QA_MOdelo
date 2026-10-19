# Padrão de automação com Cypress

Cypress permanece aceito quando o produto já tem suíte Cypress em uso ou o frontend já está padronizado nessa ferramenta. Suíte nova de produto sem Cypress usa Playwright, em [07-padrao-playwright.md](07-padrao-playwright.md).

As leis são as mesmas: um caso por teste, ID no título, camadas, oráculo de negócio, massa sintética, pipeline e link no Azure Test Plans.

## 1. O que o Cypress cobre neste padrão

- interface web desktop do produto que já adotou Cypress;
- viewport de mobile web desse mesmo produto.

Cypress não cobre API de core como suíte oficial quando o produto também tem Playwright. A API oficial fica em `tests/api` do Playwright, para existir um único cliente de contrato. Cypress não cobre app nativo nem janela desktop nativa.

Se o produto ainda não tem Playwright e já tem Cypress, a API pode ficar em `cypress/e2e/api` com `cy.request` até a migração do cliente. O formato do teste abaixo continua valendo. Não mantenha as duas suítes de API apontando para a mesma regra.

## 2. Estrutura

Copie o boilerplate [automacao/cypress/](../../automacao/cypress/) quando o produto já for Cypress.

```text
cypress/
  e2e/
    specs/
    api/
  support/
    pages/
    flows/
    commands.ts
    e2e.ts
  fixtures/
cypress.config.ts
```

Skills: `implementar-automacao-teste` e `revisar-automacao-teste`.

## 3. Nomenclatura

- Spec: `cypress/e2e/specs/<modulo>.web.cy.ts`.
- Título: `TC-<PRODUTO>-<MODULO>-<NNN>` mais o efeito, igual ao caso no Test Plans.
- Page object: função ou classe em `cypress/support/pages`, sem seletor dentro do spec.
- Fluxo de negócio: `cypress/support/flows`.

## 4. Camadas

1. Spec prepara massa, chama fluxo e afirma o efeito.
2. Fluxo executa a jornada com linguagem de negócio.
3. Page concentra seletores e ações.
4. Fixture traz massa sintética. Segredo fica em variável de ambiente do Cypress (`CYPRESS_`), injetada pelo pipeline.

## 5. Seletores

Ordem: `data-testid` estável acordado com o time, depois conteúdo de negócio estável. Classe CSS gerada e XPath absoluto ficam de fora. Se o elemento tem papel e nome acessíveis, prefira o seletor que o time já usa para esse papel, e documente a escolha uma vez no `support`, não em cada spec.

## 6. Esperas

Espere rede alias da operação de negócio ou elemento do comprovante. `cy.wait` com milissegundos fixos fica de fora do código novo.

## 7. Asserções

O teste de jornada termina com o identificador da transação visível e com a consulta do efeito. Em produto que já usa `cy.request` para API, a consulta de saldo e de lançamentos é essa chamada. Em produto que já migrou a API para Playwright, o spec Cypress prova a tela e o pipeline do Playwright prova o contrato no mesmo candidato a release. O relatório cita os dois.

## 8. Independência e baseUrl

`baseUrl` vem do ambiente no config, não de URL absoluta no spec. Cada teste parte da massa nomeada e não depende do teste anterior. Evite `it.only` commitado.

## 9. Pipeline

- Pull request do frontend roda a suíte Cypress de fumaça da jornada.
- Candidato a release roda a regressão marcada.
- Vídeo e screenshot de falha são artefatos. O Test Run guarda o link e o ID do caso.
- Teste instável sai da suíte que bloqueia release no mesmo dia.

## 10. Revisão do pull request

O revisor confere ID no título, um caso por teste, seletor fora do spec, ausência de espera fixa, ausência de dado real e motivo para este teste estar em Cypress e não na suíte nova de Playwright.

## 11. Exemplo de jornada — `TC-CORE-TRF-010`

`cypress/support/pages/transferencia.page.ts`

```typescript
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
```

`cypress/e2e/specs/transferencia.web.cy.ts`

```typescript
import { TransferenciaPage } from '../../support/pages/transferencia.page';

describe('Transferencia interna', () => {
  it('TC-CORE-TRF-010 operador conclui transferencia e ve o comprovante', () => {
    cy.intercept('POST', '/transferencias').as('criarTransferencia');

    TransferenciaPage.abrir();
    TransferenciaPage.preencher('1001', '2002', '100,00');
    TransferenciaPage.confirmar();

    cy.wait('@criarTransferencia').its('response.statusCode').should('eq', 201);
    TransferenciaPage.comprovante().invoke('text').then((transactionId) => {
      cy.request({
        url: `/lancamentos?transactionId=${transactionId}`,
        headers: { Authorization: `Bearer ${Cypress.env('TOKEN_TITULAR_1001')}` },
      }).its('body').should('have.length', 2);
    });
  });
});
```

Se a API oficial já está no Playwright, apague o `cy.request` deste spec e deixe o vínculo dos dois resultados no relatório da release. Não duplique a regra de idempotência nos dois frameworks: ela fica no caso de API.

## 12. Viewport mobile neste produto

Um spec de viewport usa `cy.viewport(390, 844)` no próprio teste de jornada crítica e apenas quando R6 mobile web está em escopo. O nome do teste continua sendo o ID do caso mobile, diferente do caso desktop. Isso não evidencia app nativo.
