window.onload = function() {
    let orders = JSON.parse(localStorage.getItem('orders'));

    let orderDetails = document.getElementById('orderDetails');

    if (orders && orders.length > 0) {
        orders.forEach((orderData, index) => {
            let orderContainer = document.createElement('div');
            orderContainer.classList.add('order-container');

            let customerInfo = document.createElement('p');
            customerInfo.textContent = `Замовив: ${orderData.name}, Номер телефону: +380${orderData.phone}, Адреса: ${orderData.address}, Дата: ${new Date(orderData.timestamp).toLocaleString()}`;
            orderContainer.appendChild(customerInfo);

            let orderList = document.createElement('ul');
            orderData.items.forEach(item => {
                let listItem = document.createElement('li');
                listItem.textContent = `${item.name}: ${item.quantity}`;
                orderList.appendChild(listItem);
            });
            orderContainer.appendChild(orderList);

            let totalCostElement = document.createElement('p');
            totalCostElement.textContent = `Вартість за усе замовлення: ${orderData.totalCost} грн`;
            orderContainer.appendChild(totalCostElement);

            if (orderData.status === 'accepted') {
                orderContainer.classList.add('accepted');
            } else if (orderData.status === 'rejected') {
                orderContainer.classList.add('rejected');
            }

            let acceptButton = document.createElement('button');
            acceptButton.textContent = 'Прийняти';
            acceptButton.addEventListener('click', () => acceptOrder(index, orderContainer));
            orderContainer.appendChild(acceptButton);

            let rejectButton = document.createElement('button');
            rejectButton.textContent = 'Відхилити';
            rejectButton.addEventListener('click', () => rejectOrder(index, orderContainer));
            orderContainer.appendChild(rejectButton);

            let completeButton = document.createElement('button');
            completeButton.textContent = 'Виконано';
            completeButton.addEventListener('click', () => completeOrder(orderContainer));
            orderContainer.appendChild(completeButton);

            orderDetails.appendChild(orderContainer);
        });
    } else {
        let errorMessage = document.createElement('p');
        errorMessage.textContent = 'Наразі замовлень немає.';
        orderDetails.appendChild(errorMessage);
    }
};

function acceptOrder(index, orderContainer) {
    alert('Замовлення прийнято!');

    let orders = JSON.parse(localStorage.getItem('orders'));
    orders[index].status = 'accepted';
    localStorage.setItem('orders', JSON.stringify(orders));

    orderContainer.classList.add('accepted');
}

function rejectOrder(index, orderContainer) {
    let orders = JSON.parse(localStorage.getItem('orders'));
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));

    orderContainer.classList.add('rejected');
    setTimeout(() => {
        orderContainer.style.display = 'none';
    }, 50);
}

function completeOrder(orderContainer) {
    orderContainer.classList.add('completed');
    setTimeout(() => {
        orderContainer.style.display = 'none';
    }, 800);
}
