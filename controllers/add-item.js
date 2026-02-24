import { addItem } from "../models/item.js";

export async function addItemController(req) {
    // Parse form data from the request
const formData = await req.formData();
const name = formData.get("name");
const description = formData.get("description");
// Add the item to the database
addItem(name, description);
// Return a redirect response
return new Response(null, {
    status: 303,
    headers: { "Location": "/items" }
});
}