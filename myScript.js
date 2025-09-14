
"use strict";
//Light and Dark mode Event 
document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('light-toggle'); //calling the light toggle button
  const body = document.body; //body of the HTML

  //Discovers if the browser prefers light or dark mode
  if (!body.classList.contains('light-mode') && !body.classList.contains('dark-mode')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; //Sees if dark mode is the computer setting 
    body.classList.add(prefersDark ? 'dark-mode' : 'light-mode'); //Add dark mode if that is the computer setting. If it is not then chooses light mode
  }

  //Toggle button
  toggleButton.addEventListener('click', function() { //A click is that causes this function to happen 
    if (body.classList.contains('dark-mode')) { //If dark mode is chosen when clicked, remove it and add light mode
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
    } else {
      body.classList.remove('light-mode'); //Otherwise, remove light mode and chose dark mode
      body.classList.add('dark-mode');
    }
  });
});


//Data for fillers  
const fillers = { 
  //Each of these is the name, image, and description that goes a long with all of the filler options
  sparkles: { //sparkle filler option
    name: "sparkles", //the name for sparkles
    image: "images/glitter.jpeg", //the image for sparkles //Image licensed with the Adobe Stock Photo educational license
    description: "Eye catching sparkle that makes any color slime eye catching." //the description for the sparkles option
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

  //Getting the filler's information
  const itemList = document.getElementById("fillerList"); //Calls the filler ul in the HTML
  const itemName = document.getElementById("fillerName"); //Calls the fillerName H3 in the HTML
  const itemImage = document.getElementById("fillerImage"); //Calls the fillerImage HTML
  const itemDescription = document.getElementById("fillerDescription"); //Calls the fillerDescription in the HTML

//Retrieving filler when one is clicked
itemList.addEventListener("click", function(e) { //A click is that causes this function to happen 
  if (e.target && e.target.nodeName === "LI") { //When the li element is clicked, bring the information that comes with each one
    const itemKey = e.target.getAttribute("data-item");  //Each of the li is a data-item. this brings up the attributes for each 
    const item = fillers[itemKey]; //item is now associated with the attributes of the selected filler. 
    
    //The filler's name, src, alt, and description now are changed to whichever filler is selected 
    itemName.textContent = item.name; 
    itemImage.src = item.image;
    itemImage.alt = item.name;
    itemDescription.textContent = item.description;
  }
});


//Random number generator
function getRandomNumber(min, max) { 
   return Math.floor(Math.random() * (max - min + 1)) + min; 
}

//promo game
function promoGame(){
  let dieDisplay1 = document.getElementById("random1"); //The die display span in the HTML is now associated with the random numbers that will be drawn
  let dieDisplay2 = document.getElementById("random2"); //The die display span in the HTML is now associated with the random numbers that will be drawn
  let gameMessage = document.getElementById("promoMessage"); //The promo message in the HTML is now associated with the two messages in the java code
  //defining the number parameters
  let die1 = getRandomNumber(1, 6); //Generate a random number between 1 and 6
  let die2 = getRandomNumber(1, 6); //Generate a random number between 1 and 6
  //Display the random numbers on the screen
	dieDisplay1.innerHTML = die1; 
  dieDisplay2.innerHTML = die2;
  
  //if else displays the message for wining/losing the discount
  if(die1 === 1 && die2=== 1){ //If both die roll a 1, then show the user that they won 
	    gameMessage.innerHTML = "You win! Enjoy 10% using the code WINNER10%OFF" 
	}else{ //Otherwise, tell the user to try again
		gameMessage.innerHTML = "Try again! Better luck next time."
	}
}

//When promo is clicked, begin the game code above
document.getElementById("promo").addEventListener("click", promoGame); 


//getting the colors's input information 
const picker = document.getElementById("splatColor"); //picker is now associated with the label in the HTML, splatColor
const splat = document.getElementById("splat"); //splat is now associated with the input, splat in the HTML

//changing the color 
picker.addEventListener("input", function() {
  splat.style.backgroundColor = picker.value; //The picker value becomes the background color for splat. Splat has a clip path to give it the slime shape.
});



document.addEventListener('DOMContentLoaded', function() {
    // Shopping cart elements
    const checkboxes = document.querySelectorAll('.shoppingCart input[type="checkbox"]'); //The .shoppingCart check boxes are now associated with checkboxes
    const cartItems = document.getElementById('cart-items');  //cartItems are now associated with the cart-items in the HTML which is in the checkout
    const subtotalElem = document.getElementById('subtotal'); //The subtotalElem is now linked to the subtotal in the HTML
    const taxElem = document.getElementById('tax'); //taxElem and HTML tax are linked
    const shippingElem = document.getElementById('shipping'); //shippingElem and HTML shipping are linked
    const discountInput = document.getElementById('discount'); //The discountInput is now linked with the input in the discountForm in the HTML
    const discountForm = document.getElementById('discountForm'); //The discountForm is now linked with the discount in the checkout
    const discountCode = 'WINNER10%OFF'; //Declares what the discount code string is
    const totalPriceElem = document.getElementById('totalPrice'); //Links totalPriceElem to the area that it is displayed in the HTML
    //for discount message
    const discountMessage = document.createElement('p'); //A p element will be created when a discountMessage is called
    discountForm.appendChild(discountMessage); //If the discount form is used, the discountMessage is called

    // Declare cart
    let cart = [];
    //default the discount to false
    let discountApplied = false;

    // Cart update function
    function updateCart() {
        cartItems.innerHTML = ''; //The cart default is empty

        cart.forEach(item => { 
            const li = document.createElement('li'); 
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItems.appendChild(li);

        }); //For each item selected, create a li element for it and add it to the list of selected items

        const subtotal = cart.reduce((sum, item) => sum + item.price, 0); //Adds the selected item price to the current total

        // Tax equation
        const tax = subtotal * 0.08;

        // Shipping 
        let shipping;
        if (cart.length > 0) {
          shipping = 8.00; //If there is anything in the cart, then add 8.00 shipping
        } else { //Else keep shipping at 0
          shipping = 0.00;
        } 

        // Total
        let grandTotal = subtotal + tax + shipping; //Add everything together

        //discount 
        if(discountApplied){ //If the discount is applied, calculate the discount and then subtract it from the grandTotal
            const discount = subtotal * 0.10;
            grandTotal = grandTotal - discount;
        }

        // Update display
        subtotalElem.textContent = subtotal.toFixed(2);
        taxElem.textContent = tax.toFixed(2);
        shippingElem.textContent = shipping.toFixed(2);
        totalPriceElem.textContent = grandTotal.toFixed(2);
    }

    //Discount form
     discountForm.addEventListener('submit', e => {
        e.preventDefault(); 

        if (discountInput.value.trim().toUpperCase() === discountCode) { //If the input equals the string applied to discountCode then discount applied equals true
            discountApplied = true;
            updateCart(); //The discount is applied to the cart using the updateCart function
            discountMessage.textContent = "Discount applied!";
            discountMessage.style.color = "green";
        } else { //Else discount code is false and gives an invalid response
            discountMessage.textContent = "Invalid discount code.";
            discountMessage.style.color = "red";
        }
    });

    // Cart total 
    checkboxes.forEach(box => { 
        box.addEventListener('change', () => {
            const name = box.dataset.name; //the names of the items checked
            const price = parseFloat(box.dataset.price); //the price for each item

            if (box.checked) {
                cart.push({ name, price }); //for each box checked, change the cart
            } else { //if the box is not checked, do not add it to the cart
                cart = cart.filter(i => i.name !== name); 
            }

            updateCart(); //Use the updateCart function to update the cart
        });
    });

});

//declare users
let users = [];

document.getElementById("contactForm").addEventListener("submit", newUser); //Get each user entered when submit is clicked

//new user function
function newUser(e) { 
  e.preventDefault();

  //inputs from form are now equal to these:
  let nameInput = document.getElementById("name");
  let telInput = document.getElementById("number");
  let emailInput = document.getElementById("emailAd");
  let commentInput = document.getElementById("comment");    
  let methodInput = document.querySelector("input[name='contact']:checked"); 

  // Clear old errors
  let errorSpans = document.querySelectorAll("#submitForm .message"); //The errorSpan is now the submitForm message
  errorSpans.forEach(span => span.textContent = ""); //Error span is currently blank
  let outputP = document.getElementById("formOutput"); //The output will be where formOutput is in the HTML

  let isValid = true; //True by default

  //Regex for name email and phone
  let nameRegex = /^[A-Za-z]{2,}(?:\s[A-Za-z]{2,})+$/; //Is a first name and last name
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //Has the email format
  let phoneRegex = /^\d{10}$/; //Is a 10 digit number

  //Validate Name- if none is listed
  if (!nameRegex.test(nameInput.value.trim())) {
    nameInput.nextElementSibling.textContent = "Please enter your full name (first and last).";
    isValid = false; //Changes valid to false
  }

  //Validate Comment- if none is listed
  if (commentInput.value.trim() === "") {
    commentInput.nextElementSibling.textContent = "Comments are required.";
    isValid = false; //Changes valid to false
  }

  //Validate Contact- if email or phone is not the right format
  if (!methodInput) { //if no input is selected
    document.querySelector("fieldset .message").textContent = "Please select a preferred contact method.";
    isValid = false; //Changes valid to false
  } else {
    if (methodInput.value === "phone") {
      if (!phoneRegex.test(telInput.value.trim())) { //If phone does not pass the regex test
        telInput.nextElementSibling.textContent = "Please enter a valid 10-digit phone number.";
        isValid = false; //Changes valid to false
      }
    }
    if (methodInput.value === "email") {
      if (!emailRegex.test(emailInput.value.trim())) { //If email does not pass the regex test
        emailInput.nextElementSibling.textContent = "Please enter a valid email address.";
        isValid = false; //Changes valid to false
      }
    }
  }

  if (!isValid) return; //Stop form if isValid is false

  //user object created and the form input values are added
  let userAcct = {
    name: nameInput.value.trim(),
    phone: telInput.value.trim(),
    email: emailInput.value.trim(),
    comment: commentInput.value.trim(),
    contactMethod: methodInput.value
  };

  users.push(userAcct); //Add the new user to userAcct

  //output message
  outputP.innerHTML = `
    <h4>Thank you for your submission, ${userAcct.name}!</h4>
    <p>We will contact you via <strong>${userAcct.contactMethod}</strong>.</p>
    <p>Your comments: "${userAcct.comment}"</p>
  `;

  //Reset 
  document.getElementById("contactForm").reset();

  console.log(users); //output the users to the console
}
