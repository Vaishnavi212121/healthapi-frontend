# Health API Frontend

Quasar frontend for the Health API authentication system.

## Project Overview

This project is the frontend application for the Health API backend.

The frontend is developed using:

- Vue.js
- Quasar Framework
- Pinia
- Vite
- JavaScript

The frontend communicates with the FastAPI backend through REST APIs.

### Frontend

```text
Quasar
http://localhost:9000
```

### Backend

```text
FastAPI
http://127.0.0.1:8000
```

---

## Features

The application currently provides:

- User Registration / Sign Up
- User Login
- JWT-based authentication
- Pinia authentication state management
- JWT persistence using localStorage
- Protected Change Password functionality
- FastAPI backend integration
- CORS-enabled frontend-backend communication
- Form validation
- Login and registration notifications
- User roles received from the authentication system

> Role-based authorization for `ADMIN` and `USER` is planned but is not yet implemented.

---

## Authentication Flow

The frontend communicates with the FastAPI authentication APIs.

```text
Quasar Frontend
      |
      | HTTP Request
      v
FastAPI Backend
      |
      v
Authentication Service
      |
      v
Database
```

---

## Registration Flow

The user creates a new account through the Quasar Registration page.

```text
RegisterPage.vue
      |
      | POST /auth/register
      v
FastAPI Backend
      |
      v
Create User
      |
      v
Password Hashing
      |
      v
SQLite Database
```

The registration API is anonymous, so the user does not need a JWT to register.

---

## Login Flow

The user logs in through the Quasar Login page.

```text
LoginPage.vue
      |
      | POST /auth/login
      v
FastAPI Backend
      |
      v
Verify Username + Password
      |
      v
Generate JWT
      |
      v
Quasar Frontend
      |
      v
Pinia Auth Store
      |
      v
localStorage
```

The JWT is then used when accessing protected APIs.

---

## Protected API Flow

Protected requests send the JWT in the HTTP Authorization header.

```text
Quasar Frontend
      |
      | Authorization: Bearer <JWT>
      v
FastAPI Backend
      |
      v
JWT Verification
      |
      v
Protected Endpoint
```

---

## Authentication APIs

The frontend currently communicates with these backend endpoints:

```text
POST /auth/register
POST /auth/login
POST /auth/change_password
```

### Register

```text
POST http://127.0.0.1:8000/auth/register
```

Creates a new user in the backend database.

### Login

```text
POST http://127.0.0.1:8000/auth/login
```

Authenticates the user and returns a JWT access token.

### Change Password

```text
POST http://127.0.0.1:8000/auth/change_password
```

This is a protected endpoint and requires a valid JWT.

---

## Project Structure

```text
healthapi-frontend/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── boot/
│   │
│   ├── components/
│   │
│   ├── css/
│   │
│   ├── layouts/
│   │
│   ├── pages/
│   │   ├── ErrorNotFound.vue
│   │   ├── IndexPage.vue
│   │   ├── SecondPage.vue
│   │   ├── LoginPage.vue
│   │   ├── RegisterPage.vue
│   │   └── ChangePasswordPage.vue
│   │
│   ├── router/
│   │   ├── index.js
│   │   └── routes.js
│   │
│   ├── stores/
│   │   ├── index.js
│   │   ├── example-store.js
│   │   └── auth-store.js
│   │
│   └── App.vue
│
├── index.html
├── package.json
├── package-lock.json
├── quasar.config.js
├── eslint.config.js
├── jsconfig.json
├── postcss.config.js
└── README.md
```

---

## Important Files

### `LoginPage.vue`

Provides the login interface.

The page sends the username and password to:

```text
POST /auth/login
```

After successful authentication, the backend returns a JWT access token.

The token is stored through the Pinia authentication store.

---

### `RegisterPage.vue`

Provides the Sign Up interface.

The page contains:

- Username
- Password
- Confirm Password
- Sign Up button

The registration form sends data to:

```text
POST /auth/register
```

The backend then creates the user in the database.

---

### `ChangePasswordPage.vue`

Provides the Change Password interface.

The page sends:

```text
Current Password
New Password
```

to:

```text
POST /auth/change_password
```

The JWT is included in the request:

```http
Authorization: Bearer <JWT>
```

---

### `auth-store.js`

The Pinia authentication store manages the frontend authentication state.

It stores information such as:

```text
accessToken
tokenType
username
role
```

It provides authentication-related actions such as:

```text
setAuthData()
setUserData()
logout()
```

The JWT is persisted using browser `localStorage`.

---

### `routes.js`

Defines the frontend routes.

Current authentication-related routes include:

```text
/login
/register
/change-password
```

---

## Installation

Navigate to the project:

```bash
cd ~/quasar-project
```

Install dependencies:

```bash
npm install
```

---

## Start the Development Server

Run:

```bash
npm run dev
```

Alternatively:

```bash
npx quasar dev
```

The application will be available at:

```text
http://localhost:9000
```

---

## Run the FastAPI Backend

The FastAPI backend must also be running.

Open another terminal:

