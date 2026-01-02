import { test } from "../fixtures/testFixture";
import { LoginPage } from "../pages/parabank.loginPage";
import { config } from "../config/baseConfig";

test.describe("Test Login Functionality with AI self healing", () => {

    test(
      "TC01 This test is designed to test successful AI self healing",
      { tag: ["@AISelfHealing"] },
      async ({ parabankloginPage }) => {
        await test.step("Naviage to the portal", async () => {
              await parabankloginPage.navigateToPortal();
          }); 
        await test.step("Validate login page successfully displays", async () => {
              await parabankloginPage.isLoginPageDisplay();
          })
        await test.step("Enter username", async () => {
              await parabankloginPage.enterUsername();
          });
        await test.step("Enter password", async () => {
              await parabankloginPage.enterPassword();
          });
        await test.step("Click on Login Button", async () => {
            await parabankloginPage.clickLoginButton();
          });
      }
    );

    test(
      "TC02 This test is designed to test failed login",
      { tag: ["@AISelfHealing"] },
      async ({ parabankloginPage }) => {
        await test.step("Naviage to the portal", async () => {
          await parabankloginPage.navigateToPortal();
        });
        await test.step("Validate login page successfully displays", async () => {
          await parabankloginPage.isLoginPageDisplay();
        });
        await test.step("Enter username", async () => {
          await parabankloginPage.enterInvalidUsername();
        });
        await test.step("Click on Login Button", async () => {
          await parabankloginPage.clickLoginButton();
        });
        await test.step("Is Error Displays", async () => {
          await parabankloginPage.isErrorDisplays();
        });
      }
    );
    
})

