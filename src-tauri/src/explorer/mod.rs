use std::path::PathBuf;


#[tauri::command]
pub fn read_directory(path: String) -> Vec<PathBuf> {
    use tauri::api::dir::{self, read_dir, DiskEntry};

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

#[tauri::command]
pub fn read_entry(path: String) -> String {
    use std::fs;
    use substring::Substring;

    if !path.as_str().substring(1, path.len()).contains('.') {
        read_directory(path);
    }
    else {
        let entry = fs::read_to_string(path)
        .expect("Invalid path");

        return entry
    }

    return String::from("")
}