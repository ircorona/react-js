# Cómo dividir tu clon de Airbnb en componentes React

> Clase 2 de 18 en Platzi. El HTML inicial está en la rama `clase-01/intro` del repo de Platzi.

## Resumen

El proyecto del curso es **Platzi Host**: un clon estilo Airbnb con una home de propiedades, búsqueda, filtros y componentes reutilizables. Se parte de una vista estática en HTML y se transforma, parte por parte, en una aplicación funcional en React. La idea no es copiar Airbnb completo, sino usarlo como excusa para aprender los fundamentos construyendo algo real.

---

## Qué se va a construir

* Una vista en HTML que ya existe se descompone en piezas que React pueda manejar.
* La mayor parte del curso se trabaja en **JavaScript**, para concentrarse en los conceptos sin la carga extra del tipado.
* Cerca del final el proyecto se **migra a TypeScript** para entender qué beneficios trae.

### Fundamentos que cubre el curso

1. Componentes y props.
2. Estado y eventos.
3. Listas y renderizado condicional.
4. Efectos.

> Aprender con un proyecto obliga a aplicar componentes, props y estado en un contexto real. Se aprende resolviendo problemas concretos, no memorizando definiciones aisladas.

---

## Cómo se separa la vista en componentes

Antes de escribir React hace falta un plan: decidir cómo dividir la interfaz en piezas reutilizables. La vista principal de Platzi Host se organiza en tres componentes principales:

| Componente | Qué es |
| --- | --- |
| **Header** | Toda la barra superior de navegación |
| **Hero section** | La sección destacada bajo el encabezado |
| **Listado de propiedades** | Donde se muestran los alojamientos disponibles |

Dentro de cada bloque pueden vivir más componentes anidados, pero estos tres son la columna vertebral.

> Un componente es una pieza reutilizable de interfaz que agrupa su propia estructura y lógica. Pensar en componentes desde el inicio es la mentalidad que diferencia a quien domina la herramienta.

---

## Requisitos previos

* **HTML**: si es un término nuevo, tomar primero el curso gratis de programación básica.
* **JavaScript**: el curso de fundamentos de JavaScript sirve para refrescar conceptos clave.

---

## Cómo está organizado el repo del curso

Cada clase vive en **una rama distinta** del repositorio. Para ver el estado del proyecto en un punto, basta con cambiar a la rama de esa clase.

Ojo con la numeración: las ramas van una por detrás de las clases del sitio, porque la clase 1 es solo introducción y no tiene rama.

| Clase en Platzi | Rama del repo |
| --- | --- |
| 2. Clon de Airbnb en componentes | `clase-01/intro` |
| 3. Proyecto React con Vite | `clase-02/setup-proyecto` |
| 4. Estructura visual de App.jsx | `clase-03/estructura-visual` |
| 5. Dividir App.jsx en componentes | `clase-04/primeros-componentes` |
| 6. Props de padre a hijo | `clase-05/props` |

La rama `clase-01/intro` contiene solo `index.html` y `styles.css`: la maqueta estática de la que parte todo.

---

## Siguiente paso

Crear el proyecto desde cero con Vite.

**Para pensar:** ¿qué parte de Airbnb convertirías en tu propio componente?
