// NOTA (clase 5): sección destacada bajo el header. Contenido fijo, sin props.
// La foto de fondo no está aquí: viene de la clase .hero en index.css.
export function Hero() {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Clon educativo estilo Platzi-host</p>
        <h2>Encuentra tu próximo alojamiento</h2>
        <p>Explora departamentos, casas y cabañas para tu próxima aventura.</p>
      </div>
    </section>
  );
}
