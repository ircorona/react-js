# Migrar de JavaScript a TypeScript en React

> Clase 16 de 18 en Platzi. El código corresponde a la rama [`clase-15/typescript-migracion`](https://github.com/platzi/react-js/tree/clase-15/typescript-migracion) del repo de Platzi.

## Resumen

El proyecto ya funciona en JavaScript. En esta clase no se rehace nada: se le agrega **TypeScript**, una capa de tipos que detecta errores **antes** de ejecutar el código. La clase cubre el inicio de la migración:

1. Planear la migración con ayuda de una IA.
2. Instalar TypeScript.
3. Renombrar los archivos de `.jsx` a `.tsx`.
4. Crear el primer `type`, `Property`.
5. Agregar el archivo `tsconfig.json`.

Tipar props, eventos, estados y funciones queda para la clase siguiente.

---

## JavaScript contra TypeScript

| | JavaScript | TypeScript |
| --- | --- | --- |
| Tipos | No tiene | Los agrega al código |
| Configuración | Menos | Necesita `tsconfig.json` |
| Cuándo aparece un error de tipo | Al ejecutar la app | Al escribir, en el editor |
| Autocompletado | Limitado | Completo: el editor conoce la forma de los datos |
| Documentación | Hay que leer el código | Los tipos describen la estructura |

* TypeScript **no reemplaza** a JavaScript. Es una capa encima: el navegador sigue recibiendo JavaScript, porque los tipos se borran al compilar.
* El argumento de producto: un proyecto en JavaScript cuesta más tiempo de mantener y depurar. Cuando crece y entran más desarrolladores, los tipos aceleran el trabajo.

---

## Paso 1: planear con IA [00:33]

Antes de tocar el código, se le pide a una IA que revise el proyecto y proponga un plan. En la clase se usa **Devin** en modo plan, con la instrucción: "dame la recomendación para migrar esta aplicación a TypeScript" [01:34].

El análisis encontró:

* Es una **SPA** con Vite y React 19.
* Ya tiene `@types/react` y `@types/react-dom`, los tipos de React.
* Falta instalar TypeScript, agregar `tsconfig.json` y tipar los nueve archivos de `src`.

Sirve cualquier editor o IA. Lo importante es leer la recomendación y **decidir tú** [02:56].

> **SPA** (Single Page Application): una aplicación que carga una sola página y actualiza el contenido sin recargar el navegador.

---

## Paso 2: instalar TypeScript

```bash
npm install -D typescript
```

En la rama es una sola línea nueva en `package.json`: `"typescript": "^6.0.3"`.

> El resumen de Platzi menciona también `ts-node` y pasar la configuración de Vite a TypeScript. Eso venía en el plan de la IA, pero la rama no lo hace: no instala `ts-node` y conserva `vite.config.js`.

---

## Paso 3: de .jsx a .tsx [03:30]

| Antes | Ahora | Regla |
| --- | --- | --- |
| `App.jsx`, `Header.jsx`, ... | `App.tsx`, `Header.tsx`, ... | Si el archivo tiene JSX, es `.tsx` |
| `properties.js`, `filterProperties.js` | `properties.ts`, `filterProperties.ts` | Si no tiene JSX, es `.ts` |

También hay que actualizar `index.html`, que carga el punto de entrada:

```html
<script type="module" src="/src/main.tsx"></script>
```

### Verde y rojo [04:20]

Al renombrar, el editor empieza a revisar los archivos:

| Archivo | Color | Por qué |
| --- | --- | --- |
| `Header.tsx` | Verde | No recibe datos dinámicos; no hay nada que tipar |
| `PropertyCard.tsx` | Rojo | Recibe props y nadie dijo de qué tipo son |

El error típico es *"Binding element 'title' implicitly has an 'any' type"*. `any` significa "cualquier cosa", que es justo lo que TypeScript quiere evitar.

Pista visual: el icono de JavaScript es azul claro y el de TypeScript es azul más oscuro.

---

## Paso 4: el primer type [04:55]

Un **type** describe la forma de un dato: qué campos tiene y de qué tipo es cada uno. Se revisa `properties.ts` y se anota cada campo:

```ts
// src/types/property.ts
export type Property = {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
  type: string;
};
```

| Tipo | Para qué | Campos |
| --- | --- | --- |
| `number` | Números | `id`, `price` |
| `string` | Texto | `title`, `location`, `image`, `type` |

* La carpeta `src/types/` sigue la organización de la clase anterior. El resumen de Platzi la llama `Types/PropertyType.ts`; en la rama es `types/property.ts`.
* Dentro del type los campos se separan con `;`, no con coma.

### Usar el type

```ts
// src/data/properties.ts
import type { Property } from "../types/property";

export const properties: Property[] = [ ... ];
```

* `: Property[]` se lee "un array de `Property`". Los dos puntos anotan el tipo de una variable.
* `import type` importa solo el tipo; desaparece del código final.
* El editor sugiere el import y la ruta automáticamente [06:16].

### El beneficio [06:54]

```ts
{ id: 1, title: "Apartamento moderno", price: "75", ... }
//                                     ~~~~~
// Type 'string' is not assignable to type 'number'.
```

El error aparece mientras escribes. No hay que esperar a ejecutar ni a desplegar para descubrirlo.

### Otros cambios de la rama

```tsx
// src/main.tsx
createRoot(document.getElementById('root')!).render(...)
```

`getElementById` puede devolver `null` si el elemento no existe. El `!` le dice a TypeScript "confía, no es null". Es rápido, pero apaga la revisión; la alternativa segura es un `if` que lance un error si falta.

---

## Paso 5: tsconfig.json [07:38]

Es el archivo con toda la configuración de TypeScript. Sin él, el proyecto no sabe cómo interpretar los tipos. Va en la raíz, junto a `package.json`.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": []
}
```

### Qué hace cada opción

Según la [referencia oficial de TSConfig](https://www.typescriptlang.org/es/tsconfig/).

**Las cinco que más importan**

| Opción | Valor | Qué hace |
| --- | --- | --- |
| `strict` | `true` | Activa toda la familia de revisiones estrictas. Es la que prohíbe el `any` implícito y obliga a revisar `null` |
| `jsx` | `"react-jsx"` | Indica cómo tratar el JSX. Con este valor no hace falta `import React` en cada archivo |
| `noEmit` | `true` | TypeScript **solo revisa**; no genera archivos `.js`. De convertir el código se encarga Vite |
| `allowJs` | `false` | No permite importar archivos `.js`. Obliga a migrar todo |
| `include` | `["src"]` | Qué carpetas revisa |

**Entorno y lenguaje**

| Opción | Valor | Qué hace |
| --- | --- | --- |
| `target` | `"ES2020"` | Versión de JavaScript a la que se apunta |
| `lib` | `DOM`, `DOM.Iterable`, `ES2020` | Qué APIs existen para TypeScript. `DOM` es lo que le permite conocer `document` y los eventos |
| `useDefineForClassFields` | `true` | Usa el comportamiento estándar de los campos de clase |

**Módulos e imports**

| Opción | Valor | Qué hace |
| --- | --- | --- |
| `module` | `"ESNext"` | Sistema de módulos: `import` y `export` modernos. Es el valor recomendado para código que pasa por un bundler |
| `moduleResolution` | `"bundler"` | Resuelve los imports como lo hace un bundler como Vite |
| `esModuleInterop` | `true` | Mejora la compatibilidad al importar librerías antiguas (CommonJS) |
| `allowSyntheticDefaultImports` | `true` | Permite `import React from "react"` aunque el módulo no tenga export default |
| `resolveJsonModule` | `true` | Permite importar archivos `.json` |
| `isolatedModules` | `true` | Avisa si escribes algo que no se puede convertir **archivo por archivo**, que es como trabaja Vite |

**Calidad y rendimiento**

| Opción | Valor | Qué hace |
| --- | --- | --- |
| `skipLibCheck` | `true` | No revisa los tipos internos de las librerías. Ahorra tiempo |
| `forceConsistentCasingInFileNames` | `true` | Error si un import escribe `./header` y el archivo es `Header`. Evita fallos entre Windows y Linux |
| `references` | `[]` | Para dividir un proyecto en partes. Vacío, no hace nada |

### Vite no revisa los tipos

Este es el punto que más confunde. Hay dos herramientas con trabajos distintos:

| Herramienta | Trabajo |
| --- | --- |
| Vite | Borra los tipos y sirve el JavaScript. **No** comprueba si son correctos |
| TypeScript (`tsc`) y el editor | Comprueban los tipos. No generan nada (`noEmit`) |

Por eso la app puede seguir funcionando en el navegador aunque un archivo esté en rojo. Para revisar todo el proyecto desde la terminal:

```bash
npx tsc --noEmit
```

En la rama de Platzi el script `build` sigue siendo `vite build`, así que un error de tipos **no** detiene el build. Para que lo detenga, el script debe ser `tsc -b && vite build`.

---

## Mi proyecto

Mi copia en `knowledge/original react-js` ya tiene la migración **completa**, hecha con Devin (PR #1 de mi repo). Va más lejos que esta clase y difiere en algunos puntos:

| | Rama de Platzi | Mi proyecto |
| --- | --- | --- |
| Avance | Extensiones, `Property` y `tsconfig` | Todo tipado: props, eventos, estados y funciones |
| Forma de `Property` | `type Property = { ... }` | `interface Property { ... }` |
| Campo `type` | `type: string` | `type?: string`, opcional |
| `tsconfig` | Un solo archivo | Tres: `tsconfig.json` apunta a `tsconfig.app.json` y `tsconfig.node.json` |
| `#root` en `main.tsx` | `!` | `if` que lanza un error |
| Script `build` | `vite build` | `tsc -b && vite build` |
| ESLint | Solo `.js` y `.jsx` | `typescript-eslint` sobre `.ts` y `.tsx` |
| Config de Vite | `vite.config.js` | `vite.config.ts` |

* `type` e `interface` sirven igual para describir un objeto. `interface` se puede extender; `type` también sirve para uniones como `string | null`.
* El `?` hace opcional el campo. Eso resolvió un pendiente de las clases 11 a 15: el filtro ya no se rompe si falta `type`, porque usa `property.type?.toLowerCase()`.
* Los tres `tsconfig` son la plantilla actual de Vite: uno para el código de la app (`src`) y otro para los archivos de configuración que corren en Node. Aquí sí se usa `references`.

---

## Preguntas rápidas

**¿TypeScript reemplaza a JavaScript?**
No. Agrega tipos encima de JavaScript y detecta errores antes de ejecutar. Por debajo todo sigue siendo JavaScript.

**¿Qué es un type?**
La descripción de la forma de un dato: qué campos tiene y de qué tipo es cada uno.

**¿Por qué PropertyCard queda en rojo y Header no?**
Porque `PropertyCard` recibe props sin tipo y `Header` no recibe nada.

**¿Para qué sirve tsconfig.json?**
Para configurar TypeScript: qué archivos revisa, qué tan estricto es y cómo trata el JSX y los imports.

---

## Siguiente paso

Completar la migración: tipar props, eventos, estados y funciones.
