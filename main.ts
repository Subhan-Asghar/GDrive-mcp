import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { list_files,upload_file,create_file,
  delete_file,download_file,create_folder } from "./tools/tools.js";

const server = new McpServer({
  name: "GDrive",
  version: "1.0.0"
});


// List file drive 
server.tool(
  "List_File_Drive",
  "List files from Google Drive",
  {
    pageSize: z.number().optional().default(10).describe("Number of files to list")
  },
  async ({ pageSize }) => {
    const result: string = await list_files(pageSize);
    
    return {
      content: [
        {
          type: "text",
          text: result
        }
      ]
    };
  }
);

// Upload File 
server.tool(
  "upload_file_drive",
  "Upload file to Google Drive",
  {
    file_path: z.string().describe("File folder path"),
    file_name: z.string().describe("File name in the folder"),
  },
  async ({ file_path, file_name }) => {
   const result:string=await upload_file(file_path,file_name)
   return {
    content:[
      {
        type:"text",
        text:result
      }
    ]
   }
  }
);

// Create file 
server.tool(
  "create_file_drive",
  "Create a new file on Google Drive with provided content",
  {
    file_name: z.string().describe("Name of the file to create"),
    content: z.string().optional().describe("Text content to be written in the file"),
    folder_name:z.string().optional().describe("Folder name ")
  },
  async ({ file_name, content,folder_name }) => {
   const result:string=await create_file(file_name,content,folder_name)
   return {
    content:[
      {
        type:"text",
        text:result
      }
    ]
   } 
  }
)

// Delete file from drive 
server.tool(
  "Delete_file_drive",
  "Delete file from the google drive ",
  {
    file_name:z.string().describe("name of the file")
  },
  async({file_name})=>{
    const result= await delete_file(file_name)
    return{
      content:[
        {
          type:"text",
          text:result
        }
      ]
    }
  }
)

// Download file from drive 
server.tool(
  "download_file_drive",
  "Download files from google drive ",
  {
    file_name:z.string().describe("Name of the file ")
  },
  async({file_name})=>{
    const result=await download_file(file_name)
    return {
      content:[
        {
          type:"text",
          text:result
        }
      ]
    }
  }
)

// Create Folder
server.tool(
  "create_folder_drive",
  "Create folder in google drive",
  {
    folder_name:z.string().describe("Name of the folder"),
    in_folder:z.string().optional().describe("In which folder create the folder")
  },
  async({folder_name,in_folder})=>{
    const result =await create_folder(folder_name,in_folder)
    return{
      content:[
        {
          type:"text",
          text:result
        }
      ]
    }
  }
)
// Main 
const main =async()=>{
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main()
