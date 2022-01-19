function renderTotal() {
  let orderTotalEl = document.querySelector(".order-total");
  if (orderTotalEl) {
    orderTotalEl.innerHTML =
      getTotalPrice(JSON.parse(sessionStorage.getItem("cart"))) + "đ";
  }
}

const editCart = () => {
  let cartRows = document.querySelectorAll(".cart-rows");
  let cartUpdate = document.querySelector(".cart-update");
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  cartRows.forEach((row) => {
    let id = row.children[0].value;
    let decrease = row.children[4].children[0].children[0];
    let increase = row.children[4].children[0].children[2];
    let quantity = row.children[4].children[0].children[1];
    let price = row.children[3].children[0];
    let total = row.children[5].children[0];


    increase.addEventListener("click", () => {
      quantity.value++;
      total.innerHTML =
        formatCash(parseInt(price.innerHTML.replace(/\./g, "").slice(0, -1)) * parseInt(quantity.value)) + "đ";
    });

    decrease.addEventListener("click", () => {
      if (quantity.value == 0) return;
      quantity.value--;
      total.innerHTML =
        formatCash(parseInt(price.innerHTML.replace(/\./g, "").slice(0, -1)) * parseInt(quantity.value)) + "đ";
    });

    quantity.addEventListener("change", () => {
      total.innerHTML =
        formatCash(parseInt(price.innerHTML.replace(/\./g, "").slice(0, -1)) * parseInt(quantity.value)) + "đ";
    });

    cartUpdate.addEventListener("click", () => {
      cart.map((item, index) => {
        if (item.id == id) {
          if (quantity.value == 0) {
            cart.splice(index, 1);
          } else {
            item.quantity = parseInt(quantity.value);
          }
        }
      });
      sessionStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      editCart();
      renderTotal();
      updateCartSuccess();
      showCartNav(cart);
    });
  });
};

const deleteCart = (id) => {
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
  }).then((button) => {
    if (button.isConfirmed) {
      let cart = JSON.parse(sessionStorage.getItem("cart"));
      cart = cart.filter((item) => item.id != id);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      editCart();
      renderTotal();
      showCartNav(cart);
    }
  });
};

const renderCart = () => {
  let cartEl = document.querySelector(".show-cart");
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  cartEl.innerHTML = "";
  if (cart.length > 0) {
    cart.map(({ id, name, image, price, quantity }) => {
      cartEl.innerHTML += `
    <tr class="cart-rows">
      <input type="hidden" value="${id}" />
      <td>
        <a href="./detail.html?id=${id}">
          <img src="${image}" alt="${name}" height="90" width="90"/>
        </a>
      </td>
      <td>
        <a href="./detail.html?id=${id}">${name}</a>
      </td>
      <td>
        <span class="amount cart-price">${formatCash(price)}đ</span>
      </td>
      <td>
        <div class="cart-quantity-box">
          <div class="decrease-quantity cart-quantity-btn">
            <i class="fa fa-minus"></i>
          </div>
          <input
            type="number"
            class="quantity cart-quantity-input"
            value="${quantity}"
            min="0"
          />
          <div class="increase-quantity cart-quantity-btn">
            <i class="fa fa-plus"></i>
          </div>
        </div>
      </td>
      <td>
        <span class="amount cart-total">${formatCash(price * quantity)}đ</span>
      </td>
      <td>
        <a href="#" class="remove" onClick="deleteCart(${id})">
          <i class="fa fa-times">Xóa</i>
        </a>
      </td>
    </tr>
    `;
    });
  } else {
    let cartProducts = document.querySelector(".cart-products");
    cartProducts.innerHTML = `
    <div class="row">
      <div class="col-md-12 text-center">
        <div class="">
          <h2>Không có sản phẩm trong giỏ!</h2>
          <p class="wow fadeInUp">Bạn hãy thêm sản phẩm vào giỏ hàng.</p>
          <p class="top-space-lg">
            <a href="/index.html" class="btn btn-danger btn-lg">Trang chủ</a>
          </p>
        </div>
      </div>
    </div>
    `;
  }
};

renderCart();
editCart();
renderTotal();

let cartFreshEl = document.querySelector(".cart-fresh");
if (cartFreshEl) {
  cartFreshEl.addEventListener("click", () => {
    renderCart();
    editCart();
  });
}

function updateCartSuccess() {
  Swal.fire({
    title: "Cập nhập thành công",
    icon: "success",
    showCloseButton: true,
    confirmButtonColor: "#0B5ED7",
    confirmButtonText: "Tiếp tục",
  });
}
