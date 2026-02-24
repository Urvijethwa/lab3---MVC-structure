import { serveDir } from "@std/http/file-server";

import { homeController } from "./controllers/home.js";
import { aboutController } from "./controllers/about.js";
import { contactController } from "./controllers/contact.js";
import { notFoundController } from "./controllers/not-found.js";

import { itemsController } from "./controllers/items.js";
import { addItemController } from "./controllers/add-item.js";

export async function handler(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const method = req.method;

  // Serve CSS from /public
  if (pathname.endsWith(".css")) {
    return serveDir(req, { fsRoot: "public" });
  }

  // Routes
  if (pathname === "/") return homeController();
  if (pathname === "/about") return aboutController();
  if (pathname === "/contact") return contactController();

  // Method-based routing for /items
  if (pathname === "/items") {
    if (method === "POST") {
      return addItemController(req);
    } else {
      return itemsController();
    }
  }

  return notFoundController();
}