import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "./basepage";
import {config} from "../config/baseConfig"


export class LoginPage extends BasePage {
  readonly usernameTextfield: string;
  readonly passwordTextfield: string;
  readonly buttonLogin: string;
  readonly loginPageHeading: string;
  readonly errorHeading: string;
  readonly expectedLoginPageHeading: string;

  constructor(page: Page) {
    super(page);
    this.usernameTextfield = "//input[@name='user']";
    this.passwordTextfield = "//input[@name='password']";
    this.buttonLogin = "//input[@type='submit']";
    this.loginPageHeading = "//h2[contains(text(),'Customer Login')]";
    this.errorHeading = "//h1[contains(text(),'Error!')]";
    this.expectedLoginPageHeading = "Customer Login";
  }

  async navigateToPortal() {
    await this.page.goto(config.parabank_url!, { waitUntil: 'domcontentloaded' });
  }

  async enterUsername() {
    //await this.fillSafe(this.usernameTextfield, process.env.PARABANK_USERNAME!);
    await (await this.smartLocator(this.usernameTextfield)).fill(process.env.PARABANK_USERNAME!);
  }


  async enterInvalidUsername() {
    //await this.fillSafe(this.usernameTextfield, process.env.PARABANK_INVALIDUSERNAME!);
    await(await this.smartLocator(this.usernameTextfield)).fill(process.env.PARABANK_INVALIDUSERNAME!);
  }

  async enterPassword() {
    //await this.fillSafe(this.passwordTextfield, process.env.PARABANK_PASSWORD!);
    await (await this.smartLocator(this.passwordTextfield)).fill(process.env.PARABANK_PASSWORD!);
  }

  async clickLoginButton() {
    //await this.clickSafe(this.buttonLogin);
    await (await this.smartLocator(this.buttonLogin)).click();
  }

  async isLoginPageDisplay() {
    //await this.expectTextSafe(this.loginPageHeading, this.expectedLoginPageHeading);
    //await expect(this.page.locator(this.loginPageHeading)).toBeVisible();
    await this.page.waitForSelector(this.loginPageHeading);
    await expect(this.page.locator(this.loginPageHeading)).toBeVisible();
  }

  async isErrorDisplays() {
    //await expect(this.page.locator(this.errorHeading)).toBeVisible();
    await expect(this.page.locator(this.errorHeading)).toBeVisible();
  }


}