# Forever Ecommerce App

## 1. Project Overview

This repository contains an admin dashboard, a customer storefront, and an Express API:

- `admin/` — React/Vite admin dashboard.
- `backend/` — Node.js/Express API, MongoDB data store, and Cloudinary image uploads.
- `frontend/` — React/Vite customer storefront.

This guide covers running the backend and admin dashboard locally. The customer storefront is not needed to open the admin dashboard.

## 2. Technologies Used

- React 19 and Vite 8 for the admin and customer frontends.
- Node.js, Express 5, and Mongoose for the API.
- MongoDB for application data.
- Cloudinary for product image uploads.
- JSON Web Tokens (JWT) for user and admin authentication.
- Stripe for the storefront's Stripe checkout.

## 3. Prerequisites

- Node.js **20.19 or newer**, or **22.12 or newer**. These versions satisfy the backend's Mongoose and the frontend's Vite requirements. npm 9 or newer is recommended for the version-3 lockfiles; npm is included with Node.js.
- A MongoDB connection string (for example, from MongoDB Atlas).
- A Cloudinary account and its `CLOUDINARY_URL`.
- A Stripe secret key if the backend is to start: the backend initializes Stripe when it loads, even if you are only using the admin dashboard.
- A terminal opened at the repository root.

Check the installed versions:

```powershell
node --version
npm --version
```

## 4. Backend Setup

From the repository root, initialize the backend:

```powershell
cd .\backend
npm ci
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
} else {
    Write-Host ".env already exists. Keeping the existing configuration."
}
notepad .env
```

