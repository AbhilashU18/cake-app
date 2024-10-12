const navbar = document.querySelector(".navbar");
const menuBtn = document.querySelector("#menu-btn");
const slides = document.querySelectorAll(".slide");
const header = document.querySelector(".header");

let index = 0;

// JavaScript to toggle the
// visibility of the navigation menu
document.addEventListener("DOMContentLoaded",
	function () {
		const hamburger = document.getElementById("hamburger");
		const navbar = document.querySelector(".navbar");

		hamburger.addEventListener("click", function () {
			navbar.classList.toggle("active");
		});
	});

window.addEventListener("scroll", () => {
	navbar.classList.remove("active");
});

function showSlide(nextIndex) {
	slides[index].classList.remove("active");
	index = (nextIndex + slides.length) % slides.length;
	slides[index].classList.add("active");
}

function next() {
	showSlide(index + 1);
}

function prev() {
	showSlide(index - 1);
}



let currentSlide = 0;
const carouselSlides = document.querySelectorAll('.slide');

function showSlide(index) {
    carouselSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function next() {
    currentSlide = (currentSlide + 1) % carouselSlides.length;
    showSlide(currentSlide);
}

function prev() {
    currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
    showSlide(currentSlide);
}

document.getElementById('next-slide').addEventListener('click', next);
document.getElementById('prev-slide').addEventListener('click', prev);



// Select elements from the DOM
const cartOverlay = document.getElementById('cart-overlay');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cart-total');
const buyNowButtons = document.querySelectorAll('.buy-now'); // Select "Buy Now" buttons
let cart = []; // Store cart items

// Function to open cart modal
function openCart() {
    cartOverlay.classList.add('show-cart');
}

// Function to close cart modal
closeCart.addEventListener('click', () => {
    cartOverlay.classList.remove('show-cart');
});

// Function to add item to cart
function addToCart(productName, productPrice) {
    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity++; // Increase the quantity
    } else {
        // If the item does not exist, add it with quantity 1
        const cartItem = {
            name: productName,
            price: productPrice,
            quantity: 1
        };
        cart.push(cartItem);
    }

    // Update the cart UI and open the cart modal
    updateCartUI();
    openCart();
}

// Function to update the cart UI
function updateCartUI() {
    cartItemsContainer.innerHTML = ''; // Clear the cart items
    let totalPrice = 0;

    cart.forEach((item, index) => {
        // Create new cart item element
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <p class="item-name">${item.name} - ₹${item.price}</p>
            <input type="number" class="item-quantity" value="${item.quantity}" min="1" data-index="${index}">
            <button class="remove-item-btn" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(div);
        totalPrice += item.price * item.quantity; // Multiply price by quantity
    });

    // Update the total price
    cartTotal.innerText = totalPrice.toFixed(2);

    // Add event listeners for quantity change and remove buttons
    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('change', updateItemQuantity);
    });

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Function to handle quantity change
function updateItemQuantity(e) {
    const input = e.target;
    const index = input.getAttribute('data-index');
    const newQuantity = parseInt(input.value);

    if (newQuantity >= 1) {
        cart[index].quantity = newQuantity; // Update quantity in the cart array
    } else {
        // If quantity is less than 1, remove the item
        removeItem(e);
    }

    updateCartUI(); // Recalculate and update the UI
}

// Function to remove item from cart
function removeItem(e) {
    const button = e.target;
    const index = button.getAttribute('data-index');

    cart.splice(index, 1); // Remove item from cart array

    updateCartUI(); // Recalculate and update the UI
}

// Add event listeners to all "Buy Now" buttons
buyNowButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        const productName = button.getAttribute("data-product-name");
        const productPrice = parseFloat(button.getAttribute("data-product-price"));
        addToCart(productName, productPrice);
    });
});
