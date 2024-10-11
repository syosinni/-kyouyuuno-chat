document.addEventListener('DOMContentLoaded', function() {
  const ball = document.getElementById('ball');
  const blueBg = document.getElementById('blue-bg');
  const textContainer = document.getElementById('text-container');
  const resetOverlay = document.getElementById('reset-overlay');
  const square = document.getElementById('square');

  // 丸が落ちるアニメーションが終わったら、背景を青くし、文字を表示
  ball.addEventListener('animationend', function(e) {
    if (e.animationName === 'drop') {
      blueBg.style.opacity = 1;
      textContainer.style.opacity = 1;
    }
  });

  // スワイプで通常状態に戻す
  resetOverlay.addEventListener('touchstart', function() {
    resetAnimation();
  });

  function resetAnimation() {
    // 全てのアニメーションをリセットする
    blueBg.style.opacity = 0;
    textContainer.style.opacity = 0;
    square.style.opacity = 0;
    ball.style.top = '-50px';
    ball.style.animation = 'none';

    // リセット後、再度丸を落とす
    setTimeout(() => {
      ball.style.animation = 'drop 2s ease-out forwards';
    }, 100);
  }

  // スワイプを検出するイベント（PC用にマウスイベントも追加可能）
  let touchStartX = 0;
  let touchEndX = 0;

  resetOverlay.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
  });

  resetOverlay.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    if (touchEndX < touchStartX) {
      resetAnimation();
    }
  }
});
