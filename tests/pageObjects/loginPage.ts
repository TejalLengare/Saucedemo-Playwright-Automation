import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private usernameInput = 'input[data-test="username"]';
    private passwordInput = 'input[data-test="password"]';
    private loginButton = 'input[data-test="login-button"]';
    private errorMessage = '[data-test="error"]';

    // Actions
    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async getErrorMessage() {
        return await this.page.textContent(this.errorMessage);
    }
} 