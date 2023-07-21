use std::fs::read_dir;
use serde::{Serialize, Deserialize};

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