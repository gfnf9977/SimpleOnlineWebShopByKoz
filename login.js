document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'user' && password === 'user123') {
        window.location.href = 'userpage.html';
    } else if (username === 'admin' && password === 'admin123') {
        window.location.href = 'adminpage.html';
    } else {
        window.location.href = 'errorpage.html';
    }
});
