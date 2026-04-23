# Health Vector

> Personalised wellness intelligence — bridging modern science with Ayurvedic wisdom.

Health Vector is a full-stack wellness assessment platform. It measures Physical, Mental, and Emotional health through a 35-question assessment, generates a personalised Wellness Index, layers in an Ayurvedic Prakriti profile, and produces actionable recommendations.

This repo is structured for a **split deployment**:

- **Frontend (React + Vite)** → deployed to **Vercel**
- **Backend (Express + Mongoose)** → deployed to **Render**
- **Database** → **MongoDB Atlas** (free tier works)
- **Source of truth** → **GitHub**

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
  - [1. MongoDB Atlas](#1-mongodb-atlas)
  - [2. GitHub](#2-github)
  - [3. Render (backend)](#3-render-backend)
  - [4. Vercel (frontend)](#4-vercel-frontend)
  - [5. Wire them together](#5-wire-them-together)
- [Seed Data](#seed-data)
- [API Overview](#api-overview)

---

## Tech Stack

**Frontend:** React 19, Vite 8, Tailwind CSS 4, React Router 7, Recharts, Axios, jsPDF, html2canvas, react-hot-toast, lucide-react, date-fns
**Backend:** Node.js ≥ 18, Express 4, Mongoose 8, JWT, bcryptjs, Helmet, express-rate-limit, Nodemailer
**Infra:** MongoDB Atlas, Render, Vercel, GitHub

---

## Project Structure

```
health-vector/
├── client/              # React + Vite frontend (deploys to Vercel)
│   ├── public/
│   ├── src/
│   ├── .env.example     # Frontend env template (VITE_API_URL)
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/              # Express + MongoDB backend (deploys to Render)
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── data/
│   ├── seed.js
│   ├── server.js
│   └── package.json
│
├── .env.example         # Backend env template (copy to server/.env locally)
├── .gitignore
└── README.md
```

---

## Local Development

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- A MongoDB connection string (Atlas or local)

### Setup

```bash
# 1. Backend
cd server
npm install
cp ../.env.example .env       # then edit .env with your values
npm run seed                  # optional: populate questions/sample data
node server.js                # starts on http://localhost:3001

# 2. Frontend (in a second terminal)
cd client
npm install
# Optional: cp .env.example .env.local — only needed if your backend
# is NOT at the same origin via the dev proxy.
npm run dev                   # starts on http://localhost:5000
```

The Vite dev server proxies `/api/*` to `http://localhost:3001`, so the frontend works without setting `VITE_API_URL` locally.

---

## Environment Variables

### Backend (`server/.env` locally · Render Environment in production)

| Variable | Required | Description |
|---|---|---|
| `PORT` | Local only | Dev port (default `3001`). Render injects this in production — leave unset there. |
| `NODE_ENV` | Yes | `development` or `production` |
| `MONGODB_URI` | Yes | MongoDB Atlas SRV connection string |
| `JWT_SECRET` | Yes | Long random string used to sign JWTs |
| `JWT_EXPIRES_IN` | No | Token lifetime (default `7d`) |
| `CLIENT_URL` | Yes (prod) | Comma-separated allowed frontend origins for CORS (e.g. your Vercel URL) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Optional | Nodemailer credentials for contact form & reset emails |
| `ADMIN_EMAIL` | Optional | Where contact-form messages are sent |

### Frontend (`client/.env.local` locally · Vercel Environment in production)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Production | Full URL of the backend API, e.g. `https://health-vector-api.onrender.com/api` |

If `VITE_API_URL` is unset, the app falls back to the relative path `/api` (used in local dev with the Vite proxy).

---

## Deployment

### 1. MongoDB Atlas

1. Create a free cluster at <https://www.mongodb.com/cloud/atlas>.
2. **Database Access** → add a user with a strong password.
3. **Network Access** → add IP `0.0.0.0/0` (Render's IPs aren't static on the free tier).
4. **Connect → Drivers** → copy the SRV connection string. Replace `<password>` and append a database name (e.g. `/healthvector`).

### 2. GitHub

1. Create a new empty repo on GitHub.
2. Push this codebase. Confirm `.env` files are **not** in the repo (the `.gitignore` handles this).

### 3. Render (backend)

1. <https://render.com> → **New → Web Service** → connect your GitHub repo.
2. Configure:
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
3. **Environment** tab — add the backend variables:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = your Atlas URI
   - `JWT_SECRET` = a long random string
   - `JWT_EXPIRES_IN` = `7d`
   - `CLIENT_URL` = leave blank for now (you'll set it after Vercel is deployed)
   - SMTP / `ADMIN_EMAIL` if you want emails
4. Deploy. Note the public URL (e.g. `https://health-vector-api.onrender.com`).

### 4. Vercel (frontend)

1. <https://vercel.com> → **Add New → Project** → import the same GitHub repo.
2. Configure:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. **Environment Variables** — add:
   - `VITE_API_URL` = `https://<your-render-service>.onrender.com/api`
4. Deploy. Note the public URL (e.g. `https://health-vector.vercel.app`).

### 5. Wire them together

1. Go back to Render → Environment → set:
   - `CLIENT_URL` = `https://health-vector.vercel.app` (your Vercel URL, no trailing slash)
2. Render will redeploy automatically.
3. Open your Vercel URL — registration, login, and dashboards should work end-to-end.

---

## Seed Data

After your backend is deployed (or locally), populate the assessment questions:

```bash
# Locally
cd server
npm run seed
```

For Render, you can run the seed once via the **Shell** tab on your service.

---

## API Overview

All routes are prefixed with `/api`.

**Auth** — `POST /auth/register`, `POST /auth/login`, `GET /auth/me`, `PUT /auth/me`, `PUT /auth/change-password`, `POST /auth/forgot-password`, `POST /auth/reset-password`, `DELETE /auth/me`
**Assessment** — `GET /assessment/questions`, `POST /assessment/submit`, `GET /assessment/latest`, `GET /assessment/history`
**Appointments** — `GET /appointments/my`, `GET /appointments/slots`, `POST /appointments/book`, `PUT /appointments/:id/cancel`
**Blog** — `GET /blog`, `GET /blog/:slug`
**Org / Admin** — `/org/*`, `/admin/*` (role-protected)
**Health check** — `GET /api/health`

---

## License

Private — not licensed for open-source distribution.
