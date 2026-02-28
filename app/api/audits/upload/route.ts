/**
 * File Upload Endpoint
 * POST /api/audits/upload
 * Handles contract file uploads for audits
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import crypto from 'crypto';

// Supported file extensions
const SUPPORTED_EXTENSIONS = [
  '.sol',     // Solidity
  '.ts',      // TypeScript
  '.tsx',     // TypeScript React
  '.js',      // JavaScript
  '.jsx',     // JavaScript React
  '.py',      // Python
  '.go',      // Go
  '.rs',      // Rust
  '.java',    // Java
  '.cpp',     // C++
  '.c',       // C
  '.h',       // Header
  '.yul',     // Yul
  '.vy',      // Vyper
  '.asm',     // Assembly
  '.json',    // JSON (for ABIs)
  '.txt',     // Text
  '.md',      // Markdown
  '.pdf',     // PDF
  '.zip',     // Archive
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_FILES = 10;

interface FileUploadResponse {
  fileId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  checksum: string;
}

/**
 * Calculate SHA256 checksum of file
 */
async function calculateChecksum(buffer: Buffer): Promise<string> {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

/**
 * Validate file extension
 */
function validateFileExtension(fileName: string): boolean {
  const ext = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  return SUPPORTED_EXTENSIONS.includes(ext);
}

/**
 * Handle file upload
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getAuth();

    if (!session?.user) {
      return NextResponse.json(
        {
          error: 'UNAUTHORIZED',
          message: 'Must be authenticated to upload files',
        },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: 'No files provided',
        },
        { status: 422 }
      );
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: `Maximum ${MAX_FILES} files allowed per upload`,
        },
        { status: 422 }
      );
    }

    const uploadedFiles: FileUploadResponse[] = [];
    const errors: { fileName: string; error: string }[] = [];

    for (const file of files) {
      try {
        // Validate file name
        if (!file.name) {
          errors.push({
            fileName: 'unknown',
            error: 'File name is required',
          });
          continue;
        }

        // Validate file extension
        if (!validateFileExtension(file.name)) {
          errors.push({
            fileName: file.name,
            error: `File type not supported. Supported: ${SUPPORTED_EXTENSIONS.join(', ')}`,
          });
          continue;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
          errors.push({
            fileName: file.name,
            error: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`,
          });
          continue;
        }

        // Read file buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Calculate checksum
        const checksum = await calculateChecksum(buffer);

        // Generate file ID
        const fileId = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;

        // In production, upload to storage service (S3, Vercel Blob, etc.)
        // For now, we just return metadata
        uploadedFiles.push({
          fileId,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          uploadedAt: new Date().toISOString(),
          checksum,
        });

        console.log(`[File Uploaded] ${fileId} - ${file.name} (${file.size} bytes)`);
      } catch (fileError) {
        console.error('[File Processing Error]', fileError);
        errors.push({
          fileName: file.name,
          error: 'Failed to process file',
        });
      }
    }

    return NextResponse.json(
      {
        uploadedFiles,
        errors: errors.length > 0 ? errors : undefined,
        message: `${uploadedFiles.length} file(s) uploaded successfully`,
      },
      { status: uploadedFiles.length > 0 ? 200 : 422 }
    );
  } catch (error) {
    console.error('[File Upload Error]', error);
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: 'Failed to process file upload',
      },
      { status: 500 }
    );
  }
}
