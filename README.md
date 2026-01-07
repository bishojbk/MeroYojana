# MeroYojana - Government Admin Portal

A comprehensive government admin portal for managing welfare schemes, citizen applications, and document verification processes.

## Project Structure

```
meroyojana/
├── meroyojana-admin/      # Frontend (React + Vite)
└── meroyojanabackend/     # Backend (Node.js + Express + PostgreSQL)
```

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd meroyojanabackend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `meroyojanabackend` directory:
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=meroyojana
DB_USER=postgres
DB_PASSWORD=your_password_here

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

4. Create the PostgreSQL database:
```sql
CREATE DATABASE meroyojana;
```

5. Start the backend server:
```bash
npm run dev
```

The backend will be running on `http://localhost:5000`

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd meroyojana-admin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:3000`

## Features Implemented

✅ **Login Page UI** - Fully responsive login interface matching the design
✅ **Authentication System** - JWT-based authentication with role-based access
✅ **Database Setup** - PostgreSQL with automatic table initialization
✅ **Security** - Password hashing, JWT tokens, audit logging

## Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Tokens)
- bcryptjs (Password hashing)

## Next Steps

The following features are ready to be implemented based on the functional requirements:

- User & Role Management
- Scheme Creation & Management
- Document Verification Module
- Application Review & Workflow
- Dashboard & Reporting
- Notifications System
- Complaints & Grievance Management

## License

© 2024 Government of Nepal. All rights reserved.

