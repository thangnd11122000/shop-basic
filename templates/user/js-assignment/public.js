if (sessionStorage.getItem("cart") == null) {
  sessionStorage.setItem("cart", JSON.stringify([]));
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

const addToCart = (id, image, name, price, quantity = 1) => {
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  if (cart == null) {
    cart = [];
    cart.push({
      id: id,
      name: name,
      price: price,
      image: image,
      quantity: quantity,
    });
  } else {
    let item = cart.find((item) => item.id === id);
    item
      ? item.quantity++
      : cart.push({
          id: id,
          name: name,
          price: price,
          image: image,
          quantity: quantity,
        });
  }
  sessionStorage.setItem("cart", JSON.stringify(cart));
  showCartNav(JSON.parse(sessionStorage.getItem("cart")));
  addToCartSuccess();
};
const getTotalPrice = (cart) => {
  let total = 0;
  if (cart) {
    cart.map((item) => {
      total += item.quantity * item.price;
    });
  }
  return formatCash(total);
};

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
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

function addToCartSuccess() {
  Swal.fire({
    title: "Thêm sản phẩm thành công",
    text: "Bạn có muốn xem giỏ hàng!",
    icon: "success",
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonColor: "#0B5ED7",
    cancelButtonColor: "#0B5ED7",
    confirmButtonText: "Xem giỏ hàng",
    cancelButtonText: "Tiếp tục mua",
    reverseButtons: true,
  }).then((button) => {
    if (button.isConfirmed) {
      window.location = "./cart.html";
    }
  });
}

function showCartNav(cart) {
  let cartContentEl = document.querySelector(".cart-content");
  let cartNumberEl = document.querySelector(".cart-number");
  if (cart.length > 0) {
    let totalQuantity = 0;
    let totalPrice = getTotalPrice(cart);
    cartContentEl.innerHTML = "";
    cartContentEl.innerHTML += `
      <div class="cart-title">
        <h4>Giỏ hàng</h4>
      </div>
      `;
    cart.map((item) => {
      totalQuantity += item.quantity;
      cartContentEl.innerHTML += ` 
      <div class="cart-items">
        <div class="cart-item clearfix">
          <div class="cart-item-image">
            <a href="/detail.html?id=${item.id}">
              <img
              src="${item.image}"
              alt="${item.name}" 
              width="50"
              />
            </a>
          </div>
          <div class="cart-item-desc">
            <a href="/detail.html?id=${item.id}">${item.name}</a>
            <span class="cart-item-price">${formatCash(item.price)}đ</span>
            <span class="cart-item-quantity">x ${item.quantity}</span>
          </div>
        </div>
      </div>
      `;
    });
    cartContentEl.innerHTML += `
    <div class="cart-action clearfix">
      <span class="pull-left checkout-price">${totalPrice}đ</span>
      <a class="btn btn-default pull-right" href="/cart.html">Xem giỏ hàng</a>
    </div>
    `;
    cartNumberEl.innerHTML = totalQuantity;
  } else {
    cartContentEl.innerHTML = "";
    cartContentEl.innerHTML = `
    <div class="cart-title">
      <h4>Không có sản phẩm</h4>
    </div>
    `;
    cartNumberEl.innerHTML = 0;
  }
}

showCartNav(JSON.parse(sessionStorage.getItem("cart")));
