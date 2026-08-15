const content = `
## Módulo 11 — Ephemeral runners

### 🎯 Objetivos de aprendizaje

* Explicar qué son los runners efímeros y por qué son el estándar moderno.
* Describir el ciclo de vida: arranque, registro, job, destrucción.
* Configurar autoescalado con runners efímeros.

### ❓ Problema real que resuelve

Los runners persistentes acumulan estado, secretos y drift; y escalarlos manualmente es lento. Los runners efímeros nacen para cada job y mueren al terminar: máquina limpia garantizada (reproducibilidad), sin residuos (seguridad) y escalado bajo demanda (capacidad exacta). Es el modelo de los hosted runners y del autoescalado moderno.

### 💡 Analogía

Un runner efímero es como un papel desechable en una mesa de operaciones: se usa una vez y se descarta. No hay riesgo de que el papel anterior contamine la operación siguiente. Si necesitas 100 operaciones, sacas 100 papeles nuevos y tiras los usados — la limpieza es estructural, no un hábito.

### 📖 Explicación técnica

Ciclo de vida:

1. **Evento**: un job se encola en la plataforma.
2. **Autoescalado**: el controlador detecta la cola y crea una máquina/pod nueva (VM, contenedor K8s).
3. **Registro**: la máquina registra un runner efímero (\`config.sh --ephemeral\`) contra la org/repo.
4. **Ejecución**: el runner toma un job, lo ejecuta y reporta.
5. **Auto-desregistro y destrucción**: el runner se desregistra solo (\`--ephemeral\`) y la infraestructura se destruye.

Implementaciones:

* **GitHub**: Actions Runner Controller (ARC) en Kubernetes — autoescalado por cola.
* **GitLab**: GitLab Runner con autoescalado (Docker Machine, Kubernetes executor).
* **Azure**: agent pools elásticos.
* **Otros**: scripts propios con cloud-init + Terraform.

Ventajas: reproducibilidad total, cero residuos, escalado bajo demanda, seguridad para código no confiable.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job encolado
  │
  ▼
Controlador detecta cola → crea VM/pod
  │
  ▼
config.sh --ephemeral (registro automático)
  │
  ▼
Job ejecutado (máquina limpia)
  │
  ▼
Desregistro automático
  │
  ▼
VM/pod destruido → cero estado residual
\`\`\`

### 💻 Ejemplo básico

Registro efímero (GitHub runner):

\`\`\`bash
./config.sh --url https://github.com/org/repo \\
  --token <TOKEN> --ephemeral --unattended
./run.sh
\`\`\`

Con ARC en Kubernetes, esto se gestiona automáticamente: un \`RunnerDeployment\` escala pods según la cola.

### 🏢 Caso de uso profesional

Una empresa migra sus runners persistentes a ARC sobre Kubernetes: los jobs de CI arrancan pods efímeros que se destruyen al terminar. Los picos de releases (100 jobs a la vez) se absorben creando 100 pods; los días tranquilos, cero pods. La factura de cómputo baja un 40% y desaparecen los problemas de estado sucio.

### ⚠️ Errores comunes

* Arranque lento: cada job paga el arranque de la máquina (mitigar con imágenes pre-cacheadas).
* Cold cache: sin caché persistente, cada job reinstala dependencias (usar caché externa compartida).
* Costos de infraestructura no monitoreados.
* Registro automático con tokens mal gestionados.
* No destruir la máquina si el job falla (leak de recursos).

### 📋 Lo que debes recordar

* Efímero: nace para un job, muere con él.
* Reproducibilidad + seguridad + escalado bajo demanda.
* Implementaciones: ARC (GitHub), autoescalado (GitLab), pools elásticos (Azure).
* Mitiga el cold cache con caché externa compartida.

### 🧪 Autoevaluación rápida

1. ¿Qué ciclo de vida sigue un runner efímero?
2. ¿Qué implementación usa GitHub para runners efímeros en K8s?
3. ¿Qué desventaja tienen los runners efímeros?

---

1. Arranca (VM/pod nuevo) → se registra → ejecuta un job → se desregistra → se destruye, sin dejar estado.
2. Actions Runner Controller (ARC): \`RunnerDeployment\` que autoescala pods según la cola de jobs.
3. Latencia de arranque por job y cold cache: sin caché persistente, cada job reinstala dependencias; se mitiga con imágenes precargadas y caché externa.
`
export default content
