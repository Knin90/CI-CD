const content = `
## Módulo 17 — Environment problems

### 🎯 Objetivos de aprendizaje

* Diagnosticar problemas de entornos en el pipeline.
* Distinguir config de entorno, datos y estado.
* Estabilizar entornos para un CD confiable.

### ❓ Problema real que resuelve

El deploy a staging falla pero en dev funciona: la config es distinta, los datos están corruptos, el entorno está "sucio" de despliegues anteriores, o staging no se parece a producción. Los problemas de entornos (nivel 12) son la causa clásica de "funciona en mi máquina" a escala: cada entorno tiene su propia configuración, datos y estado. Diagnosticarlos es separar qué difiere entre entornos.

### 💡 Analogía

Los entornos son los pisos del edificio: dev es el piso de pruebas, staging el piso de ensayo general y producción el piso de los clientes. Si el ensayo general falla, no es que el guion (código) esté mal: puede ser que el piso de staging tenga la iluminación distinta (config), el atrezo de otra obra (datos), o restos del ensayo anterior (estado sucio). Hay que comparar los pisos, no reescribir el guion.

### 📖 Explicación técnica

* Problemas típicos por categoría:
  * **Configuración**: variables, feature flags, URLs, credenciales distintas por entorno (nivel 11 y 12) — el mismo artefacto se configura distinto.
  * **Datos**: staging con datos viejos, migraciones pendientes, datos de prueba que rompen la lógica, backups restaurados mal.
  * **Estado**: restos de despliegues anteriores (recursos huérfanos, versiones mezcladas, secrets viejos), "drift" entre lo declarado y lo real (nivel 15).
  * **Paridad**: staging que no se parece a producción (versiones, tamaños, features) — los fallos aparecen solo en prod.
  * **Aislamiento**: entornos que comparten recursos (base de datos, cola, cloud) y se pisan entre sí (nivel 23).
* Método: compara el entorno que falla con el que funciona (config, datos, versión, recursos) → verifica el último despliegue (¿qué cambió?) → mira el estado (recursos huérfanos, drift) → decide: config, datos, paridad o aislamiento.
* Buenas prácticas: entornos aislados (nivel 23), config por entorno versionada (nivel 11), datos reproducibles (seeds/migraciones), staging con paridad razonable, y entornos efímeros para pruebas (nivel 20).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Deploy a entorno falla (staging/prod)
   ↓
¿Qué difiere del entorno que funciona?
   ↓
Config: variables, flags, URLs, secrets
   ↓
Datos: migraciones, seeds, estado
   ↓
Estado: recursos huérfanos, drift, restos
   ↓
Paridad: ¿staging se parece a prod?
   ↓
Corrige la diferencia correcta
\`\`\`

### 🧪 Ejercicios

1. Despliega a staging con una variable de prod y diagnostica la diferencia.
2. Deja un recurso huérfano de un despliegue anterior y observa el conflicto.
3. Documenta las diferencias entre tus entornos (config, datos, versión).

### ⚠️ Errores comunes

* Asumir que todos los entornos son iguales (cada uno tiene config, datos y estado propios).
* Reiniciar el entorno "a ver si pasa" (borra evidencia y puede empeorar).
* Arreglar la app cuando el problema es del entorno (o al revés).
* Entornos que comparten recursos y se pisan (el bug aparece "aleatorio" — nivel 23).

### 🔗 Conexión DevOps

Los entornos conectan con environments (nivel 12), variables y secrets (nivel 11), environment isolation (nivel 23), test environments (nivel 20) y drift (nivel 15). Es el módulo de "funciona aquí pero no allá": la disciplina de comparar y aislar entornos.
`
export default content
