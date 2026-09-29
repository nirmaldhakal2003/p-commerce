// ============================================================
// P-Commerce E-Commerce - Complete JavaScript
// Sections:
//   1. Data & Storage
//   2. Utilities
//   3. Page Navigation
//   4. Cart Functions
//   5. Product Rendering (Explore)
//   6. Payment
//   7. Admin Panel
//   8. App Initialization
// ============================================================

// ============================================================
// 1. DATA & STORAGE
// ============================================================

const STORAGE_KEY_PRODUCTS = "mmart_products";
const STORAGE_KEY_CART = "mmart_cart";

// Default products used on first load
function getDefaultProducts() {
  return [
    {
      id: "p1",
      name: "Wireless Headphones",
      price: 79.99,
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    },
    {
      id: "p2",
      name: "Smart Watch",
      price: 199.99,
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    },
    {
      id: "p3",
      name: "Backpack",
      price: 49.99,
      img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
    },
    {
      id: "p4",
      name: "Sunglasses",
      price: 29.99,
      img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop",
    },
    {
      id: "p5",
      name: "Bluetooth Speaker",
      price: 59.99,
      img: "https://images.unsplash.com/photo-1589003077984-894e133da26d?w=200&h=200&fit=crop",
    },
    {
      id: "p6",
      name: "Running Shoes",
      price: 89.99,
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    },
    {
      id: "p7",
      name: "USB-C Cable",
      price: 12.99,
      img: "https://images.unsplash.com/photo-1591290621749-2b27cebf7bae?w=200&h=200&fit=crop",
    },
    {
      id: "p8",
      name: "Laptop Stand",
      price: 34.99,
      img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
    },
    {
      id: "p9",
      name: "Wireless Mouse",
      price: 24.99,
      img: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&h=200&fit=crop",
    },
    {
      id: "p10",
      name: "Phone Case",
      price: 14.99,
      img: "https://images.unsplash.com/photo-1607523314735-521af6914d1b?w=200&h=200&fit=crop",
    },
    {
      id: "p11",
      name: "Power Bank",
      price: 39.99,
      img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop",
    },
    {
      id: "p12",
      name: "Mechanical Keyboard",
      price: 89.99,
      img: "https://images.unsplash.com/photo-1587829191301-a1e9b1b80fdf?w=200&h=200&fit=crop",
    },
    {
      id: "p13",
      name: "Screen Protector",
      price: 8.99,
      img: "https://images.unsplash.com/photo-1599598342518-e39da8a81c90?w=200&h=200&fit=crop",
    },
    {
      id: "p14",
      name: "Webcam HD",
      price: 49.99,
      img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&h=200&fit=crop",
    },
    {
      id: "p15",
      name: "Desk Lamp",
      price: 32.99,
      img: "https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=200&h=200&fit=crop",
    },
    {
      id: "p16",
      name: "Storage Pouch",
      price: 18.99,
      img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
    },
    {
      id: "p17",
      name: "Phone Tripod",
      price: 19.99,
      img: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=200&h=200&fit=crop",
    },
    {
      id: "p18",
      name: "USB Hub",
      price: 27.99,
      img: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=200&h=200&fit=crop",
    },
  ];
}

function loadProducts() {
  const stored = localStorage.getItem(STORAGE_KEY_PRODUCTS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return getDefaultProducts();
    }
  } else {
    const defaults = getDefaultProducts();
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(defaults));
    return defaults;
  }
}

function saveProducts(list) {
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(list));
}

function loadCart() {
  const stored = localStorage.getItem(STORAGE_KEY_CART);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  }
  return [];
}

function saveCart(list) {
  localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(list));
  updateCartBadge();
}

// Global state
let products = loadProducts();
let cart = loadCart();

// ============================================================
// 2. UTILITIES
// ============================================================

function formatPrice(price) {
  return "$" + Number(price).toFixed(2);
}

function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cartCountBadge");
  if (badge) badge.textContent = totalItems;
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// ============================================================
// 3. PAGE NAVIGATION
// ============================================================

function showPage(pageId) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));

  const pageMap = {
    landing: "landingPage",
    explore: "explorePage",
    cart: "cartPage",
    payment: "paymentPage",
    admin: "adminPage",
  };

  const target = document.getElementById(pageMap[pageId]);
  if (target) target.classList.add("active");

  // Page-specific renders
  if (pageId === "explore") renderExploreProducts();
  if (pageId === "cart") renderCart();
  if (pageId === "payment") {
    renderPaymentAmount();
    document.getElementById("paymentSuccessMsg").classList.add("hidden");
  }
  if (pageId === "admin") renderAdminProducts();
}

// ============================================================
// 4. CART FUNCTIONS
// ============================================================

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      quantity: 1,
    });
  }
  saveCart(cart);
  alert(`${product.name} added to cart.`);
}

