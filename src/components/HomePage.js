import { useNavigate } from "react-router-dom";
import React, {useState} from "react";
import SearchBar from "./SearchBar";


function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (searchQuery ) => {
    setQuery(searchQuery);
    navigate("/search-results", { state: { query: searchQuery  } });
  };

  return (
    <div>
      <h1>Home Page</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default HomePage;
