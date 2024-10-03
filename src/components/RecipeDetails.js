import React from "react";
import { useLocation } from "react-router-dom";

function RecipeDetails() {
  const location = useLocation();
  const { recipe } = location.state || {};

  if (!recipe) {
    return <div>No recipe data available.</div>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>
        <strong>Cooking Time:</strong> {recipe.time} minutes
      </p>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetails;
