import { serveDir } from "@std/http/file-server";
import { currentSession } from "./tools/auth.js";

import { homeController } from "./controllers/home.js";
import { aboutController } from "./controllers/about.js";
import { contactController } from "./controllers/contact.js";
import { notFoundController } from "./controllers/not-found.js";

import { itemsController } from "./controllers/items.js";
import { addItemController } from "./controllers/add-item.js";

import { staffController, createStaffController } from "./controllers/staff.js";
import { staffProfileController } from "./controllers/staff-profile.js";

import { registrationFormController, registrationController } from "./controllers/user.js";
import { loginFormController, loginController, logoutController } from "./controllers/sessions.js";

export async function handler(request) {
  const session = currentSession(request);
  const ctx = { request, session };

  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;

  // Serve files from /public
  if (pathname.endsWith(".css")) {
    return serveDir(request, { fsRoot: "public" });
  }

  // Basic routes
  if (pathname === "/" && method === "GET") return homeController(ctx);
  if (pathname === "/about" && method === "GET") return aboutController(ctx);
  if (pathname === "/contact" && method === "GET") return contactController(ctx);

  // Items routes
  if (pathname === "/items" && method === "GET") {
    return itemsController(ctx);
  }

  if (pathname === "/items" && method === "POST") {
    return addItemController(ctx);
  }

  // Staff routes
  if (pathname === "/staff" && method === "GET") {
    return staffController(ctx);
  }

  if (pathname === "/staff" && method === "POST") {
    return createStaffController({ request });
  }

  // Staff profile image route
  const profilePattern = new URLPattern({ pathname: "/staff/:staffId/profile" });

  if (profilePattern.test(url) && method === "GET") {
    const match = profilePattern.exec(url);
    const { staffId } = match.pathname.groups;
    return staffProfileController({ params: { staffId } });
  }

  // Authentication routes
  if (pathname === "/register" && method === "GET") {
    return registrationFormController(ctx);
  }

  if (pathname === "/users" && method === "POST") {
    return registrationController(ctx);
  }

  if (pathname === "/login" && method === "GET") {
    return loginFormController(ctx);
  }

  if (pathname === "/sessions" && method === "POST") {
    return loginController(ctx);
  }

  if (pathname === "/logout" && method === "POST") {
    return logoutController(ctx);
  }

  return notFoundController(ctx);
}