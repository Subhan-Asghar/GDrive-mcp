import { google } from "googleapis";
import path from "path";
import { authenticate } from "@google-cloud/local-auth";
import { fileURLToPath } from "url"; 
import { dirname } from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const Google_auth = async () => {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, 'file-auth.json'),
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  return google.drive({ version: "v3", auth });
};

const listFiles = async () => {
  const drive = await Google_auth();

  const res = await drive.files.list({
    pageSize: 10,
    fields: 'files(id, name)',
  });

  console.log("Files:");
  res.data.files?.forEach(file => {
    console.log(`${file.name} (${file.id})`);
  });
  
};

listFiles();
