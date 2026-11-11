import { test, expect } from '../fixtures';
import { users } from '../data/users';
import { products } from '../data/products';
import { errorMessages } from '../data/error-messages';

test.describe('checkout', () => {
    test.beforeEach(async ({ pm }) => {
        await pm.onShoppingCartPage().goto()
    });

    test('should complete the checkout process successfully', async ({ pm, shoppingCartWithProduct, page }) => {
        await pm.onShoppingCartPage().clickCheckoutButton();

        await expect(page).toHaveURL('/checkout-step-one.html');

        await pm.onCheckoutInformationPage().enterCheckoutInformation(
            users.STANDARD_USER.personalInfo.firstName,
            users.STANDARD_USER.personalInfo.lastName,
            users.STANDARD_USER.personalInfo.postalCode
        );

        await expect(page).toHaveURL('/checkout-step-two.html');
        await expect(pm.onCheckoutOverviewPage().products).toHaveCount(1);
        await expect(pm.onCheckoutOverviewPage().productFilter(products.BACKPACK_PRODUCT.name)).toBeVisible();
        await expect(pm.onCheckoutOverviewPage().totalAmount).toBeVisible();

        await pm.onCheckoutOverviewPage().clickFinishButton();

        await expect(page).toHaveURL('/checkout-complete.html');
        await expect(pm.onCheckoutCompletePage().successMessage).toBeVisible();
        await expect(pm.onCheckoutCompletePage().headerComponent.shoppingCartBadge).toBeHidden();
    });

    test('should display an error when the checkout information is empty', async ({ pm, page }) => {
        await pm.onShoppingCartPage().clickCheckoutButton();

        await expect(page).toHaveURL('/checkout-step-one.html');

        await pm.onCheckoutInformationPage().enterCheckoutInformation('', '', '');

        await expect(pm.onCheckoutInformationPage().error).toHaveText(
            errorMessages.checkoutInformation.FIRST_NAME_REQUIRED
        );
    });

    test('should display an error when the last name in the checkout information is empty', async ({ pm, page }) => {
        await pm.onShoppingCartPage().clickCheckoutButton();

        await expect(page).toHaveURL('/checkout-step-one.html');

        await pm.onCheckoutInformationPage().enterCheckoutInformation(
            users.STANDARD_USER.personalInfo.firstName, '', ''
        );

        await expect(pm.onCheckoutInformationPage().error).toHaveText(
            errorMessages.checkoutInformation.LAST_NAME_REQUIRED
        );
    });

    test('should display an error when the postal code in the checkout information is empty', async ({ pm, page }) => {
        await pm.onShoppingCartPage().clickCheckoutButton();

        await expect(page).toHaveURL('/checkout-step-one.html');

        await pm.onCheckoutInformationPage().enterCheckoutInformation(
            users.STANDARD_USER.personalInfo.firstName,
            users.STANDARD_USER.personalInfo.lastName,
            ''
        );

        await expect(pm.onCheckoutInformationPage().error).toHaveText(
            errorMessages.checkoutInformation.POSTAL_CODE_REQUIRED
        );
    });
});