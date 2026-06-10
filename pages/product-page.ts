import {type Page, type Locator} from '@playwright/test';

export class ProductPage
    {
    readonly page: Page;
    readonly inventoryList : Locator;

    constructor(page : Page)
    {
        this.page = page;
        this.inventoryList = page.locator('[data-test="inventory-container"]');
    }

    async waitUntilLoaded() 
    {
        await this.page.waitForURL('/inventory.html');
    }
}