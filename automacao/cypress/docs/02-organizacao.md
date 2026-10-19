# 02. Organização

> Parte do [guia de Cypress](./LEIA-ME.md).

Um caso, um `it`. O título repete o ID do Azure Test Plans e o efeito.

```typescript
it(
  'TC-CORE-TRF-010 operador conclui transferencia e ve o comprovante @regressao',
  { tags: '@regressao' },
  () => {
    // arrange, act, assert
  },
);
```

`@regressao` no título alinha com as outras suítes. A opção `tags` é o que o job de regressão filtra. As duas ficam juntas quando o caso bloqueia release.

## Camadas

| Camada | Faz | Não faz |
|---|---|---|
| Spec | massa, chama o flow, afirma o Então | seletor, URL absoluta |
| Flow | jornada (`abrir`, `preencher`, `confirmar`) | oráculo de saldo ou lançamento |
| Page | seletores e ações da tela | regra de negócio |
| Fixture | contas e valor sintéticos | senha ou dado de cliente |

O spec de transferência chama `transferirValor` e consulta os lançamentos. A page só conhece `data-testid`.

## Arrange, act, assert

No spec, a leitura fica nesta ordem, com uma linha em branco entre os blocos:

1. **Arrange** — `requireEnv` e a fixture.
2. **Act** — o flow.
3. **Assert** — o efeito do caso (identificador visível e, se a API ainda for deste Cypress, os lançamentos).

Arrange repetido em vários `it` do mesmo arquivo vai para `beforeEach`. Não use `before` para deixar saldo ou sessão que o teste seguinte herda.

## Independência

`testIsolation` fica `true` no `cypress.config.ts`. Cada teste parte da massa nomeada.

Não use `after` nem `afterEach` como única limpeza: se o runner cair, o gancho não roda. Outro caminho de negócio é outro `TC-`, não um `if` em cima do texto da tela.

`context` só agrupa subjornada do mesmo módulo. Cada `it` dentro dele continua sendo um caso só.

## Veja também

- [04. Comandos e esperas](./04-comandos-e-esperas.md)
- [05. Asserções](./05-assercoes.md)
