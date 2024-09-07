import React, { useState } from 'react';
import { fetchGPTResponse } from './fetchChatGPTResponse';

function App() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState({
    preparationMethod: "",
    nutritionalInformations: "",
  });
  const [loading, setLoading] = useState(false);

  async function getRecipe() {
    setLoading(true);
    try {
      const response = await fetchGPTResponse(ingredients);
      setRecipe(response || {
        preparationMethod: "",
        nutritionalInformations: "",
      });
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
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
        onClick={getRecipe}
        disabled={loading}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        {loading ? "Loading..." : "Get Recipe"}
      </button>
      {!loading && recipe && recipe.preparationMethod && (
        <div className="mt-4">
          <h2 className="font-bold">Preparation Method:</h2>
          <p className="bg-gray-100 p-2 rounded">{recipe.preparationMethod}</p>
          <h2 className="font-bold mt-4">Nutritional Information:</h2>
          <p className="bg-gray-100 p-2 rounded">{recipe.nutritionalInformations}</p>
        </div>
      )}
    </div>
  );
}

export default App;
