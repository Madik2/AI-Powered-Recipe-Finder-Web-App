import React, { useState } from "react";
import "./SearchBar.css";
import searchIcon from "../assets/search-icon.png";
import closeIcon from "../assets/close.png";
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar-container">
      <input
        className="search-bar-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What do you feel like eating?"
      />
      <button className="search-icon-button" onClick={handleSearch}>
        <img src={searchIcon} alt="Search" className="search-icon" />
      </button>
    </div>
  );
};

export default SearchBar;
