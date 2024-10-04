import React, { useState, useEffect } from "react";
import placeholderImage from "../assets/placeholder.png";
import heartIcon from "../assets/heart-icon.png";
import savedHeartIcon from "../assets/saved-heart-icon.png";
import closeIcon from "../assets/close.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RecipeListItem.css";

const RecipeListItem = ({ name, time, recipe }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    const alreadySaved = savedRecipes.some(
      (savedRecipe) => savedRecipe.name === recipe.name
    );
    setIsSaved(alreadySaved);
  }, [recipe]);

  const handleSaveRecipe = (e) => {
    e.stopPropagation();
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

  return (
    <div className="card mb-3 custom-card">
      <div className="row g-0">
        <div className="col-md-4 card-picture">
          <img
            src={placeholderImage}
            className="img-fluid rounded-start"
            alt={name}
          />
        </div>
        <div className="col-md-8 d-flex justify-content-between align-items-center">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{time} min.</p>
          </div>
          <button
            onClick={handleSaveRecipe}
            className={`btn ${isSaved ? "saved" : ""}`}
          >
            <img src={isSaved ? savedHeartIcon : heartIcon} alt="Save" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeListItem;
