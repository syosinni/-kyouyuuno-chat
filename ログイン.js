document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    
    if (username && password) {
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('すべてのフィールドを入力してください。');
    }
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    if (username && password) {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('ユーザー名とパスワードを入力してください。');
    }
});

document.getElementById('show-signup').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
});

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
const usersFile = 'users.json';

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: 'ユーザー名とパスワードは必須です。' });
    }
    
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    if (users[username]) {
        return res.status(400).json({ message: 'このユーザー名は既に使用されています。' });
    }
    
    users[username] = { password };
    fs.writeFileSync(usersFile, JSON.stringify(users));
    res.status(201).json({ message: 'アカウントが作成されました。' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: 'ユーザー名とパスワードは必須です。' });
    }
    
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    if (!users[username] || users[username].password !== password) {
        return res.status(400).json({ message: 'ユーザー名またはパスワードが正しくありません。' });
    }
    
    res.status(200).json({ message: 'ログイン成功。' });
});

app.listen(port, () => {
    console.log(`サーバーがポート${port}で起動しました。`);
});
