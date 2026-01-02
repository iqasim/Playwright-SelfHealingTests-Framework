import playwright from "eslint-plugin-playwright";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["src/**/*.ts"],

  // We use the base recommended rules but exclude the ultra-strict TypeChecked ones
  extends: [
    ...tseslint.configs.recommended,
    playwright.configs["flat/recommended"],
  ],

  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },

  rules: {
    /* --- THE CORE ASYNC/AWAIT RULES --- */

    // 1. Catches the missing await in your testFixture.ts
    "@typescript-eslint/no-floating-promises": "error",

    // 2. Prevents awaiting things that are NOT promises (cleanup)
    "@typescript-eslint/await-thenable": "error",

    // 3. Ensures 'expect' calls are properly used with await/matchers
    "playwright/valid-expect": "error",

    /* --- DISABLE ALL OTHER NOISE --- */
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "playwright/no-wait-for-selector": "off",
    "playwright/expect-expect": "off",
    "playwright/no-skipped-test": "off",
  },
});
