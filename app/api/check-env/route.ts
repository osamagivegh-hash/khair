import { NextResponse } from 'next/server';

/**
 * Diagnostic endpoint to check if Cloudinary environment variables are set
 * This helps debug upload issues
 */
export async function GET() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const allSet = !!(cloudName && apiKey && apiSecret);

  const databaseUrl = process.env.DATABASE_URL;
  const databaseConfigured = !!databaseUrl;

  return NextResponse.json({
    cloudinary: {
      configured: allSet,
      variables: {
        CLOUDINARY_CLOUD_NAME: cloudName ? `${cloudName.substring(0, 3)}***` : 'MISSING',
        CLOUDINARY_API_KEY: apiKey ? `${apiKey.substring(0, 3)}***` : 'MISSING',
        CLOUDINARY_API_SECRET: apiSecret ? 'SET' : 'MISSING',
      },
      status: allSet ? '✅ Configured' : '❌ Missing variables',
    },
    database: {
      configured: databaseConfigured,
      variables: {
        DATABASE_URL: databaseUrl 
          ? (databaseUrl.includes('mongodb') 
              ? `${databaseUrl.split('@')[0].split('://')[0]}://***@${databaseUrl.split('@')[1]?.split('/')[0] || '***'}/***`
              : 'SET (hidden)')
          : 'MISSING',
      },
      status: databaseConfigured ? '✅ Configured' : '❌ Missing',
      help: databaseConfigured 
        ? undefined 
        : 'Go to: https://console.cloud.google.com/run/detail/europe-west1/khair-backend-autodeploy/variables',
    },
    nodeEnv: process.env.NODE_ENV || 'not set',
    port: process.env.PORT || 'not set (Cloud Run sets this automatically)',
  });
}

