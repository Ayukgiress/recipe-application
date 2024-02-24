const apiEndpoint = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const searchButton = document.getElementById('btn');
const searchInput = document.getElementById('user-value');
const searchResult = document.getElementById('result');

searchButton.addEventListener('click', function() {
  const searchTerm = searchInput.value;
  
  // Call a function to fetch recipes based on the search term
  fetchRecipes(searchTerm);
});

function fetchRecipes(searchTerm) {
  fetch(apiEndpoint + searchTerm)
    .then(response => response.json())
    .then(data => {
      const recipes = data.meals;
      displayRecipes(recipes);
    })
    .catch(error => console.error('Error fetching recipes:', error));
}

function displayRecipes(recipes) {
  searchResult.innerHTML = '';
  
  if (recipes) {
    recipes.forEach(recipe => {
      const recipeElement = document.createElement('div');
      recipeElement.innerHTML = `
        <h2>${recipe.strMeal}</h2>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-image">
        <p>${recipe.strInstructions}</p>
      `;
      searchResult.appendChild(recipeElement);
    });
  } else {
    searchResult.textContent = 'Does not exist';
  }
}
