// NGワードリスト（禁止したい言葉をここに追加）
const forbiddenWords = ["死ね", "くたばれ", "殺す","56す","タヒぬ","ﾀﾋぬ","4ね","４ぬ",];

// チャットフォームと入力フィールド、エラーメッセージの取得
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const errorMessage = document.getElementById('errorMessage');
const chatWindow = document.getElementById('chatWindow');

// チャット送信時の処理
chatForm.addEventListener('submit', function(event) {
    event.preventDefault(); // フォームのデフォルト動作を防止（ページリロードを防ぐ）
    
    const message = chatInput.value;
    
    // メッセージにNGワードが含まれているかチェック
    const containsForbiddenWord = forbiddenWords.some(word => message.includes(word));
    
    if (containsForbiddenWord) {
        // NGワードが含まれている場合、エラーメッセージを表示
        errorMessage.textContent = 'そのメッセージには禁止された言葉が含まれています。';
    } else {
        // NGワードが含まれていない場合、メッセージを送信
        errorMessage.textContent = '';
        const newMessage = document.createElement('p');
        newMessage.textContent = message;
        chatWindow.appendChild(newMessage);
    }
    
    // 入力フィールドをクリア
    chatInput.value = '';
});
