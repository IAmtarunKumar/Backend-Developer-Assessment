# OCPL Backend API Documentation

This repository contains API documentation for the OCPL.


# Deploy Link : <a href="https://ocpl.onrender.com">Video Link</a>

# Video Link : <a href="https://drive.google.com/file/d/1OpcC2kIxl_-eHCUhJKO00QFg3U5eN9Re/view?usp=sharing">Video Link</a>

## Table of Contents

- [User Registration (JWT-based Authentication)](#user-registration-jwt-based-authentication)
  - [Register a New User](#register-a-new-user)
  - [User Login](#user-login)
  - [Reset User Password](#reset-user-password)
  - [Logout User](#logout-user)
- [MongoDB Integration (Customers)](#mongodb-integration-customers)
  - [Save a New Customer](#save-a-new-customer)
  - [Retrieve All Saved Customers](#retrieve-all-saved-customers)

## User Registration (JWT-based Authentication)

This section covers user-related endpoints for JWT-based authentication.

### Register a New User

- **POST** `/api/register`

Registers a new user with email verification.

**Parameters:**

```json
{
    "name": "string (required)",
    "email": "string (required)",
    "password": "string (required)"
}
```

**Response:**

- 200 (OK): `{"message": "Registration successful, please check your email for verification."}`
- 400 (Bad Request): `{"message": "Invalid request, please provide valid data."}`
- 409 (Conflict): `{"message": "User with this email already exists."}`
- 500 (Internal Server Error): `{"message": "An error occurred while registering the user."}`

### User Login

- **POST** `/api/login`

Logs in the user and returns a JWT token upon successful authentication.

**Parameters:**

```json
{
    "email": "string (required",
    "password": "string (required)"
}
```

**Response:**

- 200 (OK): `{"token": "JWT_TOKEN"}`
- 401 (Unauthorized): `{"message": "Invalid credentials, please check your email and password."}`
- 500 (Internal Server Error): `{"message": "An error occurred while logging in."}`

### Reset User Password

- **POST** `/api/reset`


Reset the user password.

**Parameters:**

```json
{
    "password": "string (required)"
}
```

**Response:**

- 200 (OK): `{"message": "Password reset email sent successfully."}`
- 400 (Bad Request): `{"message": "Invalid request, please provide a valid email address."}`
- 500 (Internal Server Error): `{"message": "An error occurred while sending the password reset email."}`

### Logout User

- **POST** `/api/logout`

Logout the user.

**Response:**

- 200 (OK): `{"message": "User logged out successfully."}`
- 401 (Unauthorized): `{"message": "Invalid token, please log in to logout."}`
- 500 (Internal Server Error): `{"message": "An error occurred while logging out the user."}`

## MongoDB Integration (Customers)

This section covers endpoints related to MongoDB integration for managing customers.

### Save a New Customer

- **POST** `/api/customers`

Saves a new customer by providing name, contact number, and address.

**Parameters:**

```json
{
    "name": "string (required)",
    "contact": "string (required)",
    "address": "string (required)"
}
```

**Response:**

- 200 (OK): `{"message": "Customer saved successfully."}`
- 400 (Bad Request): `{"message": "Invalid request, please provide valid data."}`
- 500 (Internal Server Error): `{"message": "An error occurred while saving the customer."}`

### Retrieve All Saved Customers

- **GET** `/api/customers`

Retrieves a list of all saved customers.

**Response:**

- 200 (OK): `[{"name": "Customer Name", "contactNumber": "Contact Number", "address": "Customer Address"}]`
- 500 (Internal Server Error): `{"message": "An error occurred while retrieving customers."}`


