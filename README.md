# Playwright API Automation Framework

This repository contains a lightweight, maintainable API test framework for the JSONPlaceholder public API using **Playwright** and **Axios**.

---

## Features

* API requests via axios **central `apiClient`**
* **Schema validation** with reusable helpers
* **Response headers** validation
* **Data-driven tests** for POST requests
* **Error handling tests** (invalid IDs, malformed JSON, unsupported endpoints)
* Supports **extra fields** in payloads
* Ready for **CI integration** (e.g., Bitbucket Pipelines)

---

## Known Issues

* DELETE: JSONPlaceholder returns different cache-control ("no cache") than expected (max-age)
* POST: Molformed request, returns "text/html; charset=utf-8" content-type

---

## Limitations
* Invalid payloads are **not rejected** (always returns 201) in JSONPlaceholder.
* DELETE operations are simulated; resources are not actually removed.
* Tests account for these quirks using flexible status assertions and console logs.
* Header names are lowercase in Axios, even if the server sends them in uppercase.

---

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

---

## Test Data Structure

* Stored in `/test-data/posts.json`
* Used for **data-driven POST tests**
* Each entry contains:

  * `title` (string)
  * `body` (string)
  * `userId` (number)
* Example:

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

* Response headers are validated in all main tests using a reusable helper `expectHeaders`.
* Common headers checked:

  * `Content-Type` (should contain `application/json`)
  * `Cache-Control`
  * `Server`
* The helper logs a warning if a header is missing.

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

## Extra Fields Handling

* Tests can send additional fields beyond the schema
* Extra fields are checked separately using:

```ts
expect(response.data).toHaveProperty('extraField')
```

---

## Notes / Limitations

* JSONPlaceholder is a fake API:

  * Invalid payloads are **not rejected** (always returns 201)
  * DELETE operations are **simulated** and do not actually remove resources
  * Malformed JSON may be accepted for demonstration purposes

* These behaviors are documented in the tests using console logs

