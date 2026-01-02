import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/parabank.loginPage";
import { DashboardPage } from "../pages/parabank.dashboardPage";

export type TestFixture = {
    parabankloginPage: LoginPage;
    parabankdashboardPage: DashboardPage;

}


export const test = base.extend<TestFixture>({
  parabankloginPage: async ({ page }, use) => {
    const parabankloginPage = new LoginPage(page);
    await parabankloginPage.navigateToPortal();
    await use(parabankloginPage);
  },

  parabankdashboardPage: async ({ page }, use) => {
    const parabankdashboardPage = new DashboardPage(page);
    await use(parabankdashboardPage);
  },
});

export { expect } from "@playwright/test";