export function itemsView(data) {
    const itemsHtml = data.map(item => `<li>${item.name}: ${item.description}</li>`).join('');
  
    return `
      <h2>Items</h2>
  
      <form method="POST" action="/items">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
        </div>
  
        <div>
          <label for="description">Description:</label>
          <input type="text" id="description" name="description" required>
        </div>
  
        <button type="submit">Add Item</button>
      </form>
  
      <h3>Current Items:</h3>
      <ul>
        ${itemsHtml}
      </ul>
    `;
  }