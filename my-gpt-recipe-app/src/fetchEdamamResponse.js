export async function fetchEdamamResponse(ingredients) {
  const API_URL = 'https://api.edamam.com/api/recipes/v2';
  const API_KEY = '233c9df4765c8ba59f27eeed900106c5'; // Replace with your Edamam App Key
  const APP_ID = '3bb602ac'; // Replace with your Edamam App ID

  return fetch(`${API_URL}?type=public&q=${encodeURIComponent(ingredients)}&app_id=${APP_ID}&app_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return data.hits.map(hit => ({
        name: hit.recipe.label,
        preparationMethod: hit.recipe.instructions || 'No instructions available',
        nutritionalInformations: `Calories: ${hit.recipe.nutrition.nutrients[0].quantity} ${hit.recipe.nutrition.nutrients[0].unit}`
      }));
    })
    .catch(error => {
      console.error("Failed to fetch recipes:", error);
      throw error;
    });
}
