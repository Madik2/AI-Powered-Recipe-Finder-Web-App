import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What do you feel like eating?"
      />
      <button onClick={handleSearch}>Search Recipes</button>
    </div>
  );
};

export default SearchBar;
