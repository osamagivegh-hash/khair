# ⚠️ CRITICAL: Check USE_CLOUDINARY Environment Variable

## Potential Issue Found

Looking at your `upload-config.ts`, I found that Cloudinary can be disabled even if credentials are set!

## The Problem

Line 24-26 in `lib/upload-config.ts`:
```typescript
const isCloudinaryConfigured =
  hasCloudinaryCredentials &&
  useCloudinaryEnv !== 'false';  // ← This line!
```

**If `USE_CLOUDINARY` is set to `"false"`, uploads will fail even with valid credentials!**

## Quick Fix

### Option 1: Remove USE_CLOUDINARY from Cloud Run (Recommended)

1. Go to: https://console.cloud.google.com/run/detail/europe-west1/khair-backend-autodeploy/variables
2. Check if there's a variable called `USE_CLOUDINARY`
3. If it exists and is set to `false`, **DELETE IT** or change it to `true`
4. Click "DEPLOY"

### Option 2: Check via Diagnostic Endpoint

Visit: https://khair-backend-autodeploy-1033808631898.europe-west1.run.app/api/check-env

This will tell you if Cloudinary is configured.

## Environment Variables You Need

Make sure ONLY these are set (no `USE_CLOUDINARY`):

| Variable | Value |
|----------|-------|
| `CLOUDINARY_CLOUD_NAME` | `dlsobyta0` |
| `CLOUDINARY_API_KEY` | `778583779232949` |
| `CLOUDINARY_API_SECRET` | `j5iHrKcFMgoUZYDxRNMAFR5z0vM` |

**Do NOT set:**
- ❌ `USE_CLOUDINARY=false` (this will disable Cloudinary)

## After Fixing

1. Deploy the new revision
2. Check `/api/check-env` - should show `"configured": true`
3. Test upload - should work!

## If You Want to Deploy Code Changes

The code on your local machine has been updated, but you need to deploy it:

```bash
# Commit and push (if using GitHub auto-deploy)
git add .
git commit -m "Fix Cloudinary upload"
git push

# OR use Cloud Build directly
gcloud builds submit --config=cloudbuild.yaml
```

## Summary

**Most likely issue:** `USE_CLOUDINARY` is set to `false` on Cloud Run
**Quick fix:** Remove that variable or set it to `true`
**Then:** Redeploy and test
