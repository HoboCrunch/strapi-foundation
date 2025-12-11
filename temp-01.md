# OpSprocket Project Status

## What We've Built

### Frontend (Complete)
- **Next.js 16** with App Router, TypeScript, Tailwind CSS 4
- **shadcn/ui** components installed (button, card, navigation-menu, sheet, dialog, input, textarea, label, separator, avatar, dropdown-menu)
- **Lucide React** icons
- SEO-optimized layout with:
  - Dynamic sitemap.ts
  - Dynamic robots.ts
  - OpenGraph & Twitter card metadata
  - Responsive Header & Footer components
- Strapi API client ready (`src/lib/api/strapi.ts`)
- TypeScript types for Strapi content (`src/types/strapi.ts`)
- Environment variables configured

**Status**: Ready to deploy to Vercel

---

### Backend (Strapi 5.31) - DEPLOYED!
- Strapi 5 project configured with:
  - PostgreSQL support (via Supabase pooler)
  - TypeScript
  - CORS configured for frontend
  - All secrets generated
- Database config supports both SQLite (local) and PostgreSQL (production)

**Status**: **LIVE** on Railway

**Live URL**: https://strapi-foundation-production.up.railway.app/admin

---

## Railway Deployment - SOLVED

### The Problem (Fixed)
Railway's build environment had issues with native bindings for `@swc/core`, `@rollup/rollup-linux-x64-gnu`, and `sharp`.

### The Solution
We fixed it by:

1. **Adding Linux native binaries as optional dependencies** in `package.json`:
```json
"optionalDependencies": {
  "@img/sharp-linux-x64": "^0.33.5",
  "@rollup/rollup-linux-x64-gnu": "^4.28.0",
  "@swc/core-linux-x64-gnu": "^1.10.0",
  "@swc/core-linux-x64-musl": "^1.10.0"
}
```

2. **Adding rebuild step to build script**:
```json
"build": "npm rebuild @swc/core @rollup/rollup-linux-x64-gnu && strapi build"
```

3. **Creating `railway.toml`** to ensure clean builds:
```toml
[build]
builder = "nixpacks"

[build.nixpacks]
cache = false

[deploy]
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3
```

4. **Using Supabase Connection Pooler** (IPv4) instead of direct connection (IPv6):
   - Direct connection uses IPv6 which Railway doesn't support
   - Pooler URL format: `postgresql://postgres.PROJECT_REF:PASSWORD@aws-1-us-east-1.pooler.supabase.com:5432/postgres`

---

## Environment Variables (Working Config)

### Railway (Backend) - Currently Set
```
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=http://localhost:1337
IS_PROXIED=true
APP_KEYS=tLe25EitdM4EVW+dGIzchBGOquC6HWHE2FOCwC+W10s=,rDHFoOrcbgTgU/3QZFDIweR8ls9Y7yn40Q6DoOHSJxA=
API_TOKEN_SALT=2s1SQxjBvkG7bcXTbfjUINJBtLIJwRHmsP68rx4xpu0=
ADMIN_JWT_SECRET=Kw73SxLYLgrI5rO7bWKJye39noVqJ84g/F7chPaHYUM=
TRANSFER_TOKEN_SALT=EOi2/qJJAUYALw0+Dp2KwrTxumWGe097rIrV17QoUeg=
JWT_SECRET=CLG7Hnmh25MPcRr6hv8UhnHr53AKuxsjVxhtHq/cBIk=
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://postgres.daoeydzhxptykjdqeqnw:[PASSWORD]@aws-1-us-east-1.pooler.supabase.com:5432/postgres
DATABASE_SSL=true
NODE_OPTIONS=--dns-result-order=ipv4first
SUPABASE_URL=https://daoeydzhxptykjdqeqnw.supabase.co
SUPABASE_KEY=[service_role_key]
CORS_ORIGINS=http://localhost:3000,https://opsprocket.com
```

### For Vercel (Frontend) - To Configure
```
NEXT_PUBLIC_SITE_URL=https://opsprocket.com
STRAPI_URL=https://strapi-foundation-production.up.railway.app
STRAPI_API_TOKEN=[create in Strapi admin → Settings → API Tokens]
NEXT_PUBLIC_SUPABASE_URL=https://daoeydzhxptykjdqeqnw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your_anon_key]
```

---

## File Structure

```
opsprocket-fresh-dev/
├── frontend/                 ✅ Complete - Ready for Vercel
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx    # SEO-optimized root layout
│   │   │   ├── page.tsx      # Homepage
│   │   │   ├── sitemap.ts    # Dynamic sitemap
│   │   │   └── robots.ts     # Dynamic robots.txt
│   │   ├── components/
│   │   │   ├── ui/           # 11 shadcn components
│   │   │   └── layout/       # Header, Footer
│   │   ├── lib/api/strapi.ts # API client
│   │   ├── types/strapi.ts   # TypeScript types
│   │   └── config/site.ts    # Site config
│   ├── .env.local
│   ├── .env.example
│   └── vercel.json
│
├── backend/                  ✅ DEPLOYED on Railway
│   ├── config/
│   │   ├── database.ts       # PostgreSQL/SQLite config
│   │   ├── server.ts
│   │   ├── admin.ts
│   │   ├── middlewares.ts    # CORS config
│   │   └── plugins.ts
│   ├── src/
│   │   ├── index.ts
│   │   └── admin/app.ts
│   ├── .env                  # Local dev (gitignored)
│   ├── .env.example          # Template
│   ├── .node-version         # Node 20
│   ├── railway.toml          # Railway config (cache disabled)
│   └── Procfile              # Railway start command
│
├── CLAUDE.md                 # Project docs
├── temp.md                   # Deployment guide
└── temp-01.md                # This file
```

---

## Supabase Setup

- **Project URL**: https://daoeydzhxptykjdqeqnw.supabase.co
- **Database**: PostgreSQL connected via pooler
- **Region**: us-east-1
- **Storage Bucket**: Need to create "media" bucket for uploads

---

## Next Steps

1. **Create Strapi Admin Account**
   - Go to https://strapi-foundation-production.up.railway.app/admin
   - Create your first admin user

2. **Generate Strapi API Token**
   - Settings → API Tokens → Create new API Token
   - Use "Full access" for now

3. **Deploy Frontend to Vercel**
   - Connect GitHub repo
   - Set root directory to `frontend`
   - Add environment variables (see above)
   - Deploy

4. **Update Railway PUBLIC_URL**
   - Change from `http://localhost:1337` to `https://strapi-foundation-production.up.railway.app`

5. **Create Supabase Storage Bucket**
   - Create "media" bucket for Strapi uploads

---

## Summary

| Component | Status | URL/Action |
|-----------|--------|------------|
| Frontend | ✅ Ready | Deploy to Vercel |
| Backend | ✅ **LIVE** | https://strapi-foundation-production.up.railway.app/admin |
| Supabase | ✅ Connected | Create media storage bucket |
| GitHub | ✅ Pushed | All code committed |

---

## Key Learnings

### Railway + Strapi Native Bindings Fix
When deploying Strapi to Railway, you need to:
1. Add Linux-specific native binaries as `optionalDependencies`
2. Run `npm rebuild` for native packages in the build script
3. Use Supabase **Connection Pooler** (not direct connection) for IPv4 support
4. The pooler region must match your Supabase project region (check dashboard)
