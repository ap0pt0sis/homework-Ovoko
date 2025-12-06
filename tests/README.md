# Playwright Test Structure

This directory contains the test structure for Playwright tests, organized into GUI and API tests with supporting folders.

## Directory Structure

```
tests/
├── API/                    # API test files
│   └── example-api.spec.ts
├── GUI/                    # GUI/E2E test files
│   ├── example.spec.ts
│   └── login.spec.ts
├── pages/                  # Page Object Model (POM) classes
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   └── DashboardPage.ts
├── fixtures/               # Custom Playwright fixtures
│   ├── custom-fixtures.ts
│   └── example-with-fixtures.spec.ts
├── utils/                  # Utility functions and helpers
│   ├── api-client.ts
│   └── helpers.ts
└── testData/              # Test data files
    └── test-data.ts
```

## Folder Descriptions

### `/API`
Contains API test specifications. These tests verify backend endpoints, request/response handling, and API contracts.

**Example usage:**
- Testing REST API endpoints
- Validating response status codes and data
- Testing authentication and authorization
- API contract testing

### `/GUI`
Contains end-to-end GUI test specifications. These tests simulate user interactions with the web application.

**Example usage:**
- User login/logout flows
- Form submissions
- Navigation tests
- UI component interactions

### `/pages`
Contains Page Object Model (POM) classes. Each page class represents a page or component of the application, encapsulating its elements and actions.

**Benefits:**
- Reusability: Write page logic once, use in multiple tests
- Maintainability: Update selectors in one place
- Readability: Tests read like user stories

**Structure:**
- `BasePage.ts`: Common functionality shared across all pages
- Individual page classes extend `BasePage`

### `/fixtures`
Contains custom Playwright fixtures that extend the base test functionality.

**Use cases:**
- Pre-authenticated page fixtures
- Custom API client setup
- Shared test context
- Reusable test setup/teardown

### `/utils`
Contains utility functions and helper classes used across tests.

**Includes:**
- `api-client.ts`: Wrapper for API requests
- `helpers.ts`: Common utility functions (random data generation, date formatting, etc.)

### `/testData`
Contains test data files that store static or dynamic test data.

**Use cases:**
- User credentials
- Test product data
- API endpoint URLs
- Configuration values

## Best Practices

1. **Use Page Object Model**: Keep selectors and page logic in page classes
2. **Reuse fixtures**: Create custom fixtures for common setup scenarios
3. **Organize by feature**: Group related tests in the same file or folder
4. **Keep tests independent**: Each test should be able to run independently
5. **Use descriptive names**: Test names should clearly describe what they test
6. **Store test data separately**: Keep test data in dedicated files for easy maintenance

## Running Tests

```bash
# Run all tests
npx playwright test

# Run GUI tests only
npx playwright test tests/GUI

# Run API tests only
npx playwright test tests/API

# Run specific test file
npx playwright test tests/GUI/login.spec.ts

# Run in headed mode
npx playwright test --headed

# Run with UI mode
npx playwright test --ui
```


