import { test as setup, expect } from '../../fixtures';
import { users } from '../../data/users';
import { AUTH_STATE_PATH } from '../../constants'

/**
 * Configuração do estado de autenticação para os testes E2E.
 * 
 * Preferencialmente, a autenticação deve ser realizada via API durante o setup.
 * 
 * Caso a API de autenticação não esteja disponível, o estado autenticado pode
 * ser simulado por meio da injeção direta com cookies ou com localStorage no contexto do navegador.
**/

setup('configure authentication state', async ({ page }) => {
  await page.context().addCookies([
    {
      name: 'session-username',
      value: users.STANDARD_USER.credentials.username,
      domain: 'www.saucedemo.com',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax'
    }
  ]);

  await page.context().storageState({ path: AUTH_STATE_PATH });
}); 