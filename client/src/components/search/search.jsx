import "./search.css"
import React, { useState } from 'react';

function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Llama a la función de callback con el término de búsqueda
        onSearch(searchTerm);
    };
    return (
        <div className="search">
            <form onSubmit={handleSearchSubmit}>
                <input type="text" value={searchTerm} onChange={handleSearchChange} />
                <button type="submit">Buscar</button>
            </form>
        </div>
    )
}

export default Search;