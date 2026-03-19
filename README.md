# Factorial App Automation Testing

Automated end-to-end tests for the Factorial Calculator web application (http://qainterview.pythonanywhere.com) using Playwright.

## Prerequisites

- Node.js (v18 or higher)
- npm

## Setup

```bash
npm install
npx playwright install chromium
```

## Running Tests

```bash
# run all tests
npm test

# run with browser visible
npm run test:headed

# run and show list output
npx playwright test --reporter=list

# open html report after a run
npm run test:report
```

## Test Coverage

### Main Test Suite (`tests/factorial-calculator.spec.js`)

| Category | Tests |
|----------|-------|
| Valid calculations | Factorial of 0, 1, 5, 10 |
| Invalid inputs | Negative number, decimal, letters, special chars, empty |
| UI elements | Page title, heading, input field, button, copyright |
| Link navigation | About, Terms and Conditions, Privacy |
| Edge cases | Large number, leading zeros, whitespace, Enter key |
| Usability | Consecutive calculations, double-click, back navigation |

### Additional Tests (`tests/additional-tests.spec.js`)

| Test | Description |
|------|-------------|
| Form validation styling | Verifies red border on invalid input and reset on valid |
| Factorial of 12 | Checks correct result (479001600) |
| API call verification | Intercepts POST to `/factorial`, validates method, headers, and parameters |

## Project Structure

```
factorial-testing/
  tests/
    factorial-calculator.spec.js   # main test suite (24 tests)
    additional-tests.spec.js       # additional tests (3 tests)
  playwright.config.js             # playwright configuration
  package.json
```
