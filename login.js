window.onload = function() {
    const login = 'admin';
    const password = 'admin123';

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const enteredPassword = document.getElementById('password').value;

        if (username === login && enteredPassword === password) {
            window.location.href = 'adminpage.html';
        } else {
            const userData = JSON.parse(localStorage.getItem('userData'));

            if (userData) {
                if (username === userData.username && enteredPassword === userData.password) {
                    window.location.href = 'userpage.html';
                } else {
                    window.location.href = 'errorpage.html';
                }
            } else {
                console.log('Дані користувача не знайдено. Потрібна реєстрація.');
            }
        }
    });
};
