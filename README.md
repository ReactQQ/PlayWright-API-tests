# Playwright API Tests

This project contains API test automation for the [JSONPlaceholder](https://jsonplaceholder.typicode.com) fake REST API using **Playwright** and **Axios**.
It validates endpoints, headers, schemas, and error handling in a maintainable way.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ReactQQ/PlayWright-API-tests.git
cd PlayWright-API-Tests
```

2. Install dependencies:

```bash
npm install
```

---

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests with HTML report:

```bash
npx playwright test --reporter=html
```

Open last report:

```bash
npx playwright show-report
```

---

## Project Structure

```
.
├── tests/              # Test specifications
│   ├── posts.spec.ts
│   ├── comments.spec.ts
│   ├── profile.spec.ts
│   ├── db.spec.ts
│   └── errorHandling.spec.ts
├── utils/              # Shared utilities (validators, clients, helpers)
│   ├── apiClient.ts
│   ├── schemaValidator.ts
│   ├── errorValidator.ts
│   └── headerValidator.ts
├── docs/
│   └── test-cases.md   # Full list of test cases
├── package.json
└── README.md
```

---

## Test Case Documentation

All detailed test scenarios (positive, negative, and edge cases) are documented here:
📄 [docs/test-cases.md](./docs/test-cases.md)

---

## Assumptions & Notes

* The API is **fake / mock**, so behavior may differ from real-world APIs.
* Schema validation is simplified for readability.
* Error handling tests are resilient to quirks (e.g., JSONPlaceholder returning HTML on error).
* Headers may differ across environments (`cache-control`, `server`).

---

## Limitations

* No write operations are persisted (`POST`, `PUT`, `DELETE` are mocked by the API).
* Limited control over server response codes (some tests accept multiple possible status codes).
* Invalid payloads are **not rejected** (always returns 201) in JSONPlaceholder.
* Some headers may not exist; tests log a warning but do not fail for missing headers.

---

## Known Issues

* DELETE: JSONPlaceholder returns different cache-control ("no cache") than expected (max-age)
* POST: Molformed request, returns "text/html; charset=utf-8" content-type
* GET: 404 on /profile endpoint

---

## Continuous Integration (CI)

This project includes automated testing with **GitHub Actions**. Every push or pull request to the `main` branch triggers the workflow, running all API tests and generating an HTML report.

### GitHub Actions Workflow

* File: `.github/workflows/playwright.yml`
* Triggers: `push` and `pull_request` on `main`
* Steps:

  1. Checkout repository
  2. Setup Node.js environment
  3. Install dependencies (`npm ci`)
  4. Install Playwright browsers (`npx playwright install --with-deps`)
  5. Run tests (`npx playwright test --reporter=html`)
  6. Upload HTML report as an artifact

### Viewing the Report

1. Navigate to the **Actions** tab in your GitHub repository.
2. Click the latest workflow run.
3. Scroll down to **Artifacts** and download `playwright-report.zip`.
4. Extract and open `index.html` to view the HTML report.

### Bitbucket Pipelines (Optional)

If you also use Bitbucket Pipelines:

* File: `bitbucket-pipelines.yml`
* Steps mirror the GitHub Actions workflow:

  1. Install Node.js and dependencies
  2. Install Playwright browsers
  3. Run tests
  4. Generate and upload HTML report
