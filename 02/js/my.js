document.addEventListener("DOMContentLoaded", function () {
    const profileImage = document.getElementById("profileImage");
    const imageUpload = document.getElementById("imageUpload");
    const profileDescription = document.getElementById("profileDescription");
    const saveBtn = document.getElementById("saveBtn");

    // ローカルストレージから保存済みのデータを取得
    const savedImage = localStorage.getItem("profileImage");
    const savedDescription = localStorage.getItem("profileDescription");

    if (savedImage) {
        profileImage.src = savedImage;
    }

    if (savedDescription) {
        profileDescription.value = savedDescription;
    }

    // 画像をアップロードして表示する
    imageUpload.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // 保存ボタンの機能
    saveBtn.addEventListener("click", function () {
        // 画像のデータURLを保存
        const imageDataUrl = profileImage.src;
        localStorage.setItem("profileImage", imageDataUrl);

        // プロフィール説明を保存
        const description = profileDescription.value;
        localStorage.setItem("profileDescription", description);

        alert("プロフィールが保存されました！");
    });
});
