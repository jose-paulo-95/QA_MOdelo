# Como testar por canal

Antes de executar, **identifique** o que entra no plano com [11-identificar-cenarios.md](11-identificar-cenarios.md). Depois escreva com [05-como-escrever-um-teste.md](05-como-escrever-um-teste.md). Este guia só acrescenta o que muda na execução em API, desktop, mobile e usabilidade.

Antes de abrir a ferramenta, classifique o canal real:

| O que o usuário opera | Canal neste padrão | Automação permitida |
|---|---|---|
| Serviço HTTP do core | API | Playwright, no padrão de API |
| Navegador em tela larga | Web desktop | Playwright. Cypress só na regra do [08-padrao-cypress.md](08-padrao-cypress.md) |
| Programa instalado, terminal ou emulador | Desktop nativo | Manual no Test Plans. Automação só com exceção aprovada |
| Aplicação Electron | Desktop empacotado | Playwright |
| Site no celular | Mobile web | Playwright com projeto mobile. Cypress só em viewport, no produto que já usa Cypress |
| App de loja ou binário instalado no aparelho | App nativo | Appium 2 + WebdriverIO, [13-padrao-appium-wdio.md](13-padrao-appium-wdio.md). Playwright/Cypress não cobrem este canal |

# API

Use este canal para todo serviço de core impactado, mesmo quando a demanda chegou como tela.

## Passo 1. Obter o contrato

Reúna método, caminho, campos obrigatórios, códigos de resposta, autenticação e o efeito de negócio. Fonte: especificação da demanda ou contrato publicado no ambiente. Se o contrato não existe, o caso registra o exemplo acordado com desenvolvimento e o item de trabalho pede a publicação.

## Passo 2. Montar a matriz da operação

Para cada operação impactada, abra uma linha por situação:

| Situação | O que provar |
|---|---|
| Sucesso | Efeito de negócio e código previsto |
| Último valor aceito e primeiro recusado | Nenhum efeito parcial na recusa |
| Campo obrigatório ausente e formato inválido | Recusa e corpo sem gravação |
| Sem token, token expirado, papel sem alçada | Recusa sem efeito |
| Token de outro titular | Não lê nem move dado alheio |
| Mesma chave de idempotência | Um único efeito |
| Dependência externa indisponível | Status de pendência ou recusa, sem débito órfão |
| Repetição após timeout duvidoso | Recuperado sem duplicar |

Cada linha vira uma condição `CT-` e um caso `TC-`.

## Passo 3. Escrever o passo de API

O passo nomeia método, caminho, papel do token e os campos que decidem o resultado. O resultado esperado traz status, campos do corpo que são oráculo e a consulta que prova a persistência.

Confira sempre os dois lados: a resposta e o estado armazenado. Resposta de sucesso com saldo antigo é defeito.

## Passo 4. Preparar a chamada

1. Suba a massa e anote os ids.
2. Gere token do papel certo no ambiente de teste.
3. Fixe a chave de idempotência no caso, para a repetição ser a mesma.
4. Implemente no Git conforme [07-padrao-playwright.md](07-padrao-playwright.md), pasta `tests/api`.

## Passo 5. Executar

Rode a suíte da API no pipeline da build. Falha local sem pipeline não fecha o critério de saída. Anexe o relatório do Playwright ao Test Run.

## Passo 6. O que permanece manual na API

Exploração curta de um contrato instável pode ser manual no Test Plans, com a mesma matriz. No ciclo seguinte, o que estabilizou entra no script. Chamada avulsa sem caso deixa de contar como teste.

# Desktop

## Passo 1. Separar web, Electron e nativo

- Web no Chrome ou Edge do posto de trabalho: siga a trilha web e automatize com Playwright, projeto `desktop`.
- Electron distribuído pelo banco: Playwright pode abrir o executável. Trate instalação e atualização como casos próprios.
- Janela nativa, terminal de agência ou emulador: permaneça no manual. Não use Cypress nem o modo browser do Playwright para declarar esse canal coberto.

