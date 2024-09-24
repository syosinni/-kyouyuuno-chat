document.getElementById('startBtn').addEventListener('click', function() {
    let effectArea = document.getElementById('effectArea');
    this.disabled = true; // ボタンを無効化して開始

    // エラー風のテキストエフェクト
    for (let i = 0; i < 30; i++) {
        let glitchText = document.createElement('div');
        glitchText.className = 'glitch';
        glitchText.style.top = Math.random() * 100 + 'vh';
        glitchText.style.left = Math.random() * 100 + 'vw';
        glitchText.innerHTML = 'エラー！';
        effectArea.appendChild(glitchText);
    }

    // 色変化エフェクト
    let colorInterval = setInterval(function() {
        let colors = ['red', 'blue', 'green', 'purple', 'yellow'];
        effectArea.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }, 300);

    // Windows風ウィンドウを表示するエフェクト
    let windowInterval = setInterval(function() {
        let win = document.createElement('div');
        win.className = 'window';
        win.style.top = Math.random() * 80 + 'vh';
        win.style.left = Math.random() * 80 + 'vw';

        let header = document.createElement('div');
        header.className = 'window-header';
        header.innerHTML = '警告！';

        let body = document.createElement('div');
        body.className = 'window-body';
        body.innerHTML = 'システムエラー！';

        win.appendChild(header);
        win.appendChild(body);
        effectArea.appendChild(win);
    }, 500); // 0.5秒ごとにウィンドウを生成

    // 20秒後に猫を表示し、音楽を再生 + 最終メッセージ
    setTimeout(function() {
        // ウィンドウ生成と色変化を止める
        clearInterval(windowInterval);
        clearInterval(colorInterval);

        // 背景を虹色にするエフェクト
        let rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#8B00FF'];
        let rainbowIndex = 0;
        setInterval(function() {
            effectArea.style.backgroundColor = rainbowColors[rainbowIndex];
            rainbowIndex = (rainbowIndex + 1) % rainbowColors.length;
        }, 500);

        // 猫の要素を表示
        let catContainer = document.getElementById('catContainer');
        catContainer.classList.remove('hidden');

        // ニャンキャット音楽を再生
        let nyanCatAudio = document.getElementById('nyanCatAudio');
        nyanCatAudio.play();

        // "Thank you forever" メッセージを表示
        let thankYouMessage = document.getElementById('thankYouMessage');
        thankYouMessage.classList.remove('hidden');

    }, 20000); // 20秒後に猫が登場
});
