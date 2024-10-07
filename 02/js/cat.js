document.getElementById('startBtn').addEventListener('click', function() {
    let startScreen = document.getElementById('startScreen');
    let effectArea = document.getElementById('effectArea');

    // ボタンと説明を消して全画面モードにする
    startScreen.classList.add('hidden');
    effectArea.classList.remove('hidden');

    // ウイルス風エフェクト開始
    startFullScreen();
    runVirusEffect(effectArea);

    // 20秒後に猫の動画を表示する
    setTimeout(function() {
        // ウイルスエフェクト終了して猫動画表示
        endVirusEffect(effectArea);
        playNyanCatVideo();
    }, 20000); // 20秒後に猫動画
});

// 全画面モードにする関数
function startFullScreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
}

// 全画面を解除する関数
function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

// ウイルス風のエフェクト実行
function runVirusEffect(effectArea) {
    // エラー風テキスト生成
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

    // Windows風ウィンドウ生成エフェクト
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
    }, 500); // 0.5秒ごとにウィンドウ生成

    // 20秒後にエフェクト停止
    setTimeout(function() {
        clearInterval(windowInterval);
        clearInterval(colorInterval);
    }, 20000);
}

// ウイルスエフェクト終了処理
function endVirusEffect(effectArea) {
    effectArea.innerHTML = ''; // 画面のクリア
    effectArea.style.backgroundColor = 'black';
}

// ニャンキャットの動画を再生する関数
function playNyanCatVideo() {
    let nyanCatVideo = document.getElementById('nyanCatVideo');
    nyanCatVideo.classList.remove('hidden');
    nyanCatVideo.play();

    // 動画終了時に全画面解除して「Thank you forever」表示
    nyanCatVideo.onended = function() {
        nyanCatVideo.classList.add('hidden');
        exitFullScreen();

        // Thank you foreverを表示
        let thankYouMessage = document.getElementById('thankYouMessage');
        thankYouMessage.classList.remove('hidden');
    };
}

        
