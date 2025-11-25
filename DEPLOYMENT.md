# Vercel Deployment Guide for Al-Khair Charity Website

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Project pushed to GitHub repository

## Deployment Steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Al-Khair charity website"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy on Vercel

#### Option A: Using Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `prisma generate && next build`
   - **Output Directory**: .next
   - **Install Command**: `npm install`

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### 3. Environment Variables

Add these environment variables in Vercel Dashboard (Settings → Environment Variables):

```
DATABASE_URL=file:./dev.db
NODE_ENV=production
```

**Important:** For production, you should use a hosted database instead of SQLite. Consider:
- **Vercel Postgres** (recommended for Vercel)
- **PlanetScale** (MySQL)
- **Supabase** (PostgreSQL)
- **Railway** (PostgreSQL)

### 4. Database Setup for Production

#### Using Vercel Postgres (Recommended)

1. In Vercel Dashboard, go to Storage → Create Database → Postgres
2. Copy the connection string
3. Update `DATABASE_URL` environment variable with the connection string
4. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

5. Generate Prisma client and push schema:
```bash
npx prisma generate
npx prisma db push
```

6. Seed the database:
```bash
npx tsx prisma/seed.ts
```

### 5. Post-Deployment

After deployment:
1. Visit your Vercel deployment URL
2. Check that all pages load correctly
3. Verify images display properly
4. Test navigation and forms
5. Check mobile responsiveness

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain (e.g., www.inmaa-charity.org)
3. Update DNS records as instructed by Vercel
4. SSL certificate is automatically provisioned

## Build Optimization

The project is configured with:
- ✅ Automatic image optimization
- ✅ Static page generation where possible
- ✅ Edge caching for better performance
- ✅ Automatic code splitting

## Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check database provider is accessible from Vercel
- Ensure Prisma schema matches database type

### Images Not Loading
- Verify image URLs are accessible
- Check Next.js image configuration
- Ensure external domains are allowed in `next.config.ts`

## Support

For issues:
- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Prisma Documentation: https://www.prisma.io/docs

---

**Your website is now ready for deployment! 🚀**
