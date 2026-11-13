import { test, expect } from '../fixtures';
import { AUTH_STATE_PATH } from '../constants';

test.use({ storageState: AUTH_STATE_PATH });

test.describe('product filter', () => {
    test.beforeEach(async ({ pm }) => {
        await pm.onInventoryPage().goto();
    });

    test('should sort products by name from A to Z', async ({ pm }) => {
        await pm.onInventoryPage().sortBy('az');

        const productNames = await pm.onInventoryPage().productNames.allTextContents();

        expect(productNames).toEqual([...productNames].sort((a, b) => a.localeCompare(b)));
    });

    test('should sort products by name from Z to A', async ({ pm }) => {
        await pm.onInventoryPage().sortBy('za');

        const productNames = await pm.onInventoryPage().productNames.allTextContents();

        expect(productNames).toEqual([...productNames].sort((a, b) => b.localeCompare(a)));
    });

    test('should sort products by price from low to high', async ({ pm }) => {
        await pm.onInventoryPage().sortBy('lohi');

        const productPrices = await pm.onInventoryPage().productPrices.allTextContents()
        const mappedProductPrices = productPrices.map(productPrice => parseFloat(productPrice.replace('$', '')));

        expect(mappedProductPrices).toEqual([...mappedProductPrices].sort((a, b) => a - b));
    });

    test('should sort products by price from high to low', async ({ pm }) => {
        await pm.onInventoryPage().sortBy('hilo');

        const productPrices = await pm.onInventoryPage().productPrices.allTextContents()
        const mappedProductPrices = productPrices.map(productPrice => parseFloat(productPrice.replace('$', '')));

        expect(mappedProductPrices).toEqual([...mappedProductPrices].sort((a, b) => b - a));
    });
});