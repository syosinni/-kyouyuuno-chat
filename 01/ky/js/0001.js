document.addEventListener('DOMContentLoaded', function() {
  const ball = document.getElementById('ball');
  const whiteBg = document.getElementById('white-bg');
  const content = document.getElementById('content');

  // 丸の光が終わったら、背景を白くする
  ball.addEventListener('animationend', function(e) {
    if (e.animationName === 'glow') {
      whiteBg.style.opacity = 1;
    }
  });
});
