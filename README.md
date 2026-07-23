# 🚗 Car Dealership Inventory System

A full-stack Car Dealership Inventory Management System built using **FastAPI**, **PostgreSQL**, and **React**. The application allows dealerships to manage vehicle inventory, perform stock operations, and authenticate users securely using JWT.

---

## Features

### Authentication
- User Registration
- Secure Login using JWT
- Password Hashing
- Role-Based Access Control
- Protected API Endpoints

### Vehicle Management
- Add New Vehicles
- Update Vehicle Information
- Delete Vehicles
- View Complete Inventory
- Search Vehicles
- Filter by Make, Model, Category, Price
- Purchase Vehicles
- Restock Inventory

### Inventory Operations
- Automatic Stock Updates
- Purchase Validation
- Prevent Overselling
- Inventory Tracking

---

## Tech Stack

### Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- JWT Authentication
- Passlib
- Alembic
- Pytest

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- React Hook Form

---

## Project Structure

```
Car_Dealership_Inventory_System/

├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   │
│   ├── tests/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── dashboard/
│   │   ├── hooks/
│   │   └── layout/
│   │
│   └── package.json
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Car_Dealership_Inventory_System.git

cd Car_Dealership_Inventory_System
```

---

# Backend Setup

Create Virtual Environment

```bash
python -m venv venv
```

Activate

Windows

```bash
venv\Scripts\activate
```

Linux / Mac

```bash
source venv/bin/activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Environment

Create a `.env` file.

Example:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/car_dealership

SECRET_KEY=your-secret-key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

## Database Migration

```bash
alembic upgrade head
```

---

## Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://localhost:8000
```

Swagger

```
http://localhost:8000/docs
```

---

# Frontend Setup

Navigate

```bash
cd frontend
```

Install Packages

```bash
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:8000
```

Run

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/register | Register User |
| POST | /auth/login | Login |

---

## Users

| Method | Endpoint |
|---------|----------|
| GET | /users/me |

---

## Vehicles

| Method | Endpoint |
|---------|----------|
| GET | /vehicles |
| POST | /vehicles |
| PUT | /vehicles/{id} |
| DELETE | /vehicles/{id} |
| GET | /vehicles/search |

---

## Inventory

| Method | Endpoint |
|---------|----------|
| POST | /vehicles/{id}/purchase |
| POST | /vehicles/{id}/restock |

---

# Running Tests

Backend

```bash
pytest
```

Verbose

```bash
pytest -v
```

Coverage

```bash
pytest --cov=app
```

---

# Screenshots

Add screenshots of:

- Login Page
- Dashboard
- Vehicle List
- Add Vehicle
- Purchase Vehicle
- Restock Vehicle
- Search Functionality

---

# Security

- JWT Authentication
- Password Hashing
- Protected Routes
- Role-Based Authorization
- Request Validation
- SQL Injection Protection via SQLAlchemy

---

# Future Improvements

- Vehicle Images
- Sales Reports
- Analytics Dashboard
- Email Notifications
- Audit Logs
- Export Inventory to CSV/PDF
- Pagination
- Advanced Filtering

---

# Author

Jay P. Joshi

M.E. Information Technology

L.D. College of Engineering

Ahmedabad, Gujarat

GitHub:
https://github.com/Jayjoshi08092003/Car_Dealership_Inventory_System

---
My AI Usage
AI Tools Used

During the development of this project, I used the following AI tools to improve productivity and assist with software development:

ChatGPT (OpenAI)
Google Gemini
GitHub Copilot (optional, remove this if you did not use it)
How I Used AI
ChatGPT

I primarily used ChatGPT as a programming assistant throughout the project. Specifically, it helped me with:

Understanding FastAPI concepts and best practices.
Designing the project architecture using the Repository-Service pattern.
Generating boilerplate code for CRUD operations.
Explaining SQLAlchemy relationships and database interactions.
Debugging backend and frontend errors.
Writing and improving API documentation.
Creating unit tests for authentication and vehicle management modules.
Drafting the project README and improving documentation.
Google Gemini

I used Google Gemini to:

Brainstorm ideas for organizing the project structure.
Review API endpoint organization.
Compare different implementation approaches.
Verify frontend component organization.
Obtain alternative solutions while debugging specific issues.

Reflection on AI Usage

AI significantly improved my development workflow by acting as a coding assistant rather than a replacement for my own work. It helped me understand unfamiliar concepts more quickly, generate initial code templates, identify bugs, and improve documentation. I reviewed, modified, and tested all AI-generated suggestions before integrating them into the project.

Using AI reduced development time, improved code readability, and allowed me to focus more on implementing project requirements and validating functionality. The final application, including its architecture, testing, and debugging, reflects my own understanding and verification of the generated suggestions.

# License

This project is developed for educational purposes and assignment submission.
