import { handler } from "./server.js";
Deno.serve(handler);

// import { serveDir } from "@std/http/file-server";
// import { homeView } from "./views/home.js";
// import { aboutView } from "./views/about.js";
// import { contactView } from "./views/contact.js";
// import { notFoundView } from "./views/not-found.js";
// import { render } from "./tools/render.js";
// // Request handler with routing
// async function handler(req) {
// // *************************
// // leave the code as it is
// // *************************
// }
// Deno.serve(handler);

// import { serveDir } from "@std/http/file-server";
// import { homeView } from "./views/home.js";
// import { aboutView } from "./views/about.js";
// import { contactView } from "./views/contact.js";
// import { notFoundView } from "./views/not-found.js";
// function render(viewFunction) {
// // *************************
// // leave the code as it is
// // *************************
// }
// async function handler(req) {
// // *************************
// // leave the code as it is
// // *************************
// }
// Deno.serve(handler);