<h1 align="center">📁 GDrive MCP Server</h1>

<p align="center">
  <b>A powerful MCP-based Google Drive API server for automating Drive operations.</b><br />
  List, upload, download, delete, and share files seamlessly using the Model Context Protocol.
</p>

---

## ✨ Features

- 📄 **List Files** — Fetch files from Google Drive
- 📤 **Upload Files** — Upload local files to your Drive
- 📝 **Create Files** — Generate new files with content
- 🗑️ **Delete Files/Folders** — Remove files or folders
- 📥 **Download Files** — Save files locally
- 📂 **Create Folders** — Organize your Drive
- 🔗 **Share Files** — Share with users or make public

---

## 🛠️ Tech Stack

```txt
- Node.js
- ModelContextProtocol SDK
- Zod for schema validation
- Google Drive API (via helper tools)
```

## 🔐 Google API Setup

To access Google Drive, you must set up OAuth2 credentials.

### 📁 1. Create `credentials.json`

Create a file named `credentials.json` in the root of your project and paste the following:

<details>
<summary><strong>Sample credentials.json</strong></summary>

```json
{
  "installed": {
    "client_id": "YOUR_CLIENT_ID_HERE",
    "project_id": "YOUR_PROJECT_ID",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "YOUR_CLIENT_SECRET_HERE",
    "redirect_uris": ["http://localhost"]
  }
}
```

</details>

> ⚠️ **Important:**  
> Do **NOT** commit this file to GitHub. Add it to `.gitignore`:

```bash
echo "credentials.json" >> .gitignore
```

---

### 🔧 2. Enable Google Drive API

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use an existing one).
3. Navigate to **APIs & Services > Library**
4. Enable **Google Drive API**
5. Go to **APIs & Services > Credentials**
6. Click **Create Credentials > OAuth client ID**
7. Select **Desktop App**, and download the file.
8. Replace contents of `credentials.json` with your downloaded credentials.

---

### 🔑 3. Authenticate on First Run

The first time you run a tool (e.g., `List_File_Drive`):

- A browser window will open for Google login.
- After permission is granted, a `token.json` file will be created.
- This file is used for future authentications automatically.

## 🧪 Available MCP Tools

| Tool Name             | Description                                  |
|----------------------|----------------------------------------------|
| `List_File_Drive`     | List files from Google Drive                |
| `upload_file_drive`   | Upload a file to Google Drive               |
| `create_file_drive`   | Create a new file with content              |
| `Delete_file_drive`   | Delete a file from Google Drive             |
| `download_file_drive` | Download a file from Google Drive           |
| `create_folder_drive` | Create a new folder                         |
| `delete_folder_drive` | Delete a folder                             |
| `Share_file_anyone`   | Share file publicly                         |
| `share_file`          | Share file with specific emails and role    |