## Passo 2. Acrescentar condições que a tela de browser não tem

Além das condições de negócio escritas no procedimento geral, abra casos quando o risco existir:

| Tema | Condição mínima |
|---|---|
| Teclado | A operação crítica conclui só com teclado, na ordem de tabulação do posto |
| Foco | Depois de erro de validação, o foco volta ao campo que o operador corrige |
| Resolução do posto | Layout operacional em 1366×768 e no monitor padrão da agência |
| Sessão | Bloqueio por inatividade não confirma transação pela metade |
| Instalação | Versão nova instala sobre a anterior e a anterior volta quando a nova falha no startup |
| Arquivo | Exportação gera o arquivo da massa e a impressão mostra o identificador da transação |
| Concorrência local | Dois operadores não confirmam a mesma pendência |

## Passo 3. Escrever o caso nativo

Pré-condição: versão instalada, sistema operacional, perfil do operador e massa. O passo cita menu, tecla ou atalho como o operador faz. O resultado esperado cita saldo, status ou arquivo, não apenas "tela ok".

## Passo 4. Executar no posto certo

1. Instale a build nomeada no ambiente de homologação.
2. Execute primeiro o caminho de negócio de maior risco.
3. Execute teclado e instalação se estiverem na avaliação de risco.
4. Evidência: vídeo curto ou screenshots dos pontos de oráculo, com versão visível na tela de sobre ou no log de startup.

## Passo 5. Automatizar só o que a ferramenta realmente dirige

Web: um spec no projeto Playwright `desktop`, com viewport 1366×768. Electron: spec que inicia o binário de homologação e evita seletor frágil de coordenada. Nativo: registre "manual" no caso e, se o volume justificar ferramenta futura, abra exceção na norma. Até a exceção existir, a cobertura oficial é a execução no Test Plans.

# Mobile

## Passo 1. Separar mobile web e app nativo

Mobile web é o site no navegador do telefone. App nativo é o binário instalado. Um layout estreito no Chrome do notebook é apoio de mobile web. Ele não cobre app nativo.

## Passo 2. Definir a matriz mínima

| Situação | Mobile web | App nativo |
|---|---|---|
| Aparelho de referência | Um viewport Playwright do parque real (exemplo: 390×844) e um aparelho físico quando R6 for alto | Um aparelho físico do parque suportado |
| Orientação | Retrato no fluxo de transação | Retrato e a orientação que o app declara suportar |
| Teclado | Campo de valor não fica escondido atrás do teclado | Igual, no aparelho |
| Permissão | Não se aplica ao site, salvo câmera ou localização se o fluxo usar | Negar permissão essencial mostra caminho de recuperação |
| Interrupção | Recarregar no meio da confirmação | App vai para segundo plano antes de confirmar e volta sem duplicar |
| Rede fraca | Uma condição de timeout com a mesma regra de idempotência da API | Igual |
| Versão antiga | Browser suportado | Versão mínima suportada da loja interna |

## Passo 3. Escrever o caso

O caso de negócio de valor continua sendo o da API. O caso mobile prova que a pessoa consegue concluir essa mesma operação no canal e que a interrupção não duplica o efeito. Não reescreva a tabela de tarifa inteira na tela do celular.

Passo de app nativo cita o gesto como o cliente faz: tocar, voltar, colocar em segundo plano. Resultado esperado inclui o estado no serviço, consultado pela API ou pela tela de comprovante com identificador.

## Passo 4. Executar

