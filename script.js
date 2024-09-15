const form = document.getElementById('ingredient-form');
const recipesDiv = document.getElementById('recipes');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const ingredients = document.getElementById('ingredients').value;
  if (ingredients.trim() === '') {
    alert('Please enter at least one ingredient.');
    return;
  }
  getRecipes(ingredients);
});
