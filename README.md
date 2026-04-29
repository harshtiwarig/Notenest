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

### Recommended Setup

- Frontend: Vercel
- Backend API: Render
- Database: MongoDB Atlas

This split works well for a Vite frontend plus an Express API, and the repo now includes:

- [client/vercel.json](/Users/harshtiwari/Downloads/crud/client/vercel.json) for Vercel SPA routing
- [render.yaml](/Users/harshtiwari/Downloads/crud/render.yaml) for a Render backend service blueprint

### Backend on Render

1. Go to [Render Dashboard](https://dashboard.render.com/) and create a new Blueprint or Web Service from your GitHub repo.
2. If you use the included `render.yaml`, Render will detect the backend service automatically.
3. Confirm these settings:
   - Root directory: `server`
   - Build command: `npm install`
   - Start command: `npm start`
   - Health check path: `/api/health`
4. Set or confirm these environment variables:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `CLIENT_URL` = your deployed frontend URL, for example `https://notenest.vercel.app`
   - `JWT_SECRET` = generated automatically if you use the blueprint
   - `JWT_EXPIRES_IN` = `7d`
5. Deploy the service and copy the backend URL, for example `https://notenest-api.onrender.com`

### Frontend on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/new) and import the same GitHub repository.
2. Set the project root directory to `client`.
3. Vercel should detect Vite automatically.
4. Add this environment variable before deploying:
   - `VITE_API_URL` = `https://your-render-backend.onrender.com/api`
5. Deploy the frontend.

The included `vercel.json` adds a rewrite so React Router routes such as `/login` and `/signup` work correctly in production.

### Final Wiring

After both deploys finish:

1. Copy your Vercel frontend URL.
2. Go back to Render and set `CLIENT_URL` to that exact frontend origin.
3. Trigger a redeploy on Render so CORS uses the final live URL.
4. Test:
   - `https://your-backend-url.onrender.com/api/health`
   - `https://your-frontend-url.vercel.app/login`

### MongoDB

- Use MongoDB Atlas or a managed MongoDB instance for production
- Update `MONGO_URI` with your cluster connection string

### Notes

- Render free web services can sleep after inactivity, so the first API request may be slower.
- Vercel and Render use different live URLs, so `CLIENT_URL` and `VITE_API_URL` must point to each other correctly.
- Do not put secrets in the frontend environment. Only `VITE_API_URL` belongs in Vercel.

## Production Notes

- Use a strong `JWT_SECRET`
- Configure `CLIENT_URL` to the exact frontend origin in production
- Use HTTPS in deployed environments
- Consider adding refresh token flows, rate limiting, and audit logging as the product evolves
