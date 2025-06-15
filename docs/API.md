# VEMS API Documentation

## Overview

The VEMS API provides endpoints for managing student applications, university partnerships, and related processes. The API follows RESTful principles and uses JSON for data exchange.

## Base URL

```
http://localhost:5000/api
```

## Authentication

All API endpoints (except authentication endpoints) require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Login
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "role": "student"
    }
  }
  ```

#### Register
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "user@example.com",
    "password": "password123",
    "role": "student"
  }
  ```
- **Response:** Same as login

#### Logout
- **POST** `/auth/logout`
- **Response:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### Students

#### Get Students
- **GET** `/students`
- **Query Parameters:**
  - `page` (default: 1)
  - `limit` (default: 10)
  - `search` (optional)
  - `status` (optional)
- **Response:**
  ```json
  {
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "student@example.com",
        "status": "active",
        "created_at": "2024-02-15T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "pages": 10
    }
  }
  ```

#### Get Student
- **GET** `/students/:id`
- **Response:**
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "student@example.com",
    "profile": {
      "date_of_birth": "2000-01-01",
      "gender": "male",
      "nationality": "Nigeria",
      "passport_number": "A12345678"
    },
    "applications": [
      {
        "id": 1,
        "program": {
          "name": "Computer Science",
          "university": "Istanbul University"
        },
        "status": "submitted",
        "submission_date": "2024-02-15T10:00:00Z"
      }
    ]
  }
  ```

### Universities

#### Get Universities
- **GET** `/universities`
- **Query Parameters:**
  - `page` (default: 1)
  - `limit` (default: 10)
  - `search` (optional)
  - `country` (optional)
  - `status` (optional)
- **Response:**
  ```json
  {
    "data": [
      {
        "id": 1,
        "name": "Istanbul University",
        "country": "Turkey",
        "city": "Istanbul",
        "status": "active"
      }
    ],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "pages": 5
    }
  }
  ```

#### Get University
- **GET** `/universities/:id`
- **Response:**
  ```json
  {
    "id": 1,
    "name": "Istanbul University",
    "country": "Turkey",
    "city": "Istanbul",
    "website": "https://www.istanbul.edu.tr",
    "contact_email": "info@istanbul.edu.tr",
    "contact_phone": "+90 212 123 4567",
    "status": "active",
    "programs": [
      {
        "id": 1,
        "name": "Computer Science",
        "level": "bachelor",
        "duration": 48,
        "tuition_fee": 5000.00
      }
    ]
  }
  ```

### Applications

#### Get Applications
- **GET** `/applications`
- **Query Parameters:**
  - `page` (default: 1)
  - `limit` (default: 10)
  - `status` (optional)
  - `student_id` (optional)
  - `program_id` (optional)
- **Response:**
  ```json
  {
    "data": [
      {
        "id": 1,
        "student": {
          "name": "John Doe",
          "email": "student@example.com"
        },
        "program": {
          "name": "Computer Science",
          "university": "Istanbul University"
        },
        "status": "submitted",
        "submission_date": "2024-02-15T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 200,
      "page": 1,
      "limit": 10,
      "pages": 20
    }
  }
  ```

#### Create Application
- **POST** `/applications`
- **Body:**
  ```json
  {
    "student_id": 1,
    "program_id": 1,
    "documents": [
      {
        "type": "passport",
        "file": "base64_encoded_file"
      }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "status": "draft",
    "created_at": "2024-02-15T10:00:00Z"
  }
  ```

### Payments

#### Get Payments
- **GET** `/payments`
- **Query Parameters:**
  - `page` (default: 1)
  - `limit` (default: 10)
  - `status` (optional)
  - `application_id` (optional)
- **Response:**
  ```json
  {
    "data": [
      {
        "id": 1,
        "application_id": 1,
        "amount": 100.00,
        "currency": "USD",
        "status": "completed",
        "payment_date": "2024-02-15T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "pages": 5
    }
  }
  ```

#### Create Payment
- **POST** `/payments`
- **Body:**
  ```json
  {
    "application_id": 1,
    "amount": 100.00,
    "currency": "USD",
    "payment_method": "credit_card"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "status": "pending",
    "created_at": "2024-02-15T10:00:00Z"
  }
  ```

## Error Responses

All error responses follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {} // Optional additional error details
  }
}
```

Common error codes:
- `INVALID_CREDENTIALS`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`
- `VALIDATION_ERROR`
- `INTERNAL_ERROR`

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Versioning

The API version is included in the URL path:
```
/api/v1/...
```

## Webhooks

The API supports webhooks for real-time notifications. Configure webhook endpoints in the settings panel.

## Support

For API support, contact:
- Email: api-support@visionexploit.com
- Documentation: https://docs.visionexploit.com/api 