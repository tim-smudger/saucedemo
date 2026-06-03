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

    async pageOpened()
    {
        await this.page.waitForURL('/inventory.html');
        await this.inventoryList.waitFor();
    }
}