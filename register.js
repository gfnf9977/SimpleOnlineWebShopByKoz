document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Відправляємо дані на головну сторінку для обробки
    const userData = {
        username: username,
        password: password
    };

    // Зберігаємо дані в локальному сховищі
    localStorage.setItem('userData', JSON.stringify(userData));

    // Перенаправляємо користувача на головну сторінку після реєстрації
    window.location.href = 'index.html';
});
