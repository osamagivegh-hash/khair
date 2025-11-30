import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Force dynamic to prevent static optimization issues
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('=== UPLOAD REQUEST STARTED ===');

    // 1. Configure Cloudinary (EXACT SAME LOGIC AS DEBUG ROUTE)
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
    const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
    const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

    if (!cloudName || !apiKey || !apiSecret) {
      console.error('Missing credentials in upload route');
      return NextResponse.json({
        success: false,
        error: 'Server misconfiguration: Missing Cloudinary credentials',
      }, { status: 500 });
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    // 2. Parse Form Data safely
    let formData;
    try {
      formData = await request.formData();
    } catch (e: any) {
      console.error('Failed to parse form data:', e);
      return NextResponse.json({
        success: false,
        error: 'Failed to read file upload. Please try again.',
        details: e.message
      }, { status: 400 });
    }

    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'al-khair';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    console.log(`Processing file: ${file.name} (${file.type}, ${file.size} bytes)`);

    // 3. Convert File to Buffer safely
    let buffer: Buffer;
    try {
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } catch (e: any) {
      console.error('Failed to convert file to buffer:', e);
      return NextResponse.json({
        success: false,
        error: 'Failed to process file data.',
        details: e.message
      }, { status: 500 });
    }

    // 4. Upload to Cloudinary (Using Base64 - Same as Debug Route)
    console.log('Starting Cloudinary upload (Base64 method)...');

    // Convert buffer to base64 data URI
    const base64Data = buffer.toString('base64');
    const fileType = file.type || 'application/octet-stream';
    const dataURI = `data:${fileType};base64,${base64Data}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folder,
      resource_type: 'auto',
    });

    console.log('Upload successful:', result.secure_url);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    });

  } catch (error: any) {
    console.error('Unhandled upload error:', error);

    // Return JSON even for 500 errors to avoid "Invalid JSON" on client
    return NextResponse.json({
      success: false,
      error: 'Upload failed due to server error',
      message: error.message || String(error),
      type: error.name
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
