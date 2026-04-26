// src/app/api/results/route.ts
// Fetches latest prediction result from Google Sheets

import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const SHEET_ID = process.env.GOOGLE_SHEET_ID!; // add to .env.local

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
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:Z', // adjust to your sheet range
    });

    const rows = response.data.values || [];
    if (rows.length < 2) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    const headers = rows[0]; // first row = column names
    const latest  = rows[rows.length - 1]; // last row = latest result

    // Map to object
    const result: Record<string, string> = {};
    headers.forEach((h: string, i: number) => {
      result[h] = latest[i] || '';
    });

    return NextResponse.json({ success: true, result });

  } catch (err: any) {
    console.error('Sheets error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}