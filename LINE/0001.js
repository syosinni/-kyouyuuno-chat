const express = require('express');
const { Client, middleware } = require('@line/bot-sdk');

// LINE Bot設定
const config = {
  channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
  channelSecret: 'YOUR_CHANNEL_SECRET',
};

// サーバー設定
const app = express();
const client = new Client(config);

app.post('/webhook', middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) => res.json(result));
});

// イベントハンドラー
async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') return null;

  const userMessage = event.message.text.toLowerCase();

  if (userMessage.includes('ミッション')) {
    // ミッション生成
    const mission = generateMission();
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: `今日のミッション: ${mission}\nクリアしたら「クリア」と送信してください！`,
    });
  }

  if (userMessage.includes('クリア')) {
    // ポイント更新
    const userId = event.source.userId;
    const points = await updatePoints(userId, 10); // 例: 10ポイント加算
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: `ミッションクリア！🎉\n現在のポイント: ${points}点`,
    });
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: '「ミッション」と送信すると、今日のミッションが表示されます！',
  });
}

// ミッション生成関数
function generateMission() {
  const missions = [
    '今日1日で3人助けよう',
    '当番じゃない教室を掃除しよう',
    'ギリシャ文字3こ答えよう',
    '今週、毎日共有ノートに投稿しよう',
    '怖い話一つ言おう',
    'フォームに答えよう　https://forms.gle/KuZQf1qQqR3mJ9KD7',
  ];
  return missions[Math.floor(Math.random() * missions.length)];
}

// ポイント管理（仮: スプレッドシートやDBと連携可能）
const pointsDB = {};
async function updatePoints(userId, points) {
  pointsDB[userId] = (pointsDB[userId] || 0) + points;
  return pointsDB[userId];
}

// サーバー開始
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
