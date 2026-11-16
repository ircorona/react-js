# Cómo pasar props de padre a hijo en React

> Clase 6 de 18 en Platzi. El código corresponde a la rama [`clase-05/props`](https://github.com/platzi/react-js/tree/clase-05/props) del repo de Platzi.

## Resumen

Las **props** son la forma en que React comunica componentes: un componente padre envía datos a un componente hijo. Gracias a ellas, `PropertyCard` deja de mostrar siempre el mismo apartamento y cada tarjeta recibe su propio título, imagen, ubicación y precio, sin duplicar código.

---

## Qué son las props

* Datos que un **padre** envía a un **hijo** [00:20].
* Se escriben parecido a los atributos de HTML.
* La diferencia: no solo aceptan texto, sino **cualquier valor de JavaScript** (números, objetos, arrays, funciones).

| | Atributo HTML | Prop de React |
| --- | --- | --- |
| Sintaxis | `title="Hola"` | `title="Hola"` o `price={75}` |
| Valores | Solo texto | Cualquier valor de JavaScript |
| Dirección | No aplica | Siempre de padre a hijo |

---

## Punto de partida

`App.jsx` ya está organizado en cuatro componentes [01:15]:

```jsx
function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Hero />
        <SearchBar />
        <PropertyList />
      </main>
    </div>
  );
}
```

### Jerarquía padre e hijo

```
App
├── Header
├── Hero
├── SearchBar
└── PropertyList      padre: envía las props
    └── PropertyCard  hijo: las recibe
```

`PropertyCard` es hijo de `PropertyList`, por eso no aparece en `App.jsx` [01:45]. El problema: si repites la misma card, las tres tarjetas muestran el mismo apartamento [03:00]. Lo que se necesita son tres apartamentos distintos.

---

## Paso 1: el hijo recibe las props

Junto a la definición de la función se abren llaves y se declaran las props [05:20]:

```jsx
// src/components/PropertyCard.jsx
export function PropertyCard({ title, location, price, image }) {
  return (
    <article className="property-card">
      <img src={image} alt={title} />
      <div className="property-card-content">
        <h4>{title}</h4>
        <p>{location}</p>
        <strong>${price} / noche</strong>
      </div>
    </article>
  );
}
```

* Las llaves en `({ title, location, price, image })` son **desestructuración**: React pasa un solo objeto `props` y de él se sacan los cuatro valores.
* Dentro del JSX, `{title}` inserta el valor de la variable.
* La misma prop se puede usar varias veces: `title` va en el `alt` de la imagen y en el `<h4>`.

> Pista del editor: una prop recién declarada se ve en un color tenue mientras no la uses. Al usarla, se resalta [06:00].

### Por qué falla si el padre no envía nada

Al guardar en este punto las tarjetas quedan vacías [06:50]: el hijo ya espera props, pero el padre todavía no las envía. Solo se ve lo que está escrito literalmente, como `/ noche`.

---

## Paso 2: el padre envía las props

```jsx
// src/components/PropertyList.jsx
import { PropertyCard } from "./PropertyCard";

export function PropertyList() {
  return (
    <section className="properties-section">
      <h3>Alojamientos disponibles</h3>
      <div className="properties-grid">
        <PropertyCard
          title="Nuevo apartamento"
          location="Santiago, Chile"
          price={75}
          image="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
        />
        <PropertyCard
          title="Casa frente al lago"
          location="Bariloche, Argentina"
          price={120}
          image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        />
        <PropertyCard
          title="Loft en el centro"
          location="Bogotá, Colombia"
          price={65}
          image="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
        />
      </div>
    </section>
  );
}
```

* Texto entre comillas: `title="Nuevo apartamento"` [08:00].
* Cualquier otro valor entre llaves: `price={75}` es un número, no un string.
* Un mismo componente, tres resultados distintos [09:30].

---

## Estandarizar el precio

El error de la clase: la primera tarjeta recibía `"$75"` (string con símbolo) y las otras `120` y `65`. Resultado: una mostraba el dólar y las demás no.

La solución [10:15]:

1. El padre pasa el precio como **número puro**: `price={75}`.
2. El símbolo vive **una sola vez** en el hijo: `${price} / noche`.

| | Antes | Después |
| --- | --- | --- |
| Padre | `price="$75"` | `price={75}` |
| Hijo | `{price} / noche` | `${price} / noche` |

> En `${price}` dentro de JSX, el `$` es solo texto y `{price}` es el valor. No es un template literal de JavaScript.

Este tipo de inconsistencia es lo que **TypeScript** previene: si el precio espera un número y recibe un texto, marca el error de inmediato [09:00]. Se ve más adelante en el curso.

---

## Detalles a recordar

* Las props van en **una sola dirección**: de padre a hijo.
* Las props son de **solo lectura**: el hijo las usa, no las modifica.
* El nombre de la prop en el padre (`title=`) debe coincidir con el que desestructura el hijo (`{ title }`).

---

## Preguntas rápidas

**¿Qué son las props?**
Datos que un componente padre envía a un hijo. Se parecen a los atributos de HTML, pero aceptan cualquier valor de JavaScript.

**¿Por qué mi prop se ve gris en el editor?**
Porque está declarada pero todavía no se usa dentro del componente.

**¿Por qué mis tarjetas salen vacías?**
Porque el hijo ya espera props pero el padre aún no las envía.

---

## Siguiente paso

Escribir cada tarjeta a mano no refleja una aplicación real. Lo siguiente es ordenar los datos en un **array** y renderizar la lista con `map`.
