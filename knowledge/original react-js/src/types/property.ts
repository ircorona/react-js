// Forma de un alojamiento. La usan los datos mock, el filtro y los componentes.
export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
  type?: string; // opcional: PropertyCard muestra "Tipo no especificado" si falta
}
