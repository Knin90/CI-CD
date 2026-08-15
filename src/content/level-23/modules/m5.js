const content = `
## Módulo 5 — Fast feedback

### 🎯 Objetivos de aprendizaje

* Diseñar el pipeline para feedback rápido.
* Ordenar los pasos por velocidad y valor.
* Acortar el tiempo entre commit y veredicto.

### ❓ Problema real que resuelve

El pipeline tarda 45 minutos en decir "hay un error de lint en el commit": el desarrollador ya avanzó 3 commits y el contexto se perdió. El feedback lento hace que el CI sea ignorado (el rojo llega tarde, no significa nada — nivel 20 de 22). El feedback rápido — el veredicto llega en minutos, y lo más probable de fallar corre primero — mantiene el pipeline como red de seguridad real.

### 💡 Analogía

El feedback rápido es el termómetro en la mesa del examen: si el profesor corrige los exámenes un mes después, los alumnos ya no recuerdan qué respondieron. Si corrige en 10 minutos, el aprendizaje es inmediato. El pipeline es el profesor: cuanto antes diga "esto está mal", antes se arregla — y con el contexto fresco.

### 📖 Explicación técnica

* **Fast feedback**: minimizar el tiempo entre el commit y el veredicto (verde/rojo) sin sacrificar la cobertura.
* Técnicas:
  * **Orden por probabilidad de fallo**: lint y unit tests primero (rápidos, fallan a menudo); builds e integración después; deploys al final (nivel 5 y 19).
  * **Paralelización**: jobs independientes en paralelo (nivel 6 de este nivel).
  * **Selección inteligente**: correr solo lo afectado por el cambio (path filters — nivel 19), no todo siempre.
  * **Cachés**: dependencias y builds cacheados (nivel 7 de este nivel) para no repetir trabajo.
  * **Pruebas en capas**: rápidas y unitarias primero; integración y e2e después o en paralelo (nivel 7).
  * **Pipeline mínimo viable primero**: veredicto básico en minutos, profundidad después.
* La métrica es el tiempo de feedback: mide cuánto tarda el commit en recibir su veredicto (nivel 18 y 20 de 22) y optimízalo.
* Buenas prácticas: monitorizar el tiempo del pipeline, alertar cuando crece (nivel 18), y mantener el pipeline rápido para que el equipo lo use.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Commit → pipeline inicia
   ↓
Primero lo más rápido y probable de fallar (lint, unit)
   ↓
Paralelo: jobs independientes a la vez
   ↓
Cachés: no repetir dependencias/builds
   ↓
Veredicto en minutos (no en horas)
   ↓
Rojos tempranos con contexto fresco
   ↓
El equipo confía y usa el pipeline
\`\`\`

### 🧪 Ejercicios

1. Mide el tiempo de tu pipeline commit → veredicto.
2. Reordena los pasos por velocidad y probabilidad de fallo.
3. Activa path filters para correr solo lo afectado por el cambio.

### ⚠️ Errores comunes

* Todo en serie aunque sea independiente (el paralelo existe — nivel 6).
* Pruebas e2e al inicio del pipeline (lentas y el lint espera — nivel 7).
* Ignorar el tiempo del pipeline hasta que el equipo deja de mirarlo (nivel 20 de 22).
* Cachés mal configuradas que tardan más que recalcular (nivel 7 de este nivel).

### 🔗 Conexión DevOps

El feedback rápido conecta con jobs y stages (nivel 5), paralelización (módulo 6), cachés (módulo 7), testing en capas (nivel 7) y observabilidad (nivel 18). Es lo que mantiene el pipeline vivo: rápido y confiable, o ignorado.
`
export default content
