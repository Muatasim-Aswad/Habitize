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

| **#** | **HTTP Method** | **Path**                                             | **Description**                                     | **Request Body** | **Protected** |
| ----- | --------------- | ---------------------------------------------------- | --------------------------------------------------- | ---------------- | ------------- |
| 1     | `POST`          | `/users`                                             | Register a new user.                                | ✅ Yes           | ❌ No         |
| 2     | `GET`           | `/users/:userId`                                     | Retrieve a user's details.                          | ❌ No            | ✅ Yes        |
| 3     | `PATCH`         | `/users/:userId`                                     | Update a user's details.                            | ✅ Yes           | ✅ Yes        |
| 4     | `DELETE`        | `/users/:userId`                                     | Delete a user account.                              | ❌ No            | ✅ Yes        |
|       |                 |                                                      |                                                     |                  |               |
| 5     | `POST`          | `/users/login`                                       | Authenticate a user and start a session.            | ✅ Yes           | ❌ No         |
| 6     | `POST`          | `/users/logout`                                      | Terminate the current session.                      | ❌ No            | ✅ Yes        |
|       |                 |                                                      |                                                     |                  |               |
| 7     | `POST`          | `/users/password/reset-request`                      | Send a password reset link to the user’s email.     | ✅ Yes           | ❌ No         |
| 8     | `PATCH`         | `/users/password/reset/:userId`                      | Submit the new password using the reset token.      | ✅ Yes           | ✅ Yes        |
|       |                 |                                                      |                                                     |                  |               |
|       |                 |                                                      |                                                     |                  |               |
| 9     | `POST`          | `/habits`                                            | Add a new habit for the user.                       | ✅ Yes           | ✅ Yes        |
| 10    | `GET`           | `/habits/:habitId`                                   | Retrieve a habit's details.                         | ❌ No            | ✅ Yes        |
| 11    | `PATCH`         | `/habits/:habitId`                                   | Update a habit's details.                           | ✅ Yes           | ✅ Yes        |
| 12    | `DELETE`        | `/habits/:habitId`                                   | Delete a habit.                                     | ❌ No            | ✅ Yes        |
|       |                 |                                                      |                                                     |                  |               |
| 13    | `GET`           | `/habits`<br> `?date=yyyy-mm-dd`<br> `&name=example` | Retrieve habits, including check-in data.           | ❌ No            | ✅ Yes        |
| 14    | `GET`           | `/habits/progress`                                   | Fetch habit names, icons, and progress percentage.  | ❌ No            | ✅ Yes        |
|       |                 |                                                      |                                                     |                  |               |
| 15    | `PATCH`         | `/check-ins/:checkInId`                              | Update the `times_done` field of a check-in record. | ✅ Yes           | ✅ Yes        |
| 16    | `GET`           | `/habits/month`<br> `?month=1` <br> `&year=2025`     | Check if days of a month has active habits          | ❌ No            | ✅ Yes        |

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

### Request Body Specifications

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

#### 3. `PATCH /api/users/:userId`

See **_(1)_**. Fields are optional.

#### 5. `POST /api/users/login`

See **_(1)_**. Only email and password.
Successful response includes a token and user details.

#### 7. `POST /api/users/password/reset-request`

See **_(1)_**. Only email.

#### 8. `PATCH /api/users/password/reset/:userId`

See **_(1)_**. Only password.

<hr><hr>

#### 9. `POST /api/habits`

```json
{
  "habit": {
    "name": "sleep early",
    "icon": "any identifier",
    "goal": {
      "number": 1,
      "unit": "times",
      "frequency": "daily"
    },
    "period": {
      "start": "2025-01-01T00:00:00.000Z",
      "end": "2025-03-03T00:00:00.000Z"
    },
    "reminders": [
      {
        "time": "1970-01-01T20:35:00.000Z",
        "message": "go to bed"
      }
    ]
  }
}
```

#### 11. `PATCH /api/habits/:habitId`

See **_(1)_**. All fields are optional.

#### 15. `PATCH /api/check-ins/:checkInId`

```json
{
  "checkIn": {
    "times_done": 4
  }
}
```

### Response Body Specifications

#### 1. `POST /api/users`

##### Title: Success Response

