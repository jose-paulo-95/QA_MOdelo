# Exemplos — gerar-relatorio-metricas

## Entrada do usuário (exemplo)

```text
Produto CORE, release 2026.10, build 1842, HML.
R1–R3: 12 previstos, 12 executados, 11 pass, 1 fail corrigido na 1842 e reexecutado pass.
Pipeline regressao-riscos-altos: verde (link fictício).
Defeitos abertos: nenhum bloqueante/crítico.
Flaky na suíte que bloqueia: 0.
M2 janela anterior: 0.
Sem desvios.
```

## Veredito esperado

Recomendo seguir — M1=100%, M3 verde, M4=0, sem defeito grave aberto.

## Entrada insuficiente

```text
Build 1842 parece ok.
```

## Resposta esperada

Lacunas: M1 sem números, M3 sem fonte, defeitos não informados → **Não recomendo seguir** por dados insuficientes (ou bloquear veredito positivo) + pedir os 3 dados.
