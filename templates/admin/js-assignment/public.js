async function fetchData(url = "", data = {}, method = "POST") {
	const response = await fetch(url, {
		method: method,
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(data),
	});
	return response.json();
}

function formatCash(str) {
	str = str.toString();
	return str
		.split("")
		.reverse()
		.reduce((prev, next, index) => {
			return (index % 3 ? next : next + ".") + prev;
		});
}

function formatDate(date) {
	return moment(date).format("DD-MM-YYYY");
}
