# Tipar props, eventos y estados con TypeScript

> Clase 17 de 18 en Platzi. El código corresponde a la rama [`clase-16/typescript-tipado`](https://github.com/platzi/react-js/tree/clase-16/typescript-tipado) del repo de Platzi.

## Resumen

La clase anterior dejó el proyecto con extensiones `.tsx`, el type `Property` y el `tsconfig.json`, pero con los componentes en rojo. Aquí se completa la migración revisando, archivo por archivo, lo que entregó Devin [00:14]. Se tipan cinco cosas:

| Qué | Dónde | Cómo |
| --- | --- | --- |
| Datos | `properties.ts` | `Property[]` |
| Props | `PropertyCard`, `PropertyList`, `SearchBar` | Un type local `AlgoProps` |
| Funciones | `filterProperties.ts` | Tipos en parámetros y en el retorno |
| Eventos | `SearchBar` | Tipos de evento que exporta React |
| Estados | `App.tsx` | `useState<Tipo>(...)` |

La app hace lo mismo que antes. Ahora es más segura, más explícita y más fácil de mantener [05:40].

---

## Archivos sin cambios

`Header` y `Hero` no reciben datos variables, así que no hay nada que tipar [00:35]. TypeScript deduce solo que devuelven JSX.

---

## Props: un type local por componente

El patrón es siempre el mismo:

1. Crear un type llamado `NombreDelComponenteProps`.
2. Anotarlo después de la desestructuración, con dos puntos.

Se llama **type local** porque vive en el mismo archivo del componente y solo lo usa él.

### PropertyCard [00:48]

```tsx
// src/components/properties/PropertyCard.tsx
import type { Property } from "../../types/property";

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="property-card">
      <img src={property.image} alt={property.title} />
      <div className="property-card-content">
        <h4>{property.title}</h4>
        <p>{property.location}</p>
        <p>{property.type || "Tipo no especificado"}</p>
        <strong>${property.price} / noche</strong>
      </div>
    </article>
  );
}
```

Además del tipado hay un cambio de diseño: antes el componente recibía **cinco props sueltas** y ahora recibe **una sola**, el objeto completo.

| | Antes | Ahora |
| --- | --- | --- |
| Props | `title`, `location`, `price`, `image`, `type` | `property` |
| Uso dentro | `{title}` | `{property.title}` |
| Si `Property` gana un campo | Hay que agregar la prop en el padre y en el hijo | No hay que tocar nada para que llegue |

### Mayúscula y minúscula [01:15]

```tsx
property: Property;
//  │        └── el TYPE, definido en types/property.ts
//  └── el nombre de la PROP
```

Convención: los tipos y los componentes van en **PascalCase**; las variables y las props, en **camelCase**. Por eso pueden llamarse casi igual sin chocar.

### PropertyList [01:49]

```tsx
// src/components/properties/PropertyList.tsx
type PropertyListProps = {
  properties: Property[];
};

export function PropertyList({ properties }: PropertyListProps) {
  ...
  {properties.map((property) => (
    <PropertyCard key={property.id} property={property} />
  ))}
}
```

* `Property[]` es "un array de `Property`": muchos objetos, todos con la misma forma. Los corchetes van **después** del tipo.
* Dentro del `map` no hay que anotar nada: TypeScript deduce que cada `property` es un `Property`. A esto se le llama **inferencia**.
* `key` no se declara en el type. Es una prop especial de React y no llega al hijo.

> El resumen de Platzi escribe "PropertyCart" y dice que se agregan "llaves". Es `PropertyCard`, y `[]` son corchetes.

---

## Props que son funciones [02:40]

```tsx
// src/components/ui/SearchBar.tsx
type SearchBarProps = {
  value: string;
  searchValue: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  onClear: () => void;
};
```

Una función se tipa con la forma `(parámetros) => retorno`:

| Tipo | Se lee |
| --- | --- |
| `(value: string) => void` | Recibe un texto y no devuelve nada |
| `() => void` | No recibe nada y no devuelve nada |

`void` significa "no devuelve un valor útil". Por eso `setCity` y `setSearch` encajan directo en `onChange` y `onSearch`.

---

## Eventos [03:00]

```tsx
import type { ChangeEvent, SubmitEvent } from "react";

function handleChange(event: ChangeEvent<HTMLInputElement>) {
  onChange(event.target.value);
}

function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
  event.preventDefault();
  onSearch(value.trim());
}
...
<form className="search-section" onSubmit={handleSubmit}>
  <input value={value} onChange={handleChange} />
```

Un tipo de evento tiene dos partes: **qué pasó** y **en qué elemento**.

| Evento | Tipo | Elemento |
| --- | --- | --- |
| Escribir en un input | `ChangeEvent<HTMLInputElement>` | `HTMLInputElement` |
| Enviar un formulario | `SubmitEvent<HTMLFormElement>` | `HTMLFormElement` |
| Clic en un botón | `MouseEvent<HTMLButtonElement>` | `HTMLButtonElement` |

* La parte entre `< >` se llama **genérico**. Gracias a ella TypeScript sabe que `event.target.value` existe y es un `string`.
* Los tipos vienen de React, no del navegador. Se importan con `import type`.

### Por qué aparece handleChange

Con la función escrita en línea, `onChange={(event) => ...}`, TypeScript **infiere** el tipo del evento por el lugar donde está y no hay que anotar nada. Al sacarla a una función con nombre se pierde ese contexto y hay que escribir el tipo. Las dos formas son correctas.

### FormEvent contra SubmitEvent

La rama de Platzi usa `FormEvent<HTMLFormElement>` para el submit. Mi código usa `SubmitEvent<HTMLFormElement>`. En la versión de los tipos de React que tiene el proyecto (`@types/react` 19.2.14), `FormEvent` está marcado como **obsoleto**, con la indicación de usar `ChangeEvent`, `InputEvent` o `SubmitEvent`. Los dos compilan; `SubmitEvent` es el vigente.

> El resumen de Platzi menciona `ChangeEvent` y `ComponentProps`. La rama importa `ChangeEvent` y `FormEvent`; `ComponentProps` no se usa.

---

## Funciones

```ts
// src/utils/filterProperties.ts
import type { Property } from "../types/property";

export function filterProperties(
  properties: Property[],
  searchText: string,
): Property[] {
  ...
}
```

Se tipan los **parámetros** y, después del paréntesis, el **valor de retorno**. Si alguien llama `filterProperties(search, propertiesFromAPI)` con los argumentos al revés, el editor lo marca.

---

## Estados [04:55]

```tsx
// src/App.tsx
import type { Property } from "./types/property";

const [city, setCity] = useState("");                                      // string, inferido
const [isLoading, setIsLoading] = useState(true);                          // boolean, inferido
const [propertiesFromAPI, setPropertiesFromAPI] = useState<Property[]>([]);
const [error, setError] = useState<string | null>(null);
```

| Estado | Valor inicial | ¿Se anota? | Por qué |
| --- | --- | --- | --- |
| `city`, `search` | `""` | No | TypeScript deduce `string` |
| `isLoading` | `true` | No | Deduce `boolean` |
| `propertiesFromAPI` | `[]` | Sí, `<Property[]>` | Un array vacío no dice de qué es |
| `error` | `null` | Sí, `<string \| null>` | De `null` solo deduciría `null` y nunca aceptaría un texto |

* `string | null` es una **unión**: el valor puede ser de un tipo **o** del otro.
* `setError(404)` da error; `setError("404")` se acepta, porque entre comillas es un `string` [05:15].

> Regla: se anota el `useState` cuando el valor inicial no alcanza para deducir el tipo. Los casos típicos son `[]` y `null`.

---

## La prueba [03:30]

En `properties.ts`, cambiar un precio a texto:

```ts
price: "75",
// Type 'string' is not assignable to type 'number'.
```

El error aparece al escribir. En JavaScript ese fallo se descubriría con la app en ejecución o ya desplegada. TypeScript ahorra el tiempo de build, el de despliegue y el de buscar dónde está el error [04:30].

---

## Otros cambios de la rama

* `src/vite-env.d.ts`, con la línea `/// <reference types="vite/client" />`. Le enseña a TypeScript los tipos de Vite, por ejemplo cómo importar un `.css` o una imagen. Mi proyecto logra lo mismo con `"types": ["vite/client"]` en `tsconfig.app.json`.
* `main.tsx` importa `./App` sin la extensión `.tsx`.

---

## Mi proyecto contra la rama

| | Rama de Platzi | Mi proyecto |
| --- | --- | --- |
| Props | `type AlgoProps = { ... }` | `type` en `PropertyCard`, `interface` en `PropertyList` y `SearchBar` |
| Evento de submit | `FormEvent` | `SubmitEvent` |
| Handlers | Funciones flecha en `const` | `function` |
| Campo `type` de `Property` | Obligatorio | Opcional (`type?: string`) |
| Tipo faltante en la card | No muestra el párrafo | Muestra "Tipo no especificado" |
| Nombre de la prop | `searchedValue` | `searchValue` |

Todas son diferencias de estilo. `tsc -b` y ESLint pasan sin errores.

---

## Resumen de sintaxis

| Sintaxis | Significado |
| --- | --- |
| `nombre: Tipo` | Anotar el tipo de una variable, parámetro o prop |
| `Tipo[]` | Array de ese tipo |
| `A \| B` | Uno u otro (unión) |
| `campo?: Tipo` | Campo opcional |
| `(x: Tipo) => void` | Función que recibe `x` y no devuelve nada |
| `useState<Tipo>(...)` | Estado con tipo explícito |
| `Evento<Elemento>` | Tipo de evento sobre un elemento concreto |
| `import type { X }` | Importar solo un tipo |

---

## Preguntas rápidas

**¿Qué es un type local?**
Un type definido dentro del archivo del componente para describir sus props, como `PropertyCardProps`.

**¿Cómo se tipa un array de objetos?**
Con el tipo seguido de corchetes: `Property[]`.

**¿Por qué usar ChangeEvent?**
Porque describe con precisión el evento de un input. TypeScript sabe que `event.target.value` es un texto y avisa si se usa mal.

**¿Cuándo hay que anotar un useState?**
Cuando el valor inicial no basta para deducir el tipo, como `[]` o `null`.

---

## Siguiente paso

El entregable final del curso.
