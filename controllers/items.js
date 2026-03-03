import { getItems } from "../models/item.js";
import { itemsView } from "../views/items.js";
import { render } from "../tools/render.js";

export function itemsController() {
  const items = getItems();
  return render(itemsView, { items });
}
// import { render } from "../tools/render.js";
// import { itemsView } from "../views/items.js";
// import { getItems } from "../models/item.js";

// export function itemsController() {
//     const items = getItems();
//     return render(itemsView, items);
// }