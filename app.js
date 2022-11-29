/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createGroceryItem, editListItem, getGroceryItems } from './fetch-utils.js';
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
    form.reset();
    const newItem = await createGroceryItem(item, quantity);

    if (newItem) {
        fetchAndDisplayList();
    } else {
        error.textContent = 'Something went wrong while adding item!';
    }
});

window.addEventListener('load', async () => {
    await fetchAndDisplayList();
});

/* Display Functions */
async function fetchAndDisplayList() {
    listEl.textContent = '';
    // call our fetch to supabase
    const list = await getGroceryItems();
    if (list) {
        for (let item of list) {
            const groceryItemEl = renderGroceryItem(item);
            groceryItemEl.addEventListener('click', async () => {
                await editListItem(item);
                fetchAndDisplayList();
            });
            if (item.cross_out) {
                groceryItemEl.classList.add('cross-out-true');
            }

            listEl.append(groceryItemEl);
        }
    }
}
