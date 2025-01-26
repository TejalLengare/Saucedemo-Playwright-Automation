import { Page } from '@playwright/test';

export class CartPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private cartItems = '.cart_item';
    private checkoutButton = '[data-test="checkout"]';

    // Actions
    async getCartItemsCount() {
        const items = await this.page.$$(this.cartItems);
        return items.length;
    }

    async proceedToCheckout() {
        await this.page.click(this.checkoutButton);
    }
} 