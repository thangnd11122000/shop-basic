const product_id = new URLSearchParams(window.location.search).get("id");

const renderDetails = async () => {
  const res = await fetch("http://localhost:3000/products/" + product_id);
  const product = await res.json();

  const productImageEl = document.querySelector(".product-image");
  const productNameEl = document.querySelector(".product-name");
  const productPriceEl = document.querySelector(".product-price");
  const productDetailEl = document.querySelector(".product-detail");

  productImageEl.innerHTML = `<img class="img-responsive" src="${product.image}" alt="${product.name}" style="padding: 40px;"/>`;
  productNameEl.innerHTML = product.name;
  productPriceEl.innerHTML = formatCash(product.price) + "đ";
  productDetailEl.innerHTML = product.detail;

  renderRelatedProducts(product.category_id);

  document.querySelector(".cart-add").addEventListener("click", () => {
    let quantity = document.querySelector(".cart-quantity").value;
    addToCart(product.id, product.image, product.name, product.price, quantity);
  });
};

const renderRelatedProducts = async (category_id) => {
  const res = await fetch(
    "http://localhost:3000/products?category_id=" + category_id
  );
  const products = await res.json();

  let rProductsEl = document.querySelector(".show-related-products");
  rProductsEl.innerHTML = "";
  products.map(({ id, image, name, price }, index) => {
    index < 5 &&
      id != product_id &&
      (rProductsEl.innerHTML += `
    <div class="col-md-3 col-sm-6">
      <div class="product-info">
        <a href="./detail.html?id=${id}" class="product-img">
          <img src="${image}" alt="" />
        </a>
        <h4><a href="./detail.html?id=${id}">${name}</a></h4>
        <div class="rc-ratings">
          <span class="fa fa-star active"></span>
          <span class="fa fa-star active"></span>
          <span class="fa fa-star active"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </div>
        <div class="product-price">${formatCash(price)}đ</div>
        <div class="shop-meta text-center">
          <a href="#" onclick="addToCart(${id},'${image}','${name}',${price})"
            ><i class="fa fa-shopping-cart"></i> Thêm vào giỏ</a
          >
        </div>
      </div>
    </div>
    `);
  });
};

renderDetails();
