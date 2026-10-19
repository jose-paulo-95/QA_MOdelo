# Modelo de qualidade e modelagem

## 1. ISO/IEC 25010:2023 no core

Use a edição 2023. Glossário curto para quem aprendeu pela edição 2011:

| Edição 2011 | Edição 2023 neste padrão |
|---|---|
| Usabilidade | Capacidade de interação |
| Portabilidade | Flexibilidade (instalabilidade, adaptabilidade, substituibilidade, escalabilidade) |
| Segurança | Continua segurança; no core priorize integridade, autenticidade, responsabilização, não repúdio e confidencialidade |
| Desempenho | Eficiência de desempenho e capacidade |
| Qualidade em uso — liberdade de risco | Aparece nas classes R1 e R2, não como suíte separada |

### Sempre no escopo quando a mudança move valor, cadastro mestre ou contrato

| Característica | O que o QA precisa provar |
|---|---|
| Adequação funcional — correção e completude | A regra calculou, persistiu e devolveu o valor certo, inclusive nos limites |
| Segurança — integridade, autenticidade, responsabilização, não repúdio, confidencialidade | A transação não é alterada em silêncio, o autor é quem o token diz, a trilha existe, e outro cliente não vê o dado |
| Confiabilidade — tolerância a falhas e recuperabilidade | Queda no meio da operação não duplica lançamento nem perde o único lançamento |
| Compatibilidade — interoperabilidade | O contrato com o sistema externo aceita e rejeita o que foi combinado |

### Entram quando o risco da mudança pede

| Característica | Quando entra | Meio |
|---|---|---|
| Eficiência de desempenho e capacidade | Transação crítica, janela batch, pico ou meta de latência | k6, [09-padrao-k6.md](09-padrao-k6.md) |
| Flexibilidade — escalabilidade | Aumento previsto de volume no mesmo fluxo | k6 |
| Flexibilidade — instalabilidade | Cliente desktop, atualização de versão, rollback | Canal desktop em [06-como-testar-por-canal.md](06-como-testar-por-canal.md) |
| Capacidade de interação | Canal usado por pessoa: agência, internet, app | Usabilidade no mesmo guia de canal |
| Segurança de uso (safety) | Falha que possa disparar ação irreversível sem confirmação | Caso explícito de confirmação e desfazer |

Qualidade em uso (eficácia, eficiência, satisfação, liberdade de risco, cobertura de contexto) não vira suíte separada. Liberdade de risco econômico e regulatório está na classe de risco. Eficácia e eficiência de uma tarefa humana estão no roteiro de usabilidade.

## 2. Classes de risco

Marque uma ou mais classes em toda demanda. A classe manda na técnica e na profundidade.

| Classe | Exemplos no core | Técnica mínima |
|---|---|---|
| R1 Financeiro e contábil | Saldo, lançamento, tarifa, juros, estorno, conciliação, data de corte | Partição de equivalência, limite, tabela de decisão, transição de estado |
| R2 Regulatório e trilha | Quem autorizou, carimbo de tempo, imutabilidade do registro | Checklist de trilha mais caso positivo e caso de adulteração rejeitada |
| R3 Integração externa | PIX, SPB, parceiro, timeout, retentativa, idempotência | Cenário de contrato, falha da dependência, repetição da mesma chave |
| R4 Acesso e segurança da transação | Papel, alçada, sessão, dado de outro cliente | Matriz papel × operação, caso de token ausente e token de outro titular |
| R5 Continuidade | Queda após débito e antes do crédito, reprocessamento | Transição de estado da transação e repetição |
| R6 Canal e interação | Tela de operador ou cliente | Tarefa de usabilidade e um fluxo de interface |

R1, R2 e R3 em escopo exigem caso de baixo nível e revisão por outro QA. R6 sozinho não dispensa API se a mudança também altera serviço.

## 3. Níveis e pirâmide

| Nível | Quem faz | O que entra |
|---|---|---|
| Unidade e componente | Desenvolvimento | Regra pura, cálculo, validação isolada |
| API e contrato | QA com desenvolvimento | Serviço de core impactado |
| Sistema, pela interface | QA | Poucas jornadas de negócio |
| Aceite | QA e negócio | Casos de risco em escopo na build candidata |

A regressão permanente de R1, R2 e R3 mora na API automatizada. A interface automatizada cobre a jornada que o operador ou o cliente realmente conclui, não o cadastro campo a campo.

## 4. Como escolher a técnica

1. Liste as regras da demanda em frases verificáveis.
2. Se a regra combina condições (tipo de conta, canal, valor, horário), use tabela de decisão e cubra cada coluna que muda o resultado.
3. Se a entidade tem ciclo (rascunho, autorizada, liquidada, estornada, rejeitada), use transição de estado. Inclua a transição proibida que o negócio não pode aceitar.
4. Se há número, data, prazo ou teto, teste o último valor aceito, o primeiro recusado e um valor interno de cada lado.
5. Se o alvo é cadastro mestre (cliente, conta, produto, parâmetro de tarifa), use CRUD: criar, consultar, alterar e, quando o negócio permitir, inativar ou excluir, com a restrição que impede apagar vínculo com lançamento.
6. Se há jornada com mais de um sistema, escreva um cenário ponta a ponta e o restante no contrato de cada ponta.
7. Se o fluxo é novo e a regra ainda está instável, abra um charter exploratório com tempo fechado, além dos casos scriptados. O charter não substitui caso de R1.

Detalhe de escrita, campo a campo: [05-como-escrever-um-teste.md](05-como-escrever-um-teste.md).

## 5. Oráculo

O resultado esperado cita a fonte: regra do item de trabalho, tabela de tarifa da massa, saldo anterior mais o lançamento, ou esquema do contrato. "Sistema responde com sucesso" não é oráculo de core. O oráculo de movimento financeiro fecha débito, crédito e identificador único da transação.
