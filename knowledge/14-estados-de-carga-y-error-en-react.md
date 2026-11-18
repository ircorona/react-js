# Estados de carga y error en React

> Clase 14 de 18 en Platzi. El código corresponde a la rama [`clase-13/loading-error`](https://github.com/platzi/react-js/tree/clase-13/loading-error) del repo de Platzi.

## Resumen

En la clase anterior, mientras los datos "viajaban", la app mostraba el mensaje de lista vacía y parecía rota. Una aplicación seria le dice al usuario **qué está pasando en cada momento**: cargando, error o listo. En esta clase se agregan dos estados, `isLoading` y `error`, se protege la carga con `try / catch / finally` y la interfaz elige qué mostrar con renderizado condicional.

Solo cambia `App.jsx`.

---

## Los cuatro escenarios

| Escenario | `isLoading` | `error` | Datos | Qué ve el usuario |
| --- | --- | --- | --- | --- |
| Cargando | `true` | `null` | `[]` | "Cargando propiedades..." |
| Error | `false` | Un mensaje | `[]` | El mensaje de error |
| Éxito | `false` | `null` | 7 propiedades | Las cards |
| Vacío | `false` | `null` | `[]` | "No encontramos alojamientos..." |

**Vacío no es error** [10:05]. La carga salió bien, pero no trajo elementos. Ese caso ya lo resuelve `PropertyList` desde la clase 8, y es el mismo mensaje de una búsqueda sin resultados.

---

## Paso 1: dos estados nuevos [01:24]

```jsx
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
```

| Estado | Valor inicial | Por qué |
| --- | --- | --- |
| `isLoading` | `true` | Al abrir la app siempre se está cargando |
| `error` | `null` | Al principio no hay ningún error |

* Convención: los booleanos se nombran con `is` o `has` (`isLoading`, `hasError`).
* `error` no es un booleano: guarda el **mensaje**. `null` significa "sin error", y cualquier texto significa "hay error y este es".
* Declararlos no cambia nada. Falta conectarlos con la lógica y con la interfaz.

---

## Paso 2: try, catch y finally [02:15]

```jsx
useEffect(() => {
  const timerId = setTimeout(() => {
    try {
      setPropertiesFromAPI(properties);
    } catch {
      setError("No pudimos cargar las propiedades.");
    } finally {
      setIsLoading(false);
    }
  }, 4000);

  return () => clearTimeout(timerId);
}, []);
```

| Bloque | Cuándo corre | Qué hace aquí |
| --- | --- | --- |
| `try` | Siempre, primero | Intenta guardar las propiedades |
| `catch` | Solo si algo falla dentro del `try` | Guarda el mensaje de error |
| `finally` | Siempre, haya error o no | Apaga `isLoading` |

`finally` es la pieza clave: como `isLoading` empieza en `true`, hay que apagarlo **en los dos caminos**. Si solo se apagara en el `try`, un error dejaría la app en "Cargando..." para siempre.

> El resumen de Platzi escribe `setProperties(propertiesFromAPI)`. Es un error de transcripción: en la rama es `setPropertiesFromAPI(properties)`.

### catch con y sin variable

```jsx
} catch (error) {    // recibe el objeto del error
} catch {            // lo ignora; válido desde ES2019
```

Si no vas a usar el objeto, usa la forma corta. Con `catch (error)` pasan dos cosas: ESLint marca la variable como **no usada**, y además ese `error` **tapa** al estado `error` dentro del bloque (shadowing). Si necesitas el objeto, dale otro nombre, por ejemplo `catch (err)`.

---

## Paso 3: limpiar el timeout [03:20]

```jsx
const timerId = setTimeout(...);
return () => clearTimeout(timerId);
```

* `setTimeout` devuelve un identificador. Se guarda para poder cancelar el temporizador.
* La función que **devuelve** el efecto es la **función de limpieza**. React la ejecuta cuando el componente se desmonta, o antes de volver a correr el efecto.
* Sin ella, si el componente desaparece antes de que pasen los 4 segundos, el temporizador igual se dispara e intenta actualizar el estado de algo que ya no existe.
* Con `<StrictMode>`, en desarrollo React monta, desmonta y vuelve a montar. La limpieza cancela el primer temporizador y solo queda uno.

> El resumen dice que esto "evita loops infinitos". No es exacto: el loop infinito lo evita el array de dependencias `[]`. La limpieza evita **temporizadores huérfanos** que gastan recursos.

---

## Paso 4: la interfaz [05:10]

```jsx
{isLoading && <p>Cargando propiedades...</p>}

{error && <p>{error}</p>}

{!isLoading && !error && (
  <PropertyList properties={filteredProperties} />
)}
```

| Línea | Se muestra cuando |
| --- | --- |
| `isLoading && ...` | Se está cargando |
| `error && ...` | Hay un mensaje de error |
| `!isLoading && !error && ...` | Ya terminó de cargar **y** no hubo error |

### Por qué hay que envolver PropertyList [06:05]

Con solo agregar el "Cargando...", `PropertyList` se seguía pintando debajo con su mensaje de lista vacía, porque durante la carga recibe `[]`. La tercera condición lo saca de la pantalla hasta que haya algo real que mostrar.

Es el `&&` de la tabla de la clase 8. Aquí es seguro porque `isLoading` es booleano y `error` es `null` o texto: ninguno puede ser el número `0`.

---

## Cómo probar el error [07:30]

No hay API real que pueda fallar, así que el error se **lanza a mano**:

```jsx
try {
  // setPropertiesFromAPI(properties);
  throw new Error("Error simulado");
} catch {
  setError("No pudimos cargar las propiedades.");
} finally {
  setIsLoading(false);
}
```

* `throw` interrumpe el `try` y salta directo al `catch` [08:40].
* Secuencia en pantalla: "Cargando propiedades..." y luego el mensaje de error. `PropertyList` nunca aparece.
* Cambiar el valor inicial de `error` a `true` no sirve como prueba: React no pinta los booleanos, así que saldría un párrafo vacío. El error necesita un **mensaje**.
* Al terminar, se borra el `throw` y se restaura el `set`. El código de prueba no se deja comentado.

### Cómo probar el vacío [10:05]

Comentar los objetos de `properties.js` para dejar el array en `[]`. No hay error: carga, termina y `PropertyList` muestra su mensaje de lista vacía.

---

## La línea de tiempo

```
0 s   isLoading = true              →  "Cargando propiedades..."

4 s   try      setPropertiesFromAPI(properties)
      finally  setIsLoading(false)  →  aparecen las cards

Si falla:
4 s   catch    setError("...")
      finally  setIsLoading(false)  →  aparece el mensaje de error
```

---

## Detalles a recordar

* En este ejemplo el `catch` nunca se activa solo: guardar un array en el estado no falla. El patrón se practica aquí para cuando haya una API de verdad.
* Con una API real el código cambia de forma. Un `try / catch` normal **no** atrapa errores de una promesa; hace falta `async / await` dentro del efecto:

  ```jsx
  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(url);
        setPropertiesFromAPI(await response.json());
      } catch {
        setError("No pudimos cargar las propiedades.");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);
  ```

* El buscador sigue visible durante la carga y el error. Solo el listado depende de los tres estados.
* Tres estados sueltos (`datos`, `isLoading`, `error`) son el patrón básico. Librerías como TanStack Query, mencionada en la clase 9, lo entregan ya resuelto.

---

## Preguntas rápidas

**¿Qué es isLoading?**
Un estado que indica si los datos todavía se están cargando. Empieza en `true` y pasa a `false` cuando la carga termina, con éxito o con error.

**¿Por qué setIsLoading(false) va en el finally?**
Porque debe ejecutarse en los dos casos. Así la interfaz siempre sale del "Cargando...".

**¿Por qué limpiar el timeout?**
Para que no quede un temporizador vivo que intente actualizar un componente que ya no está.

**¿Diferencia entre error y lista vacía?**
En el error la carga falló. En la lista vacía la carga funcionó, pero no trajo elementos.

---

## Siguiente paso

Organizar mejor los componentes y las carpetas del proyecto.
