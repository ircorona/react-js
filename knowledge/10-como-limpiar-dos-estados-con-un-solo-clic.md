# Cómo limpiar dos estados con un solo clic

> Clase 10 de 18 en Platzi. El código corresponde a la rama [`clase-09/eventos`](https://github.com/platzi/react-js/tree/clase-09/eventos) del repo de Platzi.

## Resumen

Los **eventos** son la forma en que la aplicación reacciona a lo que hace el usuario. El `SearchBar` ya tenía dos, `onSubmit` y `onChange`. En esta clase se suma un tercero, `onClick`, en un botón que limpia la búsqueda: con un solo clic vacía los dos estados, `city` y `searchedCity`.

---

## Los tres eventos del SearchBar

| Evento | Dónde vive | Cuándo se dispara | Qué ejecuta |
| --- | --- | --- | --- |
| `onSubmit` | En el `<form>` | Al enviar el formulario: clic en el botón `type="submit"` o tecla Enter | `handleSubmit` |
| `onChange` | En el `<input>` | Cada vez que cambia el valor, letra por letra | `setCity(event.target.value)` |
| `onClick` | En el botón de limpiar | Al hacer clic en ese elemento | `handleClearSearch` |

### onSubmit [00:47]

* Vive en la etiqueta `<form>`, no en el botón.
* Solo funciona si el botón está **dentro del form** y es de tipo `submit`.
* En la clase se escribe `type="submit"` de forma explícita.

### onChange [01:04]

* Reacciona al cambio de valor del elemento donde está.
* En cada tecla ejecuta la función que guarda la ciudad en el estado [01:15].

---

## El problema

1. Escribes "Bogotá": se actualiza `city`.
2. Presionas Buscar: se actualiza `searchedCity` [01:44].
3. Borras el input: se vacía `city`, pero `searchedCity` **sigue en "Bogotá"** [02:07].

Para limpiar el resultado habría que borrar el texto y volver a enviar el formulario. Mala experiencia de usuario.

---

## La solución: un botón que limpia ambos

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

  function handleClearSearch() {
    setCity("");
    setSearchedCity("");
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
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            {(city || searchedCity) && (
              <button
                className="clear-city-button"
                type="button"
                onClick={handleClearSearch}
              >
                ×
              </button>
            )}
          </span>
        </label>
        ...
        <button type="submit">Buscar</button>
      </form>
      <p className="current-search">
        Resultados de búsqueda:{" "}
        <strong>{searchedCity || "Sin búsqueda"}</strong>
      </p>
    </>
  );
}
```

### Paso a paso [02:22]

1. **Envolver el input con un `<span>`.** El span abre antes del input y cierra después del botón, para que ambos queden dentro. Así el CSS puede colocar la × encima del input, a la derecha.
2. **Agregar el botón con una validación.** `{(city || searchedCity) && ( ... )}` lo muestra solo si hay algo escrito o algo buscado [03:15]. Con los dos estados vacíos, el botón no existe.
3. **Asignarle `onClick`** con la función de limpieza [02:47].

### La función de limpieza [03:44]

```jsx
function handleClearSearch() {
  setCity("");
  setSearchedCity("");
}
```

* Dentro de una función se pueden llamar todos los `set` que hagan falta.
* Ambos vuelven a `""`, el mismo valor inicial.
* React agrupa las dos actualizaciones y repinta **una sola vez**.
* Si la función se usa en el JSX antes de declararla, el render se rompe [03:00].

---

## type="button" contra type="submit"

Este detalle es clave y fácil de pasar por alto:

| Botón | `type` | Efecto al hacer clic |
| --- | --- | --- |
| Buscar | `submit` | Envía el formulario y dispara `onSubmit` |
| × limpiar | `button` | Solo ejecuta su `onClick` |

Un `<button>` dentro de un `<form>` es `submit` **por defecto**. Si el botón de limpiar no llevara `type="button"`, al hacer clic también enviaría el formulario.

---

## onClick contra onSubmit [04:15]

| | `onClick` | `onSubmit` |
| --- | --- | --- |
| Dónde se puede usar | En cualquier elemento | Solo en un `<form>` |
| Necesita un botón | No | Sí, de tipo `submit` |
| Se dispara con Enter | No | Sí |

Uno es flexible y va donde quieras; el otro está atado a la estructura del formulario.

---

## Detalles a recordar

* Los eventos en React se escriben en **camelCase**: `onClick`, `onChange`, `onSubmit`.
* Se pasa la función, no su resultado: `onClick={handleClearSearch}`, sin paréntesis.
* Cuando hay que pasar un argumento se usa una flecha: `onChange={(event) => setCity(event.target.value)}`.
* Convención de nombres: `handleAlgo` para las funciones que responden a eventos.
* `{" "}` en el JSX fuerza un espacio que de otro modo se perdería al partir la línea.
* El carácter `×` es el signo de multiplicar; se ve mejor que una X mayúscula.

---

## Qué falta

El input ya actualiza y limpia la búsqueda, pero las propiedades **todavía no se filtran** [05:20]. En la siguiente clase ese valor se usa para reflejar los cambios en el listado.

De paso, en la clase se ajustaron estilos de la card: el precio queda en el mismo verde de los botones [04:58].

---

## Preguntas rápidas

**¿Diferencia entre onSubmit y onChange?**
`onSubmit` se ejecuta al enviar el formulario completo. `onChange` se ejecuta cada vez que cambia el valor de un campo.

**¿Cómo limpio varios estados con un clic?**
Dentro de la función del `onClick` se llama a cada `set` necesario con su valor inicial.

**¿Por qué el botón de limpiar lleva type="button"?**
Para que no envíe el formulario.
