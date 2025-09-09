// Get references to HTML elements
const categoriesContainer = document.getElementById("categories");
const cardContainer = document.getElementById("cardContainer");
const allTreeButton = document.getElementById("allTree");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalPriceElement = document.getElementById("cartTotalPrice");
const loadingSpinner = document.getElementById("loadingSpinner");

// Initialize an empty array to store cart items
let cart = [];

// --- Functions to manage loading spinner ---
const showSpinner = () => {
  loadingSpinner.classList.remove("hidden");
};

const hideSpinner = () => {
  setTimeout(() => {
    loadingSpinner.classList.add("hidden");
  }, 500);
};

// --- Functions to fetch data from API ---
const loadCategories = () => {
  showSpinner();
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      showCategories(data.categories);
      hideSpinner();
    })
    .catch(() => hideSpinner());
};

const loadPlants = () => {
  showSpinner();
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      showCards(data.plants);
      hideSpinner();
    })
    .catch(() => hideSpinner());
};

const loadPlantsByCategory = (categoryId) => {
  showSpinner();
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      showCards(data.plants);
      hideSpinner();
    })
    .catch(() => hideSpinner());
};

// --- Functions to handle UI updates and user interaction ---
const showCategories = (categories) => {
  categoriesContainer.innerHTML = "";
  categories.forEach((cat) => {
    const li = document.createElement("li");
    li.id = cat.id;
    li.textContent = cat.category_name;
    li.classList.add(
      "hover:bg-[#15803d]",
      "hover:text-white",
      "cursor-pointer",
      "py-1",
      "pl-2",
      "rounded-lg",
      "transition-colors"
    );

    li.addEventListener("click", () => {
      handleCategoryClick(cat.id, li);
    });
    categoriesContainer.appendChild(li);
  });
};

const handleCategoryClick = (categoryId, clickedElement) => {
  document.querySelectorAll("#categories li").forEach((li) => {
    li.classList.remove("bg-[#15803d]", "text-white");
  });
  allTreeButton.classList.remove("bg-[#15803d]", "text-white");

  if (categoryId === "all") {
    loadPlants();
    allTreeButton.classList.add("bg-[#15803d]", "text-white");
  } else {
    loadPlantsByCategory(categoryId);
    clickedElement.classList.add("bg-[#15803d]", "text-white");
  }
};

const showCards = (plants) => {
  cardContainer.innerHTML = "";
  if (plants.length === 0) {
    cardContainer.innerHTML =
      '<p class="text-center col-span-full text-gray-500">No plants found in this category.</p>';
    return;
  }
  plants.forEach((plant) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add(
      "p-3",
      "bg-white",
      "shadow-xl",
      "rounded-xl",
      "space-y-3",
      "text-justify",
      "flex",
      "flex-col",
      "justify-between",
      "transition-transform",
      "hover:scale-[1.01]",
      "duration-300"
    );
    cardDiv.innerHTML = `
            <div class="">
                <img class="max-h-35 w-full object-cover rounded-md" src="${
                  plant.image
                }" alt="">
            </div>
            <div>
                <h2 class="font-bold my-1 cursor-pointer text-lg" onclick="showPlantDetails('${
                  plant.id
                }')">${plant.name}</h2>
                <p class="text-xs opacity-80">${plant.description.slice(
                  0,
                  100
                )}...</p>
            </div>
            <div class="flex justify-between items-center">
                <h4 class="text-[#15803D] text-xs bg-[#DCFCE7] rounded-xl p-1">${
                  plant.category
                }</h4>
                <p class="font-bold text-sm"><span>${plant.price}</span> ৳</p>
            </div>
            <div class="flex justify-center bg-[#15803d] w-full rounded-xl hover:bg-[#01f557] transition-colors cursor-pointer">
                <button class=" add-to-cart-btn text-white p-1 w-full" data-plant-id="${
                  plant.id
                }" data-plant-name="${plant.name}" data-plant-price="${
      plant.price
    }" data-plant-image="${
      plant.image
    } hover:cursor-pointer " >Add to Cart</button>
            </div>`;
    cardContainer.appendChild(cardDiv);
  });
  // Attach event listeners to the newly created buttons
  attachAddToCartListeners();
};

const attachAddToCartListeners = () => {
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      // Get the parent div, which holds the background color and rounded corners
      const parentDiv = e.target.parentElement;

      const plantId = e.target.dataset.plantId;
      const plantName = e.target.dataset.plantName;
      const plantPrice = parseFloat(e.target.dataset.plantPrice);
      const plantImage = e.target.dataset.plantImage;

      // Call the function to handle adding the item to the cart
      addToCart(plantId, plantName, plantPrice, plantImage);
      // Show a success message
      alert(`${plantName} is added to cart successfully!`);
    });
  });
};

// --- Cart Management Functions ---
const addToCart = (plantId, plantName, plantPrice, plantImage) => {
  // Find if the item already exists in the cart
  const existingItem = cart.find((item) => item.id === plantId);

  if (existingItem) {
    // If it exists, increase the quantity
    existingItem.quantity += 1;
  } else {
    // If it doesn't exist, add a new item to the cart
    cart.push({
      id: plantId,
      name: plantName,
      price: plantPrice,
      image: plantImage,
      quantity: 1,
    });
  }
  // Update the UI after a change in the cart
  updateCartUI();
};

const updateCartUI = () => {
  // Clear the existing cart items in the UI
  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  // Loop through the cart array and create HTML for each item
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "shadow-md",
      "bg-[#F0FDF4]",
      "p-5",
      "rounded-lg",
      "mb-2"
    );
    cartItemDiv.innerHTML = `
            <div class="space-y-2">
                <div class="flex items-center justify-center">
                    <img class="max-w-5 rounded-sm mr-2" src="${item.image}" alt="">
                    <h2>${item.name}</h2>
                </div>
                <div class="text-gray-600 text-sm pl-12">
                    <span>৳</span>
                    <span>${item.price}</span>
                    <span>x</span>
                    <span>${item.quantity}</span>
                </div>
            </div>
            <div>
                <button class="remove-from-cart-btn text-gray-500 hover:cursor-pointer hover:text-red-500 transition-colors" data-plant-id="${item.id}">
                    x
                </button>
            </div>
        `;
    cartItemsContainer.appendChild(cartItemDiv);
  });

  // Update the total price displayed in the UI
  cartTotalPriceElement.textContent = totalPrice.toFixed(2);

  // Attach event listeners for the remove buttons
  attachRemoveButtonListeners();
};

const attachRemoveButtonListeners = () => {
  document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const plantId = e.target.closest("button").dataset.plantId;
      removeFromCart(plantId);
    });
  });
};

const removeFromCart = (plantId) => {
  const itemIndex = cart.findIndex((item) => item.id === plantId);
  if (itemIndex > -1) {
    if (cart[itemIndex].quantity > 1) {
      // Decrease quantity if it's more than 1
      cart[itemIndex].quantity -= 1;
    } else {
      // Remove the item from the array if quantity is 1
      cart.splice(itemIndex, 1);
    }
  }
  // Update the UI
  updateCartUI();
};

// --- Initial setup ---
allTreeButton.addEventListener("click", () => {
  handleCategoryClick("all", allTreeButton);
});

// Initial load: fetch categories and plants when the page loads
loadCategories();
handleCategoryClick("all", allTreeButton);
