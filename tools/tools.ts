import path from "path";
import * as fs from 'fs'
import { Google_auth } from "../Auth/auth.js";

  
  export const list_files = async (pageSize: number): Promise<string> => {
    const drive = await Google_auth();
  
    const res = await drive.files.list({
      pageSize,
      fields: "files(id, name)",
    });
  
    let filesList = "Files:\n";
    res.data.files?.forEach(file => {
      filesList += `${file.name} (${file.id})\n`;
    });
  
    return filesList;
  };


  export const upload_file = async (
    file_path: string,
    file_name: string
  ): Promise<string> => {
    const drive = await Google_auth();
    const full_path = path.join(file_path, file_name);
  
    if (fs.existsSync(full_path)) {
      const fileMetadata = { name: file_name };
      const media = {
        mimeType: "application/octet-stream",
        body: fs.createReadStream(full_path),
      };
  
      try {
        const res = await drive.files.create({
          requestBody: fileMetadata,
          media: media,
          fields: "id",
        });
  
        return `File uploaded successfully.\n📁 File ID: ${res.data.id}`;
      } catch (error) {
        return `Failed to upload file:\n${error}`;
      }
    } else {
      return `File does not exist: ${file_name}`;
    }
  };

export const create_file = async (
  file_name: string,
  content: string
): Promise<string> => {
  const drive = await Google_auth();

  const fileMetadata = { name: file_name };
  const media = {
    mimeType: "application/octet-stream",
    body: content,
  };

  try {
    const res = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });

    return `File created successfully.\n📁 File ID: ${res.data.id}`;
  } catch (error) {
    return `Failed to create file:\n${error}`;
  }
};
