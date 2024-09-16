// 要素を取得
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');

// ハンバーガーメニューがクリックされたとき
hamburger.addEventListener('click', () => {
  sidebar.classList.add('active');
  overlay.classList.add('active');
});

// サイドバーを閉じる
closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

// オーバーレイをクリックしたときにサイドバーを閉じる
overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

    
