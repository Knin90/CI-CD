const content = `
## Módulo 9 — Build cache

### 🎯 Objetivos de aprendizaje

* Explicar el caché de capas de Docker y el BuildKit cache.
* Configurar caché local y remota en CI.
* Acelerar builds con capas ordenadas y cache mounts.

### ❓ Problema real que resuelve

Cada build de CI puede re-descargar y re-ejecutar todo: dependencias, compilación. El caché de Docker reutiliza capas cuyo input no cambió (la instalación de dependencias solo cambia con el lockfile) y BuildKit permite cachear incluso pasos que no son capas (apt, npm ci con cache mounts). El resultado: builds de minutos que bajan a segundos.

### 💡 Analogía

El caché de capas es como el mise en place del chef: las verduras ya picadas (capas de dependencias) se reutilizan mientras el plato principal (código) cambia. El chef no vuelve a pelar zanahorias en cada plato; solo cocina lo nuevo. BuildKit cache es el congelador: guarda resultados intermedios para reutilizarlos aunque no sean "capas" puras.

### 📖 Explicación técnica

Caché de capas (clásico):

* Docker reutiliza capas cuyo \`COPY\`/comando no cambió.
* Orden: dependencias (cambian poco) ANTES que código (cambia siempre).
* En CI, los runners nuevos pierden el caché local: se usa \`--cache-from\` (imagen previa) o cache remoto (registry, GHA cache, buildx).

BuildKit (\`docker buildx\`):

* **Cache mounts**: \`--mount=type=cache,target=/root/.npm\` — cachea directorios de herramientas dentro del build.
* **Cache export**: \`--cache-from type=registry,ref=...\`, \`--cache-to\` — comparte caché entre builds/máquinas.
* **Multi-platform y paralelización**.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Build 1: FROM node:20 → COPY lock → npm ci (descarga) → COPY . → build
  │                    └─► capas guardadas
Build 2 (lock sin cambios):
  └── FROM node:20 (cache) → COPY lock (cache) → npm ci (CACHE)
      → COPY . (cambió) → build (re-ejecuta solo esto)
  │
  ▼
Con BuildKit: --mount=type=cache,target=/root/.npm
  └── npm nunca re-descarga lo que ya está en el cache mount
\`\`\`

### 💻 Ejemplo básico

Build con caché remoto (GitHub Actions + buildx):

\`\`\`yaml
- uses: docker/setup-buildx-action@v3
- uses: docker/build-push-action@v6
  with:
    push: true
    tags: registry/app:v1.4.0
    cache-from: type=gha
    cache-to: type=gha,mode=max
\`\`\`

### 🏢 Caso de uso profesional

Un monorepo JS con 30 servicios: sin caché, cada build tardaba 8 minutos (npm ci incluido). Con buildx + cache remoto (type=gha) y cache mounts para npm, los builds de los servicios bajan a 2-3 minutos: solo se recompila el código que cambió. El consumo de CI cae un 60% y el feedback llega antes.

### ⚠️ Errores comunes

* COPY del código antes de las dependencias (caché inútil).
* Sin caché remoto: los runners efímeros pierden el caché local.
* Cache mounts mal configurados (permanencia inesperada).
* Caché con secretos (¡no cachear credenciales!).
* Claves de caché sin relación con el contenido.

### 📋 Lo que debes recordar

* Capas estables primero: dependencias antes que código.
* BuildKit: cache mounts y caché remoto (type=gha, registry).
* El caché remoto sobrevive a los runners efímeros.
* Nunca cachear secretos.

### 🧪 Autoevaluación rápida

1. ¿Cómo se ordenan las capas para optimizar el caché?
2. ¿Qué es un cache mount de BuildKit?
3. ¿Por qué se necesita caché remoto con runners efímeros?

---

1. Lo que cambia poco primero (dependencias con lockfile), el código al final: las capas estables se reutilizan.
2. Un directorio cacheable dentro del build (\`--mount=type=cache,target=/root/.npm\`) que persiste entre builds.
3. Porque los runners efímeros arrancan sin estado: el caché debe vivir fuera (GitHub Actions cache, registry, cache server) para reutilizarse.
`
export default content
