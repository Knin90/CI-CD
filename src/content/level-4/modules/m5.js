const content = `
## Módulo 5 — Runner architecture

### 🎯 Objetivos de aprendizaje

* Describir la arquitectura interna de un runner: agente, workdir, workspace.
* Explicar el protocolo de comunicación con la plataforma.
* Entender el ciclo de vida de un job en el runner.

### ❓ Problema real que resuelve

Para diagnosticar problemas de runners (jobs colgados, archivos que no persisten, cachés que se pierden) hay que entender cómo funciona el runner por dentro: dónde clona el repo, cómo recibe los jobs, qué se limpia entre ejecuciones. La arquitectura interna explica el comportamiento observable.

### 💡 Analogía

El runner es como un restaurante con su cocina organizada: tiene un timbre de pedidos (protocolo), una mesa de trabajo (workspace), un almacén de ingredientes (cache) y reglas de limpieza entre comandas (cleanup). Entender esa organización explica por qué un plato (job) sale de una forma y otro de otra.

### 📖 Explicación técnica

Arquitectura de un runner (GitHub Actions como referencia):

* **Listener**: proceso que se comunica con la plataforma (long-polling por HTTPS); recibe los jobs asignados.
* **Worker/supervisor**: proceso que ejecuta el job: descarga la configuración, prepara el workspace, ejecuta los steps.
* **Work directory**: carpeta donde se clona el repo y se ejecuta el job (\`_work/repo/...\` o \`_work/_temp\`).
* **Actions/cache**: carpeta de caché de acciones reutilizables.
* **Tools cache**: toolchains descargadas (setup-node, setup-python) para no repetir descargas.
* **Protocolo**: el listener consulta "¿hay job?"; al recibir uno, lo descarga (con los inputs), ejecuta y sube los resultados (logs, artefactos, status) por la API.
* **Estado de los archivos**: los jobs corren en la misma máquina pero con workspaces separados; entre jobs, el workspace puede persistir o limpiarse según configuración.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Plataforma ──HTTPS──► Listener (long-polling)
  │                        │ job asignado
  ▼                        ▼
Worker/supervisor
  │
  ├── Preparar workspace (_work/<repo>)
  ├── Clonar el repo (checkout)
  ├── Ejecutar steps (con tools cache)
  ├── Subir logs + artefactos + status
  └── Limpiar (según configuración)
\`\`\`

### 💻 Ejemplo básico

Estructura de carpetas de un runner:

\`\`\`text
actions-runner/
  ├── _work/
  │     ├── _temp/           # temporales de los jobs
  │     └── org/repo/        # workspace (checkout)
  ├── _diag/                 # logs del propio runner
  ├── externals/             # binarios del runner
  └── config.sh              # registro y configuración
\`\`\`

### 🏢 Caso de uso profesional

Un job "funciona en hosted pero falla en self-hosted". El equipo revisa la arquitectura del runner: los hosted arrancan limpios, pero el self-hosted persiste el workspace entre jobs y el job asumía un estado limpio. Descubren la diferencia de ciclo de vida (workspace persistente vs efímero) y ajustan el job para limpiar/ignorar el workspace.

### ⚠️ Errores comunes

* Asumir que todos los runners se comportan igual (persistencia distinta).
* Jobs que dependen del workspace anterior (estado sucio).
* Ignorar _diag (logs del propio runner) al diagnosticar.
* No conocer el protocolo: cambios de red/firewall rompen la conexión del listener.
* Limpiar carpetas críticas del runner (borrar el runner en producción).

### 📋 Lo que debes recordar

* Runner = listener (comunicación) + worker (ejecución).
* Workspace: dónde se clona y ejecuta; puede persistir o no.
* Tools cache acelera jobs sin repetir descargas.
* Los logs _diag son la fuente de diagnóstico del propio runner.

### 🧪 Autoevaluación rápida

1. ¿Qué componentes forman la arquitectura de un runner?
2. ¿Qué es el workspace de un runner?
3. ¿Por qué un job puede comportarse distinto entre hosted y self-hosted?

---

1. El listener (se comunica con la plataforma por long-polling) y el worker (descarga el job, prepara el workspace, ejecuta los steps y reporta).
2. La carpeta donde se clona el repositorio y se ejecutan los steps de cada job.
3. Porque los hosted arrancan máquinas limpias por job, mientras que los self-hosted pueden persistir el workspace entre ejecuciones, exponiendo estado sucio.
`
export default content
