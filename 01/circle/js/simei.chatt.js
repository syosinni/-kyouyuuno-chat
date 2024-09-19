// NGワードリスト（禁止したい言葉をここに追加）
const forbiddenWords = ["死ね", "くたばれ", "殺す","56す","タヒね","ﾀﾋね","4ね","４ね","しね","シネ","ｼﾈ","天安門","満州事変","太平洋戦争終戦",];

// チャットフォームと各入力フィールド、エラーメッセージの取得
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const usernameInput = document.getElementById('usernameInput');
const errorMessage = document.getElementById('errorMessage');
const chatWindow = document.getElementById('chatWindow');

// ローカルストレージからコメントを取得して表示
window.onload = function() {
    loadMessages();
};

// メッセージをローカルストレージに保存
function saveMessage(username, message) {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.push({ username: username, message: message });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// ローカルストレージからメッセージをロード
function loadMessages() {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatWindow.innerHTML = ''; // 初期化
    chatHistory.forEach(entry => {
        displayMessage(entry.username, entry.message);
    });
}

// メッセージを表示する関数
function displayMessage(username, message, color) {
    const newMessage = document.createElement('p');
    newMessage.innerHTML = `<strong>${username}:</strong> ${message}`;
    newMessage.style.color = color; // 選択された色を適用
    chatWindow.appendChild(newMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}


// チャット送信時の処理
chatForm.addEventListener('submit', function(event) {
    event.preventDefault(); // フォームのデフォルト動作を防止（ページリロードを防ぐ）

    const message = chatInput.value;
    const username = usernameInput.value;

    // メッセージにNGワードが含まれているかチェック
    const containsForbiddenWord = forbiddenWords.some(word => message.includes(word));

    if (containsForbiddenWord) {
        errorMessage.textContent = 'そのメッセージには禁止された言葉が含まれています。';
    } else {
        // NGワードが含まれていない場合、メッセージを表示し、ローカルストレージに保存
        errorMessage.textContent = '';
        displayMessage(username, message);
        saveMessage(username, message);
    }

    // 入力フィールドをクリア
    chatInput.value = '';
});
