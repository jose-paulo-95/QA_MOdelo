# Avaliação de risco

## Sobre este template

| | |
|---|---|
| **Objetivo** | Decidir a profundidade do teste: classes de risco, características ISO/IEC 25010 e canais em escopo, antes de escrever casos. |
| **Quando usar** | Todo item de trabalho que altera produto (história, bug de regra, mudança de contrato, release). Anexar ao item no Azure Boards. |
| **Quando não usar** | Mudança puramente documental (wiki, comentário) sem impacto em software; ou item que só reaproveita avaliação já válida da mesma mudança (não duplicar). |
| **Quem preenche** | QA do produto. Revisor: outro QA quando houver R1–R4. |
| **Entrada** | Item de trabalho com algum efeito descrito (mesmo que incompleto). |
| **Saída** | Classes/canais marcados + tabela de decisão de teste + fora de escopo com motivo. |
| **Próximo passo** | [identificacao-de-cenarios.md](identificacao-de-cenarios.md) e, em paralelo, [plano-de-teste.md](plano-de-teste.md) se for início de release. |
| **Referência** | [02-modelo-de-qualidade-e-modelagem.md](../02-modelo-de-qualidade-e-modelagem.md) |

---

- Produto:
- Item de trabalho:
- Build prevista:
- QA:
- Revisor:

## Classes marcadas

- [ ] R1 Financeiro e contábil
- [ ] R2 Regulatório e trilha
- [ ] R3 Integração externa
- [ ] R4 Acesso e segurança da transação
- [ ] R5 Continuidade
- [ ] R6 Canal e interação

## Características ISO/IEC 25010:2023 em escopo

- [ ] Correção e completude funcional
- [ ] Integridade, autenticidade, responsabilização, não repúdio, confidencialidade
- [ ] Tolerância a falhas e recuperabilidade
- [ ] Interoperabilidade
- [ ] Eficiência de desempenho ou capacidade (exige k6)
- [ ] Instalabilidade ou atualização de cliente
- [ ] Capacidade de interação

## Canais em escopo

- [ ] API
- [ ] Web desktop
- [ ] Desktop nativo ou terminal
- [ ] Mobile web
- [ ] App nativo
- [ ] Usabilidade

## Decisão de teste

| Risco concreto | Classe | Técnica | Nível | Automatizar agora? | Caso |
|---|---|---|---|---|---|
| | | | | | |

## Fora de escopo nesta mudança

| Item | Motivo |
|---|---|
| | |
