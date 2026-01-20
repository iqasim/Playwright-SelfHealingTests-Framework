import { test } from "../fixtures/testFixture";
import { LoginPage } from "../pages/parabank.loginPage";
import { DashboardPage } from "../pages/parabank.dashboardPage";

test.describe("Dashboard Page Test Cases", () => {
  test(
    "TC03 Test that dashboard page should display successfully",
    { tag: ["@AISelfHealing", "@WIP", "@SmokeTest"] },
    async ({ parabankloginPage, parabankdashboardPage }) => {
      await test.step("Naviage to the portal", async () => {
        await parabankloginPage.navigateToPortal();
      });
      await test.step("Validate login page successfully displays", async () => {
        await parabankloginPage.isLoginPageDisplay();
      });
      await test.step("Enter username", async () => {
        await parabankloginPage.enterUsername();
        console.log("Username entered Successfully");
      });
      await test.step("Enter password", async () => {
        await parabankloginPage.enterPassword();
        console.log("Password entered Successfully");
      });
      await test.step("Click on Login Button", async () => {
        await parabankloginPage.clickLoginButton();
        console.log("Login button clicked Successfully");
      });
      await test.step("Test Dashboard page displays successfully without any issue", async () => {
        await parabankdashboardPage.isHomePageDisplays();
        console.log("Dashboard page displays Successfully");
      });
    },
  );
});
