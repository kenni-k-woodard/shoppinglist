export function renderGroceryItem(itemObject) {
    const groceryItemEl = document.createElement('li');
    groceryItemEl.textContent = `${itemObject.item}: ${itemObject.quantity}`;

    return groceryItemEl;
}
