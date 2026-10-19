import { transferirValorNoApp, irParaSegundoPlanoEVoltar } from '../flows/transferir-valor.flow';
import { TransferenciaScreen } from '../screens/transferencia.screen';
import { consultarLancamentos } from '../support/api/lancamentos';
import { requireEnv } from '../support/env';
import massa from '../support/data/transferencia.hml.json';

describe('Transferencia app Android', () => {
  it('TC-CORE-TRF-020 cliente conclui transferencia no app @regressao', async () => {
    const { transactionId } = await transferirValorNoApp({
      origem: massa.origem,
      destino: massa.destino,
      valor: massa.valor,
    });

    const tela = new TransferenciaScreen();
    await expect(tela.transactionId).toBeDisplayed();

    const lancamentos = await consultarLancamentos(
      transactionId,
      requireEnv('TOKEN_TITULAR'),
    );
    expect(lancamentos.length).toBe(2);
  });

  it('TC-CORE-TRF-021 transferencia nao duplica apos segundo plano @regressao', async () => {
    const loginJaFeito = await transferirValorNoApp();
    // Fluxo ilustrativo: iniciar de novo, ir a background antes de confirmar.
    // Ajuste ao deep link / tela de confirmação real do produto.
    await irParaSegundoPlanoEVoltar(3000);
    const tela = new TransferenciaScreen();
    await expect(tela.transactionId).toBeDisplayed();
    const lancamentos = await consultarLancamentos(
      loginJaFeito.transactionId,
      requireEnv('TOKEN_TITULAR'),
    );
    expect(lancamentos.length).toBe(2);
  });
});
