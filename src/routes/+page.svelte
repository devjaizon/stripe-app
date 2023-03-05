<script lang="ts">
	import ProductCard from '$lib/ProductCard.svelte';
	import { cartItems } from '../stores/cart';

	const products: Product[] = [
		{
			id: 'price_1MfMkiIR4bV8TmGdI2H5bODS',
			name: 'Copo',
			price: 12
		},
		{
			id: 'price_1MfMlcIR4bV8TmGdWypHbeoh',
			name: 'Prato',
			price: 20
		},
		{
			id: 'price_1MfMmGIR4bV8TmGdZMTEnS6s',
			name: 'Óculos',
			price: 55
		}
	];

	const checkout = async () => {
		try {
			const res = await fetch('/api/stripecheckout', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					items: $cartItems
				})
			});

			const data = await res.json();

			cartItems.set([]);

			window.location.replace(data.url);
		} catch (error) {
			console.log(error);
		}
	};
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-3">
			<h1>Stripe Store!</h1>
		</div>
		{#each products as product}
			<ProductCard {product} />
		{/each}
		<div class="col-span-3">
			<button class="btn variant-filled-primary" on:click={checkout}>Pagar com o Stripe</button>
		</div>
	</div>
</div>
