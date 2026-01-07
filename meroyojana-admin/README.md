# MeroYojana Admin Portal - Frontend

React-based frontend for the MeroYojana Government Admin Portal.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Features

- Modern React with Vite
- Responsive login page matching the design
- Authentication context for state management
- React Router for navigation
- Axios for API calls

## Project Structure

```
src/
  ├── pages/
  │   ├── Login.jsx       # Login page component
  │   └── Dashboard.jsx    # Dashboard (placeholder)
  ├── context/
  │   └── AuthContext.jsx # Authentication context
  ├── App.jsx              # Main app component
  └── main.jsx             # Entry point
```

## Environment

The frontend expects the backend API to be running on `http://localhost:5000` (configured in `vite.config.js`).

