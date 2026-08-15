const content = `
## Módulo 14 — Multi-project pipelines

### 🎯 Objetivos de aprendizaje

* Orquestar pipelines entre múltiples proyectos.
* Coordinar builds, tests y releases entre repos.
* Gestionar dependencias entre proyectos.

### ❓ Problema real que resuelve

Una organización no tiene un repo: tiene decenas — servicios, librerías, frontends — con dependencias entre sí (la librería X es usada por el servicio Y). Los multi-project pipelines coordinan esa red: cuando la librería cambia, se disparan los pipelines de los consumidores; un release coordinado despliega los componentes en orden.

### 💡 Analogía

Los multi-project pipelines son la coordinación del aeropuerto: cada vuelo (proyecto) tiene su plan, pero los controladores (orquestación) coordinan que el aterrizaje de uno no choque con el despegue de otro y que los pasajeros en conexión (dependencias) lleguen a tiempo. Sin coordinación, cada proyecto opera aislado y las dependencias fallan en cadena.

### 📖 Explicación técnica

* Escenarios: librería publicada → consumidores testeados con la versión nueva; servicio A cambia su API → servicio B se valida; release coordinado multi-servicio.
* Implementaciones:
  * **Cross-repo triggers**: GitHub (\`workflow_dispatch\` + repository_dispatch, PAT), GitLab (multi-project pipelines con \`trigger\`), Jenkins (build triggers entre jobs), Azure (pipelines resources).
  * **Downstream/upstream**: el pipeline del proyecto dependiente se dispara cuando el upstream termina.
  * **Artefactos entre proyectos**: la librería publica su artifact (nivel 8) y los consumidores lo usan (no el código fuente).
* Consideraciones: permisos entre repos (tokens con scope mínimo — nivel 11), control de ciclos (A dispara a B que dispara a A), manejo de fallos en cadena (si el consumidor falla, ¿se bloquea la publicación?).
* Buenas prácticas: acoplar lo mínimo (publicar artifacts, no disparar pipelines por cualquier cambio), ventanas de compatibilidad (versionado semántico — nivel 6), observabilidad del grafo de proyectos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Librería (repo 1) publica v2.0
   ↓
Trigger: pipeline de Servicio A (repo 2)
   Trigger: pipeline de Servicio B (repo 3)
   ↓
A y B testean contra v2.0
   ↓
¿Todos OK? → release coordinado
   ↓
¿Alguno falla? → bloqueo + notificación al dueño de la librería
\`\`\`

### 🧪 Ejercicios

1. Configura un trigger cross-repo: cuando la librería publica, se dispara el pipeline del consumidor.
2. Define el contrato entre proyectos: ¿qué artifact, qué versión, qué compatibilidad?
3. Mapea las dependencias entre tus proyectos y sus pipelines.

### ⚠️ Errores comunes

* Tokens cross-repo con permisos excesivos (nivel 11 — least privilege).
* Disparar pipelines por cualquier cambio (ruido y coste).
* Ciclos de triggers (A→B→A) sin control.
* Dependencias implícitas: el consumidor "confía" en que la librería no rompa nada.

### 🔗 Conexión DevOps

Los multi-project pipelines escalan CI/CD a la organización: conectan artifacts (nivel 8), registries (nivel 8), triggers (nivel 2) y monorepo/microservices (módulos 15/16).
`
export default content
