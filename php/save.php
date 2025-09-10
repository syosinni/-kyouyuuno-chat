<?php
// 保存先ファイル
$file = "territory.json";

// POSTデータ受取
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    // 既存データを読む
    $existing = [];
    if (file_exists($file)) {
        $existing = json_decode(file_get_contents($file), true);
    }

    // 上書き保存（regionIdごとに最新色を保持）
    $existing[$data["regionId"]] = $data["color"];

    // JSONに保存
    file_put_contents($file, json_encode($existing));
    echo "OK";
} else {
    echo "ERROR: No data";
}
