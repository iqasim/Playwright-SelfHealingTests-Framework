import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basepage";


export class DashboardPage extends BasePage{

    readonly headingAccountServices: string;

    constructor(page: Page) {
        super(page)
        this.headingAccountServices =
          "//h2[contains(text(), 'Account Services')]";
    }

    async isHomePageDisplays() {
        //await expect(this.page.locator(this.headingAccountServices)).toBeVisible();
        await expect(this.page.locator(this.headingAccountServices)).toBeVisible();
    }



}