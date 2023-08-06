const searchIcon = document.querySelector(".fa-magnifying-glass");
const mealList = document.querySelector(".item-container");
const searchForm = document.querySelector("form");
const searchResults = document.querySelector(".show-result");
const addFavoriteBtn = document.querySelector(".add-favorite-btn");
const mealDetailsContent = document.querySelector(".more-details-content");
const mealCloseButton = document.querySelector(".close-btn");
const favoriteMeals = document.querySelector(".item-container-fav");
const favoriteCount = document.querySelector(".items-count");

// Event listeners
let searchQuery = "";
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
//   console.log(searchQuery);
  fetchAPI();
});

mealCloseButton.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("more-details-show");
});

// Function to fetch for inputs
async function fetchAPI() {
  const baseURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`;
  try {
    const response = await fetch(baseURL);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    //   console.log(data);
    generateHTML(data.meals);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

// Generate HTMl content for fetched contents
function generateHTML(results) {
  let generatedHTMLTemplate = "";
  if (results) {
    results.forEach((result) => {
      // console.log(result);
      generatedHTMLTemplate += `
            <div class="item" data-id ="${result.idMeal}">
                <button class="view-more-btn">
                  <img class = "thumbImage" src="${result.strMealThumb}" alt="item" />
                </button>
                <div class="flex-container">
                  <h3 class="title">${result.strMeal}</h3>
                  <button class="add-favorite-btn"
                    onclick='alert("Added to favorite")'
                    class="viewFoodButton"
                  >
                    Favorite
                  </button>
                </div>
              </div>
            `;
      mealList.classList.remove("not-found");
    });
  } else {
    generatedHTMLTemplate = "Sorry Not Found!!";
    mealList.classList.add("not-found");
  }

  mealList.innerHTML = generatedHTMLTemplate;
}

// function to show more details page
mealList.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log(e.target);
  if (e.target.classList.contains("thumbImage")) {
    let mealItem = e.target.parentElement.parentElement;
    // console.log(mealItem);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        mealRecipeModel(data.meals);
      });
  }
});

function mealRecipeModel(meal) {
  // console.log(meal);
  meal = meal[0];
  let html = `
        <div class="more-details-title"><h2>${meal.strMeal}</h2></div>
        <div class="more-details-title"><h4>Category : ${meal.strCategory}</h4></div>
          <img class="more-details-img" src="${meal.strMealThumb}" alt="img">
          <p class="more-details-content">
            ${meal.strInstructions}
          </p>
        
        `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("more-details-show");
}

//Favorite Section
window.addEventListener("load", () => {
  const storedFavorites = localStorage.getItem("favorites");
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
  }
});

let favorites = [];
// Function to add a meal to favorites
function addToFavorites(mealId) {
  if (!favorites.includes(mealId)) {
    favorites.push(mealId);
    // Save favorites to local storage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}


// Fetch meal id after clicking add to favorite button
mealList.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("add-favorite-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    if (!favorites.includes(mealItem.dataset.id)) {
      addToFavorites(mealItem.dataset.id);
    }
  }
});









































// allLocalStorageData.forEach((item)=>{
// let favHTML = '';
// favHTML +=
// `
//         <div class="item">
//             <button class="view-more-btn">
//                 <img src="bac-img.jpg" alt="item1" />
//             </button>
//                 <div class="flex-container">
//                     <h3 class="title">food name gggg</h3>
//                     <button class="add-favorite-btn"
//                     onclick='alert("Removed from favorite")'
//                     class="viewFoodButton"
//                     >
//                         Remove
//                     </button>
//                 </div>
//         </div> 
//         `;
// favoriteMeals.innerHTML = favHTML

// });
