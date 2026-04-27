import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Forward the FormData to your local n8n webhook
    const n8nResponse = await fetch('http://localhost:5678/webhook/captions', {
      method: 'POST',
      body: formData,
    });

    // We don't block the UI if n8n fails, but we log it for debugging
    if (!n8nResponse.ok) {
      console.warn('n8n response not OK:', n8nResponse.status);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('n8n Connection Error:', error.message);
    // Return success: true anyway so the UI can redirect and start polling
    return NextResponse.json({ success: true, warning: 'n8n unreachable' });
  }
}
