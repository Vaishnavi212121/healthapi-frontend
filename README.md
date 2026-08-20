# Health API Backend

FastAPI backend for the Health API system with database integration, user authentication, JWT-based security, and protected APIs.

## Project Overview

The Health API is a backend application developed using FastAPI.

The backend provides:

- REST API endpoints
- Health check API
- SQLite database integration
- SQLAlchemy ORM
- User registration
- User login
- Password hashing
- JWT-based authentication
- Protected Change Password API
- User roles: `ADMIN` and `USER`
- CORS configuration
- Request logging middleware
- Environment-based application settings
- Dependency injection

## Technology Stack

- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- SQLite
- Pydantic
- Pydantic Settings
- JWT
- Password Hashing
- Redis

## Project Structure

```text
healthapi/
│
├── app/
│   ├── main.py
│   ├── settings.py
│   ├── database.py
│   ├── redis.py
│   ├── auth.py
│   │
│   ├── dependencies/
│   │   ├── __init__.py
│   │   ├── database_dependencies.py
│   │   └── health_dependencies.py
│   │
│   ├── middleware/
│   │   ├── __init__.py
│   │   └── logging_middleware.py
│   │
│   ├── routers/
│   │   ├── health_router.py
│   │   └── auth_router.py
│   │
│   ├── services/
│   │   ├── health_service.py
│   │   └── auth_service.py
│   │
│   ├── models/
│   │   └── ...
│   │
│   └── schemas/
│       ├── auth_schema.py
│       └── ...
│
├── healthapi.db
├── requirements.txt
├── .env
├── .gitignore
└── README.md
```

## Application Architecture

The backend follows a layered architecture:

```text
Client
  |
  v
FastAPI Application
  |
  v
Router Layer
  |
  v
Service Layer
  |
  v
Dependency Layer
  |
  v
SQLAlchemy
  |
  v
SQLite Database
```

For authentication:

```text
Client
  |
  v
/auth/register
/auth/login
/auth/change_password
  |
  v
Authentication Router
  |
  v
Authentication Service
  |
  v
User Database
```

## FastAPI Application

The main FastAPI application is created in:

`app/main.py`

The application connects the routers, middleware, and CORS configuration.

Start the server using:

```bash
python -m uvicorn app.main:app --reload
```

## API Endpoints

### Health API

```http
GET /health
```

Test the health API:

```bash
curl http://127.0.0.1:8000/health
```

Example response:

```json
{
  "status": "healthy",
  "app_name": "System Health API",
  "version": "1.0.0"
}
```

## Authentication

The authentication system uses the `user` table.

The user table contains:

```text
id
username
password_hash
role
```

Supported roles:

```text
ADMIN
USER
```

Passwords are stored as password hashes rather than plain-text passwords.

## Registration

Registration endpoint:

```http
POST /auth/register
```

The endpoint is anonymous and does not require authentication.

Example request:

```json
{
  "username": "newuser",
  "password": "TestPassword123!",
  "role": "USER"
}
```

Example response:

```json
{
  "id": 2,
  "username": "newuser",
  "role": "USER"
}
```

Registration flow:

```text
Registration Request
        |
        v
auth_router.py
        |
        v
create_user()
        |
        v
Password Hashing
        |
        v
User Table
        |
        v
SQLite Database
```

## Login

Login endpoint:

```http
POST /auth/login
```

Example request:

```json
{
  "username": "vaishnavi",
  "password": "TestPassword123!"
}
```

Example response:

```json
{
  "access_token": "JWT_TOKEN",
  "token_type": "bearer"
}
```

Login flow:

```text
Username + Password
        |
        v
/auth/login
        |
        v
authenticate_user()
        |
        v
Verify Password
        |
        v
Create JWT
        |
        v
Return Access Token
```

## JWT Authentication

JWT is used to authenticate protected API requests.

The JWT contains information such as:

```json
{
  "sub": "1",
  "username": "vaishnavi",
  "role": "USER",
  "exp": "expiration time"
}
```

The client sends the JWT using:

```http
Authorization: Bearer <JWT>
```

Authentication flow:

```text
Login
  |
  v
JWT Created
  |
  v
Client Stores JWT
  |
  v
Protected Request
  |
  v
Authorization: Bearer JWT
  |
  v
FastAPI JWT Verification
  |
  v
Access Granted
```

## Change Password

Endpoint:

```http
POST /auth/change_password
```

This endpoint is protected and requires a valid JWT.

Example request:

