import { Page, expect, Locator } from "@playwright/test";
import { AISelfHealer } from "../utils/AISelfHealer";
import { LocatorRegistry } from "../utils/LocatorRegistry";


export class BasePage {
  private healer = new AISelfHealer();
  private registry = new LocatorRegistry();

  constructor(protected page: Page) {}
 async smartLocator(selector: string): Promise<Locator> {
    const originalLocator = this.page.locator(selector);

    try {
      // Check if element is attached to DOM within a short grace period
      await originalLocator.waitFor({ state: "attached", timeout: 5000 });
      return originalLocator;
    } catch (error) {
      console.warn(`Locator failed: ${selector}. Initiating AI Healing...`);

      // Get DOM context
      const dom = await this.page.evaluate(() => document.body.innerText);

      // Get Healed selector string from Gemini
      const healedSelector = await this.healer.getHealedSelector(selector, dom);

      if (healedSelector && healedSelector !== "NULL") {
        console.log(`AI Healed [${selector}] -> [${healedSelector}]`);

        // Save to registry
        this.registry.saveHealing(
          selector,
          healedSelector,
          this.constructor.name
        );

        // Return the new locator
        return this.page.locator(healedSelector);
      }

      // If AI fails, return the original so the test fails with the standard error
      return originalLocator;
    }
  }
}