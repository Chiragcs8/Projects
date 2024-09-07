import React, { useState } from 'react';
import { fetchGPTResponse } from './fetchChatGPTResponse';

function App() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getRecipes() {
    setLoading(true);
    try {
      const response = await fetchGPTResponse(ingredients);
      setRecipes(response || []);
      setSelectedRecipe(null);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-8 m-auto max-w-lg">
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients here..."
        className="w-full p-2 border border-gray-300 rounded"
      ></textarea>
      <button
        onClick={getRecipes}
        disabled={loading}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        {loading ? "Loading..." : "Get Recipes"}
      </button>
      {recipes.length > 0 && (
        <div className="mt-4">
          <select
            onChange={(e) => setSelectedRecipe(recipes.find(recipe => recipe.name === e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a recipe</option>
            {recipes.map(recipe => (
              <option key={recipe.name} value={recipe.name}>{recipe.name}</option>
            ))}
          </select>
        </div>
      )}
      {selectedRecipe && (
        <div className="mt-4">
          <h2 className="font-bold">Preparation Method:</h2>
          <p className="bg-gray-100 p-2 rounded">{selectedRecipe.preparationMethod}</p>
          <h2 className="font-bold mt-4">Nutritional Information:</h2>
          <p className="bg-gray-100 p-2 rounded">{selectedRecipe.nutritionalInformations}</p>
        </div>
      )}
    </div>
  );
}

export default App;
