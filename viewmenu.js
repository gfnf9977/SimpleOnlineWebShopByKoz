  function deleteMenuItem(index) {
        let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
        menuItems.splice(index, 1);
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
        displayMenuItems();
    }

    function displayMenuItems() {
        let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
        let menuList = document.getElementById('menuList');
        menuList.innerHTML = '';

        let categories = {};
        menuItems.forEach(item => {
            if (!categories[item.category]) {
                categories[item.category] = [];
            }
            categories[item.category].push(item);
        });

        Object.keys(categories).forEach(category => {
            let categoryItems = categories[category];

            let categoryContainer = document.createElement('div');
            categoryContainer.classList.add('category');

            let categoryTitle = document.createElement('h3');
            categoryTitle.classList.add('category-title');
            categoryTitle.textContent = category;
            categoryContainer.appendChild(categoryTitle);

            menuList.appendChild(categoryContainer);

            categoryItems.forEach(item => {
                let listItem = document.createElement('li');
                listItem.classList.add('menu-item');

                let itemImage = document.createElement('img');
                itemImage.src = item.photo;
                itemImage.alt = item.name;
                listItem.appendChild(itemImage);

                let itemName = document.createElement('span');
                itemName.textContent = item.name;
                listItem.appendChild(itemName);

                let itemPrice = document.createElement('span');
                itemPrice.textContent = `Ціна: ${item.price} грн`;
                listItem.appendChild(itemPrice);

                let itemIngredients = document.createElement('span');
                itemIngredients.textContent = `Інгредієнти: ${item.ingredients}`;
                listItem.appendChild(itemIngredients);

                let deleteButton = document.createElement('button');
                deleteButton.textContent = 'Видалити';
                deleteButton.classList.add('delete-button');
                deleteButton.addEventListener('click', () => deleteMenuItem(menuItems.indexOf(item)));
                listItem.appendChild(deleteButton);

                categoryContainer.appendChild(listItem);
            });
        });
    }

    window.onload = displayMenuItems;