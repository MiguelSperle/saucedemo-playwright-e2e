import { Page } from "@playwright/test";
import { AuthenticationPage } from '../authentication-page';
import { InventoryPage } from '../inventory-page';
import { ProductDetailsPage } from '../product-details-page';
import { ShoppingCartPage } from '../shopping-cart-page';
import { CheckoutInformationPage } from '../checkout-information-page';
import { CheckoutOverviewPage } from '../checkout-overview-page';
import { CheckoutCompletePage } from '../checkout-complete-page';

export class PageManager {
    private readonly authenticationPage: AuthenticationPage;
    private readonly inventoryPage: InventoryPage;
    private readonly productDetailsPage: ProductDetailsPage;
    private readonly shoppingCartPage: ShoppingCartPage;
    private readonly checkoutInformationPage: CheckoutInformationPage;
    private readonly checkoutOverviewPage: CheckoutOverviewPage;
    private readonly checkoutCompletePage: CheckoutCompletePage;

    constructor(private readonly page: Page) {
        this.authenticationPage = new AuthenticationPage(this.page);
        this.inventoryPage = new InventoryPage(this.page);
        this.productDetailsPage = new ProductDetailsPage(this.page);
        this.shoppingCartPage = new ShoppingCartPage(this.page);
        this.checkoutInformationPage = new CheckoutInformationPage(this.page);
        this.checkoutOverviewPage = new CheckoutOverviewPage(this.page);
        this.checkoutCompletePage = new CheckoutCompletePage(this.page);
    }

    onAuthenticationPage(): AuthenticationPage {
        return this.authenticationPage;
    }

    onInventoryPage(): InventoryPage {
        return this.inventoryPage;
    }

    onProductDetailsPage(): ProductDetailsPage {
        return this.productDetailsPage;
    }

    onShoppingCartPage(): ShoppingCartPage {
        return this.shoppingCartPage;
    }

    onCheckoutInformationPage(): CheckoutInformationPage {
        return this.checkoutInformationPage;
    }

    onCheckoutOverviewPage(): CheckoutOverviewPage {
        return this.checkoutOverviewPage;
    }

    onCheckoutCompletePage(): CheckoutCompletePage {
        return this.checkoutCompletePage;
    }
}