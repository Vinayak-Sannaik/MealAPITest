const favoriteMeals = document.querySelector(".item-container-fav");

// Function to get all key-value pairs from local storage
function getAllLocalStorageItems() {
  const allItems = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    allItems.push({ key, value }); // Parse the value if needed
  }
  return allItems;
}

const allLocalStorageData = getAllLocalStorageItems();
const values = allLocalStorageData.map((item) => item.value);
const jsonValue = values[1];
const parsedArray = JSON.parse(jsonValue);
// Convert each value in the array to integers
const integersArray = parsedArray.map((str) => parseInt(str));
console.log("Parsed Array of Integers:", integersArray);


async function fetchMeals() {
    for (let i = 0; i < integersArray.length; i++) {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${integersArray[i]}`);
            const data = await response.json();
            Model(data.meals, i); 
        } catch (error) {
            console.error(`Error fetching meal with intValue ${integersArray[i]}:`, error);
        }
    }
}


// Function to remove a meal from favorites and local storage
function removeFavoriteMeal(index) {
    const favoriteMealsContainer = document.querySelector('.item-container-fav');
    
    // Get the removed meal's element
    const removedMeal = favoriteMealsContainer.getElementsByClassName('item')[index];
    
    // If the meal exists in the UI, remove it
        if (removedMeal) {
            favoriteMealsContainer.removeChild(removedMeal);
    
            const allLocalStorageData = getAllLocalStorageItems();
            const keyToRemove = allLocalStorageData[index].key;
            
            console.log("Removing key:", keyToRemove); // Check the key before removing
            localStorage.removeItem(keyToRemove);
        
            console.log("LocalStorage after removal:", localStorage); // Check the local storage content
        }
}

// Function to handle "Remove" button clicks
function handleRemoveButtonClick(index) {
    removeFavoriteMeal(index);
    alert('Removed from favorites');
}

function Model(mealData,index) {
    mealData.forEach(meal => {
        const mealName = meal.strMeal;
        favoriteMeals.innerHTML += `<div class="item">
        <button class="view-more-btn">
          <img src="${meal.strMealThumb}" alt="item1" />
        </button>
        <div class="flex-container">
          <h3 class="title">${meal.strMeal}</h3>
          <button class="add-favorite-btn" onclick="handleRemoveButtonClick(${index})">
                Remove
            </button>
        </div>`;
    });
}

fetchMeals();