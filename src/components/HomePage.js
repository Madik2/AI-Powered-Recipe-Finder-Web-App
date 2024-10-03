import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import RecipeListItem from "./RecipeListItem";

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
    <div>
      <SearchBar onSearch={handleSearch} />
      <h1>Favorites</h1>
      {savedRecipes.length > 0 ? (
        <ul>
          {savedRecipes.map((recipe, index) => (
            <li
              key={index}
              onClick={() => handleRecipeClick(recipe)}
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
        <p>No saved recipes yet!</p>
      )}
    </div>
  );
}

export default HomePage;
