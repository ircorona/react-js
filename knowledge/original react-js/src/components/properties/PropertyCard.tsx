// NOTA (clases 5, 6 y 7): la pieza de Lego reutilizable. Muestra UN alojamiento.
// Clase 5: tenía el contenido fijo, así que todas las tarjetas eran iguales.
// Clase 6: recibe props y cada tarjeta muestra datos distintos.
// Clase 7: suma la prop type.
//
// Las llaves en los parámetros son desestructuración: React entrega un solo
// objeto props y de él se sacan estos valores. Las props son de solo lectura.
import type { Property } from "../../types/property";

// Recibe todos los campos de Property menos id (la key no llega al hijo).
type PropertyCardProps = {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    // Un cambio aquí se refleja en TODAS las tarjetas a la vez.
    <article className="property-card">
      {/* {valor} inserta una variable en el JSX. title se usa dos veces. */}
      <img src={property.image} alt={property.title} />
      <div className="property-card-content">
        <h4>{property.title}</h4>
        <p>{property.location}</p>
        <p>{property.type || "Tipo no especificado"}</p>
        {/* El $ es texto normal y {price} es el valor: no es un template
            literal. El precio llega como número y el símbolo vive solo aquí. */}
        <strong>${property.price} / noche</strong>
      </div>
    </article>
  );
}
