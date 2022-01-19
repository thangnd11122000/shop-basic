const category_id = new URLSearchParams(window.location.search).get("id");

let nameEl = document.querySelector("#name");
let buttonEl = document.querySelector("#button-edit-category");
let errorEl = document.querySelector("#error");

async function renderCategory() {
	const res = await fetch("http://localhost:3000/categories/" + category_id);
	const category = await res.json();
	nameEl.value = category.name;
}

function putDataCategory(name) {
	let category = {
		name: name,
	};

	fetchData("http://localhost:3000/categories/" + category_id, category, "PUT")
		.then((result) => console.log(result))
		.then(() => {
			let messageEl = document.querySelector("#message-success");
			messageEl.innerHTML = `<div class="alert alert-success" role="alert">Bạn đã sửa danh mục thành công</div>`;
			setTimeout(() => {
				messageEl.innerHTML = "";
			}, 4000);
		});
}

function editCategory() {
	buttonEl.addEventListener("click", () => {
		let errors = [];
		if (nameEl.value == "") {
			errors.push("Vui lòng nhập tên danh mục <br>");
		}

		errorEl.innerHTML = "";

		if (errors.length > 0) {
			errors.map((e) => {
				errorEl.innerHTML += e;
			});
		} else {
			putDataCategory(nameEl.value);
		}
	});
}

renderCategory();
editCategory();
