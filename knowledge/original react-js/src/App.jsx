import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { PropertyList } from "./components/PropertyList";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <Hero />

        <section className="search-box">
          <label>
            Ciudad
            <input type="text" placeholder="Santiago, Chile" />
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
        </section>

        <PropertyList />
      </main>
    </div>
  );
}

export default App;
