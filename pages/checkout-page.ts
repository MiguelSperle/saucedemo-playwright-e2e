import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly products: Locator;
    readonly totalAmount: Locator;
    readonly finishButton: Locator;
    readonly successMessage: Locator;

    constructor(readonly page: Page) {
        this.firstNameInput = this.page.getByLabel('First Name');
        this.lastNameInput = this.page.getByLabel('Last Name');
        this.postalCodeInput = this.page.getByLabel('Zip/Postal Code');
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.products = this.page.getByTestId('inventory-item');
        this.totalAmount = this.page.getByTestId('total-label');
        this.finishButton = this.page.getByRole('button', { name: 'Finish' });
        this.successMessage = this.page.getByText('Thank you for your order');
    }

    async checkoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    productFilter(productName: string): Locator {
        return this.products.filter({ hasText: productName });
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }
}