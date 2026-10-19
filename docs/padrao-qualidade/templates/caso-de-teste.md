# Caso de teste

## Sobre este template

| | |
|---|---|
| **Objetivo** | Documentar um caso **executável** (baixo nível): condição Dado/Quando/Então, massa, oráculo e passos com resultado esperado por linha. |
| **Quando usar** | Para cada cenário marcado “incluir”; antes da execução manual ou da automação; ao publicar no Azure Test Plans. |
| **Quando não usar** | Na descoberta inicial (use identificação); para sessão exploratória ou de usabilidade (use os charters); para o veredito da release (use relatório). Caso de *alto nível* no refinamento pode ter só a condição — este template completo é para execução. |
| **Quem preenche** | QA. Revisão por outro QA se R1–R4. |
| **Entrada** | Linha “incluir” da identificação + massa sintética disponível. |
| **Saída** | `TC-...` pronto para Test Run e, se couber, automação com o mesmo ID no título. |
| **Próximo passo** | Executar; ou skill `implementar-automacao-teste` se Automatizar = sim. |
| **Referência** | [05-como-escrever-um-teste.md](../05-como-escrever-um-teste.md), [06-como-testar-por-canal.md](../06-como-testar-por-canal.md) |

---

- ID: TC-<PRODUTO>-<MODULO>-<NNN>
- Item de trabalho:
- Classe de risco:
- Característica 25010:
- Técnica:
- Canal: API | Web | Desktop | Mobile web | App nativo | Usabilidade
- Nível: alto | baixo
- Prioridade:
- Automatizar: sim, neste ciclo | sim, depois | não, motivo registrado

## Condição

Dado  
Quando  
Então

## Pré-condições

- Ambiente:
- Massa (sintética):
- Permissão:
- Oráculo (fonte do resultado esperado):

## Passos

| # | Ação | Resultado esperado |
|---|---|---|
| 1 | | |
| 2 | | |

## Rastreio da automação

- Repositório e caminho do spec:
- Título do teste automatizado (igual a este ID):
