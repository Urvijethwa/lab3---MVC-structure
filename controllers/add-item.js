// controllers/add-item.js

import { validateSchema, required, minLength, maxLength } from "../tools/validation.js";
import { addItem, getItems } from "../models/item.js";
import { itemsView } from "../views/items.js";
import { render } from "../tools/render.js";

// Schema for validating the "Add Item" form
const newItemSchema = {
  name: {
    validators: [required, minLength(2), maxLength(30)],
    displayName: "Name",
  },
  description: {
    validators: [required, minLength(2), maxLength(100)],
    displayName: "Description",
  },
};

export async function addItemController(req) {
  // Read submitted form data
  const formData = await req.formData();

  // Validate using schema
  const { isValid, errors, validated } = validateSchema(formData, newItemSchema);

  // If invalid: re-render /items with error messages (HTTP 400)
  if (!isValid) {
    const items = getItems();
    return render(itemsView, { items, errors }, 400);
  }

  // If valid: add item using cleaned values
  addItem(validated.name, validated.description);

  // Redirect back to /items
  return new Response(null, {
    status: 303,
    headers: { Location: "/items" },
  });
}
// //validation 
// import { validateSchema, required, minLength, maxLength } from "../tools/validation.js";
// import { addItem } from "../models/item.js";
// import { addItem, getItems } from "../models/item.js";
// import { itemsView } from "../views/items.js";
// import { render, redirect } from "../tools/render.js"; // adjust if redirect is elsewhere

// //defined schema
// const newItemSchema = {
//     name: {
//       validators: [required, minLength(2), maxLength(30)],
//       displayName: "Name",
//     },
//     description: {
//       validators: [required, minLength(2), maxLength(100)],
//       displayName: "Description",
//     },
//   };

// export async function addItemController(req) {
//     // Parse form data from the request
// // const formData = await req.formData();
// // const name = formData.get("name");
// // const description = formData.get("description");
// const { isValid, errors, validated } =
//   validateSchema(formData, newItemSchema);
// // Add the item to the database
// addItem(name, description);
// // Return a redirect response
// return new Response(null, {
//     status: 303,
//     headers: { "Location": "/items" }
// });
// }

