# useEffect para simular la carga de una API

> Clase 13 de 18 en Platzi. El código corresponde a la rama [`clase-12/useeffect`](https://github.com/platzi/react-js/tree/clase-12/useeffect) del repo de Platzi.

## Resumen

Hasta ahora las propiedades aparecían al instante porque venían de un archivo local. En una app real los datos llegan de una **API**, viajan por la red y tardan. En esta clase se simula esa demora con el segundo hook más usado de React, **`useEffect`**, y un `setTimeout`.

Solo cambia `App.jsx`, con tres pasos:

1. Un estado nuevo, `propertiesFromAPI`, que empieza vacío.
2. Un `useEffect` que lo llena un segundo después del primer render.
3. El filtro pasa a leer ese estado en lugar del archivo.

---

## Qué es una API

El servicio externo de donde la aplicación obtiene sus datos, en lugar de tenerlos guardados en un archivo del proyecto. Como la respuesta viaja por la red, **no es inmediata**.

---

## Qué es useEffect

Un hook nativo que ejecuta código **después** de que el componente se pinta en pantalla. Sirve para los **efectos secundarios**: todo lo que no es calcular el JSX, como pedir datos, usar temporizadores o suscribirse a eventos.

Se importa igual que `useState` [00:41]:

```jsx
import { useState, useEffect } from "react";
```

### Anatomía

```
useEffect(() => {  ...código...  }, [dependencias]);
          │                         │
          │                         └── cuándo se ejecuta
          └── qué se ejecuta
```

| Segundo argumento | Cuándo corre el efecto |
| --- | --- |
| `[]` vacío | Una sola vez, después del primer render [01:25] |
| `[search]` | Después del primer render y cada vez que cambia `search` |
| Sin array | Después de **cada** render. Casi nunca es lo que quieres |

`useState` controla **qué** cambia; `useEffect` controla **cuándo** ocurre algo.

---

## El código

```jsx
// src/App.jsx
import { useState, useEffect } from "react";
import { properties } from "./data/properties";

function App() {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [propertiesFromAPI, setPropertiesFromAPI] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setPropertiesFromAPI(properties);
    }, 1000);
  }, []);

  const filteredProperties = propertiesFromAPI.filter((property) => {
    ...
  });
  ...
}
```

### Paso 1: el estado [01:52]

```jsx
const [propertiesFromAPI, setPropertiesFromAPI] = useState([]);
```

El valor inicial es un **array vacío**. Eso es lo que permite simular la espera: al principio no hay nada.

### Paso 2: el efecto

`setTimeout(función, milisegundos)` ejecuta la función después del tiempo indicado. `1000` es un segundo. Pasado ese tiempo, `setPropertiesFromAPI(properties)` guarda el listado y React repinta.

### Paso 3: el filtro lee el estado [02:47]

```jsx
// antes
const filteredProperties = properties.filter(...)
// ahora
const filteredProperties = propertiesFromAPI.filter(...)
```

Sin este cambio no se vería ninguna demora, porque el listado seguiría saliendo del archivo.

---

## La línea de tiempo

```
0 s   Primer render      propertiesFromAPI = []   →  "No hay alojamientos disponibles."
      React pinta
      Corre el efecto    arranca el setTimeout

1 s   setPropertiesFromAPI(properties)
      Segundo render     propertiesFromAPI = 7    →  aparecen las cards
      El efecto NO corre otra vez, porque el array está vacío
```

Para verlo mejor, sube el tiempo a `4000` [03:15].

---

## Por qué hace falta useEffect

Si el `setTimeout` estuviera suelto en el cuerpo del componente:

```jsx
function App() {
  setTimeout(() => setPropertiesFromAPI(properties), 1000);   // MAL
  ...
}
```

Cada render crearía un temporizador nuevo; cada temporizador cambiaría el estado; cada cambio provocaría otro render. Un **bucle infinito**. El `useEffect` con `[]` garantiza que el temporizador se cree una sola vez.

---

## El problema que queda [03:30]

Durante la espera se muestra el mensaje de "no hay alojamientos", y el usuario cree que algo se rompió. La app solo distingue dos situaciones:

| Estado | Qué ve el usuario | ¿Existe? |
| --- | --- | --- |
| Sin datos | El mensaje de lista vacía | Sí |
| Con datos | Las cards | Sí |
| Cargando | Un aviso de que los datos vienen en camino | Todavía no |

"Aún no llegan" y "no hay" se ven igual porque en ambos casos el array está vacío. La siguiente clase agrega los estados de **carga, error y éxito**.

---

## Detalles a recordar

* `useEffect` va al inicio del componente, igual que `useState`. Nunca dentro de un `if` o de un bucle.
* La función del efecto se ejecuta **después** de pintar, no durante el render. Por eso el primer render siempre muestra el estado inicial.
* `main.jsx` usa `<StrictMode>`. En desarrollo, React ejecuta cada efecto **dos veces** al montar para detectar errores. Si pones un `console.log` dentro del efecto, lo verás duplicado. En producción corre una vez.
* Un efecto puede devolver una **función de limpieza**, que React ejecuta al desmontar el componente. Lo correcto con un temporizador es cancelarlo:

  ```jsx
  useEffect(() => {
    const timer = setTimeout(() => setPropertiesFromAPI(properties), 1000);
    return () => clearTimeout(timer);
  }, []);
  ```

  La clase no lo hace porque `App` nunca se desmonta.
* Con una API real, dentro del efecto iría un `fetch` en lugar del `setTimeout`. El resto del patrón es el mismo.

---

## Preguntas rápidas

**¿Para qué sirve useEffect?**
Para ejecutar código después del render, en respuesta a ciertos cambios. Es el lugar de los efectos secundarios, como pedir datos.

**¿Para qué sirve el array de dependencias?**
Define de qué valores depende el efecto. Vacío, el código corre una sola vez al montar el componente.

**¿Por qué el estado empieza como array vacío?**
Porque así la app arranca sin datos y los recibe después, como pasaría con una API. Además, `[].filter(...)` funciona sin errores.

---

## Siguiente paso

Manejar los estados de carga, error y éxito.

**Para probar:** cambia el valor del delay y observa cuánto tarda en aparecer el listado.
