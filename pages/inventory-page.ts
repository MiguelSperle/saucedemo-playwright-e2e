import { Page, Locator } from '@playwright/test';
import { HeaderComponent } from '../components/header-component';

export class InventoryPage {
    readonly headerComponent: HeaderComponent;
    readonly products: Locator;
    readonly sortProduct: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly openMenuButton: Locator;
    readonly logoutLink: Locator;

    constructor(readonly page: Page) {
        this.headerComponent = new HeaderComponent(this.page);
        this.products = this.page.getByTestId('inventory-item');
        this.sortProduct = this.page.getByTestId('product-sort-container');
        this.productNames = this.page.getByTestId('inventory-item-name');
        this.productPrices = this.page.getByTestId('inventory-item-price');
        this.openMenuButton = this.page.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = this.page.getByTestId('logout-sidebar-link');
    }

    async goto() {
        await this.page.goto('/inventory.html');
    }

    productFilter(productName: string): Locator {
        return this.products.filter({ hasText: productName });
    }

    addToCartButton(productName: string): Locator {
        return this.productFilter(productName).getByRole('button', { name: 'Add to cart' });
    }

    removeFromCartButton(productName: string): Locator {
        return this.productFilter(productName).getByRole('button', { name: 'Remove' });
    }

    async clickAddToCartButton(productName: string) {
        await this.addToCartButton(productName).click();
    }

    async clickRemoveFromCartButton(productName: string) {
        await this.removeFromCartButton(productName).click();
    }

    async sortBy(option: 'za' | 'lohi' | 'hilo') {
        await this.sortProduct.selectOption(option);
    }

    async logout() {
        await this.openMenuButton.click();
        await this.logoutLink.click();
    }
}