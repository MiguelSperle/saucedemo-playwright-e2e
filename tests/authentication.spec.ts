import { test, expect } from '../fixtures';
import { users } from '../data/users';
import { errorMessages } from '../data/error-messages';

test.describe('authentication', () => {
  test.beforeEach(async ({ pm }) => {
    await pm.onAuthenticationPage().goto();
  });

  test('should authenticate successfully', async ({ pm, page }) => {
    await pm.onAuthenticationPage().authenticate(users.STANDARD_USER.credentials.username, users.STANDARD_USER.credentials.password);

    await expect(page).toHaveURL('/inventory.html');
  });

  test('should display an error when authentication credentials are empty', async ({ pm }) => {
    await pm.onAuthenticationPage().authenticate('', '');

    await expect(pm.onAuthenticationPage().error).toHaveText(errorMessages.authentication.USERNAME_REQUIRED);
  });

  test('should display an error when authentication password is empty', async ({ pm }) => {
    await pm.onAuthenticationPage().authenticate(users.STANDARD_USER.credentials.username, '');

    await expect(pm.onAuthenticationPage().error).toHaveText(errorMessages.authentication.PASSWORD_REQUIRED);
  });

  test('should display an error when authentication credentials are incorrect', async ({ pm }) => {
    await pm.onAuthenticationPage().authenticate(users.INVALID_USER.credentials.username, users.INVALID_USER.credentials.password);

    await expect(pm.onAuthenticationPage().error).toHaveText(errorMessages.authentication.INCORRECT_CREDENTIALS);
  });
});