# homework-Ovoko

## Setup

1. In the project’s root directory, run: `npm install`. This will install all required dependencies, including Playwright if it’s listed in your package.json.
2. Copy file `.env.template` to `.env` and add env variables there.

## Running Tests

- Running all tests:

``` 
npx playwright test
``` 

- Running a single test file:

``` 
npx playwright test file-name.test.ts
``` 

- Run the test with the title:

``` 
npx playwright test -g "test name"
``` 

## Reporting

After each test run, test report will be generated automatically. In case of the failure, screenshot and video recording will be provided in `/test-results` folder and in the test report.

## CI/CD

Tests are runned in Guthub Actions on every push to main branch (for demonstration purposes, only one test is running).

## Additional Info

By default, E2E tests are run on two browsers: Chrome and MS Edge.