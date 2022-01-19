async function convertCategories(id) {
	const res = await fetch("http://localhost:3000/categories");
	const categories = await res.json();
	let category_name = "";
	categories.map((cat) => {
		if (cat.id == id) {
			category_name = cat.name;
		}
	});
	return category_name;
}

async function renderProducts() {
	const res = await fetch("http://localhost:3000/products");
	const products = await res.json();
	let productsEl = document.querySelector(".show-products");
	productsEl.innerHTML = "";
	products.map(async (e) => {
		let category_name = await convertCategories(e.category_id);
		productsEl.innerHTML += `
		<tr>
		<td>${e.id}</td>
		<td><img src=${e.image} width=100px /></td>
		<td>${e.name}</td>
		<td>${formatCash(e.price)}đ</td>
		<td class="w-45">${e.detail}</td>
		<td class="w-10">${category_name}</td>
		<td class="w-10 text-center">
				<a
					href="/edit-product.html?id=${e.id}"
					type="button"
					class="btn btn-info btn-xs btn-labeled next-btn"
				>
					Sửa
					<span class="btn-label btn-label-right">
					<i class="fa fa-pencil"></i>
					</span>
				</a>
				<a
					href="#"
					onclick="deleteProduct(${e.id})"
					type="button"
					class="btn btn-danger btn-xs btn-labeled next-btn mt-5"
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

const deleteProduct = (id) => {
	Swal.fire({
		title: "Xóa sản phẩm này?",
		icon: "question",
		showCloseButton: true,
		showCancelButton: true,
		confirmButtonText: `Xóa sản phẩm`,
		confirmButtonColor: "#d33",
		cancelButtonText: `Quay lại`,
		cancelButtonColor: "#0B5ED7",
		reverseButtons: true,
	}).then(async (button) => {
		if (button.isConfirmed) {
			const res = await fetch("http://localhost:3000/products/" + id, {
				method: "DELETE",
			});
			renderProducts();
			let messageEl = document.querySelector("#message-success");
			messageEl.innerHTML = `<div class="alert alert-success" role="alert">Bạn đã xóa sản phẩm thành công</div>`;
			setTimeout(() => {
				messageEl.innerHTML = "";
			}, 4000);
		}
	});
};

renderProducts();
