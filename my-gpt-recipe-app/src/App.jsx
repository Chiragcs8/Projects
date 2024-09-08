import React, { useState } from 'react';
import { fetchEdamamResponse } from './fetchEdamamResponse';
import RecipeComponent from './RecipeComponent';

const AppComponent = () => {
  const [searchQuery, updateSearchQuery] = useState('');
  const [recipeList, updateRecipeList] = useState([]);
  const [filteredRecipeList, setFilteredRecipeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeoutId, updateTimeoutId] = useState();
  const [filter, setFilter] = useState('all'); // Added filter state

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(async () => {
      setLoading(true);
      const response = await fetchEdamamResponse(e.target.value);
      updateRecipeList(response);
      setFilteredRecipeList(filterRecipes(response, filter));
      setLoading(false);
    }, 500);
    updateTimeoutId(timeout);
  };

  const handleFilterChange = (type) => {
    setFilter(type);
    setFilteredRecipeList(filterRecipes(recipeList, type));
  };

  const filterRecipes = (recipes, type) => {
    if (type === 'all') return recipes;
    return recipes.filter(recipe => 
      type === 'vegetarian' ? recipe.recipe.healthLabels.includes('Vegetarian') : !recipe.recipe.healthLabels.includes('Vegetarian')
    );
  };

  return (
    <div className="flex flex-col items-center p-4">
      <header className="bg-black text-white w-full p-6 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <img src="/hamburger.svg" alt="recipe icon" className="w-9 h-9 mr-3" />
          <h1 className="text-xl font-bold">Recipe Finder</h1>
        </div>
        <div className="flex bg-white rounded-lg p-2">
          <img src="/search-icon.svg" className="w-8 h-8" alt="search" />
          <input
            type="text"
            placeholder="Search Recipe"
            className="ml-3 outline-none text-black text-lg font-semibold"
            value={searchQuery}
            onChange={onTextChange}
          />
        </div>
      </header>
      <div className="mt-4 flex space-x-4">
        <button
          className={`px-4 py-2 rounded-lg text-white ${filter === 'all' ? 'bg-gray-700' : 'bg-gray-500'}`}
          onClick={() => handleFilterChange('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-white ${filter === 'vegetarian' ? 'bg-green-600' : 'bg-green-400'}`}
          onClick={() => handleFilterChange('vegetarian')}
        >
          Vegetarian
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-white ${filter === 'non-vegetarian' ? 'bg-red-600' : 'bg-red-400'}`}
          onClick={() => handleFilterChange('non-vegetarian')}
        >
          Non-Vegetarian
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-evenly p-8 gap-8">
          {filteredRecipeList?.length ? (
            filteredRecipeList.map((recipe, index) => (
              <RecipeComponent key={index} recipe={recipe.recipe} />
            ))
          ) : (
            <img src="/hamburger.svg" alt="placeholder" className="w-40 h-40 opacity-50" />
          )}
        </div>
      )}
    </div>
  );
};

export default AppComponent;
