// import { db } from "../tools/db.js";

// export function getItems() {
//     return db.prepare("SELECT * FROM items").all();
// }

// export function addItem(name, description) {
//     db.prepare(`
//     INSERT INTO items (name, description) VALUES (?, ?)
//     `).run(name, description);
// }

// // export function addItemVulnerable(name, description) {
// //     const query =
// //       `INSERT INTO items (name, description) VALUES ('${name}', '${description}')`;
// //     db.exec(query);
// //   }

import { db } from "../tools/db.js";

export function getItemsForUser(username) {
  return db.prepare("SELECT * FROM items WHERE username = ?").all(username);
}

export function createItem(username, name, description) {
  db.prepare("INSERT INTO items (username, name, description) VALUES (?, ?, ?)").run(username, name, description);
}