const app = document.getElementById("app");

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ---------------- ROUTING ----------------

function navigate(page) {

    if (page === "home") {
        showHome();
    }

    else if (page === "products") {
        showProducts();
    }

    else if (page === "cart") {
        showCart();
    }

    updateCartCount();
}

// ---------------- HOME PAGE ----------------

function showHome() {

    app.innerHTML = `
        <section class="hero">

            <h2>Welcome to ShopEasy</h2>

            <p>
                Discover quality products at affordable prices.
            </p>

            <button class="primary-btn"
                    onclick="navigate('products')">
                Shop Now
            </button>

        </section>

        <h2>Why ShopEasy?</h2>

        <br>

        <div class="product-grid">

            <div class="product-card">
                <div class="product-info">
                    <h3>Quality Products</h3>
                    <p>Carefully selected products.</p>
                </div>
            </div>

            <div class="product-card">
                <div class="product-info">
                    <h3>Easy Shopping</h3>
                    <p>Simple and user-friendly interface.</p>
                </div>
            </div>

            <div class="product-card">
                <div class="product-info">
                    <h3>Fast Experience</h3>
                    <p>Optimized for better performance.</p>
                </div>
            </div>

        </div>
    `;
}


// ---------------- PRODUCTS PAGE ----------------

function showProducts() {

    app.innerHTML = `

        <h2>Products</h2>

        <br>

        <input
            type="text"
            id="search"
            class="search-box"
            placeholder="Search products..."
            oninput="filterProducts()"
        >

        <div id="product-list" class="product-grid"></div>
    `;

    displayProducts(products);
}


// ---------------- DISPLAY PRODUCTS ----------------

function displayProducts(list) {

    const productList = document.getElementById("product-list");

    if (!productList) return;

    if (list.length === 0) {

        productList.innerHTML =
            "<p>No products found.</p>";

        return;
    }

    productList.innerHTML = list.map(product => `

        <div class="product-card">

            <img
                src="${product.image}?auto=format&fit=crop&w=500&q=70"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="category">
                    ${product.category}
                </p>

                <p class="price">
                    ₹${product.price}
                </p>

                <div class="card-buttons">

                    <button
                        class="view-btn"
                        onclick="showDetails(${product.id})">
                        View
                    </button>

                    <button
                        class="cart-btn"
                        onclick="addToCart(${product.id})">
                        Add Cart
                    </button>

                </div>

            </div>

        </div>

    `).join("");
}


// ---------------- SEARCH ----------------

function filterProducts() {

    const search =
        document.getElementById("search")
        .value
        .toLowerCase();

    const filtered = products.filter(product =>

        product.name
            .toLowerCase()
            .includes(search)

    );

    displayProducts(filtered);
}


// ---------------- PRODUCT DETAILS ----------------

function showDetails(id) {

    const product =
        products.find(item => item.id === id);

    if (!product) return;

    app.innerHTML = `

        <div class="details">

            <img
                src="${product.image}?auto=format&fit=crop&w=600&q=70"
                alt="${product.name}"
            >

            <h2>${product.name}</h2>

            <p class="category">
                Category: ${product.category}
            </p>

            <p class="price">
                Price: ₹${product.price}
            </p>

            <p>
                ${product.description}
            </p>

            <br>

            <button
                class="primary-btn"
                onclick="addToCart(${product.id})">
                Add to Cart
            </button>

            <button
                class="primary-btn"
                onclick="navigate('products')">
                Back
            </button>

        </div>
    `;
}


// ---------------- CART ----------------

function addToCart(id) {

    const product =
        products.find(item => item.id === id);

    if (!product) return;

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert("Product added to cart!");
}


// ---------------- SHOW CART ----------------

function showCart() {

    if (cart.length === 0) {

        app.innerHTML = `
            <h2>Your Cart</h2>

            <br>

            <p>Your cart is empty.</p>
        `;

        return;
    }

    let total = 0;

    const items = cart.map((product, index) => {

        total += product.price;

        return `

            <div class="cart-item">

                <div>
                    <strong>${product.name}</strong>

                    <p>₹${product.price}</p>
                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>
       </div>

        `;

    }).join("");

    app.innerHTML = `

        <h2>Your Cart</h2>

        <br>

        ${items}

        <div class="total">

            <h3>Total: ₹${total}</h3>

            <br>

            <button
                class="primary-btn"
                onclick="checkout()">
                Checkout
            </button>

        </div>
    `;
}


// ---------------- REMOVE CART ITEM ----------------

function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    showCart();

    updateCartCount();
}


// ---------------- CART COUNT ----------------

function updateCartCount() {

    const count =
        document.getElementById("cart-count");

    if (count) {
        count.textContent = cart.length;
    }
}


// ---------------- CHECKOUT ----------------

function checkout() {

    alert(
        "Demo checkout successful! Thank you for shopping."
    );

    cart = [];

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    navigate("home");
}


// ---------------- START APPLICATION ----------------

navigate("home");
