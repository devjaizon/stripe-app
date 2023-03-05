// localhost
import type { RequestHandler } from './$types';
import Stripe from 'stripe';

const SECRET_STRIPE_KEY =
	'sk_test_51HddwTIR4bV8TmGddQqfyNYknibwz5ZmihNnGpY561daoPAQuVKR4QN6MBXCq2Ztg6Wq1SVRbqKSTFY5zmKkNL6u00QaEH3cB6';

// initialize stripe
const stripe = new Stripe(SECRET_STRIPE_KEY, {
	// choosing a version
	apiVersion: '2022-11-15'
});

// http://localhost:5173/api/stripecheckout

// POST /stripecheckout data: items
//return => url created by Stripe for use

export const POST: RequestHandler = async ({ request }) => {
	// items : []
	const data = await request.json();
	const items = data.items;

	const lineItems: any = [];
	items.forEach((item: any) => {
		lineItems.push({ price: item.id, quantity: item.quantity });
	});

	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		success_url: 'http://localhost:5173/success',
		cancel_url: 'http://localhost:5173/cancel'
	});

	return new Response(JSON.stringify({ url: session.url }), {
		status: 200,
		headers: {
			'content-type': 'application/json'
		}
	});
};
