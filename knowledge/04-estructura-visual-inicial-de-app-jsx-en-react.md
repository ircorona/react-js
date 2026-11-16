# Estructura visual inicial de App.jsx en React

> Clase 4 de 18 en Platzi. El código corresponde a la rama `clase-03/estructura-visual` del repo de Platzi.

## Resumen

Antes de separar la interfaz en componentes hace falta una primera estructura visual completa dentro de `App.jsx`. Primero ves el diseño funcionando en un solo archivo y después decides dónde cortar. Todo lo que vivía en el `index.html` original pasa a `App.jsx`: el diseño no cambia, cambia quién lo dibuja.

---

## Qué va dentro de App.jsx

El esqueleto completo de la pantalla, con cuatro zonas [00:07]:

1. Un **header** en la parte superior.
2. Una **sección principal** que organiza el contenido.
3. Una **búsqueda** para filtrar o encontrar información.
4. Un **espacio para las propiedades**.

En el código de la rama se ve así (resumido):

```jsx
function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Platzi-host</h1>
        <nav>...</nav>
      </header>

      <main className="main-content">
        <section className="hero">...</section>

        <section className="search-box">
          <label>
            Ciudad
            <input type="text" placeholder="Santiago, Chile" />
          </label>
          ...
          <button>Buscar</button>
        </section>

        <section className="properties-section">
          <div className="properties-grid">
            <article className="property-card">...</article>
            <article className="property-card">...</article>
            <article className="property-card">...</article>
          </div>
        </section>
      </main>
    </div>
  );
}
```

> Esto era la tarea de la clase anterior. Puedes llegar al mismo resultado visual con un código totalmente distinto, y está bien.

---

## Por qué mover el contenido del index.html a React

* El contenido del `index.html` de la rama de la clase uno ahora vive en `App.jsx` para que **React lo renderice**.
* Al correr el proyecto y abrir el enlace que entrega Vite, se ve la misma estructura y el mismo diseño que en el HTML original [00:34].
* La diferencia: ahora todo se dibuja desde un archivo de React. Eso te deja en el terreno correcto para empezar a usar las features de React.

### Diferencias de sintaxis entre HTML y JSX

| HTML | JSX |
| --- | --- |
| `class="hero"` | `className="hero"` |
| `<img src="...">` | `<img src="..." />` |
| `<input type="text">` | `<input type="text" />` |
| Varios elementos sueltos | Un solo elemento raíz que envuelve todo |

---

## El problema de tenerlo todo en un archivo

Las tres tarjetas de propiedades son el mismo bloque `<article>` copiado tres veces, cambiando solo la foto, el título, la ciudad y el precio. Si quieres cambiar el diseño de la tarjeta, hay que tocar los tres bloques.

Eso es lo que resuelven los componentes en la siguiente clase.

---

## Siguiente paso

Separar la interfaz en componentes, que es el corazón de React [01:14].

> Separar en componentes divide una pantalla grande en piezas pequeñas y manejables. Cada una cumple una función y se puede reutilizar, en lugar de mantener todo apretado en `App.jsx`.
