import path from "path";
import * as fs from "fs";
import { Google_auth } from "../Auth/auth.js";

export const list_files = async (pageSize: number): Promise<string> => {
  const drive = await Google_auth();

  const res = await drive.files.list({
    pageSize,
    fields: "files(id, name)",
  });

  let filesList = "Files:\n";
  res.data.files?.forEach((file) => {
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
  content?: string ,
  folder_name?:string,
): Promise<string> => {
  const drive = await Google_auth();

  let parents: string[] | undefined;

  if (folder_name) {
    const res = await drive.files.list({
      q: `name = '${folder_name}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id)',
      spaces: 'drive',
    });

    const folder = res.data.files?.[0];
    if (folder) {
      parents = [folder.id!];
    } else {
      return `Folder '${folder_name}' not found.`;
    }
  }

  const fileMetadata: any = {
    name: file_name,
    ...(parents && { parents }),
  };

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

    return `File created successfully.\n File ID: ${res.data.id}`;
  } catch (error: any) {
    return `Failed to create file:\n${error.message || error}`;
  }
};

// Delete file
export const delete_file = async (file_name: string) => {
  const drive = await Google_auth();
  const res = await drive.files.list({
    q: `name='${file_name}' and trashed=false`,
    fields: "files(id, name)",
  });
  const file = res.data.files;
  if (file && file.length > 0) {
    const fileId = file[0].id!;
    try {
      await drive.files.delete( {fileId });
      return `File "${file_name}" deleted successfully.`;
    } catch (error) {
      return `Failed to delete file: ${error}`;
    }
  } else {
    return `No file found with name : ${file_name}`;
  }
};

// Download file
export const download_file = async (file_name: string) => {
  const drive = await Google_auth();
  const res = await drive.files.list({
    q: `name='${file_name}' and trashed=false`,
    fields: "files(id, name)",
  });
  const file = res.data.files;
  if (file && file.length > 0) {
    const fileId = file[0].id!;
    const destpath=path.join("C:\\Users\\Subhan\\Downloads",file_name)
    try {
      const dest=fs.createWriteStream(destpath)
      const response = await drive.files.get(
        { fileId, alt: "media" },
        { responseType: "stream" }
      );
      await response.data.pipe(dest)
      return `File "${file_name}" downloaded successfully.`;
    } catch (error) {
      return `Failed to download file: ${error}`;
    }
  } else {
    return `No file found with name : ${file_name}`;
  }
};

// Create Folder
export const create_folder = async (folder_name: string,in_folder?:string) => {
  const drive = await Google_auth();

  let parents: string[] | undefined;

  if (in_folder) {
    const res = await drive.files.list({
      q: `name = '${in_folder}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id)',
      spaces: 'drive',
    });

    const folder = res.data.files?.[0];
    if (folder) {
      parents = [folder.id!];
    } else {
      return `Folder '${in_folder}' not found.`;
    }
  }
  const folderMetadata: any = {
    name: folder_name,
    mimeType: 'application/vnd.google-apps.folder',
    ...(parents && { parents }),
  };

  try {
    const res = await drive.files.create({
      requestBody: folderMetadata,
      fields: 'id',
    });

    return `Folder created successfully.\nFolder : ${folder_name}`;
  } catch (error: any) {
    return `Failed to create folder:\n${error.message || error}`;
  }
}

// Delete Folder
export const delete_folder = async (folder_name: string): Promise<string> => {
  const drive = await Google_auth();

  const res = await drive.files.list({
    q: `name = '${folder_name}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id)',
    spaces: 'drive',
  });

  const files = res.data.files;
  if (files && files.length > 0) {
    const fileId = files[0].id!;
    try {
      await drive.files.delete({ fileId });
      return `Folder "${folder_name}" deleted successfully.`;
    } catch (error: any) {
      return `Failed to delete folder:\n${error.message || error}`;
    }
  } else {
    return `No Folder found with name: ${folder_name}`;
  }
};