```json
{
  "success": true,
  "message": "User created successfully.",
  "user": {
    "name": "Jo",
    "email": "test2@test1.com",
    "createdAt": "2025-01-15T09:32:56.447Z"
  }
}
```

#### 2. `GET /api/users/:userId`

##### Title: Success Response

```json
{
  "success": true,
  "message": "User details retrieved successfully.",
  "user": {
    "id": "678780c890e0dcc1710c4b0a",
    "name": "Asim",
    "email": "test2@test1.com"
  }
}
```

#### 3. `PATCH /api/users/:userId`

##### Title: Success Response

```json
{
  "success": true,
  "message": "User updated successfully.",
  "user": {
    "name": "Esam",
    "email": "test2@test1.com",
    "id": "678780c890e0dcc1710c4b0a"
  }
}
```

#### 4. `DELETE /api/users/:userId`

##### Title: Success Response

```json
{
  "success": true,
  "message": "User deleted successfully."
}
```

#### 5. `POST /api/users/login`

##### Title: Success Response

```json
{
  "success": true,
  "message": "Sign-in successful",
  "user": {
    "id": "678780c890e0dcc1710c4b0a",
    "name": "Asim",
    "email": "test2@test1.com"
  },
  "token": "eyJh..."
}
```

#### 6. `POST /api/users/logout`

##### Title: Success Response

```json
{
  "success": true,
  "message": "User logged out successfully."
}
```

#### 7. `POST /api/users/password/reset-request`

##### Title: Success Response

```json
{
  "success": true,
  "message": "Reset link sent successfully."
}
```

#### 8. `PATCH /api/users/password/reset/:userId`

##### Title: Success Response

```json

```

#### 9. `POST /api/habits`

##### Title: Success Response

```json
{
  "success": true,
  "message": "Habit created successfully.",
  "habit": {
    "user_id": "67876f96ff6b5112cf8cf73c",
    "name": "Drink Water",
    "icon": "water",
    "goal": {
      "number": 3,
      "unit": "times",
      "frequency": "daily"
    },
    "period": {
      "start": "2025-01-31T00:00:00.000Z",
      "end": "2025-02-25T23:59:59.999Z"
    },
    "categories": [],
    "reminders": [
      {
        "time": "1970-01-01T20:35:00.000Z",
        "message": "Did you drink enough?",
        "_id": "678782eb90e0dcc1710c4b25"
      }
    ],
    "_id": "678782eb90e0dcc1710c4b24",
    "createdAt": "2025-01-15T09:42:03.241Z",
    "updatedAt": "2025-01-15T09:42:03.241Z",
    "__v": 0
  }
}
```

#### 10. `GET /api/habits/:habitId`

##### Title: Success Response

```json
{
  "success": true,
  "message": "Habit details retrieved successfully.",
  "habit": {
    "goal": {
      "number": 3,
      "unit": "times",
      "frequency": "daily"
    },
    "period": {
      "start": "2025-01-31T00:00:00.000Z",
      "end": "2025-02-25T23:59:59.999Z"
    },
    "_id": "678782eb90e0dcc1710c4b24",
    "user_id": "67876f96ff6b5112cf8cf73c",
    "name": "Drink Water",
    "icon": "water",
    "categories": [],
    "reminders": [
      {
        "time": "1970-01-01T20:35:00.000Z",
        "message": "Did you drink enough?",
        "_id": "678782eb90e0dcc1710c4b25"
      }
    ],
    "createdAt": "2025-01-15T09:42:03.241Z",
    "updatedAt": "2025-01-15T09:42:03.241Z",
    "__v": 0
  }
}
```

#### 11. `PATCH /api/habits/:habitId`

##### Title: Success Response

```json
{
  "success": true,
  "message": "Habit updated successfully."
}
```

#### 12. `DELETE /api/habits/:habitId`

##### Title: Success Response

```json
{
  "success": true,
  "message": "Habit deleted successfully."
}
```

#### 13. `GET /api/habits?date=yyyy-mm-dd`

##### Title: Success Response

