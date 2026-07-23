# Car Dealership Inventory System

## Project Overview

A full-stack Car Dealership Inventory Management System built using FastAPI, PostgreSQL, SQLAlchemy, and React.

The application provides secure authentication, inventory management, purchasing workflows, and an analytics dashboard through a responsive modern UI.

---

## Backend Stack

- FastAPI
- SQLAlchemy ORM
- PostgreSQL
- Pydantic
- JWT Authentication
- OAuth2PasswordBearer
- Passlib (bcrypt)
- Repository-Service Architecture

---

## Frontend Stack

- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- React Hot Toast
- Framer Motion
- React Icons

---

## Features

### Authentication

- User Registration
- Secure Login
- JWT Token Authentication
- Protected Routes
- Role-Based Authorization

---

### Vehicle Management

- Add Vehicle
- Edit Vehicle
- Delete Vehicle
- View Vehicle Inventory
- Purchase Vehicle
- Restock Vehicle

---

### Dashboard

Displays

- Total Vehicles
- Total Stock
- Total Inventory Value
- Low Stock Alerts

---

## Backend Architecture

```
Routes
    ↓
Services
    ↓
Repositories
    ↓
SQLAlchemy Models
    ↓
PostgreSQL
```

---

## Frontend Architecture

```
Pages
    ↓
Components
    ↓
Reusable UI Components
    ↓
Axios API Layer
```

---

## Security

- JWT Authentication
- Password Hashing using bcrypt
- OAuth2 Authentication Flow
- Protected API Endpoints
- Authorization Middleware

---

## API Endpoints

Authentication

- POST /auth/register
- POST /auth/login

Users

- GET /users/me

Vehicles

- GET /vehicles
- GET /vehicles/{id}
- POST /vehicles
- PUT /vehicles/{id}
- DELETE /vehicles/{id}
- POST /vehicles/{id}/purchase
- POST /vehicles/{id}/restock

---

## Frontend Pages

- Dashboard
- Login
- Register
- Vehicle Inventory
- Profile

---

## Design Principles

- Separation of Concerns
- Repository Pattern
- Service Layer
- Reusable Components
- Responsive UI
- Clean Architecture
- RESTful API Design

---

## Future Improvements

- Pagination
- Search
- Filtering
- Sorting
- Sales Reports
- Order History
- Docker Deployment
- CI/CD Pipeline
- Unit Testing
- Integration Testing