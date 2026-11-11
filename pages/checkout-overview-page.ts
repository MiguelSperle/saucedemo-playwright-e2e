import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly products: Locator;
    readonly totalAmount: Locator;
    readonly finishButton: Locator;

    constructor(readonly page: Page) {
        this.products = this.page.getByTestId('inventory-item');
        this.totalAmount = this.page.getByTestId('total-label');
        this.finishButton = this.page.getByRole('button', { name: 'Finish' });
    }

    productFilter(productName: string): Locator {
        return this.products.filter({ hasText: productName });
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }
}