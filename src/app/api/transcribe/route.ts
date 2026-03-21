import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import fs from 'fs';
import path from 'path';
import { tmpdir } from 'os';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    // 1. Validate the key (Fixing the logic error)
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE' || apiKey.includes('YOUR_API_KEY')) {
      return NextResponse.json({ 
        error: 'Missing Gemini API Key', 
        details: 'Please ensure GEMINI_API_KEY in your .env file is your actual key from aistudio.google.com' 
      }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Initialize Gemini 
    const genAI = new GoogleGenerativeAI(apiKey);
    const fileManager = new GoogleAIFileManager(apiKey);
    
    // 2. Professional Video Handling via File API
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempPath = path.join(tmpdir(), `upload-${Date.now()}-${file.name}`);
    fs.writeFileSync(tempPath, buffer);

    try {
      // Upload the file to Gemini's File Manager
      const uploadResult = await fileManager.uploadFile(tempPath, {
        mimeType: file.type,
        displayName: file.name,
      });

      // Wait for the video to be processed by Gemini (crucial for videos)
      let geminiFile = await fileManager.getFile(uploadResult.file.name);
      while (geminiFile.state === 'PROCESSING') {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        geminiFile = await fileManager.getFile(uploadResult.file.name);
      }

      if (geminiFile.state === 'FAILED') {
        throw new Error('Video processing failed on Gemini servers.');
      }

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `
        Transcribe the spoken audio in this video file. 
        Ignore background music, sound effects, or silence.
        Return ONLY a JSON array of caption objects.
        Each object must have "start" (number, seconds), "end" (number, seconds), and "text" (string).
        Example format: [{"start": 0.5, "end": 2.1, "text": "Hello world"}]
        Do not include any other text or markdown formatting in your response.
      `;

      const result = await model.generateContent([
        {
          fileData: {
            mimeType: geminiFile.mimeType,
            fileUri: geminiFile.uri,
          },
        },
        prompt,
      ]);

      const responseText = result.response.text();
      
      // Clean JSON response
      const jsonString = responseText.replace(/```json|```/g, '').trim();
      const transcript = JSON.parse(jsonString);

      return NextResponse.json({ transcript });

    } finally {
      // Clean up temp file
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }

  } catch (error: any) {
    console.error('Gemini Transcription Error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to transcribe video',
      details: error.toString()
    }, { status: 500 });
  }
}
