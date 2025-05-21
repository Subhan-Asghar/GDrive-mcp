import { google } from "googleapis";
import path from "path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "GDrive",
  version: "1.0.0",
});

const Google_auth = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "auth-file.json"),
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  return google.drive({ version: "v3", auth });
  
};


