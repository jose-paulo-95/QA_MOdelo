# Boilerplate k6

Scripts em `tests/performance/`. Rode só em ambiente autorizado — nunca em produção.

```bash
k6 run -e BASE_URL=https://homolog.exemplo.local -e TOKEN_PERF=... tests/performance/transferencia.carga.k6.js
```

Ajuste `rate`, duração e thresholds pela meta do item de trabalho. Ver [09-padrao-k6](../../docs/padrao-qualidade/09-padrao-k6.md).
