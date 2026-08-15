const content = `
## Módulo 6 — Test environments

### 🎯 Objetivos de desarrollo

* Crear entornos aislados para probar los pipelines.
* Usar entornos efímeros (levantar → probar → destruir).
* Probar el pipeline completo sin tocar entornos reales.

### ❓ Problema real que resuelve

Probar el pipeline contra dev/staging/prod reales interfiere con el trabajo de todos. Los test environments son entornos aislados y efímeros — un cluster de pruebas, un entorno simulado — donde el pipeline completo se ejecuta y valida, y que se destruyen al terminar. La prueba del pipeline no contamina el mundo real.

### 💡 Analogía

El test environment es la pista de pruebas del circuito de la ciudad: no se prueba el coche de carreras en la autopista con tráfico real (los entornos productivos); hay un circuito cerrado (entorno aislado) donde se corre a fondo, se mide y se abandona hasta la próxima prueba. El tráfico real nunca se molesta.

### 📖 Explicación técnica

* **Test environment**: entorno dedicado a probar pipelines y cambios — aislado de los entornos reales.
* Características: efímero (se crea para la prueba y se destruye), aislado (sin acceso a datos reales), barato (recursos mínimos), reproducible (mismo resultado cada vez).
* Tipos:
  * **Cluster local/simulado**: kind, k3s, minikube para Kubernetes (nivel 14).
  * **Cloud emulado**: localstack (AWS), azurite (Azure) — simulan servicios cloud.
  * **Containers**: los pipelines corren en contenedores de prueba (Docker — nivel 9).
  * **Preview environments**: por PR (nivel 12 — dev).
* Ciclo: el pipeline crea el entorno de prueba → ejecuta la validación completa (build, deploy simulado, tests) → destruye el entorno (teardown garantizado, incluso en fallo).
* Buenas prácticas: teardown automático (try/finally en el pipeline), datos sintéticos, monitorear coste de entornos efímeros, entornos efímeros para PRs (feedback temprano — nivel 18).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
PR / cambio en el pipeline
   ↓
Crear entorno de prueba (cluster local, emulador)
   ↓
Ejecutar el pipeline completo contra él
   ↓
Validaciones + tests
   ↓
Destroy (teardown garantizado)
   ↓
Entornos reales intactos
\`\`\`

### 🧪 Ejercicios

1. Crea un entorno efímero (kind/localstack) para probar tu pipeline de deploy.
2. Asegura el teardown: el entorno se destruye aunque el pipeline falle.
3. Ejecuta tu pipeline completo contra el entorno de prueba y verifica los resultados.

### ⚠️ Errores comunes

* Entornos de prueba que se quedan corriendo (coste y confusión — nadie sabe si es "real").
* Probar contra dev "porque total" (interfiere con el equipo).
* Entornos de prueba con datos reales (fugas — nivel 12 isolation).
* Teardown no garantizado (un fallo deja el entorno huérfano).

### 🔗 Conexión DevOps

Los test environments conectan el testing de pipelines (nivel 20), los preview environments (nivel 12), Docker (nivel 9) y Kubernetes (nivel 14). Son el laboratorio donde el pipeline se prueba sin miedo.
`
export default content
