const renderOrder = () => {
  let productOrderEl = document.querySelector(".show-product-order");
  let totalOrderEl = document.querySelector(".show-total-order");

  let cart = JSON.parse(sessionStorage.getItem("cart"));

  if (cart.length > 0) {
    cart.map((item) => {
      productOrderEl.innerHTML += `
      <div class="row" style="margin-bottom:10px; font-size: 18px">
        <div class="col-md-6">
          <span>${item.name} x ${item.quantity}</span>
        </div>
        <div class="col-md-6">
          <span>${formatCash(item.price)}đ</span>
        </div>
      </div>
      `;
    });

    totalOrderEl.innerHTML = getTotalPrice(cart) + "đ";
  } else {
    let checkoutContent = document.querySelector(".checkout-content");
    checkoutContent.innerHTML = `
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
    <div class="submit-order"></div>
    `;
  }
};

const postDataOrder = (name, address, email, phone) => {
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  let order = {
    customer_name: name,
    customer_address: address,
    customer_email: email,
    customer_phone: phone,
    create_date: new Date().toISOString().slice(0, 10),
    status: 1,
  };
  postData("http://localhost:3000/orders", order)
    .then((result) => {
      cart.map((item) => {
        let order_details = {
          order_id: result.id,
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
        };
        postData("http://localhost:3000/order_details", order_details);
      });
    })
    .then(() => {
      sessionStorage.setItem("cart", JSON.stringify([]));
      showCartNav(JSON.parse(sessionStorage.getItem("cart")));
      let checkoutContent = document.querySelector(".checkout-content");
      checkoutContent.innerHTML = `
      <div class="row">
        <div class="col-md-12 text-center">
          <div class="">
            <h2>Thành công!</h2>
            <p class="wow fadeInUp">Bạn đã đặt hàng thành công.</p>
            <p class="top-space-lg">
              <a href="/index.html" class="btn btn-success btn-lg">Trang chủ</a>
            </p>
          </div>
        </div>
      </div>`;
    });
};

const submitOrder = () => {
  document.querySelector(".submit-order").addEventListener("click", () => {
    let nameEl = document.querySelector("#name").value.trim();
    let addressEl = document.querySelector("#address").value.trim();
    let phoneEl = document.querySelector("#phone").value.trim();
    let emailEl = document.querySelector("#email").value.trim();
    let errorEl = document.querySelector(".error");
    let errors = [];
    if (nameEl == "") {
      errors.push("Vui lòng nhập họ tên <br>");
    }
    if (addressEl == "") {
      errors.push("Vui lòng nhập địa chỉ <br>");
    }
    if (phoneEl == "") {
      errors.push("Vui lòng nhập số điện thoại <br>");
    }
    if (emailEl == "") {
      errors.push("Vui lòng nhập email <br>");
    }
    errorEl.innerHTML = "";

    if (errors.length > 0) {
      errors.map((e) => {
        errorEl.innerHTML += e;
      });
    } else {
      postDataOrder(nameEl, addressEl, emailEl, phoneEl);
    }
  });
};

renderOrder();
submitOrder();
