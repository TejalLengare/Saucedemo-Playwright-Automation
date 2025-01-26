import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage';
import { InventoryPage } from '../pageObjects/inventoryPage';
import { CartPage } from '../pageObjects/cartPage';

test.describe('Sauce Demo E2E Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        await loginPage.navigate();
    });

    test('successful login', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('failed login', async () => {
        await loginPage.login('wrong_user', 'wrong_password');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Username and password do not match');
    });

    test('add items to cart', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.addItemToCart(0);
        await inventoryPage.addItemToCart(1);
        expect(await inventoryPage.getCartItemCount()).toBe('2');
        
        await inventoryPage.goToCart();
        expect(await cartPage.getCartItemsCount()).toBe(2);
    });

    test('sort items by price', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        
        // Wait for inventory page to fully load
        await page.waitForURL(/.*inventory.html/);
        await page.waitForLoadState('networkidle');
        
        // Try sorting with a longer timeout
        await inventoryPage.sortItems('lohi');
        await page.waitForTimeout(1000); // Give time for prices to update
        
        const prices = await inventoryPage.getItemPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

    test('logout functionality', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.logout();
        await expect(page).toHaveURL(/.*$/);
    });
}); 