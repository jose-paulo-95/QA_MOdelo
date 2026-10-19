# Referência — revisar casos manuais

## Checklist por TC-

- [ ] ID `TC-` no formato do glossário
- [ ] `CT-` correspondente ou condição explícita
- [ ] Classe R e característica 25010 preenchidas
- [ ] Canal **único**
- [ ] Um **Quando** na condição
- [ ] Então com oráculo verificável (não “sucesso” / “HTTP 200” sozinho / “tela ok”)
- [ ] Massa sintética com identificadores
- [ ] Oráculo cita fonte
- [ ] Passos: ação × esperado por linha
- [ ] Se R1 movimento: débito, crédito e mesmo id (ou equivalente) no fluxo
- [ ] Limite/falha não embutidos ilegalmente no caminho feliz (devem ser outros TC- se forem cenários distintos)
- [ ] Automatizar coerente com canal (api/ui/appium/k6/manual)

## Severidades

| Severidade | Exemplos |
|---|---|
| Bloqueante | Sem oráculo de negócio; dado real; três canais no mesmo TC-; R1 sem conferência de saldo/lançamento; Então = “funciona” |
| Importante | Massa “conta válida” sem ID; esperado só no último passo quando efeitos intermediários importam; Automatizar=ui para regra que deveria ser api |
| Sugestão | Prioridade ausente; técnica não nomeada; texto verboso |

## Bom vs ruim

Ver [../escrever-casos-do-padrao/reference.md](../escrever-casos-do-padrao/reference.md).
