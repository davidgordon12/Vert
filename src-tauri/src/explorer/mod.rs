use std::fs::*;
use serde::{Serialize, Deserialize};
use tauri::api::file;

#[derive(Serialize, Deserialize, Clone)]
pub enum DirectoryChild {
    File(String, String), // Name of file, path to file
    Directory(String, String),
}

 /// Searches and returns the files in a given directory. This is not recursive.
#[tauri::command]
pub fn open_directory(path: String) -> Vec<DirectoryChild> {
    let mut dir_children = Vec::new();

    let Ok(directory) = read_dir(path) else {
        return dir_children;
    };

    for entry in directory {
        let entry = entry.unwrap();

        let file_name = entry.file_name().to_str().unwrap().to_string();
        let entry_is_file = entry.file_type().unwrap().is_file();
        let entry = entry.path().to_str().unwrap().to_string();

        if entry_is_file {
            dir_children.push(DirectoryChild::File(file_name, entry));
        }
        else {
            dir_children.push(DirectoryChild::Directory(file_name, entry));
        }
    }

    dir_children
}

#[tauri::command]
pub fn read_entry(path: String) -> Result<String, Vec<DirectoryChild>> {
    let metadata = metadata(&path).unwrap();
    let file_type = metadata.file_type();

    if file_type.is_dir() {
        return Err(open_directory(path))
    }

    Ok(read_to_string(path).unwrap())
}