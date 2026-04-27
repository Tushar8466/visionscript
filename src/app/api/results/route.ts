import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:J', 
    });

    const rows = response.data.values || [];
    console.log('Sheet rows found:', rows.length);

    if (rows.length < 2) {
      return NextResponse.json({ error: 'No data rows found' }, { status: 404 });
    }

    const latest = rows[rows.length - 1];
    console.log('Latest row data:', latest);

    // Map to exact keys requested
    const result = {
      Timestamp: latest[0] || '',
      "Image Name": latest[1] || '',
      Category: latest[2] || '',
      Tags: latest[3] || '',
      "Formal Caption": latest[4] || '',
      "Casual Caption": latest[5] || '',
      "SEO Caption": latest[6] || '',
      Confidence: latest[7] || '',
      "Bias Flag": latest[8] || ''
    };

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    console.error('Sheets error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}