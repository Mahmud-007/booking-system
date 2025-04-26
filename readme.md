# Mobile Booking System API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

All booking-related endpoints require authentication via JWT token.

**Headers:**
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register a new user

**POST** `/auth/register`

Request body:
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com",
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

#### Login

**POST** `/auth/login`

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com",
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

### Services

#### Get all services

**GET** `/services`

Query parameters:
- `category` (optional): Filter services by category

Response:
```json
[
  {
    "id": 1,
    "name": "Swedish Massage",
    "description": "A relaxing full-body massage using long strokes",
    "price": 85.0,
    "duration": 60,
    "category": "Massage",
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:00:00.000Z",
    "providers": [
      {
        "id": 1,
        "name": "Maria Lopez",
        "email": "maria@mobilespa.com",
        "phone": "555-123-4567",
        "bio": "Licensed massage therapist..."
      }
    ]
  }
]
```

#### Get service by ID

**GET** `/services/:id`

Response:
```json
{
  "id": 1,
  "name": "Swedish Massage",
  "description": "A relaxing full-body massage using long strokes",
  "price": 85.0,
  "duration": 60,
  "category": "Massage",
  "createdAt": "2023-10-01T12:00:00.000Z",
  "updatedAt": "2023-10-01T12:00:00.000Z",
  "providers": [
    {
      "id": 1,
      "name": "Maria Lopez",
      "email": "maria@mobilespa.com"
    }
  ]
}
```

### Providers

#### Get all providers

**GET** `/providers`

Query parameters:
- `serviceId` (optional): Filter providers by service

Response:
```json
[
  {
    "id": 1,
    "name": "Maria Lopez",
    "email": "maria@mobilespa.com",
    "phone": "555-123-4567",
    "bio": "Licensed massage therapist...",
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:00:00.000Z",
    "services": [
      {
        "id": 1,
        "name": "Swedish Massage"
      }
    ]
  }
]
```

#### Get provider by ID

**GET** `/providers/:id`

Response:
```json
{
  "id": 1,
  "name": "Maria Lopez",
  "email": "maria@mobilespa.com",
  "phone": "555-123-4567",
  "bio": "Licensed massage therapist...",
  "createdAt": "2023-10-01T12:00:00.000Z",
  "updatedAt": "2023-10-01T12:00:00.000Z",
  "services": [
    {
      "id": 1,
      "name": "Swedish Massage",
      "description": "A relaxing full-body massage using long strokes",
      "price": 85.0,
      "duration": 60,
      "category": "Massage"
    }
  ]
}
```

### Bookings

#### Create a booking

**POST** `/bookings`

Request body:
```json
{
  "serviceId": 1,
  "providerId": 1,
  "date": "2023-10-05T14:00:00.000Z"
}
```

Response:
```json
{
  "id": 1,
  "userId":