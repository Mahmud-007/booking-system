# Booking System

A comprehensive Node.js backend API for mobile booking applications with secure authentication, service discovery, provider management, and appointment scheduling.

## Project Overview

This project provides a RESTful API for mobile booking applications, allowing users to register, browse available services, view service providers, and book appointments. Built with Express, TypeScript, and Prisma ORM with a PostgreSQL database.

## Tech Stack

- **Node.js & Express**: API framework
- **TypeScript**: Type-safe JavaScript
- **Prisma ORM**: Database interactions
- **PostgreSQL**: Relational database
- **JWT**: Authentication
- **AWS Lambda**: Serverless deployment

## Project Structure

```
booking-system/
├── src/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth and validation middleware
│   ├── models/          # Prisma schema and DB logic
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   └── app.ts           # Express application setup
├── prisma/
│   └── schema.prisma    # Database schema
├── docker-compose.yml   # Docker configuration
├── Dockerfile           # Node.js application container
├── .github/workflows/   # CI/CD configuration
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js v20+
- PostgreSQL database
- Docker (optional, for containerized setup)

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:Mahmud-007/booking-system.git
   cd booking-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/booking_system?schema=public"
   JWT_SECRET="your-jwt-secret-key"
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=booking_system
   ```

4. Set up the database:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. Build the application:
   ```bash
   npm run build
   ```

6. Start the server:
   ```bash
   npm start
   ```

For development mode with hot-reloading:
```bash
npm run dev
```

## API Documentation

### Base URL

```
http://localhost:3000/api
```

### Authentication

All booking-related endpoints require authentication via JWT token.

**Headers:**
```
Authorization: Bearer <token>
```

### Endpoints

#### Authentication

##### Register a new user

**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
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

##### Login

**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
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

#### Services

##### Get all services

**GET** `/services`

**Query Parameters:**
- `category` (optional): Filter services by category

**Response:**
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

##### Get service by ID

**GET** `/services/:id`

**Response:**
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

#### Providers

##### Get all providers

**GET** `/providers`

**Query Parameters:**
- `serviceId` (optional): Filter providers by service

**Response:**
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

##### Get provider by ID

**GET** `/providers/:id`

**Response:**
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

#### Bookings

##### Create a booking

**POST** `/bookings`

**Request Body:**
```json
{
  "serviceId": 1,
  "providerId": 1,
  "date": "2023-10-05T14:00:00.000Z"
}
```

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "serviceId": 1,
  "providerId": 1,
  "date": "2023-10-05T14:00:00.000Z",
  "createdAt": "2023-10-01T12:00:00.000Z",
  "updatedAt": "2023-10-01T12:00:00.000Z"
}
```

### Database Transaction Consistency

To maintain consistency while making a booking, we start a database transaction before creating the booking. Within the transaction, we first check if the provider is already booked for the requested date and time. If a conflict is detected, the transaction is aborted and an error is returned. If the provider is available, we proceed to insert the new booking inside the same transaction. The transaction is committed only if all operations succeed; otherwise, it is rolled back to ensure no partial or conflicting data is saved.

## Deployment

The application is set up for serverless deployment to AWS Lambda using GitHub Actions for CI/CD pipelines. When code is pushed to the main branch, it will automatically:

1. Install dependencies
2. Run tests (if configured)
3. Build the TypeScript code
4. Deploy to AWS Lambda

Required environment secrets for GitHub:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `DATABASE_URL` (production database URL)
- `JWT_SECRET` (production JWT secret)

## Development

### Available Scripts

- `npm start`: Run the built application
- `npm run dev`: Run in development mode with hot-reloading
- `npm run build`: Build the TypeScript application
- `npm run db:migrate`: Run Prisma migrations
- `npm run db:seed`: Seed the database
- `npm run lint`: Run ESLint

