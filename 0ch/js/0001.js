document.addEventListener('DOMContentLoaded', loadPosts);

function loadPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <time>${post.date}</time>
            <p class="username">${post.username}</p>
            <p>${post.message}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

function addPost() {
    const username = document.getElementById('username').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!username || !message) {
        alert('ユーザー名とメッセージを入力してください。');
        return;
    }

    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const date = new Date().toLocaleString();
    posts.unshift({ username, message, date });
    localStorage.setItem('posts', JSON.stringify(posts));

    document.getElementById('username').value = '';
    document.getElementById('message').value = '';
    loadPosts();
}
