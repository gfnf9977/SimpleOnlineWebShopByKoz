window.onload = function() {
    let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    let menuList = document.getElementById('menuList');
    let orderSummary = document.getElementById('orderSummary');

    // Групуємо елементи меню за категоріями
    let groupedMenuItems = {};
    menuItems.forEach(item => {
        if (!groupedMenuItems[item.category]) {
            groupedMenuItems[item.category] = [];
        }
        groupedMenuItems[item.category].push(item);
    });

    // Виводимо кожну категорію з відсортованими елементами меню
    Object.keys(groupedMenuItems).forEach(category => {
        let categoryItems = groupedMenuItems[category];
        categoryItems.sort((a, b) => a.name.localeCompare(b.name)); // Сортуємо за назвою страви

        let categoryHeader = document.createElement('h2');
        categoryHeader.textContent = category;
        menuList.appendChild(categoryHeader);

        categoryItems.forEach(item => {
            let menuItem = document.createElement('div');
            menuItem.classList.add('menuItem');

            let itemName = document.createElement('h3');
            itemName.textContent = item.name;
            menuItem.appendChild(itemName);

            let itemDescription = document.createElement('p');
            itemDescription.textContent = item.description;
            menuItem.appendChild(itemDescription);

            let itemIngredients = document.createElement('des');
            itemIngredients.textContent = `Інгредієнти: ${item.ingredients}`;
            menuItem.appendChild(itemIngredients);

            let itemImage = document.createElement('img');
            itemImage.src = item.photo;
            itemImage.alt = item.name;
            menuItem.appendChild(itemImage);

            let itemPriceText = item.price;
            let itemPrice = parseFloat(itemPriceText);

            if (itemPrice > 0) {
                let itemPriceDisplay = document.createElement('p');
                itemPriceDisplay.textContent = `Ціна: ${item.price} грн`;
                menuItem.appendChild(itemPriceDisplay);
            }

            let quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.min = '0';
            quantityInput.value = '0';
            menuItem.appendChild(quantityInput);

            menuList.appendChild(menuItem);
        });
    });

    document.getElementById('submitOrder').addEventListener('click', submitOrder);

    function submitOrder() {
        let orderedItems = [];
        let totalCost = 0;
        let itemCosts = {};

        let menuItems = document.querySelectorAll('.menuItem');
        menuItems.forEach(menuItem => {
            let itemName = menuItem.querySelector('h3').textContent;
            let itemPriceText = menuItem.querySelectorAll('p')[1].textContent.split(' ')[1]; // Отримуємо ціну як текст
            let itemPrice = parseFloat(itemPriceText); // Перетворюємо текст на число
            let quantity = parseInt(menuItem.querySelector('input').value);

            // Перевіряємо, чи кількість страв більше 0 перед додаванням до загального замовлення
            if (quantity > 0) {
                let itemTotalCost = quantity * itemPrice;

                if (!itemCosts[itemName]) {
                    itemCosts[itemName] = 0;
                }
                itemCosts[itemName] += itemTotalCost;
                totalCost += itemTotalCost;

                orderedItems.push({ name: itemName, quantity: quantity });
            }
        });

        // Додавання вартості доставки
        totalCost += 40;

        // Перевіряємо, чи всі кількості страв дорівнюють нулю
        let allQuantitiesZero = orderedItems.every(item => item.quantity === 0);

        // Якщо всі кількості страв дорівнюють нулю, або поля для адреси чи телефону порожні, не надсилай замовлення
        let customerName = document.getElementById('customerName').value;
        let customerPhone = document.getElementById('customerPhone').value;
        let customerAddress = document.getElementById('customerAddress').value;

        if (allQuantitiesZero || customerPhone.trim() === '' || customerAddress.trim() === '') {
            alert('Замовлення не може бути створене. Будь ласка, виберіть страви та введіть ваші дані перед оформленням замовлення.');
            return;
        }

        // Очищаємо блок замовлення перед виведенням нового
        orderSummary.innerHTML = '';

        // Виводимо дані замовника у вигляді рядка
        let customerInfo = document.createElement('p');
        customerInfo.textContent = `Замовив: ${customerName}, Телефон: +380${customerPhone}, Адреса доставки: ${customerAddress}`;
        orderSummary.appendChild(customerInfo);

        // Виводимо замовлення у вигляді списку на сторінці
        let orderList = document.createElement('ul');
        Object.keys(itemCosts).forEach(itemName => {
            let listItem = document.createElement('li');
            listItem.textContent = `${itemName}: ${itemCosts[itemName]} грн`;
            orderList.appendChild(listItem);
        });

        // Додавання вартості доставки до чеку
        let deliveryItem = document.createElement('li');
        deliveryItem.textContent = `Доставка: 40 грн`;
        orderList.appendChild(deliveryItem);

        orderSummary.appendChild(orderList);

        // Додаємо загальну суму за замовлення
        let totalCostElement = document.createElement('p');
        totalCostElement.textContent = `Загальна вартість: ${totalCost} грн`;
        orderSummary.appendChild(totalCostElement);

        // Отримуємо масив замовлень з localStorage або створюємо новий масив, якщо даних немає
        let orders = JSON.parse(localStorage.getItem('orders')) || [];

        // Додаємо нове замовлення до масиву
        orders.push({ name: customerName, phone: customerPhone, address: customerAddress, items: orderedItems, totalCost: totalCost, timestamp: Date.now() });

        // Зберігаємо оновлений масив замовлень у localStorage
        localStorage.setItem('orders', JSON.stringify(orders));
    }
};
