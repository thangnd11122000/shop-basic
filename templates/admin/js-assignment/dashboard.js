async function renderDashboard() {
	const res1 = await fetch("http://localhost:3000/orders");
	const orders = await res1.json();
	const res2 = await fetch("http://localhost:3000/order_details");
	const order_details = await res2.json();
	const res3 = await fetch("http://localhost:3000/products");
	const products = await res3.json();

	let revenueEl = document.querySelector(".dashboard-revenue");
	let orderShippingEl = document.querySelector(".dashboard-order-shipping");
	let orderSuccessEl = document.querySelector(".dashboard-order-success");
	let productsEl = document.querySelector(".dashboard-products");

	let revenue = (orderShipping = orderSuccess = numOfProducts = 0);

	orders.map((order) => {
		if (order.status == 2) {
			orderShipping += 1;
		}
		if (order.status == 3) {
			orderSuccess += 1;
			order_details.map((detail) => {
				if (order.id == detail.order_id) {
					revenue += detail.quantity * detail.unit_price;
				}
			});
		}
	});

	products.map((e) => (numOfProducts += 1));

	revenueEl.innerHTML = formatCash(revenue) + "đ";
	orderShippingEl.innerHTML = orderShipping;
	orderSuccessEl.innerHTML = orderSuccess;
	productsEl.innerHTML = numOfProducts;
}

renderDashboard();
