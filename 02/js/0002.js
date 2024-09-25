const cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // カートをクリア
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>カートは空です。</p>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.textContent = `${item.name} - ¥${item.price}`;
            cartItems.appendChild(itemElement);
        });
    }
}

function checkout() {
    alert('チェックアウト機能はまだ実装されていません。');
}
