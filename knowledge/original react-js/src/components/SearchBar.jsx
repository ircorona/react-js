// NOTA (clase 6): el buscador sale de App.jsx y pasa a ser su propio componente.
// Por ahora es solo visual: los inputs no guardan lo que se escribe y el botón
// no hace nada. Eso llega con useState y eventos en las clases siguientes.
import { useState } from "react";

export function SearchBar() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSearchedCity(city.trim());
  }

  return (
    <>
      <form className="search-section" onSubmit={handleSubmit}>
        <label>
          Ciudad
          <input 
          type="text" 
          placeholder="Santiago, Chile" 
          value={city}
          onChange={(event) => setCity(event.target.value)} />
        </label>
        <label>
          Tipo
          <input type="text" placeholder="Apartamento" />
        </label>
        <label>
          Huéspedes
          <input type="number" placeholder="2" />
        </label>
        <button>Buscar</button>
      </form>
      <p className="current-search">
        Resultados de búsqueda: <strong>{searchedCity || "ninguna ciudad"}</strong>.
      </p>
    </>
  );
}
