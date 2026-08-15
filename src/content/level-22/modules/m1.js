const content = `
## Módulo 1 — Pipeline failure

### 🎯 Objetivos de aprendizaje

* Diagnosticar un pipeline roto de forma metódica.
* Clasificar fallos: config, código, infra o entorno.
* Aplicar la metodología de debugging al pipeline.

### ❓ Problema real que resuelve

Un pipeline falla y nadie sabe por qué: el log dice "Error", el equipo pierde horas mirando pantallas y el rojo se convierte en ruido. El pipeline failure sin metodología convierte cada fallo en un misterio. Aprender a diagnosticar pipelines rotos — con orden, hipótesis y evidencia — reduce el tiempo de recuperación y restaura la confianza en el CI/CD.

### 💡 Analogía

El pipeline roto es la luz de "check engine" del coche: el testigo (job rojo) solo dice que algo falló, no qué. Un buen mecánico no cambia piezas al azar: conecta el escáner (logs), lee el código de error (primer fallo), reproduce el problema y hace una hipótesis antes de tocar nada. El debugging de pipelines es exactamente eso: escáner, lectura y método.

### 📖 Explicación técnica

* **Primera regla**: lee el log desde el PRIMER error, no desde el final. El fallo real está arriba; todo lo que sigue suele ser ruido posterior.
* Clasifica el fallo antes de tocar nada:
  * **Configuración** (YAML inválido, trigger mal, sintaxis) — nivel 20.
  * **Código** (test que falla, build que no compila) — el pipeline hizo bien su trabajo.
  * **Infraestructura** (runner caído, red, caché corrupta, recursos) — nivel 4 y 22.
  * **Entorno** (secretos, variables, permisos) — niveles 11-12.
* Herramientas: logs de cada step, "re-run con debug", estado de cada job, artifacts de diagnóstico, acceso al runner self-hosted.
* El error del log es evidencia, no conclusión: "Error: connection refused" puede ser red, firewall, DNS o que el servicio no arrancó. La hipótesis se confirma con una segunda evidencia.
* Buenas prácticas: replicar el comando que falla en local, aislar el step (pipeline mínimo), buscar en el historial (¿falla siempre o desde un cambio?).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline rojo
   ↓
1. Lee el PRIMER error del log (no el final)
   ↓
2. Clasifica: ¿config, código, infra o entorno?
   ↓
3. Hipótesis con evidencia (no suposiciones)
   ↓
4. Reproduce en local / aísla el step
   ↓
5. Confirma con una segunda evidencia
   ↓
6. Arregla y verifica (pipeline verde)
\`\`\`

### 🧪 Ejercicios

1. Toma un pipeline rojo de tu proyecto y escribe el primer error de cada job.
2. Clasifica el fallo en una de las 4 categorías y justifica con evidencia.
3. Reescribe el fallo como una hipótesis comprobable y valídala.

### ⚠️ Errores comunes

* Leer el final del log (el error real está al principio del primer fallo).
* Cambiar el pipeline "a ver si pasa" sin hipótesis.
* Confundir síntoma (mensaje) con causa (config, código, infra o entorno).
* Ignorar el historial: "¿falla desde cuándo?" es la pregunta más poderosa.

### 🔗 Conexión DevOps

El diagnóstico de pipeline failure es la base del nivel 22: cada módulo siguiente (build, dependencias, runners, Docker, Kubernetes, Terraform) aplica este mismo método a una capa distinta. Dominar el método hace que el resto sea mecánico — y conecta con la confiabilidad del pipeline (nivel 20).
`
export default content
