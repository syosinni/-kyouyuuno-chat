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
    // ウィンドウ生成エフェクト
    let windowInterval = setInterval(function() {
        let win = document.createElement('div');
        win.className = 'window';
        win.style.top = Math.random() * 80 + 'vh';
        win.style.left = Math.random() * 80 + 'vw';

        let header = document.createElement('div');
        header.className = 'window-header';
        header.innerHTML = 'システム警告！';

        let body = document.createElement('div');
        body.className = 'window-body';
        body.innerHTML = '重大なエラーが発生しました！';

        win.appendChild(header);
        win.appendChild(body);
        effectArea.appendChild(win);
    }, 300); // 0.3秒ごとにウィンドウ生成

    // ウィンドウを20秒間表示
    setTimeout(function() {
        clearInterval(windowInterval); // ウィンドウ生成を停止
    }, 20000);
}

// ウイルスエフェクトの停止
function endVirusEffect(effectArea) {
    effectArea.innerHTML = ''; // 画面をクリア
    effectArea.style.backgroundColor = 'black'; // 背景をリセット
}

// ブルースクリーンを表示してサプライズ効果を出す
function triggerBlueScreenWithSurprise() {
    // ブルースクリーン風の表示を有効化
    let blueScreen = document.getElementById('blueScreen');
    blueScreen.classList.remove('hidden');

    // サプライズ音を再生
    let screamSound = document.getElementById('screamSound');
    screamSound.play();

    // 一瞬フラッシュを表示して驚かせる
    document.body.style.backgroundColor = 'white';
    setTimeout(function() {
        document.body.style.backgroundColor = 'black';
    }, 100); // 0.1秒間のフラッシュ

    // 5秒後にブルースクリーンを終了し、ニャンキャットの動画を再生
    setTimeout(function() {
        blueScreen.classList.add('hidden');
        playNyanCatVideo();
    }, 5000); // 5秒後にブルースクリーンを終了
}

// ニャンキャットの動画を再生する関数
function playNyanCatVideo() {
    let nyanCatVideo = document.getElementById('nyanCatVideo');
    nyanCatVideo.classList.remove('hidden');
    nyanCatVideo.play();

    // 動画終了時に全画面解除して「Thank you forever」を表示
    nyanCatVideo.onended = function() {
        nyanCatVideo.classList.add('hidden');
        exitFullScreen();

        // "Thank you forever" メッセージを表示
        let thankYouMessage = document.getElementById('thankYouMessage');
        thankYouMessage.classList.remove('hidden');
    };
}

// 開始ボタンのクリックイベントリスナー
document.getElementById('startBtn').addEventListener('click', function() {
    let startScreen = document.getElementById('startScreen');
    let effectArea = document.getElementById('effectArea');

    // ボタンと説明を消して全画面モードにする
    startScreen.classList.add('hidden');
    effectArea.classList.remove('hidden');

    // 全画面モード開始
    startFullScreen();
    
    // ウイルス風エフェクト開始
    runVirusEffect(effectArea);

    // 20秒後にブルースクリーンとサプライズ表示
    setTimeout(function() {
        // ウイルスエフェクト停止とサプライズ表示
        endVirusEffect(effectArea);
        triggerBlueScreenWithSurprise();
    }, 20000); // 20秒後にブルースクリーン
});
