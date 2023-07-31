#[derive(serde::Serialize)]
pub struct Workspace {
  path: String,
  dirs: Option<Vec<DirEntry>>,
  files: Option<Vec<FileEntry>>,
}

#[derive(serde::Serialize)]
pub struct DirEntry {
  key: String,
  path: String,
  children: Vec<DirEntry>,
}

#[derive(serde::Serialize)]
pub struct FileEntry {
  key: String,
  path: String,
  content: String,
}

impl DirEntry {
  pub fn new(key: String, path: String, children: Vec<DirEntry>) -> Self {
    DirEntry { key: (key), path: (path), children: (children) }
  }
}

impl FileEntry {
  pub fn new(key: String, path: String, content: String) -> Self {
    FileEntry { key: (key), path: (path), content: (content) }
  }
}

#[tauri::command]
pub fn open_workspace(path: String) {
}

#[tauri::command]
pub fn open_file(path: String) -> FileEntry {
  FileEntry::new(String::from("src"), String::from("C:\\David\\Source\\Repo\\Vert"), String::from("test"))
}