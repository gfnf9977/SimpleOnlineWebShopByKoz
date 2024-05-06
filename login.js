// function to handle form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // check if the entered credentials are valid
    if (username === 'user' && password === 'user123') {
        window.location.href = 'userpage.html'; // redirect to user page
    } else if (username === 'admin' && password === 'admin123') {
        window.location.href = 'adminpage.html'; // redirect to admin page
    } else {
        window.location.href = 'errorpage.html'; // redirect to error page
    }
});
