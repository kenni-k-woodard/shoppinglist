/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createGroceryItem, getGroceryItems } from './fetch-utils.js';
import { renderGroceryItem } from './render-utils.js';

/* Get DOM Elements */
const form = document.querySelector('.grocery-form');
const error = document.querySelector('.error');
const listEl = document.querySelector('.list');

/* State */

/* Events */

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const item = data.get('item');
    const quantity = data.get('quantity');

    const newItem = await createGroceryItem(item, quantity);

    if (newItem) {
        // display item
        // display whole list (clear old list and fetch it again)
    } else {
        error.textContent = 'Something went wrong while adding item!';
    }
});

/* Display Functions */
async function fetchAndDisplayList() {
    listEl.textContent = '';
    // call our fetch to supabase
    const list = await getGroceryItems();
    if (list) {
        for (let item of list) {
            const groceryItemEl = renderGroceryItem(item);
            listEl.append(groceryItemEl);
        }
    }
}
