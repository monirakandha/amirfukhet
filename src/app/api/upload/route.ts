import { NextRequest, NextResponse } from 'next/server';
import { put, del, list } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');

// Helper to ensure upload dir exists
async function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

// GET — list all uploaded files
export async function GET() {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Use Vercel Blob
      const { blobs } = await list();
      const fileDetails = blobs.map((blob) => ({
        filename: blob.pathname,
        url: blob.url,
        size: blob.size,
        uploadedAt: blob.uploadedAt.toISOString(),
      }));

      fileDetails.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
      return NextResponse.json({ files: fileDetails });
    } else {
      // Use local file system
      await ensureUploadDir();
      const files = fs.readdirSync(UPLOAD_DIR);
      const fileDetails = files.map((filename) => {
        const filePath = path.join(UPLOAD_DIR, filename);
        const stats = fs.statSync(filePath);
        return {
          filename,
          url: `/uploads/${filename}`,
          size: stats.size,
          uploadedAt: stats.birthtime.toISOString(),
        };
      });

      fileDetails.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
      return NextResponse.json({ files: fileDetails });
    }
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

    if (process.env.BLOB_READ_WRITE_TOKEN) {
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
    } else {
      // Upload locally
      await ensureUploadDir();
      const buffer = Buffer.from(await file.arrayBuffer());
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = `${uniqueSuffix}-${file.name}`;
      const filePath = path.join(UPLOAD_DIR, filename);
      
      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({
        success: true,
        filename,
        url: `/uploads/${filename}`,
        size: file.size,
      });
    }
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

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Delete from Vercel Blob
      await del(urlToDelete);
      return NextResponse.json({ success: true });
    } else {
      // Delete locally
      const filename = urlToDelete.replace('/uploads/', '');
      const filePath = path.join(UPLOAD_DIR, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
