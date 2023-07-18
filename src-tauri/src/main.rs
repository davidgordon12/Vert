// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn get_workspace() -> Vec<String> {
    let mut files: Vec<String> = Vec::new();
    files.push(String::from("Hello"));
    files.push(String::from("World"));

    files
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_workspace])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}