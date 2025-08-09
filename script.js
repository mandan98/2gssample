// Cart logic with cart section
let cart = [];
const cartCountElem = document.getElementById("cart-count");
const cartSection = document.getElementById("cart-section");
const cartItemsElem = document.getElementById("cart-items");
const cartTotalElem = document.getElementById("cart-total");
const closeCartBtn = document.getElementById("close-cart");

// Helper to get product info from card
function getProductInfo(card) {
  // Remove any currency symbol and commas before parsing
  const priceText = card.querySelector('.product-price').textContent.replace(/[^0-9.]/g, '');
  return {
    title: card.querySelector('.product-title').textContent,
    price: parseFloat(priceText),
    img: card.querySelector('img').src
  };
}

// Update cart display
function updateCartDisplay() {
  cartItemsElem.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    // Ensure price is a valid number
    const price = Number(item.price) || 0;
    total += price;
    cartItemsElem.innerHTML += `
      <div style="display:flex;align-items:center;margin-bottom:1em;">
        <img src="${item.img}" alt="" style="width:60px;height:60px;object-fit:cover;border-radius:6px;margin-right:1em;">
        <div style="flex:1;">
          <div style="font-weight:600;">${item.title}</div>
          <div style="color:#aa2d2d;">₹${price.toFixed(2)}</div>
        </div>
        <button onclick="removeFromCart(${idx})" style="background:none;border:none;color:#aa2d2d;font-size:1.5em;cursor:pointer;">&times;</button>
      </div>
    `;
  });
  // Always show total as a fixed number
  cartTotalElem.textContent = total.toFixed(2);
  cartCountElem.textContent = cart.length;
}

// Remove item from cart
window.removeFromCart = function(idx) {
  cart.splice(idx, 1);
  updateCartDisplay();
};

// Buy Now button logic
document.querySelectorAll(".buy-btn").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest('.product-card');
    cart.push(getProductInfo(card));
    updateCartDisplay();
    cartSection.style.display = "block";
    cartSection.scrollIntoView({behavior: "smooth"});
  });
});

// Close cart section
closeCartBtn.addEventListener("click", () => {
  cartSection.style.display = "none";
});

// Stylish hover animation for "2" in header
const num2 = document.querySelector('.highlight-num');
num2.addEventListener('mouseenter', () => {
  num2.style.transition = "transform 0.4s cubic-bezier(.69,-0.2,.36,1.5), color 0.3s";
  num2.style.transform = "scale(1.5) rotate(-15deg)";
  num2.style.color = "#ffe403";
  num2.style.textShadow = "0 0 24px #ff0000, 0 0 9px #ffe403";
});
num2.addEventListener('mouseleave', () => {
  num2.style.transform = "scale(1) rotate(0)";
  num2.style.color = "#ff4242";
  num2.style.textShadow = "none";
});

// Make cart-bar draggable
const cartBar = document.getElementById('cart-bar');
let isDragging = false, offsetX = 0, offsetY = 0;

cartBar.style.position = 'fixed';
cartBar.style.cursor = 'grab';
cartBar.style.top = '20px';
cartBar.style.right = '20px';
cartBar.style.left = 'unset';

cartBar.addEventListener('mousedown', function(e) {
  isDragging = true;
  offsetX = e.clientX - cartBar.getBoundingClientRect().left;
  offsetY = e.clientY - cartBar.getBoundingClientRect().top;
  cartBar.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', function(e) {
  if (isDragging) {
    cartBar.style.left = (e.clientX - offsetX) + 'px';
    cartBar.style.top = (e.clientY - offsetY) + 'px';
    cartBar.style.right = 'unset';
  }
});

document.addEventListener('mouseup', function() {
  isDragging = false;
  cartBar.style.cursor = 'grab';
});

// Touch support for cart-bar (mobile)
cartBar.addEventListener('touchstart', function(e) {
  isDragging = true;
  const touch = e.touches[0];
  offsetX = touch.clientX - cartBar.getBoundingClientRect().left;
  offsetY = touch.clientY - cartBar.getBoundingClientRect().top;
  cartBar.style.cursor = 'grabbing';
}, { passive: false });

document.addEventListener('touchmove', function(e) {
  if (isDragging) {
    const touch = e.touches[0];
    cartBar.style.left = (touch.clientX - offsetX) + 'px';
    cartBar.style.top = (touch.clientY - offsetY) + 'px';
    cartBar.style.right = 'unset';
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener('touchend', function() {
  isDragging = false;
  cartBar.style.cursor = 'grab';
});

