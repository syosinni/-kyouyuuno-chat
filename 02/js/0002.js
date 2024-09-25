// カートとポイントの管理
const cart = [];

// ローカルストレージからポイントを読み込み
let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;
document.getElementById('points-balance').textContent = points;

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
    // 合計金額を計算
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    // 購入金額の10%をポイントとして付与
    let earnedPoints = Math.floor(total * 0.1);
    points += earnedPoints;
    localStorage.setItem('points', points); // ローカルストレージにポイントを保存

    alert(`合計金額: ¥${total}\n獲得ポイント: ${earnedPoints}ポイント\n現在のポイント: ${points}ポイント`);

    // カートをリセット
    cart.length = 0;
    updateCart();

    // ポイント残高を更新
    document.getElementById('points-balance').textContent = points;
}
