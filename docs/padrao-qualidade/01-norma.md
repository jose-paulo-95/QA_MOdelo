# Norma de Qualidade de Software

**Versão:** 1.0  
**Escopo:** produtos do core bancário e canais que alteram, consultam ou integram saldo, lançamento, cadastro mestre, tarifa, contrato externo ou trilha de auditoria.  
**Obrigatório para:** QA, desenvolvimento que automatiza teste, e quem aprova release.

## 1. Princípios

1. Teste existe para informar risco de colocar a mudança em produção, com evidência rastreável.
2. A profundidade segue a classe de risco e a característica de qualidade. A preferência pessoal do QA não escolhe técnica, ferramenta nem lugar de armazenamento.
3. Todo testware tem um único lugar oficial, definido em [03-testware-e-ferramentas.md](03-testware-e-ferramentas.md).
4. Regra de negócio de risco alto é revisada antes da codificação. Caso de alto nível nasce no refinamento. Caso de baixo nível existe antes da execução.
5. Interface automatizada não substitui teste de API em serviço de core.
6. Dado de teste é sintético ou mascarado. Dado real de cliente e extrato de produção não entram em caso, script, fixture ou print.
7. Outro QA revisa casos e scripts de risco financeiro, integração externa, segurança da transação e regulatório antes da execução contar como aceite.

## 2. Papéis

| Papel | Responsabilidade no teste |
|---|---|
| QA | Risco, modelagem, casos, evidência, regressão de negócio, padrão de automação do time |
| Desenvolvimento | Unidade, componente, testabilidade, correção do defeito, pipeline |
| Dono do produto | Critério de aceite testável e prioridade de negócio |
| Aprovador da release | Decide com o relatório. Não aprova risco alto sem execução registrada |

QA participa do refinamento. Desenvolvimento pode automatizar, desde que o script obedeça ao padrão da ferramenta.

## 3. Processo mínimo

Vale para sprint, Kanban ou release. O ritmo muda. A sequência não muda.

1. **Classificar.** Preencher a avaliação de risco e marcar as características ISO/IEC 25010:2023 aplicáveis. Ver [02-modelo-de-qualidade-e-modelagem.md](02-modelo-de-qualidade-e-modelagem.md).
2. **Modelar.** Seguir [05-como-escrever-um-teste.md](05-como-escrever-um-teste.md) e o complemento do canal em [06-como-testar-por-canal.md](06-como-testar-por-canal.md). Publicar condições e casos no Azure Test Plans, ligados ao item de trabalho.
3. **Preparar.** Ambiente, massa sintética, oráculo e, quando couber, script no Git no padrão Playwright, Cypress ou k6.
4. **Executar.** Rodar os casos do risco em escopo. Automação de regressão roda no pipeline. Evidência fica no Test Run ou no artefato do pipeline, com link no caso.
5. **Concluir.** Defeitos no Azure Boards. Relatório curto da release ou da iteração. Atualizar a suíte de regressão dos riscos que passaram a ser permanentes.

## 4. Critério de entrada

A execução de aceite só começa quando existem, ao mesmo tempo:

- item de trabalho com comportamento observável;
- avaliação de risco preenchida;
- ambiente nomeado e build identificável;
- massa que permite afirmar o resultado sem consultar produção;
- casos de baixo nível para as classes de risco em escopo.

## 5. Critério de saída

A release pode ser recomendada quando:

- todo caso das classes em escopo foi executado na build candidata, ou tem desvio aceito por escrito pelo aprovador;
- não há defeito crítico ou bloqueante aberto na mudança;
- a regressão automatizada dos riscos altos do produto está verde no pipeline dessa build;
- o relatório aponta características de qualidade exercitadas, não exercitadas e o motivo.

Falha de usabilidade cosmética não bloqueia release de batch. Falha que impede o operador de concluir uma transação de risco financeiro bloqueia.

## 6. Evidência

Cada execução registra: identificador do caso, build, ambiente, executor, data, resultado e prova do oráculo. Prova aceita: resposta de API armazenada no relatório, lançamento consultado, extrato sintético, trace do Playwright, vídeo do Cypress ou screenshot do ponto de decisão. Print solto sem build e sem caso não é evidência.

## 7. Defeito

Um defeito contém: build, ambiente, caso ou charter, passos, resultado obtido, resultado esperado, característica de qualidade afetada e classe de risco. Severidade:

| Severidade | Uso |
|---|---|
| Bloqueante | Corrompe saldo, perde lançamento, quebra trilha, abre acesso indevido ou impede a operação crítica |
| Crítico | Regra de negócio principal errada, com contorno operacional arriscado |
| Alto | Regra errada com contorno claro e sem perda financeira direta |
| Médio | Comportamento incorreto de apoio, mensagem ou validação secundária |
| Baixo | Texto, layout ou conforto que não altera a operação |

## 8. Métricas da primeira versão

- M1 — percentual de riscos altos com caso executado na build;
- M2 — defeito bloqueante ou crítico encontrado depois da release;
- M3 — regressão automatizada dos riscos altos: verde ou vermelha;
- M4 — testes automatizados instáveis na suíte oficial, medidos por repetição sem mudança de produto.

Definição, fórmula, fonte no Azure, leitura e ação obrigatória: [10-metricas.md](10-metricas.md). Outras métricas só entram depois do piloto descrito no guia de adoção.

## 9. Exceções

Ferramenta de interface diferente de Playwright e Cypress, repositório de teste fora do Git do produto, ou dispensa de caso para risco alto, exigem registro no item de trabalho: motivo, prazo e aprovador. Exceção sem prazo vira padrão paralelo e deixa de ser exceção.

## 10. O que esta norma torna obrigatório na implementação

Seguir o passo a passo de escrita, o complemento do canal e o padrão da ferramenta. Descrição de estratégia sem caso, sem evidência e sem script no formato padrão não cumpre esta norma.

## 11. Referências de método

- ISTQB CTFL 4.0, CTAL-TA 4.0, CTAL-TM 3.0, CTAL-TAE 2.0 e CTAL-AT v2.0 (syllabi no repositório)
- ISO/IEC 25010:2023 — modelo de qualidade de produto e qualidade em uso

Esta norma não reproduz o texto desses documentos. Em conflito entre hábito local e esta norma, prevalece esta norma até revisão formal.
