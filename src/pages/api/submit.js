import { google } from 'googleapis';

export default async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, message, submissionTime, sheetName } = req.body;

  // Validate required fields
  if (!name || !email || !message || !sheetName) {
    return res.status(400).json({
      message:
        'Missing required fields: name, email, message, and sheetName are required',
    });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Optionally add headers if sheet is empty
    const checkSheet = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:F1`,
    });

    if (!checkSheet.data.values) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1:F1`,
        valueInputOption: 'RAW',
        resource: {
          values: [['Name', 'Email', 'Mobile', 'Date', 'Message']],
        },
      });
    }

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A2`, // Start from A2 if headers exist
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [
          [
            name,
            email,
            phone || '',
            submissionTime || new Date().toISOString(),
            message,
          ],
        ],
      },
    });

    console.log(`Rows updated: ${response.data.updates.updatedCells}`);

    return res.status(200).json({
      message: 'Form data submitted successfully!',
      data: { name, email, phone, message, submissionTime },
    });
  } catch (error) {
    console.error('Error inserting data into Google Sheets:', error);
    return res.status(500).json({
      message: 'Failed to submit form data.',
      error: error.message,
    });
  }
};
