# OpSprocket Deployment Guide

## Project Structure

```
opsprocket/                 ← One GitHub repo
├── frontend/               ← Vercel deploys THIS folder
├── backend/                ← Railway deploys THIS folder
├── CLAUDE.md
└── .gitignore
```

---

## Part 1: Create Supabase Project

1. Go to https://supabase.com → Click "Start your project"
2. Sign up with GitHub (easiest) or email
3. Click "New Project"
   - **Name**: `opsprocket`
   - **Database Password**: Create a strong one and SAVE IT SOMEWHERE SAFE
   - **Region**: Pick one close to your customers
4. Click "Create new project" and wait 2-3 minutes

### Collect Your Supabase Credentials

| What | Where to find it |
|------|------------------|
| **Project URL** | Settings → API → Project URL |
| **Anon Key** | Settings → API → anon public |
| **Database URL** | Settings → Database → Connection string → URI |

**Important**: In the Database URL, replace `[YOUR-PASSWORD]` with the password you created.

### Create Storage Bucket

1. Click "Storage" in left sidebar
2. Click "New bucket"
3. Name: `media`
4. Toggle "Public bucket" to ON
5. Click "Create bucket"

---

## Part 2: Push Code to GitHub

### 1. Create the repository on GitHub

1. Go to https://github.com → Click "+" → "New repository"
2. **Repository name**: `opsprocket`
3. **Private** or Public (your choice)
4. **Don't** check "Add README" (you already have files)
5. Click "Create repository"

### 2. Push your code

Run these commands in your terminal:

```bash
cd /Users/evansteinhilv/opsprocket-fresh-dev

git init

git add -A

git commit -m "Initial commit: OpSprocket foundation"

git remote add origin https://github.com/YOUR_USERNAME/opsprocket.git

git branch -M main

git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

If GitHub asks for a password, use a Personal Access Token:
1. GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Generate new token with "repo" permissions
3. Use that token as your password

---

## Part 3: Deploy Strapi to Railway

1. Go to https://railway.app → Sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your `opsprocket` repository
4. **Important**: Click "Add Root Directory" and type: `backend`

### Add Environment Variables in Railway

Click "Variables" tab and add each of these:

```
DATABASE_CLIENT = postgres
DATABASE_URL = postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
DATABASE_SSL = true
HOST = 0.0.0.0
PORT = 1337
APP_KEYS = [generate random string],[generate another random string]
ADMIN_JWT_SECRET = [generate random string]
API_TOKEN_SALT = [generate random string]
TRANSFER_TOKEN_SALT = [generate random string]
JWT_SECRET = [generate random string]
CORS_ORIGINS = http://localhost:3000
```

To generate random strings, use: https://generate-random.org/api-key
Or in terminal: `openssl rand -base64 32`

### Wait for Deployment

Railway will build your Strapi (5-10 minutes). Once done:

1. Click "Settings" → Find your Railway URL (like `opsprocket-backend-production.up.railway.app`)
2. Visit: `https://YOUR-RAILWAY-URL/admin`
3. Create your admin account (email + password)

### Create API Token in Strapi

1. Log into Strapi admin
2. Settings (gear icon) → API Tokens → Create new API Token
3. **Name**: `Frontend`
4. **Token type**: `Read-only`
5. Click Save → **Copy the token immediately and save it!**

---

## Part 4: Deploy Frontend to Vercel

1. Go to https://vercel.com → Sign up with GitHub
2. Click "Add New" → "Project"
3. Import your `opsprocket` repository
4. **Root Directory**: Click "Edit" → type `frontend` → Click "Continue"

### Add Environment Variables in Vercel

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-vercel-url.vercel.app` |
| `STRAPI_URL` | `https://your-railway-url.up.railway.app` |
| `STRAPI_API_TOKEN` | The token you copied from Strapi |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

5. Click "Deploy" and wait 2-3 minutes

---

## Part 5: Update CORS in Railway

Now that you have your Vercel URL, go back to Railway:

1. Click on your backend service → Variables
2. Update `CORS_ORIGINS`:
   ```
   CORS_ORIGINS = https://your-project.vercel.app,http://localhost:3000
   ```
3. Railway will automatically redeploy

---

## Credential Reference

| Credential | Goes in... | Variable Name |
|------------|-----------|---------------|
| Supabase Project URL | Vercel | `NEXT_PUBLIC_SUPABASE_URL` |
| Supabase Anon Key | Vercel | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Supabase Database URL | Railway | `DATABASE_URL` |
| Strapi API Token | Vercel | `STRAPI_API_TOKEN` |
| Railway URL | Vercel | `STRAPI_URL` |
| Vercel URL | Railway | `CORS_ORIGINS` |

---

## Your URLs After Setup

| What | URL | Purpose |
|------|-----|---------|
| **Supabase Dashboard** | supabase.com/dashboard | Manage database & files |
| **Strapi Admin** | your-railway-url.up.railway.app/admin | Edit website content |
| **Live Website** | your-project.vercel.app | What visitors see |

---

## Deployment Flow

```
GitHub: opsprocket repo
         │
         ├── /frontend ──────→ Vercel (public website)
         │
         └── /backend ───────→ Railway (Strapi CMS)
```

Both platforms watch the same repo. When you push changes:
- Changes in `/frontend` trigger a Vercel rebuild
- Changes in `/backend` trigger a Railway rebuild
