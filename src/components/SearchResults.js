import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Groq from "groq-sdk";
import SearchBar from "./SearchBar";
import RecipeListItem from "./RecipeListItem";

const groq = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const SearchResults = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { query } = location.state || {};
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    if (query) {
      fetchRecipes(query);
    }
  }, [query]);

  const fetchRecipes = async (query) => {
    setLoading(true);
    setError("");

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Please provide 5 distinct recipes based on "${query}". Each recipe should be formatted exactly as follows:
      
            - Recipe Name: enclosed in "+++" (e.g., +++Recipe Name+++)
            - Cooking Time: on a new line, just the time in minutes (e.g., 15), no "Cooking Time" label
            - Ingredients: start with "***Ingredients***" and list each ingredient on a new line with a bullet point (*)
            - Cooking Instructions: start with "***Instructions***" and list each step on a new line
            
            Separate each recipe with "###".`,
          },
        ],
        model: "llama3-8b-8192",
      });

      const generatedRecipes =
        chatCompletion.choices[0]?.message?.content || "";
      console.log("Generated Recipes:", generatedRecipes);

      const recipeArray = generatedRecipes.split("###").filter(Boolean);
      const formattedRecipes = recipeArray.map((recipe) => {
        const nameMatch = recipe.match(/\+\+\+(.*?)\+\+\+/s);
        const timeMatch = recipe.match(/^\d+$/m);
        const ingredientsMatch = recipe.match(
          /\*\*\*Ingredients\*\*\*(.*?)(?=\*\*\*Instructions\*\*\*)/s
        );
        const instructionsMatch = recipe.match(/\*\*\*Instructions\*\*\*(.*)/s);

        const recipeName = nameMatch ? nameMatch[1].trim() : "Unknown Recipe";
        const cookingTime = timeMatch ? timeMatch[0].trim() : "Unknown Time";
        const ingredients = ingredientsMatch
          ? ingredientsMatch[1]
              .trim()
              .split("\n")
              .filter((line) => line.startsWith("*"))
              .map((line) => line.slice(1).trim())
          : ["No ingredients listed"];
        const instructions = instructionsMatch
          ? instructionsMatch[1].trim().split("\n").filter(Boolean)
          : ["No instructions available"];

        console.log("Parsed Recipe:", {
          name: recipeName,
          time: cookingTime,
          ingredients,
          instructions,
        });

        return {
          name: recipeName,
          time: cookingTime,
          ingredients,
          instructions,
        };
      });

      setRecipes(formattedRecipes);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipe) => {
    navigate("/recipe-details", { state: { recipe } });
  };

  const handleReload = () => {
    if (searchQuery) {
      fetchRecipes(searchQuery);
    }
  };

  return (
    <div>
      <SearchBar onSearch={fetchRecipes} />
      <h1>Suggested recipes </h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {recipes.map((recipe, index) => (
          <div
            key={index}
            onClick={() => handleRecipeClick(recipe)}
            style={{
              cursor: "pointer",
              padding: "10px",
              border: "1px solid black",
              margin: "10px 0",
            }}
          >
            <RecipeListItem name={recipe.name} time={recipe.time} />
            <hr />
          </div>
        ))}
      </div>

      <button onClick={handleReload} style={{ marginTop: "20px" }}>
        I don't like these
      </button>
    </div>
  );
};

export default SearchResults;
