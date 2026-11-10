import { Page, Locator } from '@playwright/test';
import { HeaderComponent } from '../components/header-component';

export class ShoppingCartPage {
    readonly headerComponent: HeaderComponent;
    readonly products: Locator;
    readonly checkoutButton: Locator;

    constructor(readonly page: Page) {
        this.headerComponent = new HeaderComponent(page);
        this.products = this.page.getByTestId('inventory-item');
        this.checkoutButton = this.page.getByRole('button', { name: 'checkout' });
    }

    async goto() {
        await this.page.goto('/cart.html');
    }

    productFilter(productName: string): Locator {
        return this.products.filter({ hasText: productName });
    }

    removeFromCartButton(productName: string): Locator {
        return this.productFilter(productName).getByRole('button', { name: 'Remove' });
    }

    async clickRemoveFromCartButton(productName: string) {
        await this.removeFromCartButton(productName).click();
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }
}