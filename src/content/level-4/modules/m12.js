const content = `
## Módulo 12 — Persistent runners

### 🎯 Objetivos de aprendizaje

* Explicar qué son los runners persistentes y cuándo usarlos.
* Aprovechar el caché persistente y las herramientas preinstaladas.
* Entender los riesgos: estado sucio y drift.

### ❓ Problema real que resuelve

Los jobs repetitivos (mismos builds, mismas dependencias) se benefician de una máquina que ya tiene las herramientas instaladas y los cachés poblados: el primer job paga la instalación y los siguientes la reutilizan. Los runners persistentes ofrecen esa velocidad, con el costo de gestionar el estado: lo que queda en la máquina puede ser ventaja (caché) o deuda (drift, secretos residuales).

### 💡 Analogía

Un runner persistente es como un taller con herramientas ya montadas: no desmontas todo al final del día; la sierra y el torno quedan listos para mañana. Eso acelera el trabajo, pero si alguien deja una pieza peligrosa (secretos) o modifica la sierra (drift), el taller acumula problemas.

### 📖 Explicación técnica

* **Runner persistente**: máquina que permanece entre jobs (VM o bare metal de larga vida), reutilizando su estado.
* Ventajas:
  * **Tools cache**: toolchains (Node, Python, Go) ya descargadas.
  * **Caché de dependencias**: node_modules, .m2, vendor persistentes.
  * **Cero arranque**: no hay creación de VM por job (menos latencia).
  * **Costo**: más barato que efímero para carga continua.
* Riesgos:
  * **Estado sucio**: un job deja archivos, procesos o variables que afectan al siguiente.
  * **Drift**: la máquina se actualiza manualmente y deja de parecerse a la configuración esperada.
  * **Secretos residuales**: credenciales escritas en disco por un job quedan para los siguientes.
  * **Reproducibilidad**: el resultado puede depender del historial de la máquina.
* Mitigaciones: jobs idempotentes que no asuman estado limpio, limpieza explícita del workspace, secretos nunca escritos en disco, y reconstrucción periódica (recrear la máquina desde IaC).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Runner persistente (VM de larga vida)
  │
  ├── Job 1 → usa caché existente (rápido) → termina
  ├── Job 2 → usa caché + estado del Job 1 (¿limpio?) → termina
  └── Job N → drift acumulado → comportamiento distinto
  │
  ▼
Mantenimiento: limpieza periódica / recrear desde IaC
\`\`\`

### 💻 Ejemplo básico

Comparación:

\`\`\`text
Efímero:  arranque de VM (30-60s) + instalación (2 min) + job
Persistente: instalación ya hecha (caché) + job (rápido)

Persistente + PR no confiable = riesgo (ver runner security)
\`\`\`

### 🏢 Caso de uso profesional

Un equipo con builds continuos de una app grande usa runners persistentes para los jobs de build: las dependencias compiladas (Maven/Gradle) viven en caché y el build pasa de 8 a 3 minutos. Para los PRs de terceros usan runners efímeros separados. El mantenimiento incluye recrear los runners desde Terraform cada 30 días para evitar drift.

### ⚠️ Errores comunes

* Jobs que asumen estado limpio en runners persistentes.
* Secretos que quedan en disco.
* Drift no gestionado: la máquina deja de coincidir con la documentación.
* Usar persistentes para código no confiable (PRs de terceros).
* Nunca reconstruir la máquina: el estado se pudre con el tiempo.

### 📋 Lo que debes recordar

* Persistente = velocidad (caché y tools) + gestión de estado.
* Riesgos: estado sucio, drift y secretos residuales.
* Jobs idempotentes que no asuman limpieza.
* Recrea los runners periódicamente desde IaC.

### 🧪 Autoevaluación rápida

1. ¿Qué ventajas tienen los runners persistentes?
2. ¿Qué riesgos introducen?
3. ¿Cómo se mitiga el drift?

---

1. Velocidad (cachés de dependencias y toolchains ya presentes) y menor costo que efímeros para carga continua.
2. Estado sucio entre jobs, drift de configuración y secretos residuales que degradan la reproducibilidad y la seguridad.
3. Recreando los runners periódicamente desde IaC (Terraform/imágenes) y haciendo que los jobs sean idempotentes, sin asumir estado limpio.
`
export default content
