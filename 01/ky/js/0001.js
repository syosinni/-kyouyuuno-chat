document.addEventListener('DOMContentLoaded', function() {
  const ball = document.getElementById('ball');
  const whiteBg = document.getElementById('white-bg');

  // 丸の光が終わったら、背景を白くしてリダイレクト
  ball.addEventListener('animationend', function(e) {
    if (e.animationName === 'glow') {
      whiteBg.style.opacity = 1;

      // 1秒後に別のURLにリダイレクトする
      setTimeout(function() {
        window.location.href = 'https://kyouyuuno-to.f5.si/01/ky/home.jp'; // リダイレクト先のURLを指定
      }, 1000);
    }
  });
});
