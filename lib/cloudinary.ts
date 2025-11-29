import { v2 as cloudinary } from 'cloudinary';

// Validate environment variables
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Only log in runtime (not during build)
const isRuntime = typeof window === 'undefined' && process.env.NODE_ENV !== undefined;

// Configure Cloudinary - re-check at runtime to ensure it's configured
// This function can be called to ensure config is up-to-date
export function ensureCloudinaryConfig() {
  const currentCloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const currentApiKey = process.env.CLOUDINARY_API_KEY;
  const currentApiSecret = process.env.CLOUDINARY_API_SECRET;

  if (currentCloudName && currentApiKey && currentApiSecret) {
    cloudinary.config({
      cloud_name: currentCloudName,
      api_key: currentApiKey,
      api_secret: currentApiSecret,
      secure: true,
    });
    return true;
  }
  return false;
}

// Only configure if all variables are present
if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
  
  // Only log in runtime to avoid build-time noise
  if (isRuntime) {
    console.log('[Cloudinary Config] Initialized successfully');
  }
} else {
  // Only log errors at runtime, not during build
  if (isRuntime) {
    console.error('[Cloudinary Config] ERROR: Missing required environment variables!');
    console.error('[Cloudinary Config] Required: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
    console.error('[Cloudinary Config] Required variables:', {
      CLOUDINARY_CLOUD_NAME: cloudName ? 'SET' : 'MISSING',
      CLOUDINARY_API_KEY: apiKey ? 'SET' : 'MISSING',
      CLOUDINARY_API_SECRET: apiSecret ? 'SET' : 'MISSING',
    });
  }
}

export default cloudinary;

export async function uploadImage(file: File | Buffer, folder: string = 'al-khair'): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // Re-check configuration at runtime
      const currentCloudName = process.env.CLOUDINARY_CLOUD_NAME;
      const currentApiKey = process.env.CLOUDINARY_API_KEY;
      const currentApiSecret = process.env.CLOUDINARY_API_SECRET;

      console.log('[Cloudinary Upload] Starting upload to folder:', folder);
      console.log('[Cloudinary Upload] Config check:', {
        hasCloudName: !!currentCloudName,
        hasApiKey: !!currentApiKey,
        hasApiSecret: !!currentApiSecret,
      });

      // Ensure Cloudinary is configured with current env vars
      if (currentCloudName && currentApiKey && currentApiSecret) {
        cloudinary.config({
          cloud_name: currentCloudName,
          api_key: currentApiKey,
          api_secret: currentApiSecret,
          secure: true,
        });
      }

      // Validate configuration before attempting upload
      if (!currentCloudName || !currentApiKey || !currentApiSecret) {
        const error = new Error('Cloudinary is not properly configured. Missing environment variables.');
        console.error('[Cloudinary Upload] Configuration error:', error.message);
        console.error('[Cloudinary Upload] Missing variables:', {
          CLOUDINARY_CLOUD_NAME: !currentCloudName,
          CLOUDINARY_API_KEY: !currentApiKey,
          CLOUDINARY_API_SECRET: !currentApiSecret,
        });
        reject(error);
        return;
      }

      let buffer: Buffer;

      if (file instanceof File) {
        console.log('[Cloudinary Upload] Converting File to Buffer:', {
          name: file.name,
          type: file.type,
          size: file.size,
        });
        const arrayBuffer = await file.arrayBuffer();
        buffer = Buffer.from(arrayBuffer);
      } else {
        console.log('[Cloudinary Upload] Using provided Buffer, size:', file.length);
        buffer = file;
      }

      console.log('[Cloudinary Upload] Buffer size:', buffer.length, 'bytes');

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ],
        },
        (error, result) => {
          if (error) {
            console.error('[Cloudinary Upload] Upload failed:', {
              message: error.message,
              name: error.name,
              http_code: (error as any).http_code,
              error: error,
            });
            reject(error);
          } else if (result) {
            console.log('[Cloudinary Upload] Upload successful:', {
              url: result.secure_url,
              public_id: result.public_id,
              format: result.format,
            });
            resolve(result.secure_url);
          } else {
            const err = new Error('Upload failed: No result returned from Cloudinary');
            console.error('[Cloudinary Upload]', err.message);
            reject(err);
          }
        }
      );

      uploadStream.end(buffer);
    } catch (error) {
      console.error('[Cloudinary Upload] Unexpected error:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      reject(error);
    }
  });
}

export async function deleteImage(publicId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