```json
{
  "success": true,
  "message": "Habits details retrieved successfully.",
  "count": 4,
  "habits": [
    {
      "goal": {
        "number": 1,
        "unit": "times",
        "frequency": "daily"
      },
      "period": {
        "start": "2025-02-01T00:00:00.000Z",
        "end": "2025-02-25T23:59:59.999Z"
      },
      "_id": "67877bbd1daa41672f5c7bed",
      "user_id": "67876f96ff6b5112cf8cf73c",
      "name": "new habit",
      "icon": "any identifier",
      "categories": [],
      "reminders": [
        {
          "time": "1970-01-01T20:35:00.000Z",
          "message": "go to bed",
          "_id": "67877bbd1daa41672f5c7bee"
        }
      ],
      "createdAt": "2025-01-15T09:11:25.941Z",
      "updatedAt": "2025-01-15T09:11:25.941Z",
      "__v": 0,
      "checkIn": {
        "habit_id": "67877bbd1daa41672f5c7bed",
        "start_date": "2025-02-03T00:00:00.000Z",
        "end_date": "2025-02-03T23:59:59.999Z",
        "times_done": 0,
        "_id": "6787847990e0dcc1710c4b6b",
        "createdAt": "2025-01-15T09:48:41.218Z",
        "updatedAt": "2025-01-15T09:48:41.218Z",
        "__v": 0
      }
    },
    {
      "goal": {
        "number": 1,
        "unit": "times",
        "frequency": "daily"
      },
      "period": {
        "start": "2025-02-01T00:00:00.000Z",
        "end": "2025-02-25T23:59:59.999Z"
      },
      "_id": "67877bd81daa41672f5c7bf2",
      "user_id": "67876f96ff6b5112cf8cf73c",
      "name": "new new habit",
      "icon": "any identifier",
      "categories": [],
      "reminders": [
        {
          "time": "1970-01-01T20:35:00.000Z",
          "message": "go to bed",
          "_id": "67877bd81daa41672f5c7bf3"
        }
      ],
      "createdAt": "2025-01-15T09:11:52.511Z",
      "updatedAt": "2025-01-15T09:11:52.511Z",
      "__v": 0,
      "checkIn": {
        "habit_id": "67877bd81daa41672f5c7bf2",
        "start_date": "2025-02-03T00:00:00.000Z",
        "end_date": "2025-02-03T23:59:59.999Z",
        "times_done": 0,
        "_id": "6787847990e0dcc1710c4b6d",
        "createdAt": "2025-01-15T09:48:41.220Z",
        "updatedAt": "2025-01-15T09:48:41.220Z",
        "__v": 0
      }
    }
  ]
}
```

#### 14. `GET /api/habits/progress`

##### Title: Success Response

```json
{
  "success": true,
  "message": "Habits progress details retrieved successfully.",
  "note": "The progress is calculated by comparing the number of check-ins to the target during the whole period -not per cycle. The commitment is the percentage of the target achieved till now, and the progress is the percentage of the target achieved till the end of the period.",
  "count": 4,
  "habits": [
    {
      "commitment": 100,
      "progress": 8,
      "_id": "67877bbd1daa41672f5c7bed",
      "name": "new habit",
      "icon": "any identifier",
      "target": "1 times daily",
      "achieved": "2 times",
      "age": "2 days",
      "expectedLife": "25 days"
    },
    {
      "commitment": 0,
      "progress": 0,
      "_id": "6787845890e0dcc1710c4b56",
      "name": "Drink Water",
      "icon": "water",
      "target": "3 times daily",
      "achieved": "0 times",
      "age": "1 days",
      "expectedLife": "26 days"
    }
  ]
}
```

#### 15. `PATCH /api/check-ins/:checkInId`

##### Title: Success Response

```json
{
  "success": true,
  "message": "check-in updated successfully."
}
```

#### 16. `GET /api/habits/month?month=01&year=2026`

##### Title: Success Response

```json
{
  "month": "01",
  "year": "2026",
  "days": {
    "1": true,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
    "7": false,
    "8": false,
    "9": false,
    "10": false,
    "11": false,
    "12": false,
    "13": false,
    "14": false,
    "15": false,
    "16": false,
    "17": false,
    "18": false,
    "19": false,
    "20": false,
    "21": false,
    "22": false,
    "23": false,
    "24": false,
    "25": false,
    "26": false,
    "27": false,
    "28": false,
    "29": false,
    "30": false,
    "31": false
  }
}
```

#### object validation

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
