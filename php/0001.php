<?php
// データベース接続情報
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_accounts";

// フォームから送信されたデータを取得
$user = $_POST['username'];
$email = $_POST['email'];
$pass = $_POST['password'];

// パスワードをハッシュ化
$hashed_password = password_hash($pass, PASSWORD_DEFAULT);

// データベースに接続
$conn = new mysqli($servername, $username, $password, $dbname);

// 接続を確認
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQLクエリを準備して実行
$sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $user, $email, $hashed_password);

if ($stmt->execute()) {
    echo "Account successfully created!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// 接続を閉じる
$stmt->close();
$conn->close();
?>
