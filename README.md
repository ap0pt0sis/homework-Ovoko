# homework-Ovoko

## Installation

To install playwright click [here](https://playwright.dev/docs/intro).

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

After each test run, test report will be generated automatically. In case of the failure, screenshot will be provided in `/test-results` folder.

## CI/CD

Tests are runned in Guthub Actions on every push to main branch.

## Additional Info

Please copy file `.env.template` to `.env` and add URL there.