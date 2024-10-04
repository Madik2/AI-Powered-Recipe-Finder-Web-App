import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import placeholderImage from "../assets/placeholder.png";
import heartIcon from "../assets/heart-icon.png";
import savedHeartIcon from "../assets/saved-heart-icon.png";
import "./RecipeDetails.css";

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
    setIsSaved(!isSaved);
  };

  if (!recipe) {
    return <div>No recipe data available.</div>;
  }

  return (
    <div className="recipe-details-page">
      <div className="recipe-details-container">
        <div className="left-container">
          <img src={placeholderImage} alt="Recipe" className="recipe-image" />
          <div className="card-recipe">
            <div className="recipe-info">
              <h1 className="recipe-title">{recipe.name}</h1>
              <p className="recipe-time">{recipe.time} min.</p>
            </div>

            <button
              onClick={handleSaveRecipe}
              className={`btn ${isSaved ? "saved" : ""}`}
            >
              <img src={isSaved ? savedHeartIcon : heartIcon} alt="Save" />
            </button>
          </div>
        </div>
        <div className="right-container">
          <div className="recipe-ingredients">
            <h2 className="recipe-section-title">Ingredients:</h2>
            <ul className="recipe-ingredients">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="recipe-instructions">
            <h2 className="recipe-section-title">Instructions:</h2>
            <ul className="recipe-instructions">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="recipe-instruction-item">
                  {instruction}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
