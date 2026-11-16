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
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SearchBar } from "./components/SearchBar";
import { PropertyList } from "./components/PropertyList";

// Un componente es una función con nombre en Mayúscula que devuelve JSX.
function App() {
  return (
    // JSX debe devolver UN solo elemento raíz: este <div> envuelve todo.
    // En JSX se escribe className en lugar de class.
    <div className="app">
      {/* Un componente se usa como una etiqueta que se cierra sola */}
      <Header />

      <main className="main-content">
        <Hero />

        <SearchBar />
        <PropertyList />
      </main>
    </div>
  );
}

// export default  ->  se importa SIN llaves: import App from './App.jsx'
export default App;
