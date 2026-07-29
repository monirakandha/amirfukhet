import { NextRequest, NextResponse } from 'next/server';
import { put, del, list } from '@vercel/blob';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

// GET — list all uploaded files
export async function GET() {
  try {
    const { blobs } = await list();
    
    const fileDetails = blobs.map((blob) => {
      // Vercel blob returns url, pathname, size, uploadedAt
      return {
        filename: blob.pathname,
        url: blob.url,
        size: blob.size,
        uploadedAt: blob.uploadedAt.toISOString(),
      };
    });

    // Sort newest first
    fileDetails.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    return NextResponse.json({ files: fileDetails });
  } catch (error) {
    console.error('Media list error:', error);
    return NextResponse.json({ files: [] });
  }
}

// POST — upload a file
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, WebP, GIF allowed.' },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    return NextResponse.json({
      success: true,
      filename: blob.pathname,
      url: blob.url,
      size: file.size,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// DELETE — delete a file
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const urlToDelete = searchParams.get('url');

    if (!urlToDelete) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    // Delete from Vercel Blob using the blob URL
    await del(urlToDelete);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
