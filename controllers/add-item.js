import { validateSchema, required, minLength, maxLength } from "../tools/validation.js";
import { createItem, getItemsForUser } from "../models/item.js";
import { itemsView } from "../views/items.js";
import { render } from "../tools/render.js";
import { redirect } from "../tools/redirect.js";

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

export async function addItemController(ctx) {
  if (!ctx.session) {
    const headers = new Headers();
    return redirect("/login", "Login to access", headers);
  }

  const formData = await ctx.request.formData();
  const { isValid, errors, validated } = validateSchema(formData, newItemSchema);

  const { session } = ctx;

  if (!isValid) {
    const items = getItemsForUser(session.username);
    return render(itemsView, { items, errors }, { ...ctx, status: 400 });
  }

  createItem(session.username, validated.name, validated.description);

  return new Response(null, {
    status: 303,
    headers: { Location: "/items" },
  });
}
// import { validateSchema, required, minLength, maxLength } from "../tools/validation.js";
// import { createItem, getItemsForUser } from "../models/item.js";
// import { itemsView } from "../views/items.js";
// import { render } from "../tools/render.js";

// const newItemSchema = {
//   name: {
//     validators: [required, minLength(2), maxLength(30)],
//     displayName: "Name",
//   },
//   description: {
//     validators: [required, minLength(2), maxLength(100)],
//     displayName: "Description",
//   },
// };

// export async function addItemController(request) {
//   const formData = await request.formData();

//   const { isValid, errors, validated } = validateSchema(formData, newItemSchema);

//   const username = "testuser";

//   if (!isValid) {
//     const items = getItemsForUser(username);
//     return render(itemsView, { items, errors }, 400);
//   }

//   createItem(username, validated.name, validated.description);

//   return new Response(null, {
//     status: 303,
//     headers: { Location: "/items" },
//   });
// }