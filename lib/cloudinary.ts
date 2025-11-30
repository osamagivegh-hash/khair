// Import cloudinary from upload-config
import { cloudinary, isCloudinaryConfigured } from './upload-config';

// Re-export for backward compatibility
export { cloudinary as default, isCloudinaryConfigured };

export async function uploadImage(file: File | Buffer, folder: string = 'al-khair'): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // Import upload config
      const { cloudinary, checkCloudinaryConfig, cloudinaryFolder: defaultFolder } = await import('./upload-config');
      
      // Use provided folder or default
      const uploadFolder = folder || defaultFolder;

      // Check configuration at runtime
      const isConfigured = checkCloudinaryConfig();
      
      console.log('[Cloudinary Upload] Starting upload to folder:', uploadFolder);
      console.log('[Cloudinary Upload] Cloudinary configured:', isConfigured);

      // Validate configuration before attempting upload
      if (!isConfigured) {
        const error = new Error('Cloudinary is not properly configured. Missing environment variables.');
        console.error('[Cloudinary Upload] Configuration error:', error.message);
        console.error('[Cloudinary Upload] Env vars:', {
          CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
          CLOUDINARY_API_KEY: !!process.env.CLOUDINARY_API_KEY,
          CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET,
        });
        reject(error);
        return;
      }
      
      // Re-configure Cloudinary at runtime to ensure it uses current env vars
      const currentCloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
      const currentApiKey = process.env.CLOUDINARY_API_KEY?.trim();
      const currentApiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
      
      if (currentCloudName && currentApiKey && currentApiSecret) {
        cloudinary.config({
          cloud_name: currentCloudName,
          api_key: currentApiKey,
          api_secret: currentApiSecret,
          secure: true,
        });
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
          folder: uploadFolder,
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

