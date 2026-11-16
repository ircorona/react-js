# Componentes y Hooks: los dos pilares de React

## Resumen

React es una tecnología para construir **interfaces de usuario** en la web. Está detrás de apps como Instagram, Netflix, Spotify o el dashboard de un banco. No domina el mercado por ser complicado, sino por ofrecer la forma más simple de construir interfaces complejas. Toda su potencia se reduce a dos ideas que trabajan juntas: **componentes** y **hooks**.

---

## Por qué React lidera el front-end

* Es el **estándar de la industria** y la tecnología front-end más demandada [00:52].
* La usan cientos de empresas y miles de startups que contratan ahora mismo.
* Aprenderlo es una inversión, no una apuesta.

---

## Los dos pilares

| Pilar | Qué es | Rol |
| --- | --- | --- |
| **Componentes** | Piezas reutilizables que forman la interfaz | La estructura |
| **Hooks** | Lo que da vida y funcionalidad a esas piezas | El comportamiento |

> Por muy avanzado que parezca un código o cuántas librerías use, al final siempre son componentes y hooks trabajando en equipo. Si dominas esos dos conceptos, dominas React [00:20].

---

## Componentes: la analogía del Lego

Piensa en tres piezas de Lego idénticas, donde cada una es un botón [01:37]. En una web puedes tener un botón aquí, otro en otra sección y otro en una página distinta, pero todos son iguales.

Esa es la esencia de un componente: **reutilizar la misma pieza en muchos lugares**.

### Sin componentes vs. con componentes

| | Sin componentes | Con componentes |
| --- | --- | --- |
| Creación | Un botón distinto por cada lugar | Un solo componente, usado muchas veces |
| Cambiar color, forma o funcionalidad | Ir uno por uno modificándolos | Cambias el componente una vez |
| Resultado | Trabajo repetido e inconsistencias | El cambio se refleja en todos los sitios [01:58] |

### Vista previa en código

La clase es conceptual; el código llega en la siguiente. Esto es solo para aterrizar la analogía:

```jsx
// Una pieza de Lego: se define una vez
function Boton() {
  return <button className="boton">Comprar</button>;
}

// Y se reutiliza donde haga falta
function App() {
  return (
    <>
      <Boton />
      <Boton />
      <Boton />
    </>
  );
}
```

Si cambias `Boton`, los tres se actualizan a la vez.

---

## Aprender React junto con la AI

Hoy se desarrolla con la AI al lado: herramientas como Devin, Claude Code o Codex pueden escribir React por ti [00:31].

El problema: sin fundamentos no sabrás detectar

* cuándo la AI se equivocó,
* cuándo te dio una mala arquitectura,
* cuándo existe una mejor forma de resolver el problema.

Por eso el curso combina dos cosas a la vez:

1. **Fundamentos profundos** de React.
2. **Colaboración con AI** para construir aplicaciones.

> La AI puede escribir el código, pero solo tú puedes juzgar si la arquitectura es correcta. Esa combinación es lo que el mercado está pagando [00:44].

---

## Preguntas rápidas

**¿Qué es React?**
Una tecnología para construir interfaces de usuario en la web, basada en componentes reutilizables y hooks que les dan funcionalidad.

**¿Para qué sirven los componentes?**
Para crear piezas reutilizables (como un botón) y usarlas en toda la aplicación. Un cambio en el componente se refleja en todos los lugares donde aparece.

**¿Puedo aprender React usando AI?**
Sí, pero entendiendo primero los fundamentos, para poder evaluar lo que la AI genera.

---

## Siguiente paso

Llevar la analogía de los componentes a código real y sumarle hooks para que esas piezas tengan vida.

**Para pensar:** ¿qué botón vas a convertir en tu primer componente?
