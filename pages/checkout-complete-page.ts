import { Page, Locator } from '@playwright/test';
import { HeaderComponent } from '../components/header-component';

export class CheckoutCompletePage {
    readonly headerComponent: HeaderComponent;
    readonly successMessage: Locator;

    constructor(readonly page: Page) {
        this.headerComponent = new HeaderComponent(this.page);
        this.successMessage = this.page.getByText('Thank you for your order');
    }
}