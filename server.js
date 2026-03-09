import { serveDir } from "@std/http/file-server";

import { homeController } from "./controllers/home.js";
import { aboutController } from "./controllers/about.js";
import { contactController } from "./controllers/contact.js";
import { notFoundController } from "./controllers/not-found.js";

import { itemsController } from "./controllers/items.js";
import { addItemController } from "./controllers/add-item.js";

import { staffController, createStaffController } from "./controllers/staff.js";
import { profileController } from "./controllers/staff-profile.js";

export async function handler(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const method = req.method;

  // Serve files from /public
  if (pathname.endsWith(".css")) {
    return serveDir(req, { fsRoot: "public" });
  }

  // Basic routes
  if (pathname === "/" && method === "GET") return homeController();
  if (pathname === "/about" && method === "GET") return aboutController();
  if (pathname === "/contact" && method === "GET") return contactController();

  // Items routes
  if (pathname === "/items" && method === "GET") {
    return itemsController();
  }

  if (pathname === "/items" && method === "POST") {
    return addItemController(req);
  }

  // Staff routes
  if (pathname === "/staff" && method === "GET") {
    return staffController();
  }

  if (pathname === "/staff" && method === "POST") {
    return createStaffController({ request: req });
  }

  // Staff profile image route
  const profilePattern = new URLPattern({ pathname: "/staff/:staffId/profile" });

  if (profilePattern.test(url) && method === "GET") {
    const match = profilePattern.exec(url);
    const { staffId } = match.pathname.groups;
    return profileController({ staffId });
  }

  return notFoundController();
}