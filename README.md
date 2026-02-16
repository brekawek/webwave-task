# WebWave task

## Environment setup

### Prerequisites

- Node.js: version specified in [.nvmrc](.nvmrc)

### Installation

1. Install & use correct Node.js version:

   ```bash
   nvm install
   nvm use
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install browsers

```bash
npx playwright install
```

## Project folder structure

- [tests](tests) - UI tests
- [utils](utils) - Utility functions
- [page-object-models](page-object-models) - Page object models
- [fixtures](fixtures) - Playwright fixtures
- [test-data](test-data) - Test data

## Running tests

### Normal mode

```bash
npm run test
```

### Check flakiness

Change `10` to amount of tests that you want to run.

```bash
npx playwright test --repeat-each 10
```

## HTML report from tests

HTML report is automatically opened if any test fails, however you can also open it manually:

```bash
npx playwright show-report
```