1. Mobile web automatizado: projeto Playwright `mobile`, um fluxo por jornada crítica.
2. Mobile web de risco R6 alto: repetir o fluxo crítico uma vez em aparelho físico e anexar evidência.
3. App nativo automatizado: Appium + WebdriverIO em [13-padrao-appium-wdio.md](13-padrao-appium-wdio.md), boilerplate [automacao/appium-wdio](../../automacao/appium-wdio). Specs em `tests/mobile`, oráculo na UI e na API.
4. App nativo manual (ainda válido): aparelho da matriz quando o fluxo não está automatizado, ou para N3/N5 pontuais. Anote modelo, SO e versão do app no Test Run.
5. Cypress, quando o produto já o usa, pode cobrir viewport de mobile web. Não use Playwright/Cypress como evidência de app nativo.

## Passo 5. Fechar a lacuna com honestidade

Se a demanda é só app nativo e ainda não há suíte Appium no produto, o relatório diz "coberto por execução manual no aparelho X" ou "automação Appium prevista no item Y". Não marque automação de navegador como cobertura de app.

# Usabilidade

Usabilidade, no modelo 25010:2023, é capacidade de interação. O QA mede se a pessoa do papel certo conclui a tarefa sem erro grave. Isso não substitui pesquisa de experiência nem auditoria completa de acessibilidade.

Entre no escopo quando a avaliação de risco marcar R6 ou capacidade de interação. Fora desse escopo, não segure release por preferência visual.

## Passo 1. Escolher a tarefa e o papel

Escreva a tarefa como o operador ou o cliente a receberia, sem citar o botão. Exemplo: "transferir 100,00 da conta 1001 para a conta 2002 e confirmar que o comprovante é dessa operação".

Defina sucesso antes de sentar com a pessoa:

- concluiu sem ajuda de quem testa;
- o efeito de negócio está certo;
- nenhum dado de outro cliente apareceu;
- mensagens de erro disseram o que corrigir.

## Passo 2. Preparar o roteiro

Use [templates/charter-usabilidade.md](templates/charter-usabilidade.md). Três tarefas no máximo por sessão de 30 minutos: a crítica, a recuperação de um erro de validação e o cancelamento antes de confirmar.

Quem facilita não indica o menu. Pode encerrar se a pessoa travar por mais de três minutos e registra isso como falha de eficácia.

## Passo 3. Observar com a lista de capacidade de interação

Durante a sessão, marque evidência objetiva:

| Subcaracterística | O que anotar |
|---|---|
| Reconhecimento | A pessoa achou a função sem mapa oferecido pelo QA |
| Aprendizado | Na segunda tarefa parecida, não repetiu o mesmo erro |
| Operabilidade | Concluiu com o dispositivo do canal (mouse, teclado do posto ou toque) |
| Proteção contra erro do usuário | Valor inválido e cancelamento não geraram lançamento |
| Inclusão básica | Foco visível, rótulo nos campos do fluxo e contraste que permitiu ler valor e saldo no posto real |

Achado de inclusão básica entra como defeito de usabilidade. Auditoria WCAG completa fica fora deste padrão até existir demanda própria.

## Passo 4. Classificar o achado

| Gravidade | Critério | Efeito na release |
|---|---|---|
| Impede a tarefa | A pessoa não conclui a operação de risco | Bloqueia |
| Induz erro de negócio | A pessoa confirmaria valor, conta ou titular errado | Bloqueia |
| Atraso recuperável | Conclui com hesitação e sem erro de negócio | Registra, não bloqueia sozinho |
| Preferência | Gostaria de outro texto ou posição | Registra como melhoria |

## Passo 5. Registrar

O charter preenchido é a evidência. Não transforme usabilidade em script de clique que só repete o caminho feliz. O caminho feliz de regressão continua no caso funcional do canal.

## Ordem prática quando a demanda atravessa canais

1. Escreva as condições de negócio uma vez.
2. Implemente os casos de API.
3. Escolha uma jornada de interface no canal que o usuário usa.
4. Acrescente desktop, mobile ou usabilidade só nas linhas que a avaliação de risco marcou.
5. Chame k6 apenas se desempenho ou capacidade estiver marcado, pelo [09-padrao-k6.md](09-padrao-k6.md).
