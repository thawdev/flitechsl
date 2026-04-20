// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ ADD TO CART
function addToCart(name, price, image) {

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    alert(name + " added to cart!");
}

// ✅ SAVE CART
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ✅ UPDATE CART COUNT (🛒 number)
function updateCartCount() {
    let countElement = document.querySelector(".cart-count");

    if (!countElement) return;

    let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    countElement.innerText = totalQty;
}

// ✅ DISPLAY CART ITEMS (for cart.html)
function displayCart() {

    let container = document.getElementById("cart-container");
    let totalBox = document.getElementById("grand-total");

    if (!container) return;

    container.innerHTML = "";

    let grandTotal = 0;

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        let div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <img src="${item.image}" class="cart-img">

            <div class="cart-details">
                <h3>${item.name}</h3>
                <p>Price: Rs.${item.price}</p>

                <div class="quantity">
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>

                <p class="item-total">Total: Rs.${itemTotal}</p>
            </div>

            <button class="remove-btn" onclick="removeItem(${index})">❌</button>
        `;

        container.appendChild(div);
    });

    if (totalBox) {
        totalBox.innerText = "Grand Total: Rs." + grandTotal;
    }

    saveCart();
}

// ✅ CHANGE QUANTITY (+ / -)
function changeQty(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    displayCart();
    updateCartCount();
}

// ✅ REMOVE ITEM
function removeItem(index) {
    cart.splice(index, 1);

    saveCart();
    displayCart();
    updateCartCount();
}

// ✅ RUN ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    displayCart();
});