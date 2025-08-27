# Test Cases for JSONPlaceholder API

All test cases are automated using Playwright + Axios. Each test validates response status, schema, and headers where applicable.

## 1. GET /posts returns list of posts

**Description:** Verify that retrieving all posts returns a list with valid schema and JSON content-type.

**Precondition:** API is accessible

**Steps:**

1. Send GET request to `/posts`
2. Capture response
3. Validate status code, headers, and schema for each post

**Expected result:**

* Status code 200
* Content-Type contains `application/json`
* Response is an array of posts with valid schema (`userId`, `id`, `title`, `body`)

---

## 2. GET /posts/1 returns single post

**Description:** Verify retrieving a single post by ID returns valid schema and JSON content-type.

**Precondition:** Post with ID 1 exists

**Steps:**

1. Send GET request to `/posts/1`
2. Capture response
3. Validate status code, headers, and schema

**Expected result:**

* Status code 200
* Content-Type contains `application/json`
* Response matches post schema

---

## 3. GET /posts/9999 returns 404

**Description:** Verify requesting a non-existing post ID returns 404.

**Precondition:** Post with ID 9999 does not exist

**Steps:**

1. Send GET request to `/posts/9999`
2. Capture response
3. Validate status code and headers

**Expected result:**

* Status code 404
* Content-Type contains `application/json`

---

## 4. POST /posts with valid payload creates new post

**Description:** Verify creating a new post with a valid payload returns 201 and response matches schema.

**Precondition:** API is accessible

**Steps:**

1. Send POST request to `/posts` with valid JSON payload `{ title, body, userId }`
2. Capture response
3. Validate status code, headers, and schema

**Expected result:**

* Status code 201
* Content-Type contains `application/json`
* Response includes new post schema

---

## 5. POST /posts with invalid payload

**Description:** Verify creating a post with invalid payload is handled correctly. JSONPlaceholder does not reject, but extra fields are returned.

**Precondition:** API is accessible

**Steps:**

1. Send POST request to `/posts` with invalid JSON payload `{ wrong: 'field' }`
2. Capture response
3. Validate status code
4. Check response contains sent extra fields

**Expected result:**

* Status code 201
* Content-Type may not be JSON
* Response contains the extra field `wrong`

---

## 6. POST /posts with extra field

**Description:** Verify extra fields in the payload are echoed in the response.

**Precondition:** API is accessible

**Steps:**

1. Send POST request to `/posts` with payload including extra field `{ title, body, userId, extraField }`
2. Capture response
3. Validate status code, headers, schema, and extra field

**Expected result:**

* Status code 201
* Content-Type contains `application/json`
* Response matches post schema
* Response contains `extraField` with correct value

---

## 7. Error Handling - Invalid post ID

**Description:** Verify GET request to non-existing endpoint returns correct error code.

**Precondition:** Post with ID 9999 does not exist

**Steps:**

1. Send GET request to `/posts/9999`
2. Capture response
3. Validate status code and headers

**Expected result:**

* Status code 404
* Content-Type contains `application/json`

---

## 8. Error Handling - Malformed JSON

**Description:** Verify sending malformed JSON is handled (JSONPlaceholder always returns 201, note in console).

**Precondition:** API is accessible

**Steps:**

1. Send POST request with malformed JSON string
2. Capture response
3. Validate status code

**Expected result:**

* Status code 400 or 500 (depending on real server; JSONPlaceholder returns 201)
* Content-Type may not be JSON
* Console notes behavior

---

## 9. Error Handling - Unsupported method

**Description:** Verify sending unsupported HTTP methods is handled correctly.

**Precondition:** API is accessible

**Steps:**

1. Send DELETE request to `/posts/1` or invalid endpoint
2. Capture response
3. Validate status code and headers

**Expected result:**

* Status code 200, 404, or appropriate error
* Content-Type contains `application/json`

---

## 10. Error Handling - Invalid endpoint

**Description:** Verify GET request to an invalid endpoint returns 404.

**Precondition:** Endpoint `/invalid-endpoint` does not exist

**Steps:**

1. Send GET request to `/invalid-endpoint`
2. Capture response
3. Validate status code and headers

**Expected result:**

* Status code 404
* Content-Type contains `application/json`
