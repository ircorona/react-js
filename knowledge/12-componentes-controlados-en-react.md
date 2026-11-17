# Componentes controlados en React

> Clase 12 de 18 en Platzi. El código corresponde a la rama [`clase-11/componentes-controlados`](https://github.com/platzi/react-js/tree/clase-11/componentes-controlados) del repo de Platzi.

## Resumen

Un **componente controlado** es un input que saca su valor del estado y actualiza ese estado en cada cambio. En esta clase el patrón se lleva un paso más lejos: **todos** los estados del buscador suben a `App`, y `SearchBar` se queda sin `useState`. Solo recibe props y avisa de eventos.

La app hace lo mismo que antes. Lo que cambia es dónde vive la lógica. Esto es un **refactor**: mejorar el código sin cambiar el comportamiento.

---

## Antes y después

| | Clase 11 | Clase 12 |
| --- | --- | --- |
| Estados en `App` | `search` | `city` y `search` |
| Estados en `SearchBar` | `city` y `searchedCity` | Ninguno |
| Props de `SearchBar` | `onSearch` | `value`, `searchValue`, `onChange`, `onSearch`, `onClear` |
| `import { useState }` en `SearchBar` | Sí | No |
| Función de limpiar | `handleClearSearch` en `SearchBar` | `onClear` definida en `App` |

### El estado duplicado desaparece

En la clase 11 el texto buscado vivía en dos lugares: `searchedCity` en `SearchBar` y `search` en `App`. Por eso apareció el bug de la ×, que limpiaba uno y olvidaba el otro.

Ahora solo existe `search`. Ya no hay nada que sincronizar, así que ese tipo de bug no puede ocurrir. A esto se le llama tener una **única fuente de verdad**.

---

## App.jsx: el dueño del estado [00:47]

```jsx
// src/App.jsx
function App() {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");

  const filteredProperties = properties.filter(...);   // igual que antes

  return (
    ...
    <SearchBar
      value={city}
      searchValue={search}
      onChange={setCity}
      onSearch={setSearch}
      onClear={() => {
        setCity("");
        setSearch("");
      }}
    />
    <PropertyList properties={filteredProperties} />
  );
}
```

| Estado | Qué guarda | Cuándo cambia |
| --- | --- | --- |
| `city` | Lo que se está escribiendo | En cada tecla |
| `search` | Lo que ya se buscó; es lo que usa el filtro | Al presionar Buscar o la × |

Siguen siendo dos ideas distintas, igual que en la clase 9. Solo cambiaron de casa.

### Las cinco props [01:20]

| Prop | Tipo | Valor en `App` | Para qué |
| --- | --- | --- | --- |
| `value` | Dato | `city` | Lo que muestra el input |
| `searchValue` | Dato | `search` | El texto de "Resultados de búsqueda" |
| `onChange` | Función | `setCity` | Avisar que el usuario escribió |
| `onSearch` | Función | `setSearch` | Avisar que el usuario buscó |
| `onClear` | Función | Flecha que vacía ambos | Avisar que el usuario limpió |

Dos props bajan datos y tres suben eventos.

> En la rama de Platzi la segunda prop se llama `searchedValue`. En el resumen de la clase y en mi código es `searchValue`. Cualquier nombre sirve, siempre que sea **el mismo** en `App` y en `SearchBar`.

### onClear [02:39]

```jsx
onClear={() => {
  setCity("");
  setSearch("");
}}
```

Es una función flecha escrita directamente en el JSX. Las llaves de afuera son las del JSX; las de adentro son el cuerpo de la función. También se podría declarar arriba como `function handleClear()` y pasar `onClear={handleClear}`.

---

## SearchBar.jsx: solo lee y avisa

```jsx
// src/components/SearchBar.jsx
export function SearchBar({ value, searchValue, onChange, onSearch, onClear }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch(value.trim());
  }

  return (
    <>
      <form className="search-section" onSubmit={handleSubmit}>
        <label>
          Ciudad
          <span className="city-input-wrapper">
            <input
              type="text"
              placeholder="Santiago, Chile"
              value={value}
              onChange={(event) => onChange(event.target.value)}
            />
            {(value || searchValue) && (
              <button className="clear-city-button" type="button" onClick={onClear}>
                ×
              </button>
            )}
          </span>
        </label>
        ...
        <button type="submit">Buscar</button>
      </form>
      <p className="current-search">
        Resultados de búsqueda: <strong>{searchValue || "Sin búsqueda"}</strong>
      </p>
    </>
  );
}
```

### Qué se reemplazó [03:35]

| Antes | Ahora |
| --- | --- |
| `value={city}` | `value={value}` |
| `setCity(event.target.value)` | `onChange(event.target.value)` |
| `(city \|\| searchedCity) &&` | `(value \|\| searchValue) &&` |
| `onClick={handleClearSearch}` | `onClick={onClear}` |
| `{searchedCity \|\| ...}` | `{searchValue \|\| ...}` [05:16] |
| `handleSubmit` con tres líneas | `preventDefault` y `onSearch(value.trim())` [02:20] |

* Al borrar los `useState`, la pantalla queda en blanco hasta reemplazar todas las referencias: se están usando variables que ya no existen. El editor las marca una por una.
* `handleSubmit` **sí se queda** en `SearchBar`, porque `preventDefault` y `trim` son detalles del formulario, no de `App`.
* El `onChange` del input recibe un **evento**, pero el `onChange` de las props recibe un **texto**. El hijo saca `event.target.value` y le entrega a `App` solo el valor. Así `App` no necesita saber que adentro hay un `<input>`.

---

## El flujo de datos

```
                 App  (city, search)
                  │
     props bajan  │   ▲  eventos suben
                  ▼   │
               SearchBar
   value, searchValue │ onChange, onSearch, onClear
```

```
Tecla   →  onChange("bar")       →  setCity    →  App repinta  →  el input muestra "bar"
Buscar  →  onSearch("bariloche") →  setSearch  →  App repinta  →  el listado se filtra
×       →  onClear()             →  ambos a "" →  App repinta  →  vuelve todo
```

Los datos van en una sola dirección, de arriba hacia abajo. Por eso el flujo es predecible: para saber por qué la pantalla muestra algo, basta con mirar el estado de `App`.

---

## Controlado y no controlado

| | Controlado | No controlado |
| --- | --- | --- |
| Quién guarda el valor | El estado de React | El propio input en el DOM |
| Props del input | `value` y `onChange` | Ninguna de las dos |
| Ejemplo en el proyecto | Ciudad | Tipo y Huéspedes, por ahora |

El input de Ciudad ya era controlado desde la clase 9, con `value={city}` y `onChange`. Lo nuevo es que ahora todo `SearchBar` está controlado por su padre.

---

## Ventajas y costo

* **Ventaja:** `App` conoce el texto en todo momento. Podría validarlo, limpiarlo desde otro botón o usarlo en otro componente.
* **Ventaja:** `SearchBar` es más fácil de reutilizar y de probar, porque no esconde nada adentro.
* **Costo:** más props que escribir, y `App` se vuelve a renderizar en cada tecla. En una app de este tamaño no se nota.
* No todo estado debe subir. La regla es dejarlo en el componente **más cercano** que lo necesite, y subirlo solo cuando otro componente también lo requiere.

---

## Detalles a recordar

* El filtro sigue aplicándose al presionar **Buscar**, no mientras se escribe: el listado depende de `search`, no de `city`.
* Si `App` olvida pasar `onChange`, el input queda bloqueado (tiene `value` pero nadie cambia el estado). Si olvida pasar `value`, `value.trim()` lanza un error al buscar.
* Siguen pendientes de clases anteriores: los acentos ("bogota" no encuentra "Bogotá") y el error si a una propiedad le falta `type`.

---

## Preguntas rápidas

**¿Qué es un componente controlado?**
Un input cuyo valor viene del estado y que actualiza ese estado en cada cambio. El estado es la única fuente de verdad.

**¿Cómo limpio un formulario controlado?**
Con una sola función que llama al `set` de cada estado con su valor vacío, y se pasa al hijo como `onClear`.

**¿Dónde debe vivir el estado?**
En el padre común de los componentes que lo necesitan. Los hijos reciben valores y eventos por props.

---

## Desafío

1. Sacar el **tipo** del filtro actual y conectarlo al input de Tipo, con su propio estado.
2. Crear el filtro de **huéspedes** con la misma lógica.

Pistas:

* Cada input nuevo necesita su par de props, por ejemplo `typeValue` y `onTypeChange`.
* Los criterios se combinan con `&&`: la propiedad debe cumplir ciudad **y** tipo **y** huéspedes.
* `properties.js` todavía no tiene un campo de huéspedes. Hay que agregarlo a cada propiedad, por ejemplo `guests: 4`.
* El input de huéspedes entrega texto. Hay que convertirlo con `Number(...)` antes de comparar.
* `onClear` debería vaciar también los estados nuevos.

## Siguiente paso

`useEffect`, para simular la carga inicial de las propiedades.
