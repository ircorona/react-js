// NOTA (clases 5, 6 y 7): la pieza de Lego reutilizable. Muestra UN alojamiento.
// Clase 5: tenía el contenido fijo, así que todas las tarjetas eran iguales.
// Clase 6: recibe props y cada tarjeta muestra datos distintos.
// Clase 7: suma la prop type.
//
// Las llaves en los parámetros son desestructuración: React entrega un solo
// objeto props y de él se sacan estos valores. Las props son de solo lectura.
export function PropertyCard({ title, location, price, image, type }) {
  return (
    // Un cambio aquí se refleja en TODAS las tarjetas a la vez.
    <article className="property-card">
      {/* {valor} inserta una variable en el JSX. title se usa dos veces. */}
      <img src={image} alt={title} />
      <div className="property-card-content">
        <h4>{title}</h4>
        <p>{location}</p>
        <p>{type}</p>
        {/* El $ es texto normal y {price} es el valor: no es un template
            literal. El precio llega como número y el símbolo vive solo aquí. */}
        <strong>${price} / noche</strong>
      </div>
    </article>
  );
}
