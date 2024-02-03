const favoriteMealsContainer = document.querySelector(".item-container-fav");

// Fetch all the meals from local storage
const arrayString = localStorage.getItem("favorites");
const favoriteMealsList = JSON.parse(arrayString) || [];

fetchMeals();
async function fetchMeals() {
  for (let i = 0; i < favoriteMealsList.length; i++) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favoriteMealsList[i]}`
      );
      const data = await response.json();
      Model(data.meals, i);
    } catch (error) {
      console.error(
        `Error fetching meal with intValue ${favoriteMealsList[i]}:`,
        error
      );
    }
  }
}

function Model(mealData, index) {
  mealData.forEach((meal) => {
    const mealName = meal.strMeal;
    favoriteMealsContainer.innerHTML += `
    <div class="item">
        <button class="view-more-btn">
          <img src="${meal.strMealThumb}" alt="item1" />
        </button>
        <div class="flex-container">
        <h3 class="title">${meal.strMeal}</h3>
        <button class="add-favorite-btn" onclick="handleRemoveButtonClick(${index})">
                Remove
        </button>
    </div>
    </div>`;
  });
}

function removeFavoriteMeal(index) {
  // Remove the meal from local storage
  const keyToRemove = favoriteMealsList[index];
  favoriteMealsList.splice(index, 1); // Remove the meal from the list
  localStorage.setItem("favorites", JSON.stringify(favoriteMealsList)); // Update local storage
  console.log("Removed key:", keyToRemove);

  // Remove the meal from the UI
  const removedMeal = favoriteMealsContainer.getElementsByClassName("item")[index];
  if (removedMeal) {
    removedMeal.remove();
  }
}

function handleRemoveButtonClick(index) {
  console.log("index", index);
  removeFavoriteMeal(index);
  alert("Removed from favorites");
}
