export class LoginScreen {
  get campoUsuario() {
    return $('~campo-usuario');
  }

  get campoSenha() {
    return $('~campo-senha');
  }

  get botaoEntrar() {
    return $('~botao-entrar');
  }

  async autenticar(usuario: string, senha: string) {
    await this.campoUsuario.waitForDisplayed();
    await this.campoUsuario.setValue(usuario);
    await this.campoSenha.setValue(senha);
    await this.botaoEntrar.click();
  }
}
