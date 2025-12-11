# OpSprocket Project

## Overview
OpSprocket.com - A modern, SEO-optimized website with a headless CMS architecture.

## Architecture

```
opsprocket-fresh-dev/
├── frontend/          # Next.js 16 (App Router) - Deployed on Vercel
│   ├── src/
│   │   ├── app/       # App Router pages
│   │   ├── components/
│   │   │   ├── ui/    # shadcn/ui components
│   │   │   ├── layout/# Header, Footer
│   │   │   ├── common/# Shared components
│   │   │   └── sections/# Page sections
│   │   ├── lib/
│   │   │   ├── api/   # Strapi API client
│   │   │   └── utils/ # Utility functions
│   │   ├── types/     # TypeScript types
│   │   └── config/    # Site configuration
│   └── public/        # Static assets
│
└── backend/           # Strapi 5 CMS - Deployed on Railway
    ├── config/        # Strapi configuration
    ├── src/
    │   ├── api/       # Content-types & controllers
    │   ├── admin/     # Admin customization
    │   └── plugins/   # Custom plugins
    └── public/        # Uploaded files (local dev only)
```

## Tech Stack

| Component | Technology | Hosting |
|-----------|-----------|---------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4, shadcn/ui | Vercel |
| CMS | Strapi 5.31.x | Railway |
| Database | PostgreSQL | Supabase |
| Media Storage | Supabase Storage Buckets | Supabase |
| Icons | Lucide React | - |

## Commands

### Frontend (from /frontend)
```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run lint         # Run ESLint
```

### Backend (from /backend)
```bash
npm run develop      # Start Strapi dev server
npm run build        # Build admin panel
npm run start        # Start production server
```

## Environment Variables

### Frontend (.env.local)
- `NEXT_PUBLIC_SITE_URL` - Production site URL
- `STRAPI_URL` - Strapi API base URL
- `STRAPI_API_TOKEN` - API token for authenticated requests
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

### Backend (.env)
- `DATABASE_URL` - PostgreSQL connection string (Supabase)
- `APP_KEYS` - Strapi session keys
- `ADMIN_JWT_SECRET` - Admin JWT secret
- `API_TOKEN_SALT` - API token salt
- `CORS_ORIGINS` - Allowed CORS origins

## Deployment

### Vercel (Frontend)
1. Connect GitHub repo to Vercel
2. Set root directory to `frontend`
3. Add environment variables
4. Deploy

### Railway (Backend)
1. Create new Railway project
2. Add PostgreSQL service OR use Supabase DATABASE_URL
3. Set environment variables
4. Deploy from GitHub (set root to `backend`)

## SEO Features
- Server-side rendering with React Server Components
- Automatic sitemap.xml generation
- Dynamic robots.txt
- OpenGraph and Twitter card metadata
- Core Web Vitals optimized
- Semantic HTML structure
