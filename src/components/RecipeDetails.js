import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function RecipeDetails() {
  const location = useLocation();
  const { recipe } = location.state || {};
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    const alreadySaved = savedRecipes.some(
      (savedRecipe) => savedRecipe.name === recipe.name
    );
    setIsSaved(alreadySaved);
  }, [recipe]);

  const handleSaveRecipe = () => {
    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

    if (isSaved) {
      savedRecipes = savedRecipes.filter(
        (savedRecipe) => savedRecipe.name !== recipe.name
      );
    } else {
      savedRecipes.push(recipe);
    }

    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    setIsSaved(!isSaved); // Toggle the saved state
  };

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

      <button
        onClick={handleSaveRecipe}
        style={{
          backgroundColor: isSaved ? "red" : "grey",
        }}
      >
        {isSaved ? "Saved" : "Save"}
      </button>
    </div>
  );
}

export default RecipeDetails;
