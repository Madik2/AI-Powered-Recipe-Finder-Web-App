import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Groq from "groq-sdk";
import SearchBar from "./SearchBar";

const groq = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const GroqChatTest = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { query } = location.state || {};

  useEffect(() => {
    if (query) {
      fetchRecipes(query); // Fetch recipes when the query is available
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
            content: `Please provide 5 distinct recipes based on "${query}".
                      Each recipe should include the following:
                      - Recipe Name
                      - Cooking Time (in minutes)
                      - Ingredients (in a bullet list)
                      - Cooking Instructions
                      Separate each recipe with a line of dashes "---".`,
          },
        ],
        model: "llama3-8b-8192",
      });

      const generatedRecipes =
        chatCompletion.choices[0]?.message?.content || "";
      const recipeArray = generatedRecipes.split("---").filter(Boolean);

      setRecipes(recipeArray);
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
            onClick={() => handleRecipeClick(recipe)} // Navigate when a recipe is clicked
            style={{
              cursor: "pointer",
              padding: "10px",
              border: "1px solid black",
              margin: "10px 0",
            }}
          >
            <pre>{recipe.trim()}</pre>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroqChatTest;
