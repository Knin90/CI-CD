const content = `
## Módulo 6 — Environment-specific configuration

### 🎯 Objetivos de aprendizaje

* Diseñar configuración específica por entorno sin duplicar código.
* Usar config maps, archivos por entorno y variables combinadas.
* Mantener paridad de configuración entre entornos.

### ❓ Problema real que resuelve

Cada entorno necesita valores distintos (URLs, límites, flags), pero gestionarlos como copias de archivos duplicados genera drift: dev se actualiza, staging se olvida, producción queda con valores viejos. La configuración específica por entorno debe ser declarativa, versionada y derivada de una fuente única.

### 💡 Analogía

Es como el uniforme del equipo: la prenda base es la misma para todos, pero el escudo (logo), el nombre y el número se personalizan por jugador. Si cada jugador tuviera un uniforme completamente distinto, el equipo no se reconocería.

### 📖 Explicación técnica

* Estrategias de configuración por entorno:
  * **Variables de entorno**: valores inyectados en runtime (la más común).
  * **Config files por entorno**: \`config/dev.yaml\`, \`config/prod.yaml\` seleccionados por \`NODE_ENV\` o equivalente.
  * **ConfigMap/Secret de Kubernetes** (nivel 14): configuración montada por entorno.
  * **Gestores de configuración** (Consul, Vault, AppConfig): dinámicos en runtime.
* Base común + overrides: un archivo base compartido y diferencias mínimas por entorno.
* Paridad: la lógica de configuración debe ser idéntica; solo cambian los valores. Si un entorno necesita código distinto, es señal de diseño pobre.
* Validación: esquemas de configuración (JSON Schema) que validan que el entorno recibió todos los valores.
* Buenas prácticas: defaults seguros (fail closed), validación al arranque, versionar la configuración, auditar cambios de configuración.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Config base (común)
   +
Config por entorno (dev/staging/prod)
   ↓
Pipeline inyecta variables
   ↓
App valida configuración al arrancar
   ↓
Misma imagen + config = comportamiento por entorno
\`\`\`

### 🧪 Ejercicios

1. Refactoriza la configuración de tu app a "base + overrides por entorno".
2. Añade validación de configuración al arranque (fail fast si falta un valor).
3. Compara los valores de configuración de staging y producción: ¿hay drift?

### ⚠️ Errores comunes

* Copiar archivos de configuración por entorno y dejarlos divergir.
* Valores sensibles dentro de los archivos de configuración (van al Secret).
* Configuración que solo existe en producción (nadie sabe qué hay ahí).
* Código condicional según entorno (\`if (env === 'prod')\`) en lugar de configuración.

### 🔗 Conexión DevOps

La configuración por entorno es la materialización de "build once, deploy many": el artefacto es inmutable y el entorno lo configura. Se conecta con environments (nivel 12), secrets (nivel 11) y Kubernetes (nivel 14).
`
export default content
