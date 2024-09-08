import React, { useState } from 'react';

const RecipeComponent = (props) => {
  const [show, setShow] = useState(false);
  const { label, image, ingredientLines, url } = props.recipe;

  return (
    <div className="flex flex-col p-4 w-full sm:w-72 shadow-lg rounded-lg bg-white">
      {show && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-70">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-lg font-bold">{label}</h2>
            <ul className="list-disc pl-5 mt-4">
              {ingredientLines.map((ingredient, index) => (
                <li key={index} className="text-gray-700">{ingredient}</li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => window.open(url)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg uppercase"
              >
                See More
              </button>
              <button
                onClick={() => setShow(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <img src={image} alt={label} className="object-cover h-48 rounded-lg mb-4" />
      <h2 className="text-lg font-semibold text-center">{label}</h2>
      <button
        className="bg-green-500 text-white mt-4 py-2 rounded-lg uppercase w-full"
        onClick={() => setShow(true)}
      >
        Ingredients
      </button>
      <button
        className="bg-blue-500 text-white mt-2 py-2 rounded-lg uppercase w-full"
        onClick={() => window.open(url)}
      >
        See Complete Recipe
      </button>
    </div>
  );
};

export default RecipeComponent;
