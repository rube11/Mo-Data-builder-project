import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const jsonData = await request.json();

    // Create the data/exports directory if it doesn't exist
    const exportsDir = path.join(process.cwd(), 'data', 'exports');
    await mkdir(exportsDir, { recursive: true });

    // Create filename with timestamp
    const timestamp = Date.now();
    const fileName = `${jsonData.title.replace(/\s+/g, '_')}_${timestamp}.json`;
    const filePath = path.join(exportsDir, fileName);

    // Write the JSON file
    await writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');

    return NextResponse.json({ 
      success: true, 
      message: 'JSON file saved successfully',
      fileName,
      path: `data/exports/${fileName}`
    });
  } catch (error) {
    console.error('Error saving JSON file:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save JSON file' },
      { status: 500 }
    );
  }
}
