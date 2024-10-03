
import requests
from datetime import datetime

# Webhook URL (ユーザーが指定したものを使用)
WEBHOOK_URL = 'https://discord.com/api/webhooks/1291209117918298122/323KDFBR7eqt2fBeabNaBqQHU3vHC47ngNBC_OiQlgdEu6KI2-xBQhpQigRPWC1KTyl1'

# ユーザーの活動を記録する辞書
user_activity = {}

# レベルアップの条件
LOGIN_STREAK_CONDITION = 4  # 4日連続ログイン
MESSAGE_COUNT_CONDITION = 20  # 20メッセージ送信
DAYS_SINCE_JOIN_CONDITION = 30  # 参加から30日

def initialize_user(user_id):
    """新しいユーザーを初期化"""
    user_activity[user_id] = {
        "join_date": datetime.now(),
        "login_streak": 0,
        "messages": 0,
        "last_login": None,
        "level": 1  # 初期レベル
    }

def check_conditions(user_id):
    """条件をチェックしてレベルアップ"""
    user_data = user_activity[user_id]
    
    # 今日のログインを記録
    today = datetime.now().date()
    last_login = user_data["last_login"]

    if last_login != today:
        user_data["last_login"] = today
        user_data["login_streak"] += 1
    else:
        user_data["login_streak"] = 1
    
    # 条件に応じたレベルアップ
    new_level = user_data["level"]

    # 条件1: 4日連続ログイン
    if user_data["login_streak"] >= LOGIN_STREAK_CONDITION:
        new_level = max(new_level, 2)  # レベル2にアップ
    
    # 条件2: 20回投稿
    if user_data["messages"] >= MESSAGE_COUNT_CONDITION:
        new_level = max(new_level, 3)  # レベル3にアップ
    
    # 条件3: 参加から30日経過
    if (datetime.now() - user_data["join_date"]).days >= DAYS_SINCE_JOIN_CONDITION:
        new_level = max(new_level, 4)  # レベル4にアップ

    # レベルが上がった場合、Webhookで通知
    if new_level > user_data["level"]:
        user_data["level"] = new_level
        send_level_up_notification(user_id, new_level)

def send_level_up_notification(user_id, new_level):
    """レベルアップ通知をWebhook経由で送信"""
    data = {
        "content": f"<@{user_id}> has leveled up to level {new_level}!"
    }
    
    response = requests.post(WEBHOOK_URL, json=data)
    
    if response.status_code == 204:
        print(f"Level up notification sent successfully for user {user_id}")
    else:
        print(f"Failed to send notification: {response.status_code}")

# 例としてユーザーのアクティビティを管理
def simulate_user_activity(user_id, messages, days_logged_in):
    """ユーザーのアクティビティをシミュレート"""
    if user_id not in user_activity:
        initialize_user(user_id)
    
    user_data = user_activity[user_id]

    # メッセージ送信数を追加
    user_data["messages"] += messages

    # ログイン回数を更新
    for _ in range(days_logged_in):
        check_conditions(user_id)

# シミュレーションの例
simulate_user_activity(1234567890, 25, 5)  # 25メッセージ、5日ログインのシミュレーション
