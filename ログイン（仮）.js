const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const path = require('path');
const app = express();
const port = 3000;

// スプレッドシートIDとシート名を指定
const SPREADSHEET_ID = '1RjrJCn45DA0N-OQLxEFNFl9RgT7TVP6XpjHIWr9u8Vc';
const SHEET_NAME = 'アカウント';

// Google APIクライアントを設定
const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'ユーザー名とパスワードは必須です。' });
    }

    try {
        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!D:E`,
        });

        const rows = response.data.values;
        if (rows.length) {
            const user = rows.find(row => row[0] === username && row[1] === password);
            if (user) {
                return res.status(200).json({ message: 'ログイン成功。' });
            } else {
                return res.status(400).json({ message: 'ユーザー名またはパスワードが正しくありません。' });
            }
        } else {
            return res.status(400).json({ message: 'ユーザーが見つかりません。' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'サーバーエラー。後ほど再度お試しください。' });
    }
});

app.listen(port, () => {
    console.log(`サーバーがポート${port}で起動しました。`);
});
