import { test as base, expect } from '@playwright/test';
import { PageManager } from '../pages/manager/page-manager';
import { products } from '../data/products';

/**
 * Responsabilidades:
 * - Instanciar os Page Objects e disponibilizá-los automaticamente aos testes.
 * - Preparar o estado necessário para o teste sob demanda (fixtures de setup),
 *   evitando repetir passos de UI que não fazem parte do cenário testado.
 * 
 * Estratégia para preparar o estado (em ordem de preferência):
 * 1. API: sempre que disponível, criar o recurso diretamente pela API.
 * 2. Storage (localStorage): quando não há API para o
 *    recurso, gravar o estado direto no storage do navegador.
 *
**/

type TestFixtures = {
    pm: PageManager;
    shoppingCartWithProduct: void;
    shoppingCartWithMultipleProducts: void;
};

export const test = base.extend<TestFixtures>({
    pm: async ({ page }, use) => {
        await use(new PageManager(page));
    },

    shoppingCartWithProduct: async ({ page }, use) => {
        await page.evaluate((product) => {
            window.localStorage.setItem('cart-contents', JSON.stringify([product.id]));
        }, products.BACKPACK_PRODUCT);

        await page.reload({ waitUntil: 'load' });

        await use();
    },

    shoppingCartWithMultipleProducts: async ({ page }, use) => {
        await page.evaluate((products) => {
            window.localStorage.setItem('cart-contents', JSON.stringify([
                products.BACKPACK_PRODUCT.id, products.BIKE_LIGHT_PRODUCT.id
            ]));
        }, products);

        await page.reload({ waitUntil: 'load' });

        await use();
    }
});

export { expect } from '@playwright/test';