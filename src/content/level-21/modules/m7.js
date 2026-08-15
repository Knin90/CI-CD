const content = `
## Módulo 7 — Self-hosted runners

### 🎯 Objetivos de aprendizaje

* Configurar runners auto-alojados en infraestructura propia.
* Elegir cuándo self-hosted frente a hosted.
* Asegurar y escalar runners propios.

### ❓ Problema real que resuelve

Los hosted runners no cubren todo: redes privadas (el pipeline necesita acceder a recursos internos), hardware específico (GPU, arquitecturas), políticas de datos (el código no sale de la infraestructura) o coste a escala. Los self-hosted runners son máquinas propias registradas en la plataforma que ejecutan los jobs — con control total y responsabilidad total.

### 💡 Analogía

Los self-hosted runners son el camión propio de reparto de la empresa: el hosted es el mensajero externo (compartido, gestionado); el propio lo compras, lo mantienes y lo aseguras tú — pero te permite llevar cargas que el mensajero no acepta (red privada, mercancía sensible, peso especial). Más control, más responsabilidad.

### 📖 Explicación técnica

* **Self-hosted runner**: máquina (VM, contenedor, bare metal) con el software del runner instalado, registrada en la plataforma (GitHub/GitLab/Azure).
* Registro: instalar el agente, registrarlo con un token (nivel 4 — runner registration), asignar labels.
* Ventajas: acceso a red privada, hardware custom, control de versiones/herramientas, coste predecible (nivel 4 — runner economics).
* Riesgos: **seguridad** (nivel 4 — runner security): runners compartidos entre repos ejecutan código de PRs — un repo malicioso puede comprometer la máquina y sus secretos; **mantenimiento**: parches, actualizaciones, disponibilidad (si el runner se cae, los jobs esperan).
* **Aislamiento** (nivel 4): runners efímeros (contenedores por job — nivel 9) o etiquetados para repos/entornos específicos; nunca runners "de todo" con secretos de todos.
* Escalado: agent pools con autoscaling (Kubernetes — nivel 14, EC2 autoscaling, ephemeral runners).
* Buenas prácticas: runners dedicados por nivel de confianza (PRs en runners efímeros aislados), actualizaciones automáticas, monitoring de los runners (nivel 18), tokens de registro rotados (nivel 11).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Runner instalado y registrado (labels)
   ↓
Job asignado (según labels/capacidad)
   ↓
Runner ejecuta el job (aislado si es efímero)
   ↓
Resultados a la plataforma
   ↓
Autoscaling: runner se crea/destruye según demanda
\`\`\`

### 🧪 Ejercicios

1. Instala y registra un runner self-hosted en tu plataforma.
2. Etiqueta runners por nivel de confianza (PRs vs main) y asigna jobs.
3. Configura autoscaling (ephemeral runners en Kubernetes o cloud).

### ⚠️ Errores comunes

* Runners compartidos sin aislamiento (un PR malicioso roba secretos — nivel 4).
* Runners sin actualizar (CVEs — nivel 10).
* Un solo runner que se cae y paraliza todo (HA/autoscaling).
* Tokens de registro expuestos (nivel 11).

### 🔗 Conexión DevOps

Los self-hosted runners conectan runners (nivel 4), seguridad (nivel 10), scaling (nivel 4) y Kubernetes (nivel 14). Son la opción cuando el control supera al coste de mantenimiento.
`
export default content
