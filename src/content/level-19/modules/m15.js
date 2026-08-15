const content = `
## Módulo 15 — Monorepo pipelines

### 🎯 Objetivos de aprendizaje

* Diseñar pipelines para monorepos.
* Construir solo lo que cambió (path filters, build graphs).
* Equilibrar los beneficios del monorepo con el coste del CI.

### ❓ Problema real que resuelve

En un monorepo (muchos paquetes/servicios en un repo), correr todo el CI en cada push es carísimo: cientos de paquetes, N builds. Los monorepo pipelines ejecutan solo lo afectado por el cambio — usando path filters (módulo 8) y build graphs — manteniendo los beneficios del monorepo (cambios atómicos, refactors cross-package) sin pagar CI completo en cada commit.

### 💡 Analogía

El monorepo pipeline es el mantenimiento del edificio de apartamentos: cuando un vecino reforma su piso (cambio en un paquete), solo se inspecciona su piso y las tuberías compartidas (dependencias) — no se revisa el edificio entero. El plano del edificio está en un solo documento (monorepo), pero el mantenimiento es selectivo.

### 📖 Explicación técnica

* **Monorepo**: múltiples proyectos/paquetes en un solo repositorio, con un pipeline (o pipelines) compartido.
* Reto del CI: construir/testear todo siempre es inviable a escala.
* Soluciones:
  * **Path filters** (módulo 8): jobs por directorio (\`packages/api/**\`) — solo corren si cambió su directorio.
  * **Build graphs / dependencias**: herramientas (Nx, Turborepo, Bazel, Lerna) calculan qué paquetes dependen del cambiado y construyen solo ese subconjunto (build graph + affected).
  * **Caché distribuida** (módulo 12): los resultados de build/test se cachean y reutilizan entre runs (Nx cloud, Bazel cache).
  * **Pipelines dinámicos** (módulo 5): generan los jobs según los paquetes afectados.
* Beneficios del monorepo: cambios atómicos (un PR toca varios paquetes coherentes), refactors globales, versionado unificado, visibilidad.
* Trade-offs: CI más complejo, permisos a nivel de repo (todos ven todo), escala de builds.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Commit cambia packages/api/ y packages/ui/
   ↓
Build graph: ¿qué depende de api? → ui, app
   ↓
Solo api + ui + app se construyen/testean
   ↓
Caché: lo no afectado se reutiliza
   ↓
Resultado: CI del cambio, no del repo completo
\`\`\`

### 🧪 Ejercicios

1. Mapea tu monorepo: ¿qué paquetes dependen de qué?
2. Configura path filters por paquete (o adopta Nx/Turborepo para build graphs).
3. Mide: ¿cuánto tardaría el CI completo vs el CI de solo-lo-afectado?

### ⚠️ Errores comunes

* CI completo en cada push (escala = colas y minutos).
* Path filters incompletos (un cambio en una librería compartida no dispara a los consumidores).
* Sin caché distribuida (cada run re-hace lo que otro ya hizo).
* Monorepo sin estrategia: se usa el repo grande pero el pipeline sigue siendo "uno para todo".

### 🔗 Conexión DevOps

Los monorepo pipelines conectan path filters (módulo 8), caching (módulo 12), dynamic pipelines (módulo 5) y microservices (módulo 16). Son la respuesta de CI/CD a la escala del código compartido.
`
export default content