function updateQuantity(productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter((i) => i.id !== productId);
  }

  saveCart(cart);
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((i) => i.id !== productId);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartContent");
  const summary = document.getElementById("cartSummary");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-shopping-cart"></i>
        <h3>Your cart is empty</h3>
        <p>Add some products from the explore page.</p>
      </div>`;
    summary.classList.add("hidden");
    return;
  }

  summary.classList.remove("hidden");

  container.innerHTML = `
    <div class="cart-list">
      ${cart
        .map(
          (item) => `
        <div class="cart-item">
          <div class="cart-item-info">
            <img class="cart-item-img" src="${item.img}" alt="${item.name}"
                 onerror="this.src='https://picsum.photos/200/200?random=99'">
            <div class="cart-item-details">
              <h4>${item.name}</h4>
              <div class="cart-item-price">${formatPrice(item.price)}</div>
            </div>
          </div>
          <div class="cart-item-actions">
            <div class="qty-control">
              <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">−</button>
              <span style="font-weight:600; min-width:24px; text-align:center;">${item.quantity}</span>
              <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
            </div>
            <button class="btn-outline btn-small" onclick="removeFromCart('${item.id}')">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>`;

  document.getElementById("cartTotalPrice").textContent =
    formatPrice(getCartTotal());
}

// ============================================================
// 5. PRODUCT RENDERING (EXPLORE)
// ============================================================

function renderExploreProducts() {
  const grid = document.getElementById("exploreProductGrid");
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <i class="fas fa-box-open"></i>
        <h3>No products yet</h3>
        <p>Go to Admin to add products.</p>
      </div>`;
    return;
  }

  grid.innerHTML = products
    .map(
      (prod) => `
    <div class="product-card">
      <div class="product-img">
        <img src="${prod.img}" alt="${prod.name}"
             onerror="this.src='https://picsum.photos/200/200?random=99'">
      </div>
      <div class="product-info">
        <div class="product-title">${prod.name}</div>
        <div class="product-price">${formatPrice(prod.price)}</div>
        <div class="product-actions">
          <button class="btn btn-small" onclick="addToCart('${prod.id}')">
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

// ============================================================
// 6. PAYMENT
// ============================================================

function renderPaymentAmount() {
  const el = document.getElementById("paymentAmount");
  if (el) el.textContent = formatPrice(getCartTotal());
}

function processPayment() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add items before payment.");
    showPage("cart");
    return;
  }

  // Dummy "successful" payment
  document.getElementById("paymentSuccessMsg").classList.remove("hidden");

  // Clear the cart after successful payment
  cart = [];
  saveCart(cart);
  updateCartBadge();
  renderPaymentAmount();
}

// ============================================================
// 7. ADMIN PANEL
// ============================================================

function renderAdminProducts() {
  const grid = document.getElementById("adminProductGrid");
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <i class="fas fa-box-open"></i>
        <h3>No products</h3>
        <p>Add your first product above.</p>
      </div>`;
    return;
  }

  grid.innerHTML = products
    .map(
      (prod) => `
    <div class="product-card">
      <div class="product-img">
        <img src="${prod.img}" alt="${prod.name}"
             onerror="this.src='https://picsum.photos/200/200?random=99'">
      </div>
      <div class="product-info">
        <div class="product-title">${prod.name}</div>
        <div class="product-price">${formatPrice(prod.price)}</div>
        <div class="product-actions">
          <button class="btn btn-danger btn-small" onclick="deleteProduct('${prod.id}')">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

function addProductFromAdmin() {
  const nameInput = document.getElementById("adminProductName");
  const priceInput = document.getElementById("adminProductPrice");
  const imgInput = document.getElementById("adminProductImg");

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  let img = imgInput.value.trim();

  if (!name || isNaN(price) || price <= 0) {
    alert("Please enter a valid product name and price (positive number).");
    return;
  }

  if (!img) {
    img = `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
  }

  const newProduct = {
    id: "p" + Date.now() + Math.random().toString(36).substr(2, 4),
    name: name,
    price: price,
    img: img,
  };

  products.push(newProduct);
  saveProducts(products);

  // Clear inputs
  nameInput.value = "";
  priceInput.value = "";
  imgInput.value = "";

  renderAdminProducts();
  renderExploreProducts();
  alert(`Product "${name}" added.`);
}

function deleteProduct(productId) {
  if (!confirm("Delete this product permanently?")) return;

  products = products.filter((p) => p.id !== productId);
  saveProducts(products);

  // Also remove from cart if present
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);

  renderAdminProducts();
  renderExploreProducts();
  updateCartBadge();

  if (document.getElementById("cartPage").classList.contains("active")) {
    renderCart();
  }
}

// ============================================================
// 8. APP INITIALIZATION
// ============================================================

window.onload = function () {
  products = loadProducts();
  cart = loadCart();
  updateCartBadge();
  showPage("landing");
};
