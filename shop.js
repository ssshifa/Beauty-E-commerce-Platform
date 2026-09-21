document.addEventListener('DOMContentLoaded', function() {
    function filterProducts() {
        const category = [...document.getElementById('category').selectedOptions].map(opt => opt.value);
        const priceRange = parseFloat(document.getElementById('priceRange').value);
        const rating = document.getElementById('rating').value;
        const searchTerm = document.getElementById('search').value.toLowerCase();

        document.getElementById('priceValue').innerText = '৳' + priceRange;

        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            const productCategory = product.getAttribute('data-category');
            const productPrice = parseFloat(product.getAttribute('data-price'));
            const productRating = parseInt(product.getAttribute('data-rating'));
            const productName = product.querySelector('h4').innerText.toLowerCase();

            const matchesCategory = category.length === 0 || category.includes(productCategory);
            const matchesPrice = productPrice <= priceRange;
            const matchesRating = rating === "all" || productRating >= parseInt(rating);
            const matchesSearch = productName.includes(searchTerm);

            if (matchesCategory && matchesPrice && matchesRating && matchesSearch) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Apply product filtering
    document.getElementById('filtersForm').addEventListener('input', filterProducts);
    document.getElementById('clearFilters').addEventListener('click', function() {
        document.getElementById('filtersForm').reset();
        filterProducts();
    });

    filterProducts();
});

document.addEventListener("DOMContentLoaded", function() {
    // Set up ratings for each product
    document.querySelectorAll(".product").forEach(product => {
        let rating = product.getAttribute("data-rating");
        let stars = "★".repeat(rating) + "☆".repeat(5 - rating);
        product.querySelector(".rating").innerHTML = stars;
    });
});



//cart


    document.addEventListener('DOMContentLoaded', function () {
        // Initialize an empty cart array
        let cart = [];

        // Function to update cart count in the header
        function updateCartCount() {
            const cartCount = document.querySelector('.totalQuantity');
            if (cartCount) cartCount.innerText = cart.length;
        }

        // Function to add products to the cart
        function addToCart(product) {
            // Check if the product is already in the cart
            const existingProductIndex = cart.findIndex(item => item.name === product.name);

            if (existingProductIndex > -1) {
                // If product is already in the cart, increase its quantity
                cart[existingProductIndex].quantity++;
            } else {
                // If the product is not in the cart, add it with quantity 1
                product.quantity = 1;
                cart.push(product);
            }

            // Update cart count in the header
            updateCartCount();
        }

        // Add event listeners to each "Add to Cart" button
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function () {
                const productElement = this.parentElement;
                const name = productElement.querySelector('h4').innerText;
                const price = parseFloat(productElement.querySelector('p').innerText.replace('৳', ''));
                const product = { name, price };
                addToCart(product);
            });
        });
    });




