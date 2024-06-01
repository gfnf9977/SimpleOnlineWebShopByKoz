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

        Object.keys(categories).sort().forEach(category => {
            let categoryItems = categories[category];
            let categoryDiv = document.createElement('div');
            categoryDiv.classList.add('menu-category');

            let categoryHeader = document.createElement('h3');
            categoryHeader.textContent = category;
            categoryDiv.appendChild(categoryHeader);

            categoryItems.sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
                let itemBlock = document.createElement('div');
                itemBlock.classList.add('menu-item');

                let itemImage = document.createElement('img');
                itemImage.src = item.photo;
                itemImage.alt = item.name;
                itemBlock.appendChild(itemImage);

                let itemName = document.createElement('p');
                itemName.classList.add('item-name');
                itemName.textContent = item.name;
                itemBlock.appendChild(itemName);

                let itemPrice = document.createElement('p');
                itemPrice.classList.add('item-price');
                itemPrice.textContent = `Ціна: ${item.price} грн`;
                itemBlock.appendChild(itemPrice);

                let itemIngredients = document.createElement('p');
                itemIngredients.classList.add('item-ingredients');
                itemIngredients.textContent = `Інгредієнти: ${item.ingredients}`;
                itemBlock.appendChild(itemIngredients);

                categoryDiv.appendChild(itemBlock);
                let divider = document.createElement('hr');
                categoryDiv.appendChild(divider);
            });

            menuList.appendChild(categoryDiv);
        });
    }

    window.onload = displayMenuItems;

    document.getElementById('searchInput').addEventListener('input', function() {
        let searchValue = this.value.trim().toLowerCase();
        let menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            let itemName = item.querySelector('.item-name').textContent.toLowerCase();
            if (itemName.includes(searchValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });