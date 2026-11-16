# Cómo dividir App.jsx en componentes React con IA

> Clase 5 de 18 en Platzi. El código corresponde a la rama `clase-04/primeros-componentes` del repo de Platzi.

## Resumen

Dividir la interfaz en componentes es uno de los pasos más importantes en React. Se parte de un `App.jsx` funcional, con toda la página en un solo archivo, y se organiza en piezas reutilizables. La IA sirve como guía para explorar estrategias, pero la estructura final la decides tú. Vuelve la analogía del Lego: cada bloque cumple una función y se combina cuando hace falta.

---

## Por qué separar la interfaz en componentes

* La razón principal es la **reutilización**.
* Un componente es una pieza de interfaz con **una responsabilidad específica** que usas cuando y donde la necesites [00:57].
* **No existe una única regla** para dividir un archivo. Por eso vale la pena explorar opciones con una IA.

---

## Cómo pedirle a la IA una estrategia

El truco está en el prompt [00:24]. En la clase se le pide a Claude:

> ¿Cuál es la mejor estrategia para dividir este archivo App.jsx de React en componentes? Dame la respuesta en una estructura visual.

Y se pega el archivo completo. El objetivo es que la IA recomiende la ubicación de cada componente respecto a los demás.

Herramientas que sirven para esto [01:20]:

| Tipo | Ejemplos |
| --- | --- |
| Asistentes generales | ChatGPT, Gemini, Perplexity |
| Editores con IA integrada | Cursor, Windsurf |
| Asistentes de terminal | Claude Code, Devin |

> La recomendación de la IA es un punto de partida, no una orden. Tú decides la estructura final según tu experiencia y las buenas prácticas.

---

## Estructura de componentes de la app

Tras comparar la sugerencia de Claude con la experiencia en proyectos reales, el profesor define una estructura un poco distinta que mantiene las buenas prácticas [01:47]:

```
App                  base donde se conecta todo (App.jsx)
├── Header           componente independiente
├── Hero             bloque principal con el título
├── SearchBar        buscador
└── PropertyList     agrupa las tarjetas
    └── PropertyCard tarjeta reutilizable de un alojamiento [02:07]
```

Cada nivel tiene una función clara, y esa organización ahorra trabajo más adelante.

### Cómo queda en archivos

```
src/
├── App.jsx
└── components/
    ├── Header.jsx
    ├── Hero.jsx
    ├── SearchBar.jsx
    ├── PropertyList.jsx
    └── PropertyCard.jsx
```

---

## El código

Cada componente es una función que devuelve JSX y se exporta por nombre:

```jsx
// src/components/PropertyCard.jsx
export function PropertyCard() {
  return (
    <article className="property-card">
      <img
        src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
        alt="Apartamento moderno"
      />
      <div className="property-card-content">
        <h4>Apartamento moderno</h4>
        <p>Santiago, Chile</p>
        <strong>$75 / noche</strong>
      </div>
    </article>
  );
}
```

`PropertyList` lo importa y lo usa tres veces:

```jsx
// src/components/PropertyList.jsx
import { PropertyCard } from "./PropertyCard";

export function PropertyList() {
  return (
    <section className="properties-section">
      <h3>Alojamientos disponibles</h3>
      <div className="properties-grid">
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
      </div>
    </section>
  );
}
```

Y `App.jsx` queda mucho más corto, solo conectando piezas:

```jsx
// src/App.jsx
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { PropertyList } from "./components/PropertyList";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Hero />
        {/* el buscador sigue aquí en línea por ahora */}
        <PropertyList />
      </main>
    </div>
  );
}

export default App;
```

### Detalles a recordar

* El nombre del componente va en **mayúscula inicial** (`PropertyCard`), así React lo distingue de una etiqueta HTML.
* `export function X` se importa con llaves: `import { X } from "./X"`.
* `export default App` se importa sin llaves: `import App from "./App.jsx"`.
* En la rama de Platzi existe `SearchBar.jsx`, pero `App.jsx` todavía no lo usa: el buscador sigue escrito en línea.
* Como aún no hay datos ni props, las tres tarjetas muestran **el mismo contenido** [02:31]. Eso se resuelve con props en la siguiente clase.

---

## Un cambio, todas las tarjetas

Este es el corazón de la ventaja de React. Al cambiar el título dentro de `PropertyCard`:

```jsx
// Antes
<h4>Apartamento moderno</h4>

// Después
<h2>Apartamento moderno</h2>
```

el texto se hace más grande y **todas las tarjetas se actualizan al instante** [03:00]. No hay que repetir el cambio tres veces ni N veces: basta con modificar el componente una vez [03:14].

---

## Preguntas rápidas

**¿Qué es un componente en React?**
Una pieza reutilizable de la interfaz con una responsabilidad específica. Por ejemplo, `PropertyCard` muestra un alojamiento individual.

**¿Por qué usar un componente reutilizable como PropertyCard?**
Porque si cambias su apariencia, la modificación se refleja en todas las tarjetas desde un solo lugar, sin buscar código repetido por la aplicación.

**¿Tengo que seguir la estructura que propone la IA?**
No. La IA propone y quien conoce el proyecto decide.

---

## Desafío

Migrar por tu cuenta los componentes restantes y comparar el resultado con el de la próxima clase. Anotar si la IA propuso una jerarquía distinta.
