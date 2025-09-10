
"use strict";
//Light and Dark mode Event 
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('light-toggle');

  toggleButton.addEventListener('click', () => {
    const body = document.body;

    if (body.classList.contains('dark-mode')) { //light mode switched on
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
    } else if (body.classList.contains('light-mode')) {  //dark mode switched on
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
    } else { //user's default
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      body.classList.add(prefersDark ? 'light-mode' : 'dark-mode');
    }
  });
});

//Data for fillers  
const fillers = {
  sparkles: {
    name: "sparkles",
    image: "images/glitter.jpeg", //Image licensed with the Adobe Stock Photo educational license
    description: "Eye catching sparkle that makes any color slime eye catching."
  },
  farm: {
    name: "farm",
    image: "images/farm.jpeg", //Image licensed with the Adobe Stock Photo educational license
    description: "YeeHaw its time to add a country twist to your slime."
  },
  foam: {
    name: "foam",
    image: "images/foam.jpeg", //Image licensed with the Adobe Stock Photo educational license
    description: "Whats that sound? Oh it is just the ASMR crackle that the foam stuffin' gives!"
  },
  candy: {
    name: "candy",
    image: "images/candy.jpeg", //Image licensed with the Adobe Stock Photo educational license
    description: "Add a sweet twist to your slime."
  },
  fruit: {
    name: "fruit",
    image: "images/fruit.jpeg", //Image licensed with the Adobe Stock Photo educational license
    description: "Add an exciting summer twist with the fruit stuffin'."
  }
};

//getting the filler's information
const itemList = document.getElementById("fillerList");
const itemName = document.getElementById("fillerName");
const itemImage = document.getElementById("fillerImage");
const itemDescription = document.getElementById("fillerDescription");

//retrieving filler when one is clicked
itemList.addEventListener("click", function(e) {
  if (e.target && e.target.nodeName === "LI") {
    const itemKey = e.target.getAttribute("data-item");
    const item = fillers[itemKey];
    
    itemName.textContent = item.name;
    itemImage.src = item.image;
    itemImage.alt = item.name;
    itemDescription.textContent = item.description;
  }
});

//random number generator
function getRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function promoGame(){
  let dieDisplay1 = document.getElementById("random1");
  let dieDisplay2 = document.getElementById("random2");
  let gameMessage = document.getElementById("promoMessage");
  //defining the number parameters
  let die1 = getRandomNumber(1, 6);
    let die2 = getRandomNumber(1, 6);
    //display the numbers on the screen
	dieDisplay1.innerHTML = die1;
  	dieDisplay2.innerHTML = die2;
  //if else displays the message for wining/losing the discount
  if(die1 === 1 && die2=== 1){
	    gameMessage.innerHTML = "You win! Enjoy 10% using the code WINNER10%OFF"
	}else{
		gameMessage.innerHTML = "Try again! Better luck next time."
	}
}

document.getElementById("promo").addEventListener("click", promoGame);


//getting the colors's input information 
const picker = document.getElementById("splatColor"); 
const splat = document.getElementById("splat"); 

//changing the color 
picker.addEventListener("input", () => { splat.style.backgroundColor = picker.value; });

// Shopping cart elements
const checkboxes = document.querySelectorAll('.shoppingCart input[type="checkbox"]');
const cartItems = document.getElementById('cartItems');
const subtotalElem = document.getElementById('subtotal');
const taxElem = document.getElementById('tax');
const shippingElem = document.getElementById('shipping');
const totalPriceElem = document.getElementById('totalPrice');

// Declare cart
let cart = [];

// Cart update function
function updateCart() {
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });

    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

    // Tax 
    const tax = subtotal * 0.08;

    // Shipping 
    const shipping = cart.length > 0 ? 8.00 : 0.00;

    // Total
    const grandTotal = subtotal + tax + shipping;

    // Update display
    subtotalElem.textContent = subtotal.toFixed(2);
    taxElem.textContent = tax.toFixed(2);
    shippingElem.textContent = shipping.toFixed(2);
    totalPriceElem.textContent = grandTotal.toFixed(2);
}

// Cart total 
checkboxes.forEach(box => {
    box.addEventListener('change', () => {
        const name = box.dataset.name;
        const price = parseFloat(box.dataset.price);

        if (box.checked) {
            cart.push({ name, price });
        } else {
            cart = cart.filter(i => i.name !== name);
        }

        updateCart();
    });
});

//declare users
let users = [];

document.getElementById("contactForm").addEventListener("submit", newUser);

//new user function
function newUser(e) {
  e.preventDefault();

  //inputs from form
  let nameInput = document.getElementById("name");
  let telInput = document.getElementById("number");
  let emailInput = document.getElementById("emailAd");
  let commentInput = document.getElementById("comment");    
  let methodInput = document.querySelector("input[name='contact']:checked"); 

  // Clear old errors
  let errorSpans = document.querySelectorAll("#submitForm .message");
  errorSpans.forEach(span => span.textContent = "");
  let outputP = document.getElementById("formOutput");

  let isValid = true;

  //Regex for name email and phone
  let nameRegex = /^[A-Za-z]{2,}(?:\s[A-Za-z]{2,})+$/; 
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let phoneRegex = /^\d{10}$/; 

  //If Validate Name- if none is listed
  if (!nameRegex.test(nameInput.value.trim())) {
    nameInput.nextElementSibling.textContent = "Please enter your full name (first and last).";
    isValid = false;
  }

  //If Validate Comment- if none is listed
  if (commentInput.value.trim() === "") {
    commentInput.nextElementSibling.textContent = "Comments are required.";
    isValid = false;
  }

  //If Validate Contact- if email or phone is not the right format
  if (!methodInput) {
    document.querySelector("fieldset .message").textContent = "Please select a preferred contact method.";
    isValid = false;
  } else {
    if (methodInput.value === "phone") {
      if (!phoneRegex.test(telInput.value.trim())) {
        telInput.nextElementSibling.textContent = "Please enter a valid 10-digit phone number.";
        isValid = false;
      }
    }
    if (methodInput.value === "email") {
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.nextElementSibling.textContent = "Please enter a valid email address.";
        isValid = false;
      }
    }
  }

  if (!isValid) return;

  //user object
  let userAcct = {
    name: nameInput.value.trim(),
    phone: telInput.value.trim(),
    email: emailInput.value.trim(),
    comment: commentInput.value.trim(),
    contactMethod: methodInput.value
  };

  users.push(userAcct);

  //output message
  outputP.innerHTML = `
    <h4>Thank you for your submission, ${userAcct.name}!</h4>
    <p>We will contact you via <strong>${userAcct.contactMethod}</strong>.</p>
    <p>Your comments: "${userAcct.comment}"</p>
  `;

  //Reset 
  document.getElementById("contactForm").reset();

  console.log(users);
}
