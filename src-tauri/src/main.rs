// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod explorer;
use crate::explorer::*;

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            open_directory,
            read_entry,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
