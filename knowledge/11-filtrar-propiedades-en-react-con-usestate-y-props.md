# Filtrar propiedades en React con useState y props

> Clase 11 de 18 en Platzi. El código corresponde a la rama [`clase-10/filtro-basico`](https://github.com/platzi/react-js/tree/clase-10/filtro-basico) del repo de Platzi.

## Resumen

Hasta ahora el `SearchBar` guardaba lo que escribía el usuario, pero ese valor no salía del componente. En esta clase el texto buscado **sube a `App`**, y `App` lo usa para filtrar el listado. Es el primer flujo completo de la app: escribir, buscar y ver cómo cambian las cards.

Tres cambios:

1. `App` crea el estado `search`.
2. `App` calcula `filteredProperties` y se lo pasa a `PropertyList`.
3. `SearchBar` recibe la función `onSearch` y la llama al buscar y al limpiar.

---

## El problema: el estado estaba en el lugar equivocado

`SearchBar` y `PropertyList` son **hermanos**. Un componente no puede leer el estado de su hermano, así que el texto buscado tiene que vivir en el padre que ambos comparten: `App` [00:35].

```
App                    ← aquí vive search
├── SearchBar          ← lo cambia (recibe onSearch)
└── PropertyList       ← lo usa (recibe la lista ya filtrada)
```

Este patrón se llama **subir el estado** (lifting state up). Es el mismo movimiento de la clase 8, cuando los datos pasaron de `PropertyList` a `App`.

---

## Paso 1: el estado en App [01:07]

```jsx
// src/App.jsx
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  ...
}
```

`search` empieza vacío: sin búsqueda, se muestran todas las propiedades.

---

## Paso 2: la lista filtrada [01:36]

```jsx
const filteredProperties = properties.filter((property) => {
  const searchText = search.toLowerCase();

  return (
    property.title.toLowerCase().includes(searchText) ||
    property.location.toLowerCase().includes(searchText) ||
    property.type.toLowerCase().includes(searchText)
  );
});
```

| Pieza | Qué hace |
| --- | --- |
| `filter` | Devuelve un array nuevo con los elementos que pasan la prueba. No modifica `properties` |
| `toLowerCase()` | Pasa ambos textos a minúsculas para que "BOGOTÁ" y "bogotá" coincidan |
| `includes(texto)` | `true` si el texto aparece en cualquier parte: "bog" encuentra "Bogotá, Colombia" |
| `\|\|` | Basta con que coincida **uno** de los tres campos: título, ubicación o tipo |

Y se cambia lo que recibe la lista [02:22]:

```jsx
<PropertyList properties={filteredProperties} />
```

### Por qué no es otro estado

`filteredProperties` es una constante normal, no un `useState`. Se puede **calcular** a partir de `properties` y `search`, así que no hace falta guardarla. Cada vez que cambia `search`, `App` se vuelve a ejecutar y la lista se recalcula sola.

> Regla práctica: si un valor se puede calcular a partir de props o de otro estado, no lo guardes en un estado.

### Por qué con el buscador vacío salen todas

`"cualquier texto".includes("")` siempre da `true`. Con `search` vacío, las siete propiedades pasan el filtro.

---

## Paso 3: pasar una función como prop [02:50]

```jsx
// src/App.jsx
<SearchBar onSearch={setSearch} />
```

Las props van de padre a hijo. Para que el hijo le avise algo al padre, el padre le entrega una **función**, y el hijo la llama.

| Dirección | Cómo viaja |
| --- | --- |
| Padre a hijo | Datos por props: `properties={filteredProperties}` |
| Hijo a padre | El hijo llama a una función que recibió por props: `onSearch("bogotá")` |

Se pasa `setSearch` sin paréntesis: se entrega la función, no se ejecuta. El nombre `onSearch` sigue la convención de los eventos (`onClick`, `onSubmit`): describe **qué pasó**, no qué hará el padre con eso.

---

## Paso 4: SearchBar llama a onSearch

```jsx
// src/components/SearchBar.jsx
export function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const nextSearch = city.trim();
    setSearchedCity(nextSearch);
    onSearch(nextSearch);
  }

  function handleClearSearch() {
    setCity("");
    setSearchedCity("");
    onSearch("");
  }
  ...
}
```

* `nextSearch` guarda `city.trim()` una sola vez y se usa en los dos lugares [04:05].
* No se puede escribir `onSearch(searchedCity)` justo después de `setSearchedCity(...)`: el estado no cambia en esa misma línea, cambia en el siguiente render. Por eso se usa la variable.

### El bug al limpiar [05:05]

Al principio, la × vaciaba `city` y `searchedCity`, pero el listado seguía filtrado. `handleClearSearch` no le avisaba a `App`, así que `search` conservaba "bogotá". La solución es la línea `onSearch("")` [05:35].

Lección: cuando un dato vive en dos lugares (aquí `searchedCity` y `search`), hay que actualizar ambos **siempre**. Olvidar uno deja la interfaz desincronizada.

---

## El ciclo completo

```
Escribes "bogotá"  →  onChange  →  setCity            (solo cambia el input)

Clic en Buscar     →  handleSubmit
                        ├─ setSearchedCity("bogotá")   (cambia el texto de resultados)
                        └─ onSearch("bogotá")          (es setSearch de App)
                              ↓
                      App se vuelve a renderizar
                              ↓
                      filteredProperties se recalcula
                              ↓
                      PropertyList recibe 1 propiedad
```

Si el filtro no encuentra nada, `PropertyList` recibe un array vacío y muestra el estado vacío de la clase 8. Ese `if (properties.length === 0)` ya estaba listo para este caso.

---

## Cuidados

* **Los acentos sí importan.** El resumen de Platzi dice que buscar sin acento funciona porque se compara en minúsculas, pero no es así: `toLowerCase()` no quita tildes. "bogota" **no** encuentra "Bogotá, Colombia". Para ignorar acentos hay que normalizar los dos textos:

  ```js
  const limpiar = (texto) =>
    texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  ```

* **Si a una propiedad le falta `type`, la app se rompe.** `undefined.toLowerCase()` lanza un error. En la clase 8 se comentó un `type` para probar el texto alternativo; con este filtro eso ya no se puede sin protegerlo: `(property.type || "").toLowerCase()`.
* El filtro se aplica al presionar **Buscar**, no mientras se escribe, porque `onSearch` solo se llama en el submit.
* Los inputs de Tipo y Huéspedes siguen sin estar conectados.

---

## Preguntas rápidas

**¿Por qué el estado de búsqueda vive en App?**
Porque lo necesitan dos hermanos: `SearchBar` lo cambia y `PropertyList` depende de él. El estado sube al padre común.

**¿Para qué sirve pasar una función como prop?**
Para que el hijo pueda actualizar el estado del padre.

**¿Por qué el listado no volvía al borrar?**
Porque la función de limpieza no llamaba a `onSearch("")` y el estado de `App` seguía con el texto anterior.

---

## Siguiente paso

Profundizar en el patrón de los **componentes controlados**.

**Desafío:** agregar un tercer criterio de búsqueda al filtro (el filtro ya revisa título, ubicación y tipo; el precio es un buen candidato).
