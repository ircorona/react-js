// NOTA (clase 5): componente independiente para la barra superior.
// No recibe props porque su contenido es siempre el mismo.
export function Header() {
  return (
    <header className="header">
      <h1>Platzi-host</h1>
      <nav>
        <a href="#">Alojamientos</a>
        <a href="#">Experiencias</a>
        <a href="#">Anfitriones</a>
      </nav>
    </header>
  );
}
