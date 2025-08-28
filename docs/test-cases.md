# API Test Cases

This document describes the planned test coverage for the JSONPlaceholder API in this repository.

---

## Coverage Summary

| Endpoint         | Positive Tests ✅                 | Negative Tests ❌        | Edge / Error Handling ⚠️                  |
| ---------------- | -------------------------------- | ----------------------- | ----------------------------------------- |
| **/posts**       | GET all, GET by ID, POST, DELETE | GET invalid ID          | Malformed JSON (POST), DELETE unsupported |
| **/comments**    | GET all, GET by ID, POST, DELETE | GET invalid ID          | —                                         |
| **/profile**     | GET profile, POST, DELETE        | —                       | —                                         |
| **/db**          | GET DB, DELETE                   | —                       | —                                         |
| **Invalid path** | —                                | 404 on invalid endpoint | —                                         |

---

## 1. Posts API (`/posts`)

### 1.1 GET /posts

**Description:** Verify that retrieving all posts returns a list with valid schema and JSON content-type.
**Precondition:** API is accessible
**Steps:**

1. Send GET request to `/posts`
2. Capture response
3. Validate status code, headers, and schema for each post
   **Expected result:** Status 200, headers contain `application/json`, response matches post schema for all items

### 1.2 GET /posts/1

**Description:** Verify that retrieving a single post by ID returns correct data.
**Precondition:** Post with ID 1 exists
**Steps:**

1. Send GET request to `/posts/1`
2. Capture response
3. Validate status code, headers, and schema
   **Expected result:** Status 200, headers contain `application/json`, response matches post schema

### 1.3 POST /posts

**Description:** Verify that sending a valid post payload creates a new post.
**Precondition:** API is accessible
**Steps:**

1. Send POST request to `/posts` with valid payload
2. Capture response
   **Expected result:** Status 201, response body matches the payload

### 1.4 DELETE /posts/1

**Description:** Verify that deleting a post returns appropriate status code.
**Precondition:** Post with ID 1 exists
**Steps:**

1. Send DELETE request to `/posts/1`
2. Capture response
   **Expected result:** Status 200

### 1.5 GET /posts/9999

**Description:** Verify that requesting a non-existing post returns 404.
**Precondition:** Post with ID 9999 does not exist
**Steps:**

1. Send GET request to `/posts/9999`
2. Capture response
   **Expected result:** Status 404

### 1.6 POST /posts with malformed JSON

**Description:** Verify that sending malformed JSON does not crash API.
**Precondition:** API is accessible
**Steps:**

1. Send POST request to `/posts` with malformed JSON
2. Capture response
   **Expected result:** Status code 201, 400, or 500 depending on API behavior

---

## 2. Comments API (`/comments`)

### 2.1 GET /comments

**Description:** Verify that retrieving all comments returns a list with valid schema and JSON content-type.
**Precondition:** API is accessible
**Steps:**

1. Send GET request to `/comments`
2. Capture response
3. Validate status code, headers, and schema for each comment
   **Expected result:** Status 200, headers contain `application/json`, response matches comment schema

### 2.2 GET /comments/1

**Description:** Verify that retrieving a single comment by ID returns correct data.
**Precondition:** Comment with ID 1 exists
**Steps:**

1. Send GET request to `/comments/1`
2. Capture response
3. Validate status code, headers, and schema
   **Expected result:** Status 200, headers contain `application/json`, response matches comment schema

### 2.3 POST /comments

**Description:** Verify that sending a valid comment payload creates a new comment.
**Precondition:** API is accessible
**Steps:**

1. Send POST request to `/comments` with valid payload
2. Capture response
   **Expected result:** Status 201, response body matches the payload

### 2.4 DELETE /comments/1

**Description:** Verify that deleting a comment returns appropriate status code.
**Precondition:** Comment with ID 1 exists
**Steps:**

1. Send DELETE request to `/comments/1`
2. Capture response
   **Expected result:** Status 200

### 2.5 GET /comments/9999

**Description:** Verify that requesting a non-existing comment returns 404.
**Precondition:** Comment with ID 9999 does not exist
**Steps:**

1. Send GET request to `/comments/9999`
2. Capture response
   **Expected result:** Status 404

---

## 3. Profile API (`/profile`)

### 3.1 GET /profile

**Description:** Verify that retrieving the profile returns a valid schema and JSON content-type.
**Precondition:** API is accessible
**Steps:**

1. Send GET request to `/profile`
2. Capture response
3. Validate status code, headers, and schema
   **Expected result:** Status 200, headers contain `application/json`, response matches profile schema

### 3.2 POST /profile

**Description:** Verify that sending a valid profile payload updates the profile.
**Precondition:** API is accessible
**Steps:**

1. Send POST request to `/profile` with valid payload
2. Capture response
   **Expected result:** Status 201, response body matches the payload

### 3.3 DELETE /profile

**Description:** Verify that deleting profile data returns appropriate status code.
**Precondition:** Profile exists
**Steps:**

1. Send DELETE request to `/profile`
2. Capture response
   **Expected result:** Status 200

---

## 4. DB API (`/db`)

### 4.1 GET /db

**Description:** Verify that retrieving the database returns the full DB object with valid schema and JSON content-type.
**Precondition:** API is accessible
**Steps:**

1. Send GET request to `/db`
2. Capture response
3. Validate status code, headers, and schema
   **Expected result:** Status 200, headers contain `application/json`, response matches DB schema

### 4.2 DELETE /db

**Description:** Verify that deleting database content returns appropriate status code.
**Precondition:** DB is accessible
**Steps:**

1. Send DELETE request to `/db`
2. Capture response
   **Expected result:** Status 200

---

## 5. Generic Error Handling

### 5.1 GET /invalid-endpoint

**Description:** Verify that requesting an invalid endpoint returns 404.
**Precondition:** API is accessible
**Steps:**

1. Send GET request to `/invalid-endpoint`
2. Capture response
   **Expected result:** Status 404
