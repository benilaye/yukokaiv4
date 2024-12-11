import { google } from 'googleapis';

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

export const SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SPREADSHEET_ID;

export const getGoogleAuthClient = async (accessToken: string) => {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  return auth;
};

export const sheets = google.sheets('v4');