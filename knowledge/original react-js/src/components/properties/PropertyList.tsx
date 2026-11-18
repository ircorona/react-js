// NOTA (clases 6 y 7): PropertyList es el PADRE de PropertyCard.
// Clase 6: enviaba las props escribiendo tres <PropertyCard /> a mano.
// Clase 7: los datos viven en un array aparte y las tarjetas se generan con map.
import { PropertyCard } from "./PropertyCard";
import type { Property } from "../../types/property";

interface PropertyListProps {
  properties: Property[];
}

export function PropertyList({ properties }: PropertyListProps) {
  if (properties.length === 0) {
    return (
      <section className="properties-section">
        <h3>Alojamientos disponibles</h3>
        <p>No hay alojamientos disponibles.</p>
      </section>
    )
  }
  return (
    <section className="properties-section">
      <h3>Alojamientos disponibles</h3>
      <div className="properties-grid">
        {/* Las llaves { } permiten escribir JavaScript dentro del JSX.
            map recorre el array y devuelve un <PropertyCard /> por cada objeto.
            La flecha usa paréntesis => ( ... ), así el JSX se devuelve sin
            escribir return. */}
        {properties.map((property) => (
          <PropertyCard
            // key: prop especial de React. Identifica cada elemento de la lista
            // para actualizar solo lo que cambia. Debe ser única y estable.
            // No llega al hijo: PropertyCard no puede leerla.
            key={property.id}
            // Props: datos que viajan del padre al hijo. PropertyCard espera UNA
            // sola prop llamada property, con el objeto completo.
            property={property}
          />
        ))}
      </div>
    </section>
  );
}