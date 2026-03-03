import { escape } from "@std/html";
export function itemsView({ items, errors = {} }) {

  const itemsHtml = items.map(item =>
    `<li>${escape(item.name)}: ${escape(item.description)}</li>`
  ).join("");

  return `
    <h2>Items</h2>

    <form method="POST" action="/items">

      <div class="field">
        <label for="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value="${errors.name?.value || ""}"
          aria-invalid="${errors.name?.error ? "true" : "false"}"
          required
        >
        <span class="error">${errors.name?.message || ""}</span>
      </div>

      <div class="field">
        <label for="description">Description:</label>
        <input 
          type="text" 
          id="description" 
          name="description" 
          value="${errors.description?.value || ""}"
          aria-invalid="${errors.description?.error ? "true" : "false"}"
          required
        >
        <span class="error">${errors.description?.message || ""}</span>
      </div>

      <button type="submit">Add Item</button>
    </form>

    <h3>Current Items:</h3>
    <ul>
      ${itemsHtml}
    </ul>
  `;
}

// //prevents XSS Cross site scripting - pop ups 
// import { escape } from "@std/html";

// export function itemsView(data) {
//   const itemsHtml = data.map(item =>
//     `<li>${escape(item.name)}: ${escape(item.description)}</li>`
//   ).join("");

//   return `
//     <h2>Items</h2>

//     <form method="POST" action="/items">
//       <div>
//         <label for="name">Name:</label>
//         <input type="text" id="name" name="name" required>
//       </div>

//       <div>
//         <label for="description">Description:</label>
//         <input type="text" id="description" name="description" required>
//       </div>

//       <button type="submit">Add Item</button>
//     </form>

//     <h3>Current Items:</h3>
//     <ul>
//       ${itemsHtml}
//     </ul>
//   `;
// }
