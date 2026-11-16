// NOTA (clase 6): el buscador sale de App.jsx y pasa a ser su propio componente.
// Por ahora es solo visual: los inputs no guardan lo que se escribe y el botón
// no hace nada. Eso llega con useState y eventos en las clases siguientes.
export function SearchBar() {
  return (
    <section className="search-section">
      <label>
        Ciudad
        {/* En JSX las etiquetas sin cierre (<input>, <img>) terminan en /> */}
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
  );
}
