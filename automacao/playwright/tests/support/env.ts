/** Lê variáveis de ambiente. Specs não leem process.env direto de segredo. */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variável obrigatória ausente: ${name}`);
  }
  return value;
}
