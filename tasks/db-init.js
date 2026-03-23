import { db } from "../tools/db.js";

db.exec(`
  DROP TABLE IF EXISTS staff;
  DROP TABLE IF EXISTS files;
  DROP TABLE IF EXISTS sessions;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS items;

  CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    hashedPassword TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
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

  INSERT INTO users (username, hashedPassword)
  VALUES ('testuser', 'temporaryhash');
`);

console.log("Database initialized with users, sessions, items, files, and staff tables");