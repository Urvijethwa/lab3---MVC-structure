import { db } from "../tools/db.js";

export function getItems() {
    return db.prepare("SELECT * FROM items").all();
}

export function addItem(name, description) {
    db.prepare(`
    INSERT INTO items (name, description) VALUES (?, ?)
    `).run(name, description);
}

// export function addItemVulnerable(name, description) {
//     const query =
//       `INSERT INTO items (name, description) VALUES ('${name}', '${description}')`;
//     db.exec(query);
//   }