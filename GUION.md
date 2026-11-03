# HeroForge RPG · Guion para grabar

Abre [HeroForge en el navegador](http://localhost:8086/) o en Expo Go. Empieza con el héroe sin equipo y con 100 de vida. Deja abiertos en el editor los archivos enlazados en la sección 3.

En cada paso, **haz lo que dice Pantalla y luego lee lo que dice Di**. Los tiempos incluyen los clics, el desplazamiento y las pausas para señalar el código.

## 1. De 0:00 a 1:30 · El problema

**Pantalla.** Empieza en el avatar. Baja despacio y señala Entrenamiento, Armería y Arena.

**Di.** «Profe, esta es HeroForge RPG. Estas cuatro secciones trabajan con el mismo personaje.

El problema sería que, si utilizáramos únicamente useState para compartir información entre estos componentes, tendríamos que pasar constantemente datos y funciones entre ellos. La información podría pasar por componentes que realmente no la necesitan. Y si cada sección guardara su propia copia, podríamos duplicar datos o perder la sincronización entre ellos.

Para solucionar esto utilizamos Redux Toolkit, que centraliza la información en un store global».

**Pantalla.** Señala el inspector en la Arena.

**Di.** «El flujo va en una dirección. Toco un botón y la interfaz despacha una acción. Redux ejecuta los reducers para actualizar el estado del store. Los selectores leen los valores actualizados y React vuelve a renderizar las partes de la interfaz que los usan. Aquí en el inspector podemos ver qué acción se despachó».

## 2. De 1:30 a 3:30 · Demostración

**Pantalla.** En Entrenamiento, pulsa **+** en Fuerza. Señala el valor base y los puntos disponibles. Pulsa **−** para devolver el punto.

**Di.** «Al tocar más, la fuerza base pasa de 5 a 6 y me quedan 14 puntos para gastar. Con menos recupero el punto. El total de cada atributo es la base más el bono del equipo».

**Pantalla.** Equipa el **Báculo Arcano** con un solo toque. Señala, en este orden, la tarjeta equipada, la inteligencia total de 15, el avatar Archimago con 5 kg de carga y el poder de 70 junto al historial.

**Di.** «Solo toqué el báculo. La armería lo marca como equipado, Entrenamiento muestra 5 de inteligencia base más 10 del equipo, el avatar cambia a Archimago y la arena sube de 40 a 70 de poder. En el inspector aparece la acción con el ID del báculo».

**Pantalla.** Toca **Quitar todo**. Equipa solo la **Armadura Maldita**. Señala la alerta, el peso **25 / 20 kg** y el poder de **32**.

**Di.** «La armadura pesa 25 kilos y mi capacidad es de 20. La sobrecarga reduce mi velocidad a la mitad y mi poder un 30%».

**Pantalla.** En Arena, pulsa **Atacar al jefe** una vez y muestra los **67 de vida**. Pulsa **Recibir 25 de daño** y señala los **42 de vida** y `stats/takeDamage` en el inspector. Sube al avatar y muestra los mismos 42.

**Di.** «El dragón me devolvió el golpe. Ahora, al pulsar Recibir 25 de daño, mi vida baja de 67 a 42. La arena y el avatar muestran el mismo valor porque leen la vida del mismo store. El inspector registra la acción con el número 25».

## 3. De 3:30 a 5:30 · Qué mostrar en el código

| Tiempo | Pantalla | Di |
| --- | --- | --- |
| 3:30–3:55 | Abre [src/store/index.js](src/store/index.js#L6). Señala la línea `export const store = configureStore(...)` y después `stats, inventory, actionLog`. | «Aquí se crea el store global. Lo configuro con tres reducers. Stats guarda los atributos y la vida. Inventory guarda el catálogo y los objetos equipados. ActionLog guarda las últimas cinco acciones». |
| 3:55–4:10 | Abre [App.js](App.js#L11). Señala `<Provider store={store}>`. | «El Provider les da acceso al mismo store a las cuatro secciones. Por eso, cuando cambia la vida en la arena, el avatar puede leerla sin recibirla por props desde la arena». |
| 4:10–4:45 | Abre [inventorySlice.js](src/store/slices/inventorySlice.js#L16). Señala `toggleEquipItem`, luego `payload: id` y al final `splice` y `push`. | «Esta es la acción que probé con el báculo. En el payload viaja su ID, que es staff. El reducer busca ese ID. Si ya está equipado, lo quita con splice. Si falta, lo agrega con push. Redux Toolkit usa Immer para que yo escriba esos cambios sobre un borrador y Redux produzca un estado nuevo sin modificar el anterior». |
| 4:45–5:15 | Abre [selectors.js](src/store/selectors.js#L22). Señala `selectCapacity`, `selectIsOverencumbered` y `selectCombatPower`. | «El peso, la sobrecarga y el poder son valores derivados. El selector calcula la capacidad como 10 más el doble de la fuerza total. Si el peso supera la capacidad, el selector de poder aplica el 30% de penalización. Así, cuando cambia el equipo, los cálculos se actualizan a partir de los mismos datos». |
| 5:15–5:30 | Abre [actionLogSlice.js](src/store/slices/actionLogSlice.js#L8). Señala `addMatcher` y la línea que limita el historial a cinco entradas. | «Este slice escucha las acciones de atributos e inventario. Guarda el tipo y el payload para que podamos verlos en el inspector». |

## 4. De 5:30 a 6:30 · Cierre

**Pantalla.** Regresa a la Arena. Pulsa **Curar y reiniciar duelo** y señala las dos barras de vida. Deja el inspector visible al terminar.

**Di.** «En un proyecto móvil usaría useState para información que solo necesita un componente. Por ejemplo, la vida del Boss podría manejarse con useState porque solo se muestra en la arena. En esta versión quedó en Redux junto con el resultado del turno.

En cambio, usaría Redux Toolkit cuando varios componentes necesitan acceder a la misma información y las acciones de distintas secciones pueden cambiarla. Aquí pasa con los atributos, la vida y el equipamiento del personaje. Por ejemplo, puedo recibir daño en la arena y ver la vida actualizada en el avatar».

Deja hasta 30 segundos de margen para cambiar entre la app y el editor. El video debe quedar entre 5 y 7 minutos.
