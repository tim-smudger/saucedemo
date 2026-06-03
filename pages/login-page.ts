import  {type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailfield : Locator;
    readonly passwordfield : Locator
    readonly loginbutton : Locator;
    readonly errorbutton : Locator;
    readonly errorText : Locator;

    constructor(page : Page)
    {
        this.page = page;
        this.emailfield = page.locator('[data-test="username"]');
        this.passwordfield = page.locator('[data-test="password"]');
        this.loginbutton = page.locator('[data-test="login-button"]');
        this.errorText = page.locator('[data-test="error"]');
        this.errorbutton = page.locator('button[data-test="error-button"]');
    }

    async open()
    {
        await this.page.goto('/');
        await this.page.waitForURL('/');
        await this.emailfield.waitFor();
    }

    async login(username : string, password : string)
    {
        await this.emailfield.click();
        await this.emailfield.fill(username);
        await this.emailfield.press('Tab');
        await this.passwordfield.fill(password);
        await this.loginbutton.click();
    }


    async getErrorMessage() : Promise<string> 
    {
        console.log(this.errorbutton.isVisible);
        return await this.errorText.innerText();
    }

    async errorMessage() : Promise<string> 
    {
        return await this.errorbutton.innerText();
    }
}