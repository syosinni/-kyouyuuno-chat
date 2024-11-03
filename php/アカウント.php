<?php
// DB接続設定
$servername = "localhost";
$username = "db_username";
$password = "db_password";
$dbname = "database_name";

// ユーザー情報（例: POSTリクエストから受け取る）
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // パスワードをハッシュ化

// ランダムな認証トークンを生成
$verification_token = bin2hex(random_bytes(16));

try {
    // DB接続
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // データベースにユーザーを仮登録
    $stmt = $conn->prepare("INSERT INTO users (email, password, verification_token) VALUES (:email, :password, :token)");
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':token', $verification_token);
    $stmt->execute();

    // 認証メールの送信
    $to = $email;
    $subject = "共有ノートへの入口です‼️";
    $verification_link = "https://kyouyuuno-to.f5.si/account/.php?token=" . $verification_token;
    $message = "以下のリンクをクリックしてアカウントを認証してください: \n\n" . $verification_link;
    $headers = "From: no-reply@yourwebsite.com";

    if (mail($to, $subject, $message, $headers)) {
        echo "認証メールが送信されました。メールを確認してください。";
    } else {
        echo "認証メールの送信に失敗しました。";
    }

} catch(PDOException $e) {
    echo "エラー: " . $e->getMessage();
}
?>
