# NoteNest

NoteNest is a production-minded personal notes dashboard with secure authentication, a clean notes workflow, and a polished responsive UI. It is structured as a deployable full-stack monorepo with a React frontend in `/client` and an Express + MongoDB backend in `/server`.

## Features

- User signup and login with hashed passwords using `bcryptjs`
- JWT-based authentication with protected dashboard access
- Personal notes dashboard with welcome state and note timestamps
- Notes CRUD support for create, list, and delete flows
- Modern responsive interface built with React, Vite, React Router, Axios, and Tailwind CSS
- Environment-based API configuration for separate frontend/backend deployment
- Backend security and production basics including `helmet`, CORS, and centralized error handling

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure

```text
.
|-- client
|   |-- .env.example
|   |-- index.html
|   |-- package.json
|   |-- postcss.config.js
|   |-- tailwind.config.js
|   |-- vite.config.js
|   `-- src
|       |-- components
|       |-- context
|       |-- lib
|       |-- pages
|       |-- App.jsx
|       |-- index.css
|       `-- main.jsx
|-- server
|   |-- .env.example
|   |-- package.json
|   `-- src
|       |-- config
|       |-- controllers
|       |-- middleware
|       |-- models
|       |-- routes
|       |-- utils
|       |-- app.js
|       `-- server.js
`-- README.md
```

## Environment Variables

### Server

Copy `server/.env.example` to `server/.env` and update the values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/notenest
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### Client

Copy `client/.env.example` to `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Run Locally

### 1. Install dependencies

```bash
cd server
npm install
```

```bash
cd client
npm install
```

### 2. Start the backend

```bash
cd server
npm run dev
```

The API will run on `http://localhost:5000`.

### 3. Start the frontend

```bash
cd client
npm run dev
```

The app will run on `http://localhost:5173`.

## API Overview

### Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Notes Routes

- `GET /api/notes`
- `POST /api/notes`
- `DELETE /api/notes/:id`

All notes routes require a `Bearer` token.

## Deployment

### Frontend

- Build with `npm run build` inside `/client`
- Deploy the generated `dist` folder to Netlify, Vercel, Cloudflare Pages, or similar
- Set `VITE_API_URL` to your deployed backend API base URL, for example `https://api.example.com/api`

### Backend

- Deploy `/server` to Render, Railway, Fly.io, or another Node hosting provider
- Set `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT`, and `CLIENT_URL`
- Point `CLIENT_URL` to the deployed frontend origin so CORS is restricted correctly

### MongoDB

- Use MongoDB Atlas or a managed MongoDB instance for production
- Update `MONGO_URI` with your cluster connection string

## Production Notes

- Use a strong `JWT_SECRET`
- Configure `CLIENT_URL` to the exact frontend origin in production
- Use HTTPS in deployed environments
- Consider adding refresh token flows, rate limiting, and audit logging as the product evolves
