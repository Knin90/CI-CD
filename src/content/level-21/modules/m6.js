const content = `
## Módulo 6 — Hosted runners

### 🎯 Objetivos de aprendizaje

* Conocer los runners alojados (hosted) de las plataformas.
* Elegir runners gestionados por sus ventajas y límites.
* Configurar jobs en runners hosted con seguridad.

### ❓ Problema real que resuelve

Configurar y mantener máquinas de build es trabajo (actualizaciones, parches, seguridad). Los hosted runners son máquinas gestionadas por la plataforma (GitHub, GitLab, Azure): listas al instante, con SOs y herramientas preinstaladas, que se crean por job y se destruyen — sin mantenimiento del equipo.

### 💡 Analogía

Los hosted runners son el taxi del aeropuerto: no compras ni mantienes el coche (runner propio); llamas, llega limpio y con el equipaje listo (SO y herramientas preinstaladas), te lleva al destino (ejecuta el job) y se va. El mantenimiento, la gasolina y el seguro (parches, seguridad) los gestiona la flota (plataforma).

### 📖 Explicación técnica

* **Hosted runners**: máquinas virtuales gestionadas por la plataforma, efímeras por job.
* GitHub: ubuntu/windows/macos, imágenes con toolchains (Node, Python, Java, Docker, etc.) — se actualizan periódicamente.
* GitLab: SaaS runners compartidos; Azure: Microsoft-hosted agents (con tamaños y SOs).
* Ventajas: cero mantenimiento, disponibilidad, aislamiento por job (cada job en una VM limpia — nivel 4 isolation), actualizaciones automáticas.
* Límites: menos control (versiones de herramientas fijas), tiempo/recursos limitados (max job time, memoria/CPU), red saliente restringida en algunos (Azure: IPs fijas), coste (minutos consumidos).
* Seguridad: son entornos compartidos — no dejar secretos en el filesystem, no cachear datos sensibles (nivel 11), permisos de la VM por job (nivel 4).
* Cuándo usar: la mayoría de los jobs de CI (build, tests, lint); cuándo self-hosted (módulo 7): necesidades específicas de hardware, red privada, grandes recursos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job → plataforma asigna un runner hosted
   ↓
VM limpia creada (SO + herramientas)
   ↓
Job ejecuta (con el repositorio checkout)
   ↓
Resultados recogidos
   ↓
VM destruida (aislamiento total)
\`\`\`

### 🧪 Ejercicios

1. Ejecuta un job en un runner hosted y revisa las herramientas preinstaladas.
2. Compara el tiempo de un job en hosted vs la configuración equivalente en self-hosted.
3. Revisa los límites de tu plan (minutos, tamaño) y cómo afectan a tu pipeline.

### ⚠️ Errores comunes

* Confiar en herramientas instaladas "de casualidad" (versionar las versiones — nivel 6).
* Dejar datos en el filesystem (el siguiente job comparte infra — nivel 4).
* Ignorar los límites (jobs que exceden tiempo/memoria).
* Usar hosted para necesidades que exigen self-hosted (red privada, hardware).

### 🔗 Conexión DevOps

Los hosted runners son la opción gestionada del nivel 4 (Runners): conectan runner isolation (nivel 4), coste (nivel 23) y la elección runner hosted vs self-hosted (módulo 7).
`
export default content
