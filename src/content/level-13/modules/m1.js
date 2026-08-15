const content = `
## Módulo 1 — Deployment

### 🎯 Objetivos de aprendizaje

* Definir deployment y su diferencia con release.
* Entender el ciclo completo de un despliegue en CI/CD.
* Elegir la estrategia de despliegue según el contexto.

### ❓ Problema real que resuelve

"Publicar el software" era copiar archivos a un servidor a mano. Hoy el despliegue es un proceso reproducible, automatizado y verificable que lleva un artifact validado a un entorno. Entender qué es un deployment — y qué no es — evita confundir "subir código" con "entregar valor de forma segura".

### 💡 Analogía

El deployment es el traslado de la mudanza: el artifact es el contenido de las cajas y el despliegue es el proceso de llevarlas al nuevo piso. Pero a diferencia de una mudanza, en software la "casa nueva" (producción) ya está en uso — por eso no basta con mudar: hay que mudar sin que los inquilinos lo noten.

### 📖 Explicación técnica

* **Deployment**: proceso de llevar una versión del software a un entorno en ejecución.
* **Release**: hacer que una versión desplegada reciba tráfico real. Se puede desplegar sin liberar (y liberar sin desplegar) — base de las deployment strategies.
* Componentes de un despliegue: artifact inmutable + configuración del entorno + estrategia (cómo se cambia la versión) + verificación (cómo se confirma que funciona).
* En CI/CD: el stage de deploy consume el artifact promovido (nivel 12), aplica la configuración y ejecuta la estrategia elegida.
* Tipos de despliegue según riesgo/coste: recreate (simple, con downtime), rolling (sin downtime), blue/green (conmutación), canary (exposición gradual).
* Buenas prácticas: despliegues idempotentes, versionados, auditables y con rollback preparado.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Artifact promovido (nivel 12)
   ↓
Configuración del entorno
   ↓
Estrategia de despliegue (recreate/rolling/blue-green/canary)
   ↓
Ejecución + health checks
   ↓
Verificación → release
\`\`\`

### 🧪 Ejercicios

1. Describe el ciclo completo de un despliegue en tu proyecto (artifact → entorno → verificación).
2. Compara un despliegue con downtime frente a uno sin downtime.
3. Documenta qué se considera "deploy exitoso" en tu organización.

### ⚠️ Errores comunes

* Confundir deploy con release (desplegar no es liberar tráfico).
* Despliegues manuales y no reproducibles (los pasos viven en la cabeza de alguien).
* Sin verificación: el deploy "termina" cuando el comando sale 0.
* Sin rollback: la primera vez que se necesita, no existe.

### 🔗 Conexión DevOps

El deployment es el punto donde se unen artifacts (nivel 8), environments (nivel 12) y las estrategias de este nivel. Es también donde más se nota la madurez de un equipo: los maduros despliegan seguido, rápido y sin miedo.
`
export default content
