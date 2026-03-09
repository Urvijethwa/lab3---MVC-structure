import { db } from "../tools/db.js";
db.exec(`
    DROP TABLE IF EXISTS staff;
    DROP TABLE IF EXISTS files;
    DROP TABLE IF EXISTS items;

    CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
    );

    CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    bytes BLOB NOT NULL
    );

    CREATE TABLE IF NOT EXISTS staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    profileImage INTEGER,
    FOREIGN KEY (profileImage) REFERENCES files(id)
    );
`);
console.log("Database initialized with items, files, and staff tables");