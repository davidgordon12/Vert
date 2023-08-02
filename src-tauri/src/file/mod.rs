use std::fs::read_dir;

#[derive(serde::Serialize)]
pub struct FileEntry {
  key: String,
  path: String,
  content: String,
}

#[derive(serde::Serialize)]
pub struct DirEntry {
  key: String,
  path: String,
  dir_children: Vec<DirEntry>,
  file_children: Vec<FileEntry>,
}


impl FileEntry {
  pub fn new(key: String, path: String, content: String) -> Self {
    FileEntry { key: key, path: path, content: content }
  }
}

#[allow(unused)]
impl DirEntry {
  pub fn new(key: String, path: String, dir_children: Vec<DirEntry>, file_children: Vec<FileEntry>) -> Self {
    DirEntry { key: (key), path: (path), dir_children: (dir_children), file_children: (file_children) }
  }
}

/* This function call is recursive. 
 * It will continue to walk the left-most node until it reaches the end, 
 * returning and walking the right side */
#[tauri::command]
pub fn open_directory(path: String) -> DirEntry {
  let dir = read_dir(path.clone()).unwrap();
  let key = (path.clone().chars().count() - path.clone().chars().rev().position(|c| c == '\\').unwrap() - 1).to_string();
  let mut workspace: DirEntry = DirEntry { key: (key), path: (path.clone()), dir_children: (Vec::new()), file_children: (Vec::new()) };

  for entry in dir {
    let entry = entry.unwrap();
    if entry.file_type().unwrap().is_dir() {
      // let dir: DirEntry = DirEntry::new(entry.file_name().to_string_lossy().to_string(), entry.path().to_string_lossy().to_string(), Vec::new(), Vec::new());
      open_directory(entry.path().to_string_lossy().to_string());
    }
    else {
      let file: FileEntry = FileEntry::new(entry.file_name().to_string_lossy().to_string(), entry.path().to_string_lossy().to_string(), String::from(""));
      // add file to parent dir, NOT the workspace dir
    }
  }

  workspace
}

#[tauri::command]
pub fn open_file(path: String) -> FileEntry {
  FileEntry::new(String::from("test"), String::from(path), String::from("nothing here"))
}
