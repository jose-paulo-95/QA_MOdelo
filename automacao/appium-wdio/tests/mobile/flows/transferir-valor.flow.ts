import { LoginScreen } from '../screens/login.screen';
import { TransferenciaScreen } from '../screens/transferencia.screen';
import { requireEnv } from '../support/env';
import massa from '../support/data/transferencia.hml.json';

export async function transferirValorNoApp(input?: {
  origem?: string;
  destino?: string;
  valor?: string;
}): Promise<{ transactionId: string }> {
  const login = new LoginScreen();
  const transferencia = new TransferenciaScreen();

  await login.autenticar(massa.usuario, requireEnv(massa.senhaEnv));
  await transferencia.abrir();
  await transferencia.preencher(
    input?.origem ?? massa.origem,
    input?.destino ?? massa.destino,
    input?.valor ?? massa.valor,
  );
  await transferencia.confirmar();
  return { transactionId: await transferencia.lerTransactionId() };
}

/** Coloca o app em segundo plano e volta — cenário N2. */
export async function irParaSegundoPlanoEVoltar(ms = 3000) {
  await driver.background(Math.ceil(ms / 1000));
}
