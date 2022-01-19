const order_id = new URLSearchParams(window.location.search).get("id");

async function renderOrder() {
	const res1 = await fetch("http://localhost:3000/orders/" + order_id);
	const order = await res1.json();

	const res2 = await fetch(
		"http://localhost:3000/order_details?order_id=" + order_id
	);
	const order_details = await res2.json();

	let totalOrder = 0;
	order_details.map((e) => (totalOrder += e.unit_price * e.quantity));

	let orderInfo = document.querySelector(".show-order-info");
	let orderUser = document.querySelector(".show-order-user");
	let orderCart = document.querySelector(".show-cart");

	orderInfo.innerHTML = "";
	orderUser.innerHTML = "";
	orderCart.innerHTML = "";

	orderInfo.innerHTML = `
			<div class="col-xs-12 p-n">
				<div class="col-xs-4 p-n">Đơn hàng #:</div>
				<div class="col-xs-8 p-n">${order.id}</div>
			</div>
			<div class="col-xs-12 p-n">
				<div class="col-xs-4 p-n">Ngày đặt hàng:</div>
				<div class="col-xs-8 p-n">${formatDate(order.create_date)}</div>
			</div>
			<div class="col-xs-12 p-n">
				<div class="col-xs-4 p-n">Trạng thái đơn hàng:</div>
				<div class="col-xs-8 p-n">
					<span class="label label-info label-wide">${
						order.status == 1
							? "Đang chờ"
							: order.status == 2
							? "Đang giao"
							: order.status == 3
							? "Thành công"
							: "Đã hủy"
					}</span>
				</div>
			</div>
			<div class="col-xs-12 p-n">
				<div class="col-xs-4 p-n">Tổng đơn hàng:</div>
				<div class="col-xs-8 p-n">${formatCash(totalOrder)}đ</div>
			</div>
	`;

	orderUser.innerHTML = `
			<div class="col-xs-12 p-n">
				<div class="col-xs-4 p-n">Tên khách hàng:</div>
				<div class="col-xs-8 p-n">${order.customer_name}</div>
			</div>
			<div class="col-xs-12 p-n">
				<div class="col-xs-4 p-n">Email:</div>
				<div class="col-xs-8 p-n">${order.customer_email}</div>
			</div>
			<div class="col-xs-12 p-n">
				<div class="col-xs-4 p-n">Địa chỉ:</div>
				<div class="col-xs-8 p-n">${order.customer_address}</div>
			</div>
			<div class="col-xs-12 p-n">
				<div class="col-xs-4 p-n">Số điện thoại:</div>
				<div class="col-xs-8 p-n">${order.customer_phone}</div>
			</div>
	`;

	order_details.map(async (e) => {
		const res3 = await fetch("http://localhost:3000/products/" + e.product_id);
		const product = await res3.json();

		orderCart.innerHTML += `
		<tr>
			<td>${product.id}</td>
			<td><img src="${product.image}"  width="50"/></td>
			<td>${product.name}</td>
			<td>${e.quantity}</td>
			<td>${formatCash(e.unit_price)}đ</td>
			<td>${formatCash(e.quantity * e.unit_price)}đ</td>
		</tr>
		`;
	});
}

renderOrder();
