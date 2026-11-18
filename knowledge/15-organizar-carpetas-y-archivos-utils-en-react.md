# Organizar carpetas y archivos utils en React

> Clase 15 de 18 en Platzi. El código corresponde a la rama [`clase-14/organizacion-refactor`](https://github.com/platzi/react-js/tree/clase-14/organizacion-refactor) del repo de Platzi.

## Resumen

Hasta ahora el foco estaba en la experiencia del usuario. Esta clase trata de la otra experiencia: la del **desarrollador**. Cuando una app crece no basta con que funcione; tiene que ser fácil de leer y de mantener para un equipo.

Se hacen dos cosas, y ninguna cambia lo que se ve en pantalla:

1. Agrupar los componentes en carpetas por categoría.
2. Sacar la lógica de filtrado de `App.jsx` a un archivo **utils**.

Es otro **refactor**, como el de la clase 12. El paso es opcional, pero es la forma profesional de trabajar [00:26].

---

## Antes y después

```
ANTES                          DESPUÉS
src/                           src/
├── components/                ├── components/
│   ├── Header.jsx             │   ├── layout/
│   ├── Hero.jsx               │   │   └── Header.jsx
│   ├── PropertyCard.jsx       │   ├── properties/
│   ├── PropertyList.jsx       │   │   ├── PropertyCard.jsx
│   └── SearchBar.jsx          │   │   └── PropertyList.jsx
├── data/                      │   └── ui/
│   └── properties.js          │       ├── Hero.jsx
├── App.jsx                    │       └── SearchBar.jsx
├── index.css                  ├── data/
└── main.jsx                   │   └── properties.js
                               ├── utils/
                               │   └── filterProperties.js
                               ├── App.jsx
                               ├── index.css
                               └── main.jsx
```

Son los mismos cinco componentes, con el mismo contenido. Solo cambia dónde están [02:36].

---

## Paso 1: carpetas por categoría [01:52]

| Carpeta | Qué contiene | Criterio |
| --- | --- | --- |
| `layout/` | `Header` | Estructura que se repite en otras páginas |
| `properties/` | `PropertyCard`, `PropertyList` | Todo lo relacionado con mostrar propiedades |
| `ui/` | `Hero`, `SearchBar` | Elementos de interfaz |

### Por qué

Cinco archivos sueltos se manejan sin problema. Con decenas, un desarrollador nuevo tendría que abrir archivo por archivo para saber qué hace cada uno [01:36]. Con carpetas, el nombre ya dice dónde buscar.

### Qué hay que actualizar: los imports

Mover un archivo rompe todos los `import` que apuntan a él.

```jsx
// src/App.jsx
// antes
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SearchBar } from "./components/SearchBar";
import { PropertyList } from "./components/PropertyList";

// ahora
import { Header } from "./components/layout/Header";
import { Hero } from "./components/ui/Hero";
import { SearchBar } from "./components/ui/SearchBar";
import { PropertyList } from "./components/properties/PropertyList";
```

* Dentro de `PropertyList.jsx`, el import `"./PropertyCard"` **no cambia**, porque los dos archivos se mudaron juntos a `properties/`. Una ruta relativa solo se rompe si cambia la posición de un archivo respecto del otro.
* Si mueves los archivos desde el explorador de VS Code, el editor ofrece actualizar los imports automáticamente.
* En Git un archivo movido sin cambios aparece como **renombrado** (`R`), no como borrado y creado. Así se conserva su historial.

---

## Paso 2: la lógica sale a utils [03:07]

```js
// src/utils/filterProperties.js
export function filterProperties(properties, searchText) {
  const normalizedSearch = searchText.trim().toLowerCase();

  if (!normalizedSearch) {
    return properties;
  }

  return properties.filter((property) => {
    return (
      property.title.toLowerCase().includes(normalizedSearch) ||
      property.location.toLowerCase().includes(normalizedSearch) ||
      property.type.toLowerCase().includes(normalizedSearch)
    );
  });
}
```

```jsx
// src/App.jsx
import { filterProperties } from "./utils/filterProperties";
...
const filteredProperties = filterProperties(propertyList, search);
```

Ocho líneas de `App.jsx` se convierten en una. `App` queda con los estados, el efecto y lo que se renderiza [03:57].

### Qué cambió respecto del filtro anterior

| Antes, dentro de `App` | Ahora, en utils |
| --- | --- |
| Usaba `propertiesFromAPI` y `search` directo del componente | Los recibe como **parámetros** |
| Sin `trim` | `searchText.trim()` quita espacios sobrantes |
| Filtraba siempre | Si no hay texto, devuelve la lista completa sin recorrerla |

* El archivo es `.js`, no `.jsx`: no contiene JSX, solo JavaScript.
* El nombre va en **camelCase** (`filterProperties.js`), porque exporta una función. Los componentes van en **PascalCase** (`PropertyCard.jsx`).
* En la rama, Platzi también renombra el estado `propertiesFromAPI` a `propertyList`. Es solo un cambio de nombre.

### Función pura

`filterProperties` no usa estado ni hooks ni toca la pantalla. Recibe datos y devuelve datos; con las mismas entradas siempre da la misma salida. A eso se le llama **función pura**, y trae tres ventajas:

* Se puede **reutilizar** en cualquier componente.
* Se puede **probar** sola, sin montar React.
* Se lee sin tener que entender el componente que la usa.

> Regla práctica: si un bloque de lógica no necesita hooks ni JSX, puede vivir fuera del componente.

---

## Qué va en cada carpeta

| Carpeta | Contenido |
| --- | --- |
| `components/` | Lo que se pinta en pantalla |
| `data/` | Datos mock |
| `utils/` | Funciones de ayuda sin JSX |
| `hooks/` | Hooks propios (`useAlgo`). No se usa en el curso, pero es la siguiente carpeta habitual |

Y en la raíz de `src`: `main.jsx` conecta la app con el HTML [00:54], `App.jsx` es el componente principal e `index.css` tiene los estilos.

---

## Detalles a recordar

* No existe una estructura oficial de React. Lo que importa es que el equipo siga **una misma convención**.
* Otra convención común es agrupar por **funcionalidad** (`features/search`, `features/properties`), con sus componentes, utils y estilos juntos.
* No conviene sobreorganizar: con cinco componentes las carpetas casi no hacen falta. Aquí se practican para cuando el proyecto crezca.
* Un refactor se verifica comprobando que **nada cambió**: la app carga, busca "Bariloche", filtra y limpia igual que antes.
* Siguen pendientes los acentos ("bogota" no encuentra "Bogotá") y el error si una propiedad no tiene `type`. Ahora hay un solo lugar donde arreglarlo: `filterProperties.js`.

---

## Preguntas rápidas

**¿Qué hace main.jsx?**
Es el puente entre la aplicación y el HTML: monta `App` en la página.

**¿Qué es un archivo utils?**
Un archivo con funciones reutilizables que se sacan de los componentes y se importan donde hagan falta.

**¿Por qué mover lógica a utils?**
Para que el componente quede enfocado en la interfaz, y la lógica sea más fácil de leer, probar y compartir.

**¿Cambia algo para el usuario?**
No. Cambia la experiencia de quien lee y mantiene el código.

---

## Siguiente paso

Migrar el proyecto de JavaScript a **TypeScript**.
