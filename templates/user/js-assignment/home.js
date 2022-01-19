const renderProducts = async (url = "http://localhost:3000/products") => {
  const res = await fetch(url);
  const products = await res.json();

  let productsEl = document.querySelector(".show-products");
  productsEl.innerHTML = "";
  products.map(({ id, image, name, price }) => {
    productsEl.innerHTML += `
        <div class="col-md-3 col-sm-6">
            <div class="product-info">
                <a href="./detail.html?id=${id}" class="product-img">
                    <img
                    src="${image}"
                    alt="${name}"
                    />
                </a>
                <h4>
                    <a href="./detail.html?id=${id}">${name}</a>
                </h4>
                <div class="rc-ratings">
                    <span class="fa fa-star active"></span>
                    <span class="fa fa-star active"></span>
                    <span class="fa fa-star active"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </div>
                <div class="product-price">${formatCash(price)}đ</div>
                <div class="shop-meta text-center">
                    <a href="#" onclick="addToCart(${id},'${image}','${name}',${price})">
                      <i class="fa fa-shopping-cart"></i> Thêm vào giỏ
                    </a>
                </div>
            </div>
        </div>
    `;
  });
};

const renderCategories = async () => {
  const res = await fetch("http://localhost:3000/categories");
  const categories = await res.json();
  let categoriesEl = document.querySelector(".show-categories");
  categoriesEl.innerHTML = "";
  categoriesEl.innerHTML += `
    <li>
        <a href="#" onclick="renderProducts()">
            Tất cả sản phẩm
            <i class="fa fa-caret-right"></i>
        </a>
    </li>`;
  categories.map(({ id, name }) => {
    categoriesEl.innerHTML += `
    <li>
        <a href="#" onclick="renderProducts('http://localhost:3000/products?category_id=${id}')">
            ${name}
            <i class="fa fa-caret-right"></i>
        </a>
    </li>`;
  });
};

renderProducts();
renderCategories();
