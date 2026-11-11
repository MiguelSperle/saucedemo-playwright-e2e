import { Page, Locator } from '@playwright/test';

export class CheckoutInformationPage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly error: Locator;

    constructor(readonly page: Page) {
        this.firstNameInput = this.page.getByLabel('First Name');
        this.lastNameInput = this.page.getByLabel('Last Name');
        this.postalCodeInput = this.page.getByLabel('Zip/Postal Code');
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.error = this.page.getByTestId('error');
    }

    async enterCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }
}