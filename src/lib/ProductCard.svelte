<script lang="ts">
	import { addToCart, cartItems, removeFromCart } from '../stores/cart';
	export let product: Product = { id: '', name: '', price: 0 };

	let cartProduct: CartItem;
	$: cartProduct = $cartItems[$cartItems.findIndex((item) => item.id === product.id)];
</script>

<div class="card">
	<header class="card-header">
		<h2>{product.name}</h2>
	</header>
	<div class="card-body px-4">Quantidade: <strong>{cartProduct?.quantity || 0}</strong></div>
	<div class="card-body px-4">Price: R${product.price}</div>
	<footer class="card-footer">
		<button class="p-2 rounded variant-glass-primary" on:click={() => addToCart(product.id)}
			>Adicionar</button
		>
		<button class="p-2 rounded variant-glass-error" on:click={() => removeFromCart(product.id)}
			>Remover</button
		>
	</footer>
</div>
