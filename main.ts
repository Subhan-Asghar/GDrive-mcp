import { google } from "googleapis";
import path from "path";
import { authenticate } from "@google-cloud/local-auth";
import { fileURLToPath } from "url"; 
import { dirname } from "path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "GDrive",
  version: "1.0.0"
});


let driveClient: ReturnType<typeof google.drive> | null = null;

const Google_auth = async () => {

  if (!driveClient){
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const auth = await authenticate({
      keyfilePath: path.join(__dirname, 'file-auth.json'),
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });
  
    driveClient= google.drive({ version: "v3", auth })
  }
  return driveClient
};

server.tool(
  "Drive File",
  "List files from Google Drive",
  {
    pageSize: z.number().optional().default(10).describe("Number of files to list")
  },
  async ({ pageSize }) => {
    const drive = await Google_auth();

    const res = await drive.files.list({
      pageSize: pageSize,
      fields: 'files(id, name)',
    });

    let filesList = "Files:\n";
    res.data.files?.forEach(file => {
      filesList += `${file.name} (${file.id})\n`;
    });
    
    return {
      content: [
        {
          type: "text",
          text: filesList
        }
      ]
    };
  }
);


const main =async()=>{
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main()
