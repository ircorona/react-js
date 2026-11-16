// NOTA (clase 6): el buscador sale de App.jsx y pasa a ser su propio componente.
// Por ahora es solo visual: los inputs no guardan lo que se escribe y el botón
// no hace nada. Eso llega con useState y eventos en las clases siguientes.
import { useState } from "react";

export function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const nextSearch = city.trim();
    setSearchedCity(nextSearch);
    onSearch(nextSearch);
  }

  function handleClearSearch() {
    setCity("");
    setSearchedCity("");
    onSearch("");
  }

  return (
    <>
      <form className="search-section" onSubmit={handleSubmit}>
        <label>
          Ciudad
          <span className="city-input-wrapper">Nombre de la ciudad</span>
            <input 
            type="text" 
            placeholder="Santiago, Chile" 
            value={city}
            onChange={(event) => setCity(event.target.value)} 
            />
            {(city || searchedCity) && (
              <button 
                type="button"
                className="clear-city-button"
                onClick={handleClearSearch}
              >
                X
              </button>
            )}
        </label>
        <label>
          Tipo
          <input type="text" placeholder="Apartamento" />
        </label>
        <label>
          Huéspedes
          <input type="number" placeholder="2" />
        </label>
        <button type="submit">Buscar</button>
      </form>
      <p className="current-search">
        Resultados de búsqueda: <strong>{searchedCity || "ninguna ciudad"}</strong>.
      </p>
    </>
  );
}
