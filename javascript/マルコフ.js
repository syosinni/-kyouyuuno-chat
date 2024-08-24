function generateWeirdJapanese() {
    const inputText = document.getElementById("inputText").value;
    const words = inputText.split(/\s+/); // スペースで単語ごとに分割
    const markovChain = {};

    // マルコフ連鎖の作成
    for (let i = 0; i < words.length - 1; i++) {
        const word = words[i];
        const nextWord = words[i + 1];

        if (!markovChain[word]) {
            markovChain[word] = [];
        }
        markovChain[word].push(nextWord);
    }

    // 新しいテキストの生成
    let currentWord = words[0];
    let result = [currentWord];

    for (let i = 0; i < 50; i++) { // 50語の文章を生成
        const nextWords = markovChain[currentWord];
        if (!nextWords || nextWords.length === 0) {
            break;
        }
        const nextWord = nextWords[Math.floor(Math.random() * nextWords.length)];
        result.push(nextWord);
        currentWord = nextWord;
    }

    document.getElementById("outputText").innerText = result.join(" ");
}
