use std::path::PathBuf;

use tauri::api::dir::{self, read_dir, DiskEntry};

#[tauri::command]
pub fn read_directory(path: String) -> Vec<PathBuf> {
    let mut entries: Vec<Vec<DiskEntry>> = vec![];
    for entry in read_dir(path, true) {
        entries.push(entry);
    }

    let mut file_paths: Vec<PathBuf> = vec![];

    for entry in entries {
        for file in entry {
            file_paths.push(file.path);
        }
    }

    file_paths
}