# Playwright Self-Healing Locator

A powerful Playwright extension that uses AI to automatically heal broken locators in your test automation suite. When a locator fails during test execution, the system leverages Google's Gemini AI to generate corrected selectors based on the current page DOM, ensuring your tests remain resilient to UI changes.

## Features

- **AI-Powered Healing**: Uses Google's Gemini 2.5 Flash model to intelligently repair broken CSS/XPath selectors
- **Automatic Retry**: Seamlessly retries failed actions with healed locators
- **Healing Registry**: Maintains a JSON-based registry of all healed locators for review and analysis
- **Non-Intrusive**: Extends Playwright without modifying existing test code
- **Page Object Model Support**: Integrates cleanly with existing Page Object Model patterns
- **Smart Locator Method**: Core healing functionality through the `smartLocator` method

## How It Works

1. **Normal Execution**: Tests run normally using original locators
2. **Failure Detection**: When a locator fails (timeout), the healing process begins
3. **DOM Analysis**: Captures the current page content
4. **AI Healing**: Sends the broken selector and DOM to Gemini AI for analysis
5. **Selector Generation**: AI generates a corrected CSS or XPath selector
6. **Registry Storage**: Saves the healing for future reference
7. **Retry Execution**: Retries the action with the healed selector

## Prerequisites

- Node.js (v16 or higher)
- Google Gemini API key (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))
- Playwright installed

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd playwright-self-healing-locator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PARABANK_USERNAME=your_test_username
PARABANK_INVALIDUSERNAME=invalid_username_for_testing
PARABANK_PASSWORD=your_test_password
```

## Project Structure

```
src/
├── config/
│   └── baseConfig.ts          # Application configuration
├── fixtures/
│   └── testFixture.ts         # Playwright test fixtures
├── pages/
│   ├── basepage.ts            # Base page with self-healing smartLocator method
│   ├── parabank.loginPage.ts  # Login page object
│   └── parabank.dashboardPage.ts # Dashboard page object
├── tests/
│   ├── parabankLoginTest.spec.ts    # Login test cases
│   └── parabankDashboardTest.spec.ts # Dashboard test cases
└── utils/
    ├── AISelfHealer.ts        # AI healing logic
    └── LocatorRegistry.ts     # Healing storage and retrieval
```

## Usage

### Basic Setup

1. Extend your page objects from `BasePage`:
```typescript
import { BasePage } from './basepage';

export class MyPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async clickMyButton() {
    const locator = await this.smartLocator('#my-button');
    await locator.click();
  }
}
```

2. Use the `smartLocator` method instead of direct locators:
```typescript
// Instead of: await page.locator('#username').fill('user');
// Use:
const usernameLocator = await this.smartLocator('#username');
await usernameLocator.fill('user');

// Instead of: await page.locator('#login-btn').click();
// Use:
const loginBtnLocator = await this.smartLocator('#login-btn');
await loginBtnLocator.click();

// Instead of: await expect(page.locator('#heading')).toHaveText('Welcome');
// Use:
const headingLocator = await this.smartLocator('#heading');
await expect(headingLocator).toHaveText('Welcome');
```

### Available Method

- `smartLocator(selector: string): Promise<Locator>` - Returns a locator that automatically heals if the original selector fails

## Configuration

### Playwright Configuration

The project uses a standard Playwright configuration (`playwright.config.ts`) with:
- Test directory: `./src/tests`
- Parallel execution enabled
- Screenshots on failure
- HTML and JUnit reporting

### AI Configuration

The AI healer uses Gemini 2.5 Flash model. You can modify the model in `AISelfHealer.ts`:

```typescript
this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
```

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test
```bash
npx playwright test parabankLoginTest.spec.ts
```

### Run with UI Mode
```bash
npx playwright test --ui
```

### Run with Debug
```bash
npx playwright test --debug
```

### Generate Report
```bash
npx playwright show-report
```

## Viewing Healed Locators

All healed locators are stored in `healed-locators.json` in the root directory:

```json
{
  "//input[@type='Sub']": {
    "healedTo": "//input[@type='submit']",
    "page": "LoginPage",
    "timestamp": "2025-12-29T07:01:13.249Z"
  },
  "//input[@type='sub']": {
    "healedTo": "//input[@type='submit']",
    "page": "LoginPage",
    "timestamp": "2025-12-30T04:28:21.061Z"
  }
}
```

This registry helps you:
- Track which locators are frequently breaking
- Review AI-generated corrections
- Update your original selectors based on healed ones
- Analyze UI stability over time

## Example Test Output

When a locator breaks and gets healed:

```
Locator failed: //input[@type='Sub']. Initiating AI Healing...
AI Healed [//input[@type='Sub']] -> [//input[@type='submit']]
```

## Best Practices

1. **Start with Robust Selectors**: Use semantic selectors (data-testid, ARIA attributes) when possible
2. **Monitor Healing Registry**: Regularly review `healed-locators.json` to identify patterns
3. **Update Original Selectors**: Use healed selectors to improve your original locator strategy
4. **Test Healing Scenarios**: Intentionally break selectors in development to test healing
5. **API Key Security**: Never commit your `.env` file with real API keys

## Troubleshooting

### Common Issues

1. **API Key Not Found**
   - Ensure `GEMINI_API_KEY` is set in your `.env` file
   - Check that the `.env` file is in the root directory

2. **Healing Fails**
   - Verify the DOM snapshot is capturing the correct content
   - Check that the AI prompt is generating valid selectors
   - Ensure the target element exists on the page

3. **Tests Still Failing**
   - Review the healed locators in `healed-locators.json`
   - Manually verify the healed selectors work
   - Consider updating your original selectors

### Debug Mode

Enable verbose logging by modifying the AI prompt in `AISelfHealer.ts` to include more debugging information.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## Dependencies

- `@google/generative-ai`: Google Gemini AI integration
- `playwright`: Test automation framework
- `dotenv`: Environment variable management
- `@playwright/test`: Playwright test runner
- `@types/node`: TypeScript definitions
- `typescript`: TypeScript compiler
- `eslint`: Code linting
- `@typescript-eslint/eslint-plugin`: TypeScript ESLint rules
- `@typescript-eslint/parser`: TypeScript parser for ESLint
- `eslint-plugin-playwright`: Playwright-specific ESLint rules

