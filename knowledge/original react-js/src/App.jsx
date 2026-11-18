// NOTA (clase 5): App es la base donde se conecta todo. Antes tenía la página
// entera en un solo archivo (clase 4); ahora solo arma las piezas.
//
// Jerarquía:
//   App
//   ├── Header
//   ├── Hero
//   ├── SearchBar
//   └── PropertyList
//       └── PropertyCard   (hijo de PropertyList, por eso no se importa aquí)

// export function X  ->  se importa CON llaves: import { X }
import { useState, useEffect } from "react";

import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SearchBar } from "./components/SearchBar";
import { PropertyList } from "./components/PropertyList";
import {properties} from "./data/properties"; // datos mock (simulan una API)

// Un componente es una función con nombre en Mayúscula que devuelve JSX.
function App() {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [propertiesFromAPI, setPropertiesFromAPI] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timerID = setTimeout(() => {
     try {
       setPropertiesFromAPI(properties);
      // throw new Error("Error al cargar las propiedades");
     } catch (error) {
      setError("Error al cargar las propiedades");
     }  finally {
      setIsLoading(false);
     }
    }, 1000);

    return () => clearTimeout(timerID);

  }, []);

  const filteredProperties = propertiesFromAPI.filter((property) => {
    const searchText = search.toLowerCase();

    return (
      property.title.toLowerCase().includes(searchText) ||
      property.location.toLowerCase().includes(searchText) ||
      property.type.toLowerCase().includes(searchText)
    );
  });
  return (
    // JSX debe devolver UN solo elemento raíz: este <div> envuelve todo.
    // En JSX se escribe className en lugar de class.
    <div className="app">
      {/* Un componente se usa como una etiqueta que se cierra sola */}
      <Header />

      <main className="main-content">
        <Hero />

        <SearchBar 
          value={city}
          searchValue={search}
          onChange={setCity}
          onSearch={setSearch}
          onClear={() => {
            setCity("");
            setSearch("");
          }}
        />
        {isLoading && <p>Cargando propiedades...</p>}
        {error && <p className="error">{error}</p>}

        {!isLoading && !error && (
          <PropertyList properties={filteredProperties} />
        )}
      </main>
    </div>
  );
}

// export default  ->  se importa SIN llaves: import App from './App.jsx'
export default App;