```bash
cd ~/AIML/healthapi
```

Activate the Python virtual environment:

```bash
source .venv/bin/activate
```

Start FastAPI:

```bash
python -m uvicorn app.main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

FastAPI Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Running the Complete Application

Two terminals are required.

### Terminal 1 — FastAPI Backend

```bash
cd ~/AIML/healthapi
source .venv/bin/activate
python -m uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

### Terminal 2 — Quasar Frontend

```bash
cd ~/quasar-project
npm run dev
```

Frontend:

```text
http://localhost:9000
```

---

## Development Workflow

```text
1. Start FastAPI Backend
        |
        v
2. Start Quasar Frontend
        |
        v
3. Open Registration Page
        |
        v
4. Create User
        |
        v
5. Login
        |
        v
6. Receive JWT
        |
        v
7. Store JWT in Pinia
        |
        v
8. Persist JWT in localStorage
        |
        v
9. Access Protected APIs
```

---

## Format & Lint

Run linting:

```bash
npm run lint
```

Check linting without modifying files:

```bash
npm run lint:check
```

---

## Production Build

Build the application:

```bash
npm run build
```

Alternatively:

```bash
npx quasar build
```

---

## CORS Configuration

The frontend runs on:

```text
http://localhost:9000
```

The backend runs on:

```text
http://127.0.0.1:8000
```

FastAPI CORS configuration allows the Quasar frontend to communicate with the backend.

```text
Quasar Frontend
localhost:9000
       |
       | REST API
       v
FastAPI Backend
127.0.0.1:8000
```

---

## Current Project Status

### Frontend

- [x] Quasar project setup
- [x] Vue application setup
- [x] Login page
- [x] Registration page
- [x] Change Password page
- [x] Frontend routing
- [x] Pinia authentication store
- [x] JWT storage
- [x] localStorage persistence
- [x] Login API integration
- [x] Registration API integration
- [x] Change Password API integration
- [x] CORS integration
- [x] Form validation
- [x] API error handling
- [x] Success and error notifications

### Backend Integration

- [x] `/auth/register`
- [x] `/auth/login`
- [x] `/auth/change_password`
- [x] JWT authentication
- [x] Protected API communication

### Authorization

- [x] User roles are supported by the authentication system
- [ ] ADMIN-only authorization
- [ ] USER-specific authorization
- [ ] Frontend role-based route protection
- [ ] ADMIN dashboard
- [ ] Role-based API permissions

---

## Frontend and Backend Repositories

The project uses separate GitHub repositories.

### Backend

```text
healthapi
```

Contains the FastAPI backend, database, authentication, JWT implementation, services, dependencies, and middleware.

### Frontend

```text
healthapi-frontend
```

Contains the Quasar frontend, authentication pages, Pinia store, routing, and API integration.

---

## Overall System Architecture

```text
                         HEALTH API SYSTEM
                                |
                +---------------+---------------+
                |                               |
                v                               v
        QUASAR FRONTEND                  FASTAPI BACKEND
        localhost:9000                  127.0.0.1:8000
                |                               |
                |          REST API             |
                +------------------------------>|
                                                |
                                       +--------+--------+
                                       |                 |
                                       v                 v
                                   Routers          Middleware
                                       |
                                       v
                                   Services
                                       |
                                       v
                                  Dependencies
                                       |
                                       v
                                   SQLAlchemy
                                       |
                                       v
                                  SQLite DB
```

---

## Authentication Architecture

```text
                         LOGIN
                           |
                           v
                    LoginPage.vue
                           |
                           | POST /auth/login
                           v
                    FastAPI Backend
                           |
                           v
                  Authenticate User
                           |
                           v
                      Generate JWT
                           |
                           v
                    Quasar Frontend
                           |
                           v
                    Pinia Auth Store
                           |
                           v
                      localStorage
                           |
                           v
                  Protected API Request
                           |
                           | Bearer JWT
                           v
                    FastAPI Backend
                           |
                           v
                    Verify JWT
                           |
                           v
                  Protected Endpoint
```

---

## Roles and Authorization

The backend authentication system supports two roles:

```text
ADMIN
USER
```

The user's role is included in the authentication data/JWT.

However, role-based authorization is a separate feature and is **not yet implemented**.

The planned authorization flow is:

```text
                    JWT
                     |
                     v
              Identify User
                     |
                     v
               Extract Role
                     |
              +------+------+
              |             |
              v             v
             USER          ADMIN
              |             |
              v             v
       User Permissions  Admin Permissions
```

Future ADMIN-only endpoints may follow a structure such as:

```text
/admin/users
/admin/dashboard
/admin/settings
```

These will be protected by role-based authorization after the RBAC layer is implemented.

---

## Future Improvements

- Authentication route guards
- ADMIN / USER role-based authorization
- ADMIN-only protected APIs
- USER-specific protected APIs
- Protected dashboard
- ADMIN dashboard
- User profile
- Logout interface
- Centralized API client
- Better error handling
- Production environment configuration
- API deployment
- Frontend deployment