# Cierre: proyecto React con TypeScript

> Clase 18 de 18 en Platzi. El código corresponde a la rama [`clase-17/cierre`](https://github.com/platzi/react-js/tree/clase-17/cierre) del repo de Platzi.

## Resumen

Última clase. No hay código nuevo: es el repaso de lo que se construyó, el **checklist** del entregable y las ideas para seguir. El curso siguió un flujo de tres etapas:

```
Construir  →  Ordenar  →  Mejorar con tipado
(clases 3 a 14)  (clase 15)  (clases 16 y 17)
```

Primero una interfaz que funciona en JavaScript, luego carpetas ordenadas y al final TypeScript. Ese orden da fundamentos claros antes de complicar el proyecto.

---

## Estructura final [00:26]

```
src/
├── components/
│   ├── layout/
│   │   └── Header.tsx
│   ├── properties/
│   │   ├── PropertyCard.tsx
│   │   └── PropertyList.tsx
│   └── ui/
│       ├── Hero.tsx
│       └── SearchBar.tsx
├── data/
│   └── properties.ts
├── types/
│   └── property.ts
├── utils/
│   └── filterProperties.ts
├── App.tsx
├── index.css
└── main.tsx
```

| Carpeta | Responsabilidad |
| --- | --- |
| `components/layout` | Estructura visual que se repite: el header |
| `components/properties` | Todo lo que muestra propiedades |
| `components/ui` | Elementos de interfaz: hero y buscador |
| `data` | Los datos mock de las propiedades |
| `types` | Los tipos de la aplicación |
| `utils` | Lógica reutilizable sacada de un componente |

> El archivo `CLASE-18.md` de la rama de Platzi omite `Hero.tsx` en su árbol. Sí existe, en `components/ui`.

---

## Qué puede hacer el usuario [01:15]

1. Ver una carga simulada, con el mensaje "Cargando propiedades...".
2. Ver el listado de alojamientos.
3. Escribir en el buscador y filtrar por título, ubicación o tipo.
4. Recibir un mensaje cuando la búsqueda no tiene resultados.
5. Limpiar la búsqueda y hacer otra.

---

## Checklist del entregable [01:36]

Revisado contra mi proyecto en `knowledge/original react-js`:

| Punto | Estado | Dónde se ve |
| --- | --- | --- |
| Proyecto creado con Vite y React | Cumplido | `package.json`: `vite` y `react` 19 |
| Primera versión en JavaScript | Cumplido | Historial de Git: los commits de las clases 3 a 15 son `.jsx` |
| Home estilo Airbnb | Cumplido | Header, hero, buscador y grilla de cards |
| Componentes reutilizables | Cumplido | `PropertyCard` se usa una vez por propiedad |
| Props | Cumplido | `property`, `properties`, `value`, `onSearch`, ... |
| Datos | Cumplido | `data/properties.ts`, siete propiedades |
| Eventos | Cumplido | `onSubmit`, `onChange`, `onClick` en `SearchBar` |
| Estados | Cumplido | `city`, `search`, `propertiesFromAPI`, `isLoading`, `error` |
| Funciones tipadas | Cumplido | `filterProperties`, `handleChange`, `handleSubmit` |

Verificación técnica: `tsc -b` sin errores, ESLint sin errores y `npm run build` genera el sitio.

---

## Mapa del curso

| Clase | Concepto | Notas |
| --- | --- | --- |
| 1 | Componentes y hooks, los dos pilares | [01](01-componentes-y-hooks-los-dos-pilares-de-react.md) |
| 2 | Dividir una interfaz en componentes | [02](02-como-dividir-tu-clon-de-airbnb-en-componentes-react.md) |
| 3 | Crear el proyecto con Vite | [03](03-como-crear-un-proyecto-react-con-vite.md) |
| 4 | JSX y estructura visual | [04](04-estructura-visual-inicial-de-app-jsx-en-react.md) |
| 5 | Separar `App` en componentes | [05](05-como-dividir-app-jsx-en-componentes-react.md) |
| 6 | Props de padre a hijo | [06](06-como-pasar-props-de-padre-a-hijo-en-react.md) |
| 7 | Listas con `map` y `key` | [07](07-renderizar-listas-en-react-con-map.md) |
| 8 | Renderizado condicional | [08](08-renderizado-condicional-en-react-para-datos-incompletos.md) |
| 9 | `useState` | [09](09-usestate-en-react-como-guardar-y-actualizar-estado.md) |
| 10 | Eventos | [10](10-como-limpiar-dos-estados-con-un-solo-clic.md) |
| 11 | Subir el estado y filtrar | [11](11-filtrar-propiedades-en-react-con-usestate-y-props.md) |
| 12 | Componentes controlados | [12](12-componentes-controlados-en-react.md) |
| 13 | `useEffect` | [13](13-useeffect-para-simular-la-carga-de-una-api.md) |
| 14 | Estados de carga y error | [14](14-estados-de-carga-y-error-en-react.md) |
| 15 | Carpetas y utils | [15](15-organizar-carpetas-y-archivos-utils-en-react.md) |
| 16 | Migrar a TypeScript | [16](16-migrar-de-javascript-a-typescript-en-react.md) |
| 17 | Tipar props, eventos y estados | [17](17-tipar-props-eventos-y-estados-con-typescript.md) |

### Las ideas que más se repiten

* **Los datos bajan y los eventos suben.** El padre pasa datos por props; el hijo avisa llamando a una función que recibió por props.
* **El estado vive en el padre común** de los componentes que lo necesitan.
* **Lo que se puede calcular no se guarda en un estado.** `filteredProperties` es una constante.
* **Una única fuente de verdad.** Un mismo dato en dos lugares termina desincronizado.
* **Siempre hay un plan B.** Cargando, error, lista vacía y dato faltante tienen su propia interfaz.
* **Refactorizar es mejorar el código sin cambiar lo que hace.**

---

## Cómo escalar el proyecto [02:05]

| Mejora | Qué implica |
| --- | --- |
| Página de detalle de cada propiedad | Rutas, con React Router o un framework |
| Filtros más avanzados | Conectar Tipo y Huéspedes, rango de precio |
| API real | `fetch` dentro del `useEffect`, con `async / await` |
| Estado global | Context, Zustand o Redux |
| Hooks personalizados | Por ejemplo `useProperties()`, que devuelva datos, `isLoading` y `error` |
| Reservas | Formularios, fechas y un backend |

---

## Otras formas de crear una app React [02:36]

| Herramienta | Qué es |
| --- | --- |
| Vite | Empaquetador y servidor de desarrollo. La app corre entera en el navegador (SPA). Es lo que usa el curso |
| Next.js | Framework sobre React: rutas, renderizado en el servidor y más, ya resueltos |
| TanStack Start | Framework de la familia TanStack, construido sobre TanStack Router |

Ninguna cambia la base de React. Componentes, props, estado, eventos y efectos funcionan igual en todas.

> El resumen de Platzi presenta "TanStack" como un método de instalación. TanStack es una familia de librerías (Query, Router, Table); la que equivale a Next.js es **TanStack Start**.

---

## Pendientes en mi proyecto

Nada de esto lo pide el checklist. Son detalles que quedaron anotados en clases anteriores:

* La búsqueda no ignora acentos: "bogota" no encuentra "Bogotá". Se arregla en `filterProperties.ts` con `normalize("NFD")`.
* Los inputs de Tipo y Huéspedes siguen sin conectar. Era el desafío de la clase 12.
* Falta el estilo de `.current-search` en `index.css`.
* El comentario sobre `PropertyCardProps` describe la versión anterior del componente.
* El botón de limpiar muestra `X` en lugar de `×`.

---

## Preguntas rápidas

**¿Para qué sirve la carpeta utils?**
Para guardar funciones reutilizables que se sacan de los componentes.

**¿Qué se gana al migrar a TypeScript?**
Seguridad y claridad: los tipos reducen errores y hacen que cada función y componente sea más fácil de entender.

**¿Cuál es el flujo para aprender React de forma práctica?**
Construir una interfaz que funcione, ordenarla en carpetas y mejorarla con tipado.
