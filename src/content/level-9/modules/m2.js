const content = `
## Módulo 2 — Dockerfile profesional

### 🎯 Objetivos de aprendizaje

* Escribir Dockerfiles siguiendo las mejores prácticas de la industria.
* Aplicar bases fijas, capas ordenadas, multi-stage y no-root.
* Integrar el Dockerfile con el pipeline (build, scan, push).

### ❓ Problema real que resuelve

Un Dockerfile mal escrito produce imágenes gigantes, lentas de construir, inseguras (root, toolchains) y no reproducibles. El Dockerfile profesional es código de alta calidad: sigue reglas que optimizan tamaño, seguridad, velocidad y reproducibilidad — y esas reglas se aplican consistentemente en el pipeline.

### 💡 Analogía

El Dockerfile es la receta de la fábrica: los ingredientes (base), el orden de preparación (capas), el equipo de cocina separado del servicio (multi-stage) y la higiene (no-root). Una receta mal escrita produce un plato pesado, lento e insalubre; una buena receta es reproducible por cualquier cocinero (pipeline).

### 📖 Explicación técnica

Mejores prácticas:

1. **Base fija y mínima**: imagen oficial con tag/digest exacto; slim/alpine/distroless para runtime.
2. **.dockerignore**: excluir node_modules, .git, logs — contexto pequeño.
3. **Orden de capas**: COPY dependencias → instalar → COPY código; lo estable primero.
4. **Multi-stage**: build con toolchain, runtime solo con binario.
5. **No-root**: \`USER node\`/usuario dedicado.
6. **Meta datos**: \`LABEL\` con versión, commit, maintainer.
7. **Salud**: \`HEALTHCHECK\` del contenedor.
8. **Sin secretos**: nunca \`ARG\`/\`ENV\` con secretos; usar build args no sensibles o secrets de BuildKit.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
FROM node:20-alpine AS build      ← toolchain (etapa 1)
  ├── COPY package*.json ./
  ├── RUN npm ci                   ← capa cacheable
  └── COPY . .
      RUN npm run build
  │
  ▼
FROM node:20-alpine               ← runtime (etapa 2, pequeña)
  ├── COPY --from=build /app/dist ./dist
  ├── USER node                    ← no-root
  ├── HEALTHCHECK ...
  └── CMD ["node", "dist/server.js"]
\`\`\`

### 💻 Ejemplo básico

Dockerfile profesional (Node):

\`\`\`dockerfile
# --- Stage 1: build ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Stage 2: runtime ---
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
RUN npm ci --omit=dev
USER node
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:8080/health || exit 1
CMD ["node", "dist/server.js"]
\`\`\`

### 🏢 Caso de uso profesional

Un equipo estandariza su Dockerfile con una plantilla: base fija con digest, multi-stage, no-root, HEALTHCHECK y labels con versión/commit. El escaneo de imágenes en el pipeline pasó de "15 vulnerabilidades altas" a "0 críticas/altas" (base mínima + sin toolchain en runtime), y el tamaño bajó un 85%. La plantilla se revisa como código y se versiona.

### ⚠️ Errores comunes

* Base \`:latest\` (no reproducible).
* Contenedor como root.
* Toolchain en runtime (imagen gigante).
* .dockerignore ausente (contextos de GB).
* Secretos en ARG/ENV (quedan en la historia de capas).

### 📋 Lo que debes recordar

* Base fija, .dockerignore, capas ordenadas.
* Multi-stage: build separado del runtime.
* No-root, HEALTHCHECK, labels con metadatos.
* Nunca secretos en las capas.

### 🧪 Autoevaluación rápida

1. ¿Qué reglas hacen un Dockerfile profesional?
2. ¿Qué problema resuelve multi-stage?
3. ¿Por qué no usar \`:latest\` como base?

---

1. Base fija y mínima, .dockerignore, capas ordenadas (dependencias antes que código), multi-stage, usuario no-root, HEALTHCHECK y metadatos.
2. Separa la etapa de compilación (con toolchain) de la de runtime (solo binario): imágenes mucho más pequeñas y seguras.
3. Porque \`:latest\` cambia: el build no es reproducible y puede romperse cuando la imagen base se actualiza.
`
export default content
