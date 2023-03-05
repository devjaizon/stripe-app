import { writable, get } from 'svelte/store';

export const cartItems = writable<CartItem[]>([]);

//add to cart
export const addToCart = (id: string) => {
	// find index
	const items = get(cartItems);
	const pos = items.findIndex((item) => item.id == id);

	if (pos !== -1) {
		// item in the cart
		// increment quantity
		cartItems.update(() => {
			const updated = items.map((item) => {
				if (item.id === id) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			});
			return updated;
		});
	} else {
		// item not in the cart
		// add it
		cartItems.update(() => {
			return [...items, { id: id, quantity: 1 }];
		});
	}
};
//remove from cart
export const removeFromCart = (id: string) => {
	// find index
	const items = get(cartItems);
	const pos = items.findIndex((item) => item.id == id);

	if (items[pos]?.quantity - 1 === 0) {
		// last unity from item
		// remove the item completly
		items.splice(pos, 1);
	}

	// more than one unity
	// reduce quantity by one
	cartItems.update(() => {
		const updated = items.map((item) => {
			if (item.id === id) {
				return { ...item, quantity: item.quantity - 1 };
			}
			return item;
		});
		return updated;
	});
};