Fill in the values described in [Environment Configuration](#6-environment-configuration), save the file, and start the development server:

```powershell
npm run server
```

`npm run server` uses nodemon and restarts the server when backend files change. `npm start` runs `node server.js` without nodemon.

The API listens on port `4000` by default, or on the port set by `PORT`. Check the startup terminal for `Server started on PORT: 4000` and `DB Connected`. In a second terminal, check the API root:

```powershell
Invoke-RestMethod http://localhost:4000/
```

It should return `API WORKING`. The root response alone does not confirm the database connection; look for `DB Connected` in the backend terminal as well.

## 5. Admin Frontend Setup

In another terminal, from the repository root:

```powershell
cd .\admin
npm ci
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
} else {
    Write-Host ".env already exists. Keeping the existing configuration."
}
notepad .env
```

Set `VITE_BACKEND_URL` to the backend's base URL, with no trailing slash. With the default backend port, use:

```dotenv
VITE_BACKEND_URL=http://localhost:4000
```

Start Vite:

```powershell
npm run dev
```

Open **http://localhost:5174/** in your browser. The admin Vite configuration specifies port `5174`; if that port is occupied, Vite may choose and print another port. The Vite page URL and backend API URL are different: the admin page is at `http://localhost:5174/`, and API requests go to `http://localhost:4000`.

The login form sends the entered email and password to `POST /api/user/admin`. The backend compares them with `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `backend/.env`, then signs a JWT with `JWT_SECRET`. The admin app stores the token in browser local storage and sends it with protected admin API requests. Use the local credentials you configured; no administrator credentials are included in this repository's documentation.

## 6. Environment Configuration

`backend/.env.example` and `admin/.env.example` are tracked templates containing variable names and safe placeholders. Copy each template to `.env` in the same folder and fill in that local file. `.env` is ignored by Git and must not be committed.

### Backend variables

| Variable | Required? | Purpose |
|---|---|---|
| `PORT` | Optional | API listening port. Defaults to `4000` in `backend/server.js`. |
| `MONGODB_URI` | Yes | MongoDB connection string. Mongoose connects to the `e-commerce` database. |
| `CLOUDINARY_URL` | Yes | Cloudinary URL used by the Cloudinary SDK for product image uploads. Backend startup throws an error if it is missing. |
| `JWT_SECRET` | Yes | Secret used to sign and verify user and admin JWTs. |
| `ADMIN_EMAIL` | Yes for admin login | Local administrator login email. |
| `ADMIN_PASSWORD` | Yes for admin login | Local administrator login password. |
| `STRIPE_SECRET_KEY` | Yes for backend startup | Stripe secret key. Stripe is initialized as the order controller loads. Use a test-mode key for local development. |

To obtain these values:

- **MongoDB:** Create a MongoDB Atlas cluster (or use an existing MongoDB server), create a database user, and allow your development machine's IP in Atlas Network Access. Copy the driver's connection string and replace its username, password, and any database options as appropriate. URL-encode special characters in the database password.
- **Cloudinary:** In your Cloudinary account dashboard, obtain the account's Cloudinary URL and set it as `CLOUDINARY_URL`. Treat it as a secret; it contains account credentials.
- **Stripe:** Use a test-mode secret key from the Stripe Dashboard. The application reads `STRIPE_SECRET_KEY`; never put a live key in a local example or commit it.
- **Admin login and JWT:** Choose a local admin email and password and a long, unique random `JWT_SECRET`. Set them only in `backend/.env`. The login is configured through these environment variables; there is no separate admin-user creation step.

### Admin variable

| Variable | Purpose |
|---|---|
| `VITE_BACKEND_URL` | Base URL used by the admin app for API requests. For the default local backend, set it to `http://localhost:4000`. If you change backend `PORT`, use that port here too. |

Vite reads this variable when it starts; restart `npm run dev` after changing `admin/.env`.

### Copying templates safely

Run each command from the directory containing that application's `.env.example`. The commands preserve an existing `.env` rather than overwriting local configuration.

**Windows PowerShell:**

```powershell
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
} else {
    Write-Host ".env already exists. Keeping the existing configuration."
}
```

**macOS/Linux:**

```sh
if [ ! -f .env ]; then
  cp .env.example .env
else
  echo ".env already exists. Keeping the existing configuration."
fi
```

Initialize each folder separately:

```powershell
# From the repository root: backend
cd .\backend
npm ci
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
} else {
    Write-Host ".env already exists. Keeping the existing configuration."
}
```

```powershell
# From the repository root: admin (open a separate terminal, or return to the root first)
cd .\admin
npm ci
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
} else {
    Write-Host ".env already exists. Keeping the existing configuration."
}
```

## 7. Running Both Applications

Complete the environment setup above before starting either application. Use two terminals, each opened at the repository root.

### Terminal 1 — Backend

```powershell
cd .\backend
npm ci
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
} else {
    Write-Host ".env already exists. Keeping the existing configuration."
}
notepad .env
npm run server
```

Before starting, save valid MongoDB, Cloudinary, Stripe, JWT, and admin values in `backend/.env`. The backend API is `http://localhost:4000` unless `PORT` is changed.

### Terminal 2 — Admin Frontend

```powershell
cd .\admin
npm ci
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
} else {
    Write-Host ".env already exists. Keeping the existing configuration."
}
notepad .env
npm run dev
```

Set `VITE_BACKEND_URL=http://localhost:4000` in `admin/.env` (or use the actual backend port if changed). Open the URL Vite prints; it is normally `http://localhost:5174/`.

Request flow:

```text
Admin Browser → Admin React/Vite Application → Express Backend API → MongoDB Atlas
                                                        └────→ Cloudinary (product image uploads)
```

Cloudinary is used by the backend when an administrator uploads product images. The Stripe configuration is needed for backend startup and customer checkout, but admin API requests go to Express and MongoDB.

## 8. Useful Commands

Run these commands from the relevant application directory:

| Directory | Command | Purpose |
|---|---|---|
| `backend/` | `npm ci` | Install the exact dependencies from `package-lock.json`. |
| `backend/` | `npm run server` | Run the API with nodemon. |
| `backend/` | `npm start` | Run the API with Node.js. |
| `admin/` | `npm ci` | Install the exact dependencies from `package-lock.json`. |
| `admin/` | `npm run dev` | Start the Vite development server. |
| `admin/` | `npm run build` | Create the production build in `admin/dist/`. |
| `admin/` | `npm run preview` | Preview the production build locally. |
| `admin/` | `npm run lint` | Run Oxlint. |

## 9. Troubleshooting

- **Missing or invalid `.env` values:** Confirm you created the file in the correct folder (`backend/.env` or `admin/.env`), used the exact variable names above, and replaced all placeholders. Restart the affected process after editing the file.
- **Backend exits with `CLOUDINARY_URL is missing from .env`:** Set a valid `CLOUDINARY_URL` in `backend/.env`. Do not use a placeholder when running the application.
- **MongoDB connection failure:** Check `MONGODB_URI`, database username/password, password URL encoding, Atlas Network Access, and that the cluster is available. Look for `DB Connected` in the backend terminal.
- **Cloudinary authentication or image upload failure:** Re-copy the Cloudinary URL from the correct account, ensure its credentials are valid, and restart the backend. Image uploads are handled by the backend, not Vite.
- **Admin login fails:** Confirm `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `backend/.env` exactly match the values entered on the login page, and that `JWT_SECRET` is configured. The login request is `POST /api/user/admin`; inspect the backend terminal and browser console for errors.
- **Admin requests use the wrong API or fail to connect:** Set `VITE_BACKEND_URL` in `admin/.env` to the backend base URL (normally `http://localhost:4000`), with no trailing slash, then restart Vite. Do not set it to the admin page URL (`http://localhost:5174`).
- **Port conflict:** Change backend `PORT` and update `admin/.env` to the same API port. The admin dev server is configured for port `5174`; if Vite selects a different port, use the URL Vite prints to open the admin page.
- **Missing npm dependencies:** Run `npm ci` from the specific `backend/` or `admin/` directory. Each application has its own lockfile and dependencies.
- **CORS error:** The backend currently enables `cors()` without an origin restriction. Confirm the API is running and `VITE_BACKEND_URL` points to it; a wrong port, stopped backend, or failed request can appear as a browser network/CORS error.
- **Backend startup fails due to Stripe configuration:** Set `STRIPE_SECRET_KEY` to a valid Stripe test secret key. The server initializes Stripe at startup even when no Stripe checkout is being made.

## 10. Security Notes

- Keep real values in local `.env` files only. The backend and admin `.gitignore` files exclude `.env`; the backend ignore rules also explicitly allow `.env.example` templates to remain tracked.
- Never replace template placeholders with real credentials in `.env.example`, README files, source code, or commits. Review `git status` before committing and do not stage `.env`.
- `CLOUDINARY_URL`, `MONGODB_URI`, `STRIPE_SECRET_KEY`, `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` are configuration secrets or sensitive local values. Do not share them or expose them in browser code.
- The Vite `VITE_BACKEND_URL` is a public endpoint, not a secret. Do not put credentials or tokens in `admin/.env` variables prefixed with `VITE_`.
