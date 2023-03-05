// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

interface Product {
	id: string;
	name: string;
	price: number;
}

interface CartItem {
	id: string;
	quantity: number;
}
