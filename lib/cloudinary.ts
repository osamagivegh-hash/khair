import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dlsobyta0',
  api_key: process.env.CLOUDINARY_API_KEY || '778583779232949',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'j5iHrKcFMgoUZYDxRNMAFR5z0vM',
});

export default cloudinary;

export async function uploadImage(file: File | Buffer, folder: string = 'al-khair'): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      let buffer: Buffer;
      
      if (file instanceof File) {
        const arrayBuffer = await file.arrayBuffer();
        buffer = Buffer.from(arrayBuffer);
      } else {
        buffer = file;
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result.secure_url);
          } else {
            reject(new Error('Upload failed'));
          }
        }
      );

      uploadStream.end(buffer);
    } catch (error) {
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

