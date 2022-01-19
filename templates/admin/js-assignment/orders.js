async function renderOrders() {
	const res1 = await fetch("http://localhost:3000/orders");
	const orders = await res1.json();

	const res2 = await fetch("http://localhost:3000/order_details");
	const order_details = await res2.json();

	let ordersEl = document.querySelector(".show-orders");
	ordersEl.innerHTML = "";

	orders.map((e) => {
		let quantity = (price = 0);
		order_details.map((item) => {
			if (e.id == item.order_id) {
				quantity += item.quantity;
				price += item.quantity * item.unit_price;
			}
		});
		ordersEl.innerHTML += `
		<tr>
		<td>${e.id}</td>
		<td>${e.customer_name}</td>
		<td>${quantity}</td>
		<td>${formatCash(price)}đ</td>
		<td>${formatDate(e.create_date)}</td>
		<td>
			<div>
				<select class="form-control" id="order-status" onchange="editStatus(this.value,
					${e.id}, '${e.customer_name}', '${e.customer_address}',
					'${e.customer_email}','${e.customer_phone}','${e.create_date}')">
								<option value=1 ${e.status == 1 ? "selected" : ""}">Đang chờ</option>
								<option value=2 ${e.status == 2 ? "selected" : ""}>Đang giao</option>
								<option value=3 ${e.status == 3 ? "selected" : ""}>Thành công</option>
								<option value=4 ${e.status == 4 ? "selected" : ""}>Đã hủy</option>
				</select>
			</div>
		</td>
		<td class="w-20 text-center">
				<a
					href="/order-detail.html?id=${e.id}"
					type="button"
					class="btn btn-info btn-xs btn-labeled next-btn"
				>
					Chi tiết
					<span class="btn-label btn-label-right">
					<i class="fa fa-eye"></i>
					</span>
				</a>
				<a
					href="#"
					onclick="deleteOrder(${e.id})"
					type="button"
					class="btn btn-danger btn-xs btn-labeled next-btn"
				>
					Xóa
					<span class="btn-label btn-label-right">
					<i class="fa fa-trash-o"></i>
					</span>
				</a>
			</td>
		</tr>
		`;
	});
}

function editStatus(status, id, name, address, email, phone, create_date) {
	fetchData(
		"http://localhost:3000/orders/" + id,
		{
			customer_name: name,
			customer_address: address,
			customer_email: email,
			customer_phone: phone,
			create_date: create_date,
			status: parseInt(status),
		},
		"PUT"
	);
}
const deleteOrder = (id) => {
	Swal.fire({
		title: "Xóa đơn hàng này?",
		icon: "question",
		showCloseButton: true,
		showCancelButton: true,
		confirmButtonText: `Xóa đơn hàng`,
		confirmButtonColor: "#d33",
		cancelButtonText: `Quay lại`,
		cancelButtonColor: "#0B5ED7",
		reverseButtons: true,
	}).then(async (button) => {
		if (button.isConfirmed) {
			const res = await fetch(
				"http://localhost:3000/order_details?order_id=" + id
			);
			const order_details = await res.json();
			order_details.map(async (e) => {
				await fetch("http://localhost:3000/order_details/" + e.id, {
					method: "DELETE",
				});
			});
			await fetch("http://localhost:3000/orders/" + id, {
				method: "DELETE",
			});

			renderOrders();
			let messageEl = document.querySelector("#message-success");
			messageEl.innerHTML = `<div class="alert alert-success" role="alert">Bạn đã xóa đơn hàng thành công</div>`;
			setTimeout(() => {
				messageEl.innerHTML = "";
			}, 4000);
		}
	});
};

renderOrders();


