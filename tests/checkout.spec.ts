import { test, expect } from '../fixtures';
import { users } from '../data/users';
import { products } from '../data/products';

test.describe('checkout', () => {
    test.beforeEach(async ({ pm }) => {
        await pm.onShoppingCartPage().goto()
    });

    test('should complete the checkout process successfully', async ({ pm, shoppingCartWithProduct, page }) => {
        await pm.onShoppingCartPage().clickCheckoutButton();

        await expect(page).toHaveURL('/checkout-step-one.html');

        await pm.onCheckoutPage().checkoutInformation(
            users.STANDARD_USER.personalInfo.firstName,
            users.STANDARD_USER.personalInfo.lastName,
            users.STANDARD_USER.personalInfo.postalCode
        );

        await expect(page).toHaveURL('/checkout-step-two.html');
        await expect(pm.onCheckoutPage().products).toHaveCount(1);
        await expect(pm.onCheckoutPage().productFilter(products.BACKPACK_PRODUCT.name)).toBeVisible();
        await expect(pm.onCheckoutPage().totalAmount).toBeVisible();

        await pm.onCheckoutPage().clickFinishButton();

        await expect(page).toHaveURL('/checkout-complete.html');
        await expect(pm.onCheckoutPage().successMessage).toBeVisible();
    });
});