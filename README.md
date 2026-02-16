# Playwright UI Sauce Demo E2E Testing

End-to-end testing framework for Sauce Demo website using Playwright and TypeScript.

## Project Structure

```
playwright-e2e-swag-labs/
├── .github/
│   └── workflows/       # CI/CD pipeline configuration
├── .husky/              # Git hooks (pre-commit, post-commit)
├── configs/
│   └── .env            # Environment variables
├── resources/
│   ├── dataTest/       # Test input data (JSON)
│   └── expectedResults/ # Expected test results (JSON)
├── support/
│   ├── locators/       # Element locators
│   ├── pageObject/     # Page Object Model classes
│   └── utils/          # Utility functions
├── testCases/          # Test specifications
│   └── E2Eflow/        # E2E test flows
├── test-results/       # Test execution results
├── playwright-report/  # HTML test reports
├── globalVariables.ts  # Global configuration variables
├── playwright.config.ts
└── tsconfig.json
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests with UI mode
npx playwright test --ui

# Run specific test file
npx playwright test testCases/E2Eflow/E2E.spec.ts

# Run tests with specific tag
npx playwright test --grep @regression

# Format code
npm run format

# Check code formatting
npm run format:check
```

## Test Tags

- `@high` - High priority tests
- `@regression` - Regression test suite
- `@ui` - UI tests

## Features

- Page Object Model (POM) design pattern
- Data-driven testing with JSON files
- Custom step decorators for reporting
- Comprehensive assertions and validations
- Shopping cart and checkout flow testing
- Prettier code formatting
- Husky & lint-staged for pre-commit hooks
- GitHub Actions CI/CD pipeline
- Environment variable configuration with dotenv

## Test Coverage

- User authentication
- Product browsing and selection
- Shopping cart management
- Checkout process with form validation
- Order completion
- Price calculation verification (items + tax)

## Environment Variables

Configure in `configs/.env` or `globalVariables.ts`:
- `ENV_BASE_URL` - Base URL of the application
- `VALID_USERNAME` - Valid username for login
- `VALID_PASSWORD` - Valid password for login

## Reports

Test reports are generated in `playwright-report/` directory after test execution.

```bash
npx playwright show-report
```

## Code Quality

This project uses:
- **Prettier** - Code formatting
- **Husky** - Git hooks for automated checks
- **lint-staged** - Run linters on staged files

Code is automatically formatted on commit via pre-commit hooks.

## CI/CD

GitHub Actions workflow is configured in `.github/workflows/playwright.yml` for automated testing on push/pull requests.
