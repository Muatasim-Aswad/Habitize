# Habitize API Documentation

## Overview

This is a private API built using Node.js and Express.js. It uses MongoDB as its database through `mongoose`.

## Table of Contents

- [API Endpoints](#api-endpoints)
- [Request and Response Format](#request-and-response-format)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Models](#models)
- [Utilities](#utilities)

## API Endpoints

Base URL: `/api`

| **HTTP Method** | **Path**                                             | **Description**                                     | **Request Body** | **Protected** |
| --------------- | ---------------------------------------------------- | --------------------------------------------------- | ---------------- | ------------- |
| `POST`          | `/users`                                             | Register a new user.                                | ✅ Yes           | ❌ No         |
| `GET`           | `/users/:userId`                                     | Retrieve a user's details.                          | ❌ No            | ✅ Yes        |
| `PATCH`         | `/users/:userId`                                     | Update a user's details.                            | ✅ Yes           | ✅ Yes        |
| `DELETE`        | `/users/:userId`                                     | Delete a user account.                              | ❌ No            | ✅ Yes        |
|                 |                                                      |                                                     |                  |               |
| `POST`          | `/users/login`                                       | Authenticate a user and start a session.            | ✅ Yes           | ❌ No         |
| `POST`          | `/users/logout`                                      | Terminate the current session.                      | ❌ No            | ✅ Yes        |
|                 |                                                      |                                                     |                  |               |
| `POST`          | `/users/password/reset-request`                      | Send a password reset link to the user’s email.     | ✅ Yes           | ❌ No         |
| `PATCH`         | `/users/password/reset/:userId`                      | Submit the new password using the reset token.      | ✅ Yes           | ✅ Yes        |
|                 |                                                      |                                                     |                  |               |
|                 |                                                      |                                                     |                  |               |
| `POST`          | `/habits`                                            | Add a new habit for the user.                       | ✅ Yes           | ✅ Yes        |
| `GET`           | `/habits/:habitId`                                   | Retrieve a habit's details.                         | ❌ No            | ✅ Yes        |
| `PATCH`         | `/habits/:habitId`                                   | Update a habit's details.                           | ✅ Yes           | ✅ Yes        |
| `DELETE`        | `/habits/:habitId`                                   | Delete a habit.                                     | ❌ No            | ✅ Yes        |
|                 |                                                      |                                                     |                  |               |
| `GET`           | `/habits`<br> `?date=yyyy-mm-dd`<br> `&name=example` | Retrieve habits, including check-in data.           | ❌ No            | ✅ Yes        |
| `GET`           | `/habits/progress`                                   | Fetch habit names, icons, and progress percentage.  | ❌ No            | ✅ Yes        |
|                 |                                                      |                                                     |                  |               |
| `PATCH`         | `/check-ins/:checkInId`                              | Update the `times_done` field of a check-in record. | ✅ Yes           | ✅ Yes        |

---

### Used Response Codes

- Success Codes:

  - 200 (OK): `GET` `PATCH`.
  - 201 (Created): `POST`.
  - 204 (No Content): `DELETE`.

- Failure Codes:

  - 400 (Bad Request): For invalid input or missing required fields.
  - 401 (Unauthorized): For access without valid credentials or tokens.
  - 404 (Not Found): For resources that cannot be found
  - 409 (Conflict): For attempts to create a resource that already exists

## Request and Response Format

Content Type: All requests and responses must use `application/json`.

### Request and Response Body Specifications

#### 1. `POST /api/users`

```json
{
  "user": {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "SecureP@ssword1!"
  }
}
```

#### 2. `PATCH /api/users/:userId`

See **_(1)_**. Fields are optional.

#### 3. `DELETE /api/users/:userId`

See **_(1)_**. Only password.

#### 4. `POST /api/users/login`

See **_(1)_**. Only email and password.
Successful response includes a token and user details.

### 5. `POST /api/users/password/reset-request`

See **_(1)_**. Only email.

### 6. `PATCH /api/users/password/reset/:userId`

See **_(1)_**. Only password.

## Middleware

The API uses Joi-based validation middleware to ensure the request body conforms to the required schema. To add validation for an endpoint request body:

- Create a Joi schema (if you want to create a schema from an already existing one, use `adaptJoiSchema`).
- Create a Joi schema validator middleware.
- Use the middleware as the first step in the endpoint.

#### JWT Authentication

To validate JWT in session-protected endpoints, you can use the following middleware:

## Error Handling

The `errorHandler` middleware handles all errors centrally. Failed requests are considered errors as well. For this purpose, a custom error type is created: `AppError`.

This type provides further information about the error and allows adding a status code and customized error message for the client when the error real message is sensitive and wanted to be obscured.

When sending a negative response or throwing an error, this should be done using `throw new AppError(..)`. This error should be caught in the app and passed to the `errorHandler` using `next(error)`.

## Models

See the ERD and schemas in `src/models`
