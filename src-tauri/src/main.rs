#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use uuid::Uuid;

#[tauri::command]
fn new_register() -> String {
  let id = Uuid::new_v4();
  format!("{id}")
}

#[tauri::command]
fn load_all_passsword() -> String {
  let id = Uuid::new_v4();
  format!("{id}")
}


fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![new_register, load_all_passsword])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}


