use std::fs::read_dir;

#[derive(serde::Serialize)]
pub struct DirEntry {
  key: String,
  path: String,
  dir_children: Vec<DirEntry>,
  file_children: Vec<FileEntry>,
}

#[derive(serde::Serialize)]
pub struct FileEntry {
  key: String,
  path: String,
  content: String,
}

#[tauri::command]
pub fn open_directory(path: String) -> DirEntry {
}

#[tauri::command]
pub fn open_file(path: String) -> FileEntry {
}