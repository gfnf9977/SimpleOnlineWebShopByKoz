// Збереження нового елемента меню в localStorage

// Отримання та відображення елементів меню на сторінці перегляду меню
function displayMenuItems() {
    let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    let menuList = document.getElementById('menuList');
    menuList.innerHTML = '';
    menuItems.forEach(item => {
        let listItem = document.createElement('li');
        listItem.textContent = `${item.name}: ${item.price}`;
        menuList.appendChild(listItem);
    });
}

function addItemToMenu(name, price, category, ingredients, photo) {
    let reader = new FileReader();
    reader.onload = function(event) {
        let photoDataUrl = event.target.result;
        let menuItem = { name: name, price: price, category: category, ingredients: ingredients, photo: photoDataUrl };
        let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
        menuItems.push(menuItem);
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
    };
    reader.readAsDataURL(photo); // Конвертуємо фото в Data URL
}

window.onload = displayMenuItems;
