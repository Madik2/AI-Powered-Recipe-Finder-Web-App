import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import RecipeListItem from "./RecipeListItem";
import "./HomePage.css";
function HomePage() {
  const [query, setQuery] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRecipesData =
      JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(savedRecipesData);
  }, []);

  const handleRecipeClick = (recipe) => {
    navigate("/recipe-details", { state: { recipe } });
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    navigate("/search-results", { state: { query: searchQuery } });
  };

  return (
    <div className="homepage-container">
      <SearchBar onSearch={handleSearch} className="search-bar" />
      <div className="favorites-container">
        <h1 className="favorites-container-title">Favorites </h1>
        {savedRecipes.length > 0 ? (
          <ul className="favorites-list">
            {savedRecipes.map((recipe, index) => (
              <li
                key={index}
                onClick={() => handleRecipeClick(recipe)}
                className="recipe-item"
                style={{ cursor: "pointer" }}
              >
                <RecipeListItem
                  name={recipe.name}
                  time={recipe.time}
                  recipe={recipe}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-recipes-message">No saved recipes yet!</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
