import { render } from "../tools/render.js";
import { itemsView } from "../views/items.js";
import { getItemsForUser } from "../models/item.js";
import { redirect } from "../tools/redirect.js";

export function itemsController(ctx) {
  if (!ctx.session) {
    const headers = new Headers();
    return redirect("/login", "Login to access", headers);
  }

  const { session } = ctx;
  const items = getItemsForUser(session.username);

  return render(itemsView, { items }, ctx);
}
// import { render } from "../tools/render.js";
// import { itemsView } from "../views/items.js";
// import { getItemsForUser } from "../models/item.js";

// export function itemsController(ctx) {
//   const username = ctx?.session?.username || "testuser";
//   const items = getItemsForUser(username);
//   return render(itemsView, { items });
// }
// import { getItems } from "../models/item.js";
// import { itemsView } from "../views/items.js";
// import { render } from "../tools/render.js";

// export function itemsController() {
//   const items = getItems();
//   return render(itemsView, { items });
// }
// // import { render } from "../tools/render.js";
// // import { itemsView } from "../views/items.js";
// // import { getItems } from "../models/item.js";

// // export function itemsController() {
// //     const items = getItems();
// //     return render(itemsView, items);
// // }