# Renderizado condicional en React para datos incompletos

> Clase 8 de 18 en Platzi. El código corresponde a la rama [`clase-07/renderizado-condicional`](https://github.com/platzi/react-js/tree/clase-07/renderizado-condicional) del repo de Platzi.

## Resumen

El **renderizado condicional** permite que un componente muestre cosas distintas según los datos que recibe. No siempre habrá propiedades que mostrar: a veces el listado llega vacío y a veces a un objeto le falta un valor. En lugar de una pantalla en blanco o un hueco en el diseño, se define un plan B para cada caso.

La clase tiene tres pasos:

1. Mover la lectura de los datos de `PropertyList` a `App`.
2. Mostrar un estado vacío cuando no hay propiedades.
3. Mostrar un texto alternativo cuando a una propiedad le falta el tipo.

---

## Paso 1: subir los datos a App

Antes, `PropertyList` importaba `properties.js` directamente. Ahora lo importa `App` y se lo pasa al hijo como prop [00:38].

```jsx
// src/App.jsx
import { properties } from "./data/properties";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Hero />
        <SearchBar />
        <PropertyList properties={properties} />
      </main>
    </div>
  );
}
```

```jsx
// src/components/PropertyList.jsx
export function PropertyList({ properties }) {
  // ya no hay import de "../data/properties"
  ...
}
```

| | Antes | Después |
| --- | --- | --- |
| Quién lee los datos | `PropertyList` | `App` |
| Cómo llegan a la lista | `import` dentro del componente | Prop `properties` |
| Ruta del import | `"../data/properties"` | `"./data/properties"` |

* Visualmente no cambia nada, porque la lista recibe las mismas propiedades [01:40].
* La ruta cambia porque `App.jsx` está en `src/` y `PropertyList.jsx` en `src/components/`.
* Aquí se pasa un **array** como prop: las props aceptan cualquier valor de JavaScript.

### Por qué importa

Con los datos en `App`, el padre decide **qué lista** recibe el hijo. Eso es lo que permite más adelante filtrar: `App` filtra el array y `PropertyList` solo pinta lo que le llega. También permite que `SearchBar` y `PropertyList`, que son hermanos, trabajen sobre los mismos datos.

---

## Paso 2: estado vacío

Si en `App.jsx` se pasa un array vacío, `properties={[]}`, solo queda el título y nada más [02:35]. Una pantalla casi en blanco no le dice nada al usuario.

La solución es un condicional **antes** del `return` principal [03:15]:

```jsx
// src/components/PropertyList.jsx
import { PropertyCard } from "./PropertyCard";

export function PropertyList({ properties }) {
  if (properties.length === 0) {
    return (
      <section className="properties-section">
        <h3>Alojamientos disponibles</h3>
        <p>No encontramos alojamientos con esos criterios.</p>
      </section>
    );
  }

  return (
    <section className="properties-section">
      <h3>Alojamientos disponibles</h3>
      <div className="properties-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            title={property.title}
            location={property.location}
            price={property.price}
            image={property.image}
            type={property.type}
          />
        ))}
      </div>
    </section>
  );
}
```

* Este patrón se llama **retorno temprano** (early return): si se cumple la condición, la función termina ahí y el segundo `return` no se ejecuta.
* El bloque alternativo usa la misma clase y repite el título, para mantener la consistencia.
* El mismo mensaje servirá cuando un **filtro** no devuelva resultados [04:00].
* Otro estado alternativo típico es el **loading**, para cuando los datos aún se están cargando [02:55].

---

## Paso 3: dato faltante

Si una propiedad no tiene `type`, el `<p>` queda vacío y esa tarjeta se descuadra frente a las demás [05:00]. Se resuelve con un valor por defecto [05:30]:

```jsx
// src/components/PropertyCard.jsx
<p>{type || "Tipo no especificado"}</p>
```

`||` devuelve el lado izquierdo si tiene valor, y el derecho si no. Como `type` llega como `undefined` cuando falta, se muestra el texto alternativo.

Para verlo en acción, la rama de Platzi comenta el tipo de una propiedad:

```js
// src/data/properties.js
{
  id: 2,
  title: "Casa frente al lago",
  ...
  // type: "Casa"
},
```

---

## Formas de renderizado condicional

| Forma | Ejemplo | Cuándo usarla |
| --- | --- | --- |
| `if` con retorno temprano | `if (lista.length === 0) return <Vacio />` | Cambia todo lo que devuelve el componente |
| `\|\|` | `{type \|\| "Tipo no especificado"}` | Valor por defecto si falta un dato |
| `&&` | `{esNuevo && <span>Nuevo</span>}` | Mostrar algo solo si se cumple una condición |
| Ternario | `{hay ? <Lista /> : <Vacio />}` | Elegir entre dos opciones dentro del JSX |

Las dos primeras son las de la clase. Las otras dos son muy comunes y aparecerán más adelante.

### Cuidados

* Dentro del JSX no se puede escribir `if`. Por eso el `if` va antes del `return`, y dentro de las llaves se usan `||`, `&&` o el ternario.
* `||` trata como vacío también `0` y `""`. Para un precio de `0` mostraría el texto alternativo. Si solo quieres cubrir `null` y `undefined`, usa `??`.
* Con `&&`, si el lado izquierdo es el número `0`, React pinta un `0` en pantalla. Mejor escribir `lista.length > 0 && ...`.

---

## Preguntas rápidas

**¿Cuándo usar renderizado condicional?**
Siempre que un dato pueda no llegar. Se valida su ausencia y se define una alternativa visual.

**¿Por qué un estado vacío y no una pantalla en blanco?**
Porque le comunica al usuario que no hay contenido o que la búsqueda no tuvo coincidencias.

**¿Por qué mover los datos a App?**
Para tenerlos de forma más global y poder decidir desde el padre qué recibe cada hijo.

---

## Siguiente paso

Manejar interacción con estado local usando `useState`, uno de los hooks más importantes de React.

**Para pensar:** ¿qué otro dato de las cards conviene validar para que nunca rompa el diseño?
