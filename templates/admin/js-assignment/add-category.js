function postDataCategory(name) {
	let category = {
		name: name,
	};

	fetchData("http://localhost:3000/categories", category)
		.then((result) => console.log(result))
		.then(() => {
			let messageEl = document.querySelector("#message-success");
			messageEl.innerHTML = `<div class="alert alert-success" role="alert">Bạn đã thêm danh mục thành công</div>`;
			setTimeout(() => {
				messageEl.innerHTML = "";
			}, 5000);
		});
}

function addCategory() {
	let nameEl = document.querySelector("#name");
	let buttonEl = document.querySelector("#button-add-category");
	let errorEl = document.querySelector("#error");

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
			postDataCategory(nameEl.value);
			nameEl.value = "";
		}
	});
}

addCategory();
