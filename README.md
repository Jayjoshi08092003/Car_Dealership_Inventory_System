# 🚗 Car Dealership Inventory System

A modern full-stack inventory management system for car dealerships built with **FastAPI**, **PostgreSQL**, **SQLAlchemy**, and **React**.

---

# Features

## Authentication

- JWT Authentication
- OAuth2 Login
- User Registration
- Protected Routes
- Role-Based Access Control

---

## Vehicle Management

- View Inventory
- Add Vehicles
- Edit Vehicles
- Delete Vehicles
- Purchase Vehicles
- Restock Vehicles

---

## Dashboard

Real-time inventory analytics including

- Total Vehicles
- Total Stock
- Total Inventory Value
- Low Stock Alerts

---

# Tech Stack

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- JWT
- Passlib (bcrypt)

## Frontend

- React (Vite)
- Tailwind CSS
- Axios
- React Router
- React Hook Form
- React Hot Toast
- Framer Motion
- React Icons

---

# Project Structure

```
Backend
│
├── app
│   ├── core
│   ├── database
│   ├── models
│   ├── repositories
│   ├── routes
│   ├── schemas
│   ├── services
│   └── main.py
│
├── requirements.txt
└── .env


Frontend
│
├── src
│   ├── api
│   ├── components
│   ├── context
│   ├── hooks
│   ├── pages
│   ├── services
│   └── App.jsx
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend

```bash
cd Backend

python -m venv .venv

source .venv/bin/activate
```

Windows

```bash
.venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run

```bash
uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd Frontend

npm install

npm run dev
```

---

# Environment Variables

Create a `.env`

```env
DATABASE_URL=postgresql://username:password@localhost:5432/car_dealership

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

# API Documentation

Swagger UI

```
http://127.0.0.1:8000/docs
```

ReDoc

```
http://127.0.0.1:8000/redoc
```

---

# Authentication Flow

```
Register
      ↓
Login
      ↓
JWT Token
      ↓
Protected Routes
      ↓
Inventory Management
```

---

# Inventory Workflow

```
Create Vehicle
        ↓
View Inventory
        ↓
Purchase Vehicle
        ↓
Stock Updated
        ↓
Restock Inventory
```

---

# Future Enhancements

- Search and Filtering
- Pagination
- Vehicle Images
- Sales Reports
- Purchase History
- Audit Logs
- Docker Support
- CI/CD Pipeline
- Unit Testing
- Integration Testing

---

# Author

**Jay P. Joshi**

M.E. Information Technology

AI/ML Engineer | Backend Developer | Full Stack Developer