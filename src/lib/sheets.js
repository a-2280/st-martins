import { google } from "googleapis";

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

/**
 * Fetches menu items from a specific sheet tab.
 * Expects columns: section | name | description | price
 * @param {string} sheetName - The tab name in the spreadsheet (e.g. "Dinner Menu")
 * @returns {Promise<Array<{section: string, name: string, description: string, price: string}>>}
 */
export async function getMenuItems(sheetName) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    range: `'${sheetName}'!A:D`,
  });

  const rows = response.data.values ?? [];

  return rows
    .slice(1) // skip header row
    .filter((row) => row[1]) // must have a name
    .map((row) => ({
      section: row[0] ?? "",
      name: row[1] ?? "",
      description: row[2] ?? "",
      price: row[3] ?? "",
    }));
}
