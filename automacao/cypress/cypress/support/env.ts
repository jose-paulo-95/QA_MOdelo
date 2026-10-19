export function requireEnv(nome: string): string {
  const valor = Cypress.env(nome);
  if (valor === undefined || valor === null || String(valor).trim() === '') {
    throw new Error(`Defina CYPRESS_${nome} no pipeline. O spec não envia segredo vazio.`);
  }
  return String(valor);
}
