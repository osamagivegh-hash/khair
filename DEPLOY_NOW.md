# 🚀 Deploy Updated Code to Cloud Run

## Current Status

You've made several code improvements, but **the changes are only on your local machine**. They need to be deployed to Cloud Run for the upload to work.

## Quick Deploy

Run this command to deploy your changes:

```bash
gcloud builds submit --config=cloudbuild.yaml
```

**OR** if you're using automatic deployment from GitHub:

1. Commit your changes:
```bash
git add .
git commit -m "Fix Cloudinary upload configuration"
git push
```

2. Wait for automatic deployment to complete (check Cloud Run console)

## What Changed

The code has been refactored to:
- ✅ Use centralized `upload-config.ts` for all Cloudinary settings
- ✅ Better error handling and logging
- ✅ CORS support for cross-origin requests
- ✅ Cleaner validation logic

## After Deployment

1. **Check the diagnostic endpoint:**
   ```
   https://khair-backend-autodeploy-1033808631898.europe-west1.run.app/api/check-env
   ```
   Should show: `"configured": true`

2. **Test the upload:**
   - Go to: https://khair-backend-autodeploy-1033808631898.europe-west1.run.app/admin
   - Try uploading an image
   - Should work! ✅

## If Still Not Working

Check the Cloud Run logs for the actual error:
```
https://console.cloud.google.com/run/detail/europe-west1/khair-backend-autodeploy/logs
```

Look for:
- `✅ Cloudinary storage configured` - Good sign
- `⚠️ Cloudinary disabled` - Bad sign (env vars not set)
- `=== UPLOAD ERROR ===` - Shows the actual error

## Environment Variables Checklist

Make sure these are set on Cloud Run:
- [ ] `CLOUDINARY_CLOUD_NAME` = `dlsobyta0`
- [ ] `CLOUDINARY_API_KEY` = `778583779232949`
- [ ] `CLOUDINARY_API_SECRET` = `j5iHrKcFMgoUZYDxRNMAFR5z0vM`

Check at: https://console.cloud.google.com/run/detail/europe-west1/khair-backend-autodeploy/variables