```json
{
  "current_password": "TestPassword123!",
  "new_password": "NewPassword123!"
}
```

Request header:

```http
Authorization: Bearer <JWT>
```

Flow:

```text
JWT
 |
 v
Verify Authentication
 |
 v
Identify User
 |
 v
Verify Current Password
 |
 v
Hash New Password
 |
 v
Update Database
```

## Database

The project uses SQLite:

`healthapi.db`

SQLAlchemy is used as the ORM.

Database architecture:

```text
FastAPI
   |
   v
SQLAlchemy
   |
   v
SQLite
   |
   v
healthapi.db
```

To inspect the database:

```bash
sqlite3 healthapi.db
```

Then:

```sql
SELECT id, username, role FROM user;
```

## Database Dependency

Database sessions are provided using FastAPI dependency injection.

Example:

```python
db: Session = Depends(get_db)
```

Flow:

```text
API Endpoint
     |
     v
Depends(get_db)
     |
     v
Database Session
     |
     v
SQLAlchemy
     |
     v
SQLite
```

## Settings

Application configuration is maintained in:

`app/settings.py`

Configuration includes:

- Application environment
- JWT secret key
- JWT expiration configuration
- Application settings

Sensitive configuration should be stored in environment variables.

Do not commit `.env` to GitHub.

## CORS

The Quasar frontend runs on:

```text
http://localhost:9000
```

The FastAPI backend runs on:

```text
http://127.0.0.1:8000
```

CORS allows communication between the frontend and backend.

Architecture:

```text
Quasar
localhost:9000
      |
      | HTTP Request
      v
FastAPI
127.0.0.1:8000
```

## Middleware

Request logging middleware is implemented in:

`app/middleware/logging_middleware.py`

It logs incoming API requests and responses.

Example:

```text
POST /auth/login 200
POST /auth/register 201
POST /auth/change_password 200
```

## Dependencies

Common dependencies are placed under:

`app/dependencies/`

Dependencies provide reusable functionality such as:

- Database sessions
- Application settings
- Authentication dependencies

## Running the Backend

Navigate to the backend:

```bash
cd ~/AIML/healthapi
```

Activate the virtual environment:

```bash
source .venv/bin/activate
```

Start FastAPI:

```bash
python -m uvicorn app.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

## Testing

### Health API

```bash
curl http://127.0.0.1:8000/health
```

### Register

```bash
curl -X POST http://127.0.0.1:8000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "TestPassword123!",
  "role": "USER"
}'
```

### Login

```bash
curl -X POST http://127.0.0.1:8000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "TestPassword123!"
}'
```

## Security

The authentication system follows these principles:

- Passwords are hashed before storage.
- Plain-text passwords are not stored in the database.
- JWT is used for authentication.
- Protected endpoints require a valid JWT.
- JWT secret configuration is stored outside source code.
- `.env` and database files should not be committed to Git.

## Authentication vs Authorization

Authentication answers:

```text
Who are you?
```

Authorization answers:

```text
What are you allowed to access?
```

The current system implements JWT-based authentication and stores the user role as:

```text
ADMIN
USER
```

Role-based authorization can be added as a separate layer.

## Current Project Status

Implemented:

- [x] FastAPI application
- [x] Uvicorn server
- [x] Health API
- [x] SQLite database
- [x] SQLAlchemy integration
- [x] Database dependencies
- [x] Application settings
- [x] Logging middleware
- [x] CORS configuration
- [x] User table
- [x] Password hashing
- [x] User registration
- [x] User login
- [x] JWT authentication
- [x] Protected Change Password API
- [x] ADMIN / USER roles
- [x] Quasar frontend integration

## Related Frontend

The Quasar frontend is maintained in a separate repository:

`healthapi-frontend`

The frontend provides:

- Login page
- Registration page
- Change Password page
- Pinia authentication store
- JWT persistence
- API communication

## Overall System Architecture

```text
                       HEALTH API SYSTEM
                              |
              +---------------+---------------+
              |                               |
              v                               v
       QUASAR FRONTEND                 FASTAPI BACKEND
       localhost:9000                 127.0.0.1:8000
              |                               |
              |          REST API             |
              +------------------------------>|
                                              |
                                      +-------+-------+
                                      |               |
                                      v               v
                                  Routers         Middleware
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

## Future Improvements

Planned improvements include:

- Authentication route guards
- ADMIN / USER role-based authorization
- Protected dashboard
- User profile
- Logout interface
- Centralized API client
- Better error handling
- Production environment configuration
- API deployment
- Frontend deployment