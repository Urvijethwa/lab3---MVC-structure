import { db } from "../tools/db.js";
db.exec(`
CREATE TABLE IF NOT EXISTS items (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
description TEXT
)
`);
console.log("Database initialized with items table");