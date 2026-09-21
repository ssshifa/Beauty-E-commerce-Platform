let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', function(){
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }else{
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
});

close.addEventListener('click', function (){
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
});

let products = null;
// Get data from the JSON file
fetch('product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
});

// Show product data in the product list
function addDataToHTML(){
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    if (products != null) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button onclick="addCart(${product.id})">Add To Cart</button>
            `;
            listProductHTML.appendChild(newProduct);
        });
    }
}

// Use cookies to store cart data so it doesn't get lost on page refresh
let listCart = {};

function checkCart(){
    let cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
    
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    } else {
        listCart = {};
    }
}
checkCart();

function addCart(productId){
    let product = products.find(p => p.id === productId);
    if (product) {
        // If the product isn't in the cart, add it
        if (!listCart[productId]) {
            listCart[productId] = {...product, quantity: 1};
        } else {
            // If the product is already in the cart, increase the quantity
            listCart[productId].quantity++;
        }

        // Save updated cart data to cookies
        document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
        addCartToHTML();
}

function addCartToHTML(){
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';
    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;

    if (Object.keys(listCart).length > 0) {
        Object.values(listCart).forEach(product => {
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.innerHTML = `
                <img src="${product.image}">
                <div class="content">
                    <div class="name">${product.name}</div>
                    <div class="price">$${product.price} / ${product.quantity} product(s)</div>
                </div>
                <div class="quantity">
                    <button onclick="changeQuantity(${product.id}, '-')">-</button>
                    <span class="value">${product.quantity}</span>
                    <button onclick="changeQuantity(${product.id}, '+')">+</button>
                </div>
            `;
            listCartHTML.appendChild(newCart);
            totalQuantity += product.quantity;
        });
    }

    totalHTML.innerText = totalQuantity;
}

function changeQuantity(productId, type){
    switch (type) {
        case '+':
            listCart[productId].quantity++;
            break;
        case '-':
            listCart[productId].quantity--;
            if (listCart[productId].quantity <= 0) {
                delete listCart[productId];
            }
            break;
        default:
            break;
    }

    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    addCartToHTML();
}

