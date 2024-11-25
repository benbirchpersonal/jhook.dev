const cart = [];
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout');
const addToCartButton = document.getElementById('add-to-cart');
const paymentForm = document.getElementById('payment-form');
const cartDataInput = document.getElementById('cart-data');

function updateCart() {
    cartItems.innerHTML = cart.map(item => `<li>${item.name} - $${item.price}</li>`).join('');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

addToCartButton.addEventListener('click', () => {
    cart.push({ name: 'Product Name', price: 19.99 });
    updateCart();
});

checkoutButton.addEventListener('click', () => {
    cartDataInput.value = JSON.stringify(cart);
    paymentForm.submit();
});
