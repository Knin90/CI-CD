const content = `
## Módulo 10 — Runner isolation

### 🎯 Objetivos de aprendizaje

* Explicar por qué los runners necesitan aislamiento entre jobs.
* Comparar niveles de aislamiento: VM, contenedor, K8s, efímero.
* Configurar runners aislados y efímeros.

### ❓ Problema real que resuelve

Si dos jobs comparten la misma máquina sin aislamiento, un job puede ver los archivos, variables y secretos del otro, o modificar el entorno (versiones de herramientas) y romper el vecino. El aislamiento garantiza que cada job ejecute en un entorno limpio e independiente: reproducible, sin fugas de datos y sin interferencias.

### 💡 Analogía

Los runners sin aislamiento son como habitaciones de hotel compartidas con desconocidos: los huéspedes ven tus maletas y dejan su desorden. El aislamiento es tener habitaciones individuales: cada huésped (job) tiene su espacio limpio, y al irse (job termina) la habitación se limpia (máquina destruida o reset).

### 📖 Explicación técnica

Niveles de aislamiento (de menor a mayor):

* **Máquina compartida**: varios runners/jobs en la misma VM; barato, pero con fugas potenciales. Solo aceptable en entornos de confianza (mismo repo, código propio).
* **Contenedor por job**: cada job corre en un contenedor aislado (filesystem y procesos aislados). GitHub hosted lo hace así internamente.
* **VM efímera por job**: cada job arranca una VM limpia y la destruye al terminar. Máximo aislamiento, más lento y caro. (Modelo de hosted runners.)
* **Pod de K8s por job**: autoescalado con aislamiento de contenedor/pod (Actions Runner Controller, GitLab Runner con Kubernetes executor).
* Reglas de higiene: el workspace no debe persistir entre jobs; los secretos no deben quedar en la máquina; la máquina del runner no debe contener datos de jobs anteriores.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Aislamiento débil (máquina compartida)
  Job A ──► Runner 1 ──┐
  Job B ──► Runner 2 ──┼── misma VM → fugas posibles
  Job C ──► Runner 3 ──┘

Aislamiento fuerte (efímero)
  Job A ──► VM limpia 1 ──► destruida al terminar
  Job B ──► VM limpia 2 ──► destruida al terminar
  Job C ──► VM limpia 3 ──► destruida al terminar
\`\`\`

### 💻 Ejemplo básico

GitLab Runner con executor de Docker (aislamiento por contenedor):

\`\`\`toml
[[runners]]
  name = "docker-runner"
  executor = "docker"
  [runners.docker]
    image = "node:20"
    privileged = false        # NO dar privilegios si no es necesario
    volumes = ["/cache"]
    pull_policy = "if-not-present"
\`\`\`

### 🏢 Caso de uso profesional

Una plataforma con repositorios públicos usa runners efímeros: cada job arranca una VM limpia en su cloud, se registra, ejecuta y se destruye. Código de terceros (PRs) nunca toca infraestructura persistente, y los secretos no sobreviven al job porque la máquina desaparece. El aislamiento es el estándar de seguridad para código no confiable.

### ⚠️ Errores comunes

* Varios jobs compartiendo la misma máquina con código no confiable.
* Workspace persistente entre jobs (fugas de datos).
* Contenedores con \`privileged: true\` sin necesidad.
* Secretos escritos en disco de la máquina del runner.
* Runners "aislados" por contenedor pero compartiendo volúmenes o red host.

### 📋 Lo que debes recordar

* El aislamiento evita fugas e interferencias entre jobs.
* Niveles: máquina compartida < contenedor < VM efímera < pod K8s.
* Efímero = máximo aislamiento: la máquina nace y muere con el job.
* Nunca persistir workspaces ni secretos entre jobs.

### 🧪 Autoevaluación rápida

1. ¿Qué problemas resuelve el aislamiento entre jobs?
2. ¿Cuál es el nivel de aislamiento más fuerte?
3. ¿Qué riesgo tiene el modo \`privileged\` en contenedores de runners?

---

1. Fugas de datos (archivos, variables, secretos entre jobs) e interferencias (un job modifica el entorno y rompe al vecino).
2. La VM/pod efímero por job: la máquina arranca limpia, ejecuta el job y se destruye al terminar.
3. Da al contenedor acceso a todos los dispositivos y capacidades del host: un job comprometido puede escapar del contenedor y comprometer la máquina del runner.
`
export default content
