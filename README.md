# Playwright API Automation Framework

This repository contains a lightweight, maintainable API test framework for the JSONPlaceholder public API using **Playwright** and **Axios**.

---

## Setup

1. **Install dependencies**

```bash
npm install
```

2. **Install Playwright browsers**

```bash
npx playwright install
```

---

## Running Tests

* **Run all tests:**

```bash
npx playwright test
```

* **Run a single test file:**

```bash
npx playwright test tests/posts.spec.ts
```

* **Generate HTML report:**

```bash
npx playwright test --reporter=html
```

## Project Structure

```
PW-API-Tests/
├── package.json
├── package-lock.json
├── playwright.config.ts
├── README.md
├── test-data/
│   └── posts.json
├── docs/
│   └── test-cases.md
├── tests/
│   ├── dataDriven.spec.ts
│   ├── errorHandling.spec.ts
│   └── posts.spec.ts
└── utils/
│   ├── apiClient.ts
│   ├── errorValidator.ts
│   ├── headerValidator.ts
│   └── schemaValidator.ts
└── playwright-report/       (generated after running tests)

```

---

## Test Data Structure

* Test data is stored in `/test-data/posts.json`
* Used for **data-driven POST tests**
* Each entry contains:

  * `title` (string)
  * `body` (string)
  * `userId` (number)

Example:

```json
[
  { "title": "Post A", "body": "Content A", "userId": 1 },
  { "title": "Post B", "body": "Content B", "userId": 2 }
]
```

---

## Schema Validation

* `/utils/schemaValidator.ts` contains `expectPostSchema(post)`
* Validates the following fields:

| Field  | Type   |
| ------ | ------ |
| userId | number |
| id     | number |
| title  | string |
| body   | string |

* Extra fields are handled separately in tests

---

## Headers Validation

* Response headers are validated in main tests using a reusable helper `expectHeaders`.
* Common headers checked:

  * `Content-Type` (should contain `application/json`)
  * `Cache-Control`
  * `Server`
* The helper logs a warning if a header is missing.
* For corner-case tests (e.g., DELETE, malformed JSON), header mismatches are logged but do not fail the test.

Example usage:

```ts
expectHeaders(response, {
  'content-type': /application\/json/,
  'cache-control': /max-age/,
  'server': /cloudflare|nginx/i
})
```

---

## Error Handling

* `/utils/errorValidator.ts` contains `expectErrorResponse(response, expectedStatus)`

* Used in tests for:

  * Invalid post IDs (`GET /posts/9999`)
  * Malformed JSON payloads
  * Unsupported endpoints or methods
  * Returns correct HTTP response codes (400, 404, 500) or array of expected codes

* Example:

```ts
expectErrorResponse(response, 404)
expectErrorResponse(response, [200, 404])
```

* **Note:** JSONPlaceholder may not enforce payload validation; tests reflect that behavior.

---

## Data-Driven Testing

* Uses `/test-data/posts.json`
* Each entry creates a separate POST request
* Schema and headers are validated for each generated test

---

## Known Issues

* DELETE: JSONPlaceholder returns different cache-control ("no cache") than expected (max-age)
* POST: Molformed request, returns "text/html; charset=utf-8" content-type

---

## Limitations

* Invalid payloads are **not rejected** (always returns 201) in JSONPlaceholder.
* DELETE operations are simulated; resources are not actually removed.
* Malformed JSON may be accepted and content-type may be HTML instead of JSON.
* Some headers may not exist; tests log a warning but do not fail for missing headers.
* Tests account for these quirks using flexible assertions and console logs.


---

## Assumptions / Notes

* JSONPlaceholder is a fake API; it simulates responses and does not enforce payload validation.
* Tests are split into two categories:

  * **Main CRUD tests**: Located in `posts.spec.ts` for positive scenarios.
  * **Error handling / corner cases**: Located in `errorHandling.spec.ts` for invalid IDs, malformed JSON, unsupported methods, and invalid endpoints.
* Malformed JSON, unsupported methods, and non-existent endpoints are handled safely.
* Some tests skip content-type or schema checks when the API returns HTML instead of JSON.
* Console logs document JSONPlaceholder quirks.
