const product_id = new URLSearchParams(window.location.search).get("id");
let nameEl = document.querySelector("#name");
let priceEl = document.querySelector("#price");
let imageEl = document.querySelector("#image");
let detailEl = document.querySelector("#detail");
let categoryEl = document.querySelector("#category");
let buttonEl = document.querySelector("#button-edit-product");
let errorEl = document.querySelector("#error");

async function renderCategories() {
	const response = await fetch("http://localhost:3000/categories");
	const data = await response.json();

	let categoryEl = document.querySelector("#category");
	categoryEl.innerHTML = "";
	categoryEl.innerHTML += `<option value="">Thể loại</option>`;
	data.map((category) => {
		categoryEl.innerHTML += `<option value=${category.id}>${category.name}</option>`;
	});
}

async function renderProduct() {
	const res = await fetch("http://localhost:3000/products/" + product_id);
	const product = await res.json();
	nameEl.value = product.name;
	priceEl.value = product.price;
	imageEl.value = product.image;
	detailEl.value = product.detail;
	categoryEl.value = product.category_id;
}

function putDataProduct(name, image, price, detail, category_id) {
	let product = {
		name: name,
		image: image,
		price: price,
		detail: detail,
		category_id: category_id,
	};

	fetchData("http://localhost:3000/products/" + product_id, product, "PUT")
		.then((result) => console.log(result))
		.then(() => {
			let messageEl = document.querySelector("#message-success");
			messageEl.innerHTML = `<div class="alert alert-success" role="alert">Bạn đã sửa sản phẩm thành công</div>`;
			setTimeout(() => {
				messageEl.innerHTML = "";
			}, 4000);
		});
}

function editProduct() {
	buttonEl.addEventListener("click", () => {
		let errors = [];
		if (nameEl.value == "") {
			errors.push("Vui lòng nhập tên sản phẩm <br>");
		}
		if (priceEl.value == "") {
			errors.push("Vui lòng nhập giá sản phẩm <br>");
		}
		if (imageEl.value == "") {
			errors.push("Vui lòng nhập hình ảnh sản phẩm <br>");
		}
		if (detailEl.value == "") {
			errors.push("Vui lòng nhập miêu tả <br>");
		}
		if (categoryEl.value == "") {
			errors.push("Vui lòng chọn thể loại <br>");
		}

		errorEl.innerHTML = "";

		if (errors.length > 0) {
			errors.map((e) => {
				errorEl.innerHTML += e;
			});
		} else {
			putDataProduct(
				nameEl.value,
				imageEl.value,
				parseInt(priceEl.value),
				detailEl.value,
				parseInt(categoryEl.value)
			);
		}
	});
}

renderCategories();
renderProduct();
editProduct();
