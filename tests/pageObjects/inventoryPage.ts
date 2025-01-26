import { Page } from '@playwright/test';

export class InventoryPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private sortDropdown = 'select.product_sort_container';
    private inventoryItems = '.inventory_item';
    private itemPrices = '.inventory_item_price';
    private addToCartButtons = '[data-test^="add-to-cart"]';
    private cartBadge = '.shopping_cart_badge';
    private cartLink = '.shopping_cart_link';
    private burgerMenu = '#react-burger-menu-btn';
    private logoutLink = '#logout_sidebar_link';

    // Actions
    async sortItems(option: string) {
        // Wait for page load and dropdown
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        
        // Wait and verify dropdown exists
        const dropdown = await this.page.waitForSelector(this.sortDropdown, {
            state: 'visible',
            timeout: 10000
        });
        
        // Perform sort
        await dropdown.selectOption(option);
        await this.page.waitForLoadState('networkidle');
    }

    async addItemToCart(itemIndex: number) {
        // Wait for items to be visible
        await this.page.waitForSelector(this.addToCartButtons);
        const buttons = await this.page.locator(this.addToCartButtons).all();
        if (buttons[itemIndex]) {
            await buttons[itemIndex].click();
            // Wait for cart to update
            await this.page.waitForTimeout(500);
        }
    }

    async getCartItemCount() {
        const badge = await this.page.$(this.cartBadge);
        return badge ? await badge.textContent() : '0';
    }

    async goToCart() {
        await this.page.click(this.cartLink);
    }

    async logout() {
        await this.page.click(this.burgerMenu);
        await this.page.waitForTimeout(500); // Wait for menu animation
        await this.page.click(this.logoutLink);
    }

    async getItemPrices(): Promise<number[]> {
        // 1. Wait for price elements
        await this.page.waitForSelector(this.itemPrices, { 
            state: 'visible', 
            timeout: 5000 
        });
        
        // 2. Get all price texts
        const priceElements = await this.page.locator(this.itemPrices).allTextContents();
        
        // 3. Convert price strings to numbers
        return priceElements.map(price => parseFloat(price.replace('$', '')));
    }
} 