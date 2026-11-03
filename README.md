# HeroForge RPG

Mini-RPG de una pantalla para observar cómo una acción de Redux actualiza el héroe, los atributos, la armería y la arena. El juego corre localmente y el estado se reinicia al recargar la app.

## Abrir en Expo Go

Con Node.js 22.13 o superior, ejecuta desde esta carpeta:

```bash
npm ci
npm start
```

Conecta el computador y el teléfono a la misma red Wi-Fi. Escanea el QR de la terminal con Expo Go en Android. Usa una versión de Expo Go compatible con **SDK 58**, disponible en [Expo Go](https://expo.dev/go). Para iPhone, revisa las instrucciones de Expo para [instalar la versión compatible](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/).

## Demo rápida

1. Al abrir verás al Aldeano con 100 de vida, 15 puntos disponibles y una capacidad de 20 kg.
2. Equipa el Báculo Arcano. El héroe se vuelve Archimago, muestra el báculo y sube su poder de 40 a 70.
3. Toca **Quitar todo** y equipa solo la Armadura Maldita. Verás 25 de 20 kg, Tanque Pesado y poder de 32 tras la penalización.
4. Ataca dos veces con la armadura equipada. El dragón baja a 186 de vida y el héroe queda herido con 34 de vida. El inspector muestra los dos turnos.
5. Usa **Curar y reiniciar duelo** para restaurar a ambos combatientes. Prueba **Mago** para repartir los 15 puntos con una sola acción.

Consulta el [guion para el video](GUION.md).

## Abrir en el navegador

Ejecuta `npm run web` y abre [localhost:8086](http://localhost:8086/) en el computador. Para el teléfono, usa el QR de `npm start` con Expo Go.
