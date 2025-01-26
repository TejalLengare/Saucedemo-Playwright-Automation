Name: saucedemo-playwright-ts

# Sauce Demo E2E Tests

Automated end-to-end tests for [Sauce Demo](https://www.saucedemo.com/) using Playwright with TypeScript.

## Features

- Page Object Model design pattern
- TypeScript for better type safety and IDE support
- Automated login, inventory, and cart tests
- GitHub Actions ready
- HTML test reports

## Test Scenarios

- Login functionality (valid and invalid credentials)
- Product sorting and filtering
- Shopping cart operations
- Checkout process
- User logout

## Setup

1. Clone the repository:
2. Install dependencies:

3. Run tests:
## Project Structure

├── tests/
│ ├── pageObjects/ # Page Object Models
│ └── e2e/ # Test Specifications
├── playwright.config.ts # Playwright Configuration
└── package.json # Project Dependencies