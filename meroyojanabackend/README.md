# MeroYojana Backend API

Backend server for the MeroYojana Admin Portal built with Node.js, Express, and PostgreSQL.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your database credentials:
- DB_HOST: PostgreSQL host (default: localhost)
- DB_PORT: PostgreSQL port (default: 5432)
- DB_NAME: Database name (default: meroyojana)
- DB_USER: Database user (default: postgres)
- DB_PASSWORD: Database password
- JWT_SECRET: Secret key for JWT tokens (change in production!)

4. Make sure PostgreSQL is running and create the database:
```sql
CREATE DATABASE meroyojana;
```

5. Run the server:
```bash
npm run dev
```

The server will automatically create necessary tables on first run.

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

**Important:** Change the default password in production!

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with username/email and password
- `GET /api/auth/me` - Get current user (requires authentication)
- `POST /api/auth/logout` - Logout (requires authentication)

### Health Check
- `GET /api/health` - Server health check

## Database Schema

The server automatically creates the following tables:
- `users` - User accounts with roles and office assignments
- `audit_logs` - Audit trail for all actions

