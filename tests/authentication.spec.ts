import { test, expect } from '../fixtures';
import { users } from '../data/users';
import { products } from '../data/products';
import { errorMessages } from '../data/error-messages';
import { AUTH_STATE_PATH } from '../config/auth-state';
import { Cookie } from '@playwright/test';

test.describe('authentication', () => {
  test.beforeEach(async ({ pm }) => {
    await pm.onAuthenticationPage().goto();
  });

  test('should authenticate successfully', { tag: '@smoke' }, async ({ pm, page }) => {
    await pm.onAuthenticationPage().authenticate(users.STANDARD_USER.credentials.username, users.STANDARD_USER.credentials.password);

    const cookies: Cookie[] = await page.context().cookies();
    const sessionCookie = cookies.find(cookie => cookie.name === 'session-username');

    expect(sessionCookie).toBeDefined();

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

  test.describe('logout', () => {
    test.use({ storageState: AUTH_STATE_PATH });

    test('should end the session when log out', { tag: '@smoke' }, async ({ pm, page }) => {
      await pm.onInventoryPage().goto();

      await pm.onInventoryPage().logout();

      const cookies: Cookie[] = await page.context().cookies();
      const sessionCookie = cookies.find(cookie => cookie.name === 'session-username');

      expect(sessionCookie).toBeUndefined();

      await expect(page).toHaveURL('/');
    });
  });

  test.describe('access control', () => {
    const protectedURLs: string[] = [
      '/inventory.html', `/inventory-item.html?id=${products.BACKPACK_PRODUCT.id}`, '/cart.html',
      '/checkout-step-one.html', '/checkout-step-two.html', '/checkout-complete.html'
    ];

    for (const protectedURL of protectedURLs) {
      test(`should require authentication to open ${protectedURL.split('?')[0]}`, { tag: '@smoke' }, async ({ page, pm }) => {
        await page.goto(protectedURL);

        await expect(page).toHaveURL('/');
        await expect(pm.onAuthenticationPage().error).toHaveText(
          errorMessages.authentication.PROTECTED_PAGE(protectedURL.split('?')[0])
        );
      });
    };
  });
});