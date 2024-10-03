document.getElementById('webhookForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const content = document.getElementById('content').value;

    const webhookURL = 'https://discord.com/api/webhooks/1291202325121339482/bV-6DKTE1-xGgRjFp7yhaul_3nr9kevjHf3l0R5hE8BsW_qWI4nYUia3RlARB8sV1_oK';  // ここにWebhookのURLを入れてください

    const payload = {
        username: username,  // Webhookで表示されるユーザー名
        content: content     // 投稿されるメッセージ
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            alert('投稿が成功しました！');
        } else {
            alert('投稿に失敗しました。');
        }
    })
    .catch(error => {
        console.error('エラー:', error);
        alert('エラーが発生しました。');
    });
});
