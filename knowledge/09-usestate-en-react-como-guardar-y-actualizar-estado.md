# useState en React: cómo guardar y actualizar estado

> Clase 9 de 18 en Platzi. El código corresponde a la rama [`clase-08/usestate`](https://github.com/platzi/react-js/tree/clase-08/usestate) del repo de Platzi.

## Resumen

El **estado** es el lugar donde se guarda la información que cambia dentro de la interfaz. Sin él, un componente es solo HTML estático: escribes "Bogotá" en el buscador, presionas Buscar y no pasa nada. Con el hook **`useState`** el componente guarda datos, los actualiza y React vuelve a pintar la interfaz con el valor nuevo.

Este es el segundo pilar del curso: los **hooks**, que dan vida a los componentes.

---

## Qué es un hook

* Una **función** que permite a un componente manejar datos y comportamiento [00:38].
* React trae hooks nativos; no hay que instalar nada.
* Todos empiezan con `use`. `useState` es uno de los dos que más se usan (el otro es `useEffect`, más adelante).

---

## Fragment: un solo elemento padre

Al agregar un `<p>` junto al `<section>` aparece un error, porque un componente solo puede devolver **un elemento padre**. Dos soluciones:

| Opción | Efecto |
| --- | --- |
| Envolver en un `<div>` | Agrega un elemento extra al DOM que puede desordenar los estilos |
| Usar un Fragment `<> </>` | Agrupa sin renderizar nada visible |

```jsx
<>
  <form>...</form>
  <p>...</p>
</>
```

Si escribes la palabra completa `<Fragment>`, hay que importarla (`import { Fragment } from "react"`), o la app falla con "Fragment is not defined" [01:55]. La forma corta `<> </>` no necesita import.

---

## useState paso a paso

```jsx
import { useState } from "react";            // 1. importar

export function SearchBar() {
  const [city, setCity] = useState("");      // 2. definir, al inicio del componente
  ...
  return <strong>{city}</strong>;            // 3. usar
}
```

Anatomía de la línea:

```
const [city,  setCity]  = useState("");
       │      │                    │
       │      │                    └── valor inicial
       │      └── función que cambia el valor
       └── valor actual
```

* `useState` devuelve un array de dos elementos; los corchetes los **desestructuran**.
* La convención de nombres es `algo` y `setAlgo`.
* Si el valor inicial fuera `"Bogotá"`, la interfaz mostraría "Bogotá" desde el primer render [03:40].

### La regla de oro

El estado solo se cambia con su función `set`. Al llamarla, React **vuelve a renderizar** el componente con el valor nuevo.

```jsx
city = "Bogotá";      // MAL: React no se entera y la pantalla no cambia
setCity("Bogotá");    // BIEN: actualiza el estado y repinta
```

---

## Dos estados en un mismo componente

`SearchBar` maneja dos ideas distintas:

| Estado | Qué guarda | Cuándo cambia |
| --- | --- | --- |
| `city` | Lo que se está escribiendo | En cada tecla |
| `searchedCity` | Lo que ya se buscó | Solo al presionar Buscar |

Separarlos evita confundir lo que se escribe con lo que se confirma: puedes seguir editando el input después de una búsqueda sin que cambie el resultado mostrado.

---

## Conectar el estado con el formulario

```jsx
// src/components/SearchBar.jsx
import { useState } from "react";

export function SearchBar() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSearchedCity(city.trim());
  }

  return (
    <>
      <form className="search-section" onSubmit={handleSubmit}>
        <label>
          Ciudad
          <input
            type="text"
            placeholder="Santiago, Chile"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
        ...
        <button>Buscar</button>
      </form>
      <p className="current-search">
        Resultados de búsqueda: <strong>{searchedCity || "Sin búsqueda"}</strong>
      </p>
    </>
  );
}
```

### El formulario

* El `<section>` pasa a ser un `<form>` porque el formulario da acceso a **`onSubmit`**, que se dispara al presionar el botón o la tecla Enter.
* `handleSubmit` hace tres cosas:
  1. Recibe el evento.
  2. `event.preventDefault()` evita el comportamiento por defecto del navegador, que es **recargar la página**. Sin esto se perdería todo el estado.
  3. `setSearchedCity(city.trim())` guarda la ciudad sin espacios al inicio ni al final.
* Se escribe `onSubmit={handleSubmit}`, sin paréntesis. Con paréntesis la función se ejecutaría al renderizar en lugar de al enviar.

### El input

| Prop | Qué hace |
| --- | --- |
| `value={city}` | El input siempre muestra lo que hay en el estado |
| `onChange={...}` | En cada tecla lee `event.target.value` y lo guarda con `setCity` |

Juntas forman un **input controlado**: el estado de React es la única fuente de verdad del campo.

> Si pones `value` sin `onChange`, el input queda bloqueado: no se puede escribir en él, porque el estado nunca cambia.

### El ciclo completo

```
Tecla  →  onChange  →  setCity(valor)  →  React repinta  →  el input muestra city

Buscar →  onSubmit  →  setSearchedCity(city.trim())  →  React repinta  →  el <p> muestra searchedCity
```

Por eso, si el `<p>` mostrara `city`, cambiaría letra por letra. Como muestra `searchedCity`, solo cambia al presionar Buscar [07:30].

El `||` de la clase anterior reaparece: `{searchedCity || "Sin búsqueda"}` muestra el texto alternativo mientras el estado está vacío.

---

## Detalles a recordar

* Los hooks se llaman **al inicio del componente**, nunca dentro de un `if`, un bucle o una función anidada.
* Cada componente tiene **su propio estado**. Si hubiera dos `<SearchBar />`, cada uno guardaría su ciudad por separado.
* El estado es **local**: por ahora `PropertyList` no sabe qué ciudad se buscó. Para filtrar habrá que subir el estado a `App`, igual que se subieron los datos en la clase anterior.
* Los inputs de Tipo y Huéspedes todavía no están controlados.

---

## Otras formas de manejar estado

`useState` es la forma nativa y la más directa para empezar. Para casos avanzados existen:

| Herramienta | Para qué |
| --- | --- |
| Redux | Estado global complejo |
| Zustand | Estado global más simple |
| TanStack Query | Datos que vienen de servidores |

---

## Preguntas rápidas

**¿Qué es un hook?**
Una función de React que permite a un componente manejar datos y comportamiento.

**¿Para qué sirve setCity?**
Es la única forma correcta de actualizar el estado. Al llamarla, React vuelve a renderizar el componente.

**¿Diferencia entre value y onChange?**
`value` muestra el estado en el campo; `onChange` detecta lo que se escribe y actualiza el estado.

---

## Desafío

Agregar un tercer estado al `SearchBar`, por ejemplo para el tipo de alojamiento o la cantidad de huéspedes.
