import { google } from "googleapis";
import path from "path";
import { authenticate } from "@google-cloud/local-auth";
import { fileURLToPath } from "url"; 
import { dirname } from "path";



let driveClient: ReturnType<typeof google.drive> | null = null;

// Google Auth
export const Google_auth = async () => {

  if (!driveClient){
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const auth = await authenticate({
      keyfilePath: path.join(__dirname, 'credentials.json'),
      scopes: ['https://www.googleapis.com/auth/drive']
    });
  
    driveClient= google.drive({ version: "v3", auth })
  }
  return driveClient
};
