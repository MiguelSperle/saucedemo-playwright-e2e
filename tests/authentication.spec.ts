import { test, expect } from '../fixtures';
import { users } from '../data/users';

test.describe('authentication', () => {
  test.beforeEach(async ({ pm }) => {
    await pm.onAuthenticationPage().goto();
  });

  test('should authenticate successfully', async ({ pm, page }) => {
    await pm.onAuthenticationPage().authenticate(users.STANDARD_USER.credentials.username, users.STANDARD_USER.credentials.password);

    await expect(page).toHaveURL('/inventory.html');
  });

  test('should display an error when credentials are empty', async ({ pm }) => {
    await pm.onAuthenticationPage().authenticate('', '');

    await expect(pm.onAuthenticationPage().error).toHaveText('Epic sadface: Username is required');
  });

  test('should display an error when password is empty', async ({ pm }) => {
    await pm.onAuthenticationPage().authenticate(users.STANDARD_USER.credentials.username, '');

    await expect(pm.onAuthenticationPage().error).toHaveText('Epic sadface: Password is required');
  });

  test('should display an error when credentials are incorrect', async ({ pm }) => {
    await pm.onAuthenticationPage().authenticate(users.INVALID_USER.credentials.username, users.INVALID_USER.credentials.password);

    await expect(pm.onAuthenticationPage().error).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });
});