# Cómo crear un proyecto React con Vite

> Clase 3 de 18 en Platzi. El código corresponde a la rama `clase-02/setup-proyecto` del repo de Platzi.

## Resumen

Crear un proyecto con **Vite** es el primer paso práctico para levantar una aplicación React desde cero sin configuraciones complicadas. La clase muestra el requisito previo (Node), el comando de creación, la estructura de archivos que genera y cuáles son los archivos que de verdad importan.

---

## Requisito: Node

```bash
node --version
```

* Hace falta **Node 21 o superior** para que los comandos sean compatibles [00:31].
* En la clase se usa la versión 22.22.0.
* La terminal es la que prefieras. El profesor usa Warp.

---

## Por qué Vite

* En [react.dev](https://react.dev) la recomendación general es usar un framework: Next.js, React Router v7 o Expo para apps nativas.
* Pero para **empezar desde cero**, la primera recomendación de la propia documentación es Vite [02:20].
* Vite funciona con varios lenguajes y librerías, no solo con React. Por eso hay que indicarle de forma explícita la plantilla de React.
* La inicialización suele ser más rápida que otras alternativas [03:02].

---

## Crear el proyecto

```bash
npm create vite@latest vite-basico -- --template react
```

| Parte | Qué hace |
| --- | --- |
| `npm create vite@latest` | Pide a npm crear un proyecto con la versión más reciente de Vite |
| `vite-basico` | Nombre del proyecto y de la carpeta |
| `-- --template react` | Flag que indica que use la plantilla de React |

Durante la instalación npm pregunta si quieres inicializar de una vez. Al responder que sí, genera el scaffolding e instala las dependencias [02:44].

Si prefieres hacerlo paso a paso:

```bash
cd vite-basico
npm install
npm run dev
```

### Puertos

* Vite usa por defecto el puerto **5173**.
* Si está ocupado, asigna otro automáticamente: 5174, 5175, etc. [03:14]. Por eso en el video se ve `localhost:5175`.

---

## Estructura del proyecto

```
vite-basico/
├── node_modules/     dependencias ya instaladas
├── public/           iconos que usa la interfaz
├── src/              el contenido importante de la app
│   ├── assets/       imágenes
│   ├── App.jsx       componente principal
│   ├── main.jsx      punto de entrada de React
│   └── index.css     estilos
├── index.html        el HTML que se carga primero
├── package.json      dependencias y scripts
└── vite.config.js
```

`package.json` ya trae React, React DOM y dependencias de desarrollo como ESLint y Vite [04:10].

> No importa si ves versiones distintas a las del video. Cada proyecto es independiente y recibe actualizaciones.

### Los tres archivos que más importan [05:02]

| Archivo | Rol |
| --- | --- |
| `index.html` | El archivo que se lee primero. Contiene el `<div id="root">` |
| `src/main.jsx` | Le indica al HTML que renderice lo que viene de `App`. Normalmente no se toca |
| `src/App.jsx` | El archivo principal que renderiza todo el contenido de la aplicación |

Cómo se conectan:

```jsx
// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

`index.html` carga `main.jsx`, y `main.jsx` monta `<App />` dentro de `#root`.

---

## Migración del HTML a React

En la rama de la clase solo se migraron el `main` y el `h1` a `App.jsx` [06:03]:

```jsx
// src/App.jsx
function App() {
  return (
    <main>
      <h1>Platzi-host</h1>
    </main>
  );
}

export default App;
```

Por eso en este punto el navegador muestra únicamente un título.

---

## Tarea

Migrar todos los elementos de `index.html` al archivo `App.jsx` y, en la clase siguiente, comparar con la migración ya hecha [06:20].

Pista para la migración: en JSX `class` se escribe `className`, y las etiquetas sin cierre como `<img>` o `<input>` se cierran con `/>`.
