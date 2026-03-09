//created ro handle databse operations
import { db } from "../tools/db.js";

export function getStaff() {
  return db.prepare("SELECT * FROM staff").all();
}
export function getStaffById(id) {
  return db.prepare("SELECT * FROM staff WHERE id = ?").get(id);
}
export function createStaff({ name, title, profileImageId }) {
 db.prepare(`
  INSERT INTO staff (name, title, profileImage)
  VALUES (?, ?, ?)
 `).run(name, title, profileImageId);
}