import * as fs from "fs";
import * as path from "path";

export class LocatorRegistry {
  private filePath = path.join(process.cwd(), "healed-locators.json");

  // Saves a new healed locator to the JSON file
  saveHealing(
    brokenSelector: string,
    healedSelector: string,
    pageName: string
  ) {
    const registry = this.getRegistry();

    registry[brokenSelector] = {
      healedTo: healedSelector,
      page: pageName,
      timestamp: new Date().toISOString(),
    };

    fs.writeFileSync(this.filePath, JSON.stringify(registry, null, 2));
  }

  // Gets all currently stored healings
  private getRegistry() {
    if (!fs.existsSync(this.filePath)) return {};
    return JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
  }
}
