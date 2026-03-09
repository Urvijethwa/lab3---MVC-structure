import { db } from "../tools/db.js";

// created to handle file storage and retrieval
export async function storeFile(file) {
  const bytes = await file.bytes();

  const result = db.prepare(`
    INSERT INTO files (name, type, bytes)
    VALUES (?, ?, ?)
    RETURNING id
  `).get(file.name, file.type, bytes);

  return result.id;
}

export function getFile(fileId) {
  const { name, type, bytes } = db.prepare(
    "SELECT * FROM files WHERE id = ?"
  ).get(fileId) || {};

  if (!bytes) return null;

  // reconstruct a file object with the stored data
  return new File([bytes], name, { type });
}