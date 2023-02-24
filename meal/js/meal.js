const loadMeals = (searchValue) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
  fetch(url)
    .then(response => response.json())
    .then(data => displayMeals(data.meals))
};

const displayMeals = meals => {
  const mealContainer = document.getElementById('meal-container');
  mealContainer.innerHTML = '';

  // console.log(meals)
  meals.forEach(meal => {
    // console.log(meal.strIngredient1)
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('col');
    mealContainer.appendChild(mealDiv);
    mealDiv.innerHTML = `
    <div class="card h-100">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strIngredient1}</p>
        <button onclick="loadMealDetail(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">
            Details
        </button>
      </div>
    </div>
    `
  })
};
const searchMeal = () => {
  const searchFieldElement = document.getElementById('search-field');
  const searchValue = searchFieldElement.value;
  searchFieldElement.value = '';
  loadMeals(searchValue);
};
const loadMealDetail = idMeal => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayMealDetails(data.meals[0]))
  // console.log(idMeal)
};
const displayMealDetails = (meal) => {
  // console.log(meal)
  document.getElementById('mealDetailsLabel').innerText = `${meal.strMeal}`
  document.getElementById('mealDetailsBody').innerHTML = `
    <img src="${meal.strMealThumb}" class="img-fluid mb-3">
    <p>${meal.strInstructions}</p>
  `
}
loadMeals(searchValue = 'fish')