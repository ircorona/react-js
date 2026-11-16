# Renderizar listas en React con map

> Clase 7 de 18 en Platzi. El código corresponde a la rama [`clase-06/datos-mock-y-listas`](https://github.com/platzi/react-js/tree/clase-06/datos-mock-y-listas) del repo de Platzi.

## Resumen

Una app como Airbnb no muestra una propiedad, muestra muchas. En lugar de escribir cada `PropertyCard` a mano, los datos se guardan en un **array** dentro de un archivo aparte y se convierten en componentes con el método **`map`**. El listado pasa a generarse desde datos, no desde componentes escritos manualmente.

---

## Datos mock

* Son datos de prueba que **simulan** lo que más adelante vendría de una API o una base de datos.
* Viven dentro del proyecto, así puedes desarrollar la interfaz sin depender de un backend.
* En el curso están en `src/data/properties.js` [00:35].

```js
// src/data/properties.js
export const properties = [
  {
    id: 1,
    title: "Apartamento moderno",
    location: "Santiago, Chile",
    price: 75,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    type: "Apartamento"
  },
  {
    id: 2,
    title: "Casa frente al lago",
    location: "Bariloche, Argentina",
    price: 120,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    type: "Casa"
  },
  // ...el resto de propiedades
];
```

### Campos de cada propiedad

| Campo | Para qué |
| --- | --- |
| `id` | No se muestra, pero React lo necesita para diferenciar cada elemento |
| `title` | Nombre de la propiedad |
| `location` | Dónde se encuentra |
| `price` | Precio por noche, como número |
| `image` | Foto de la propiedad |
| `type` | Apartamento, Casa, Loft, Cabaña, Estudio o Villa [01:30] |

`id` y `type` son nuevos respecto a la clase anterior.

---

## El hijo recibe la prop nueva

Para mostrar el tipo, `PropertyCard` suma `type` a sus props:

```jsx
// src/components/PropertyCard.jsx
export function PropertyCard({ title, location, price, image, type }) {
  return (
    <article className="property-card">
      <img src={image} alt={title} />
      <div className="property-card-content">
        <h4>{title}</h4>
        <p>{location}</p>
        <p>{type}</p>
        <strong>${price} / noche</strong>
      </div>
    </article>
  );
}
```

---

## Renderizar el array con map

En `PropertyList` se importa el array y se recorre con `map`:

```jsx
// src/components/PropertyList.jsx
import { properties } from "../data/properties";
import { PropertyCard } from "./PropertyCard";

export function PropertyList() {
  return (
    <section className="properties-section">
      <h3>Alojamientos disponibles</h3>
      <div className="properties-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            title={property.title}
            location={property.location}
            price={property.price}
            image={property.image}
            type={property.type}
          />
        ))}
      </div>
    </section>
  );
}
```

Cómo leerlo:

* `properties` es una lista de objetos. En cada vuelta, el objeto actual se llama `property`.
* Cada valor se saca con punto: `property.title`, `property.price`, etc.
* `map` **devuelve un array nuevo**: un `<PropertyCard />` por cada objeto. React sabe pintar un array de elementos.
* Las llaves `{ }` alrededor del `map` son las que permiten escribir JavaScript dentro del JSX.
* La flecha usa paréntesis `=> ( ... )`, no llaves. Con llaves `=> { ... }` haría falta escribir `return`.

Al guardar, el listado muestra todas las propiedades leyéndolas del archivo mock [02:50].

### Antes y después

| | Clase anterior | Esta clase |
| --- | --- | --- |
| Datos | Escritos dentro de `PropertyList` | En `src/data/properties.js` |
| Tarjetas | Un `<PropertyCard />` escrito por cada una | Un solo `<PropertyCard />` dentro de `map` |
| Agregar una propiedad | Copiar y editar un componente | Agregar un objeto al array |

---

## La prop key

Cada elemento generado dentro de un `map` debe estar identificado como único. Para eso existe `key`, una prop especial de React [03:40]:

```jsx
<PropertyCard key={property.id} ... />
```

* Con `key`, React distingue cada tarjeta y actualiza **solo lo que cambia**.
* Sin una `key` única, React muestra una advertencia en la consola y puede renderizar mal al agregar, quitar o reordenar elementos.
* `key` no llega al componente hijo: `PropertyCard` no puede leerla como prop.
* Debe ser estable y única entre hermanos. Un `id` de los datos es lo ideal; el índice del array no es buena idea si la lista cambia de orden.

---

## Escalabilidad

Para agregar una propiedad ya no se tocan los componentes: se copia un objeto en `properties.js`, se cambia un valor y aparece un ítem más [04:30]. En la rama de Platzi quedó ese séptimo objeto de la demo, "Villa con piscina 2", por eso el listado final tiene siete tarjetas.

Ventajas de separar datos y componentes:

1. El proyecto queda ordenado.
2. Menos código repetido dentro de los componentes.
3. Agregar propiedades solo requiere actualizar el array.

---

## Preguntas rápidas

**¿Qué son los datos mock?**
Datos de prueba que imitan la respuesta de una API o base de datos.

**¿Para qué sirve map en React?**
Recorre un array y devuelve un elemento nuevo por cada ítem. Convierte una lista de datos en una lista de componentes.

**¿Por qué React pide key?**
Porque necesita distinguir cada elemento de la lista para actualizar solo lo que cambia.

---

## Para reforzar

`array` y `map` son JavaScript puro, no React. Si suenan extraños, conviene repasar el curso de fundamentos de JavaScript.

**Ejercicio:** agregar una propiedad propia al array y ver que aparece sin tocar ningún componente.
