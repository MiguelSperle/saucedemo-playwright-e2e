import { test, expect } from '../fixtures';
import { products } from '../data/products';
import { AUTH_STATE_PATH } from '../constants';

test.use({ storageState: AUTH_STATE_PATH });

test.describe('shopping cart', () => {
    test.describe('from the inventory page', () => {
        test.beforeEach(async ({ pm }) => {
            await pm.onInventoryPage().goto();
        });

        test('should add a product to the shopping cart', { tag: '@smoke' }, async ({ pm, page }) => {
            await pm.onInventoryPage().clickAddToCartButton(products.BACKPACK_PRODUCT.name);

            await expect(pm.onInventoryPage().headerComponent.shoppingCartBadge).toHaveText('1');
            await expect(pm.onInventoryPage().removeFromCartButton(products.BACKPACK_PRODUCT.name)).toBeVisible();

            await pm.onInventoryPage().headerComponent.clickShoppingCartLink();

            await expect(page).toHaveURL('/cart.html');
            await expect(pm.onShoppingCartPage().products).toHaveCount(1);
            await expect(pm.onShoppingCartPage().productFilter(products.BACKPACK_PRODUCT.name)).toBeVisible();
        });

        test('should add multiple products to the shopping cart', async ({ pm, page }) => {
            await pm.onInventoryPage().clickAddToCartButton(products.BACKPACK_PRODUCT.name);
            await pm.onInventoryPage().clickAddToCartButton(products.BIKE_LIGHT_PRODUCT.name);

            await expect(pm.onInventoryPage().headerComponent.shoppingCartBadge).toHaveText('2');
            await expect(pm.onInventoryPage().removeFromCartButton(products.BACKPACK_PRODUCT.name)).toBeVisible();
            await expect(pm.onInventoryPage().removeFromCartButton(products.BIKE_LIGHT_PRODUCT.name)).toBeVisible();

            await pm.onInventoryPage().headerComponent.clickShoppingCartLink();

            await expect(page).toHaveURL('/cart.html');
            await expect(pm.onShoppingCartPage().products).toHaveCount(2);
            await expect(pm.onShoppingCartPage().productFilter(products.BACKPACK_PRODUCT.name)).toBeVisible();
            await expect(pm.onShoppingCartPage().productFilter(products.BIKE_LIGHT_PRODUCT.name)).toBeVisible();
        });

        test('should remove an added product from the shopping cart', async ({ pm, shoppingCartWithProduct, page }) => {
            await pm.onInventoryPage().clickRemoveFromCartButton(products.BACKPACK_PRODUCT.name);

            await expect(pm.onInventoryPage().headerComponent.shoppingCartBadge).toBeHidden();
            await expect(pm.onInventoryPage().addToCartButton(products.BACKPACK_PRODUCT.name)).toBeVisible();

            await pm.onInventoryPage().headerComponent.clickShoppingCartLink();

            await expect(page).toHaveURL('/cart.html');
            await expect(pm.onShoppingCartPage().products).toHaveCount(0);
        });

        test('should remove only one product when multiple products have been added to the shopping cart', async ({ pm, shoppingCartWithMultipleProducts, page }) => {
            await pm.onInventoryPage().clickRemoveFromCartButton(products.BACKPACK_PRODUCT.name);

            await expect(pm.onInventoryPage().headerComponent.shoppingCartBadge).toHaveText('1');
            await expect(pm.onInventoryPage().addToCartButton(products.BACKPACK_PRODUCT.name)).toBeVisible();
            await expect(pm.onInventoryPage().removeFromCartButton(products.BIKE_LIGHT_PRODUCT.name)).toBeVisible();

            await pm.onInventoryPage().headerComponent.clickShoppingCartLink();

            await expect(page).toHaveURL('/cart.html');
            await expect(pm.onShoppingCartPage().products).toHaveCount(1);
            await expect(pm.onShoppingCartPage().productFilter(products.BIKE_LIGHT_PRODUCT.name)).toBeVisible();
        });
    });

    test.describe('from the product details page', () => {
        test.beforeEach(async ({ pm }) => {
            await pm.onProductDetailsPage().goto(products.BACKPACK_PRODUCT.id);
        });

        test('should add a product to the shopping cart', { tag: '@smoke' }, async ({ pm, page }) => {
            await pm.onProductDetailsPage().clickAddToCartButton();

            await expect(pm.onProductDetailsPage().headerComponent.shoppingCartBadge).toHaveText('1');
            await expect(pm.onProductDetailsPage().removeFromCartButton).toBeVisible();

            await pm.onProductDetailsPage().headerComponent.clickShoppingCartLink();

            await expect(page).toHaveURL('/cart.html');
            await expect(pm.onShoppingCartPage().products).toHaveCount(1);
            await expect(pm.onShoppingCartPage().productFilter(products.BACKPACK_PRODUCT.name)).toBeVisible();
        });

        test('should remove an added product from the shopping cart', async ({ pm, shoppingCartWithProduct, page }) => {
            await pm.onProductDetailsPage().clickRemoveFromCartButton();

            await expect(pm.onProductDetailsPage().headerComponent.shoppingCartBadge).toBeHidden();
            await expect(pm.onProductDetailsPage().addToCartButton).toBeVisible();

            await pm.onProductDetailsPage().headerComponent.clickShoppingCartLink();

            await expect(page).toHaveURL('/cart.html');
            await expect(pm.onShoppingCartPage().products).toHaveCount(0);
        });
    });

    test.describe('from the shopping cart page', () => {
        test.beforeEach(async ({ pm }) => {
            await pm.onShoppingCartPage().goto();
        });

        test('should remove an added product from the shopping cart', { tag: '@smoke' }, async ({ pm, shoppingCartWithProduct }) => {
            await pm.onShoppingCartPage().clickRemoveFromCartButton(products.BACKPACK_PRODUCT.name);

            await expect(pm.onShoppingCartPage().headerComponent.shoppingCartBadge).toBeHidden();
            await expect(pm.onShoppingCartPage().products).toHaveCount(0);
        });

        test('should remove only one product when multiple products have been added to the shopping cart', async ({ pm, shoppingCartWithMultipleProducts }) => {
            await pm.onShoppingCartPage().clickRemoveFromCartButton(products.BACKPACK_PRODUCT.name);

            await expect(pm.onShoppingCartPage().headerComponent.shoppingCartBadge).toHaveText('1');
            await expect(pm.onShoppingCartPage().products).toHaveCount(1);
            await expect(pm.onShoppingCartPage().productFilter(products.BIKE_LIGHT_PRODUCT.name)).toBeVisible();
        });
    });
});