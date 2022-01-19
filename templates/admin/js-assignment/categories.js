async function renderCategories() {
	const res = await fetch("http://localhost:3000/categories");
	const categories = await res.json();
	let categoriesEl = document.querySelector(".show-categories");
	categoriesEl.innerHTML = "";
	categories.map((e) => {
		categoriesEl.innerHTML += `
		<tr>
		<td>${e.id}</td>
		<td>${e.name}</td>
		<td class="w-20 text-center">
				<a
					href="/edit-category.html?id=${e.id}"
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
					onclick="deleteCategory(${e.id})"
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

async function checkProduct(category_id) {
	const res = await fetch("http://localhost:3000/products");
	const products = await res.json();
	let flag = false;
	products.map((e) => {
		if (e.category_id == category_id) {
			flag = true;
		}
	});
	return flag;
}

const deleteCategory = (id) => {
	Swal.fire({
		title: "Xóa danh mục này?",
		icon: "question",
		showCloseButton: true,
		showCancelButton: true,
		confirmButtonText: `Xóa danh mục`,
		confirmButtonColor: "#d33",
		cancelButtonText: `Quay lại`,
		cancelButtonColor: "#0B5ED7",
		reverseButtons: true,
	}).then(async (button) => {
		if (button.isConfirmed) {
			let messageEl = document.querySelector("#message-success");
			flag = await checkProduct(id);
			if (flag) {
				messageEl.innerHTML = `<div class="alert alert-danger" role="alert">Có sản phẩm tồn tại trong danh mục</div>`;
			} else {
				const res = await fetch("http://localhost:3000/categories/" + id, {
					method: "DELETE",
				});
				renderCategories();
				messageEl.innerHTML = `<div class="alert alert-success" role="alert">Bạn đã xóa danh mục thành công</div>`;
			}
			setTimeout(() => {
				messageEl.innerHTML = "";
			}, 4000);
		}
	});
};

renderCategories();
