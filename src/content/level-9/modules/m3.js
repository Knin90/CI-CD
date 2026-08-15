const content = `
## Módulo 3 — Multi-stage builds

### 🎯 Objetivos de aprendizaje

* Explicar los builds multi-stage y sus beneficios.
* Diseñar etapas build → runtime (y más).
* Aplicarlos en el pipeline para imágenes pequeñas y seguras.

### ❓ Problema real que resuelve

Compilar una app requiere toolchains (compiladores, SDKs, dependencias de build) que NO deben vivir en la imagen final: inflan el tamaño y agrandan la superficie de ataque. Multi-stage ejecuta el build en una imagen temporal con todo el toolchain y copia SOLO el resultado a una imagen final mínima. La imagen publicada es pequeña, segura y sin herramientas de desarrollo.

### 💡 Analogía

Multi-stage es como la cocina de un restaurante con personal de preparación y personal de servicio: los chefs preparan (build) con todos sus utensilios en la cocina interna, y solo el plato terminado (binario) pasa al servicio (runtime). No envías la cocina entera con el plato al cliente.

### 📖 Explicación técnica

Estructura:

\`\`\`dockerfile
FROM <base> AS build        # etapa 1: toolchain + compilación
  ... compilar ...
FROM <base-minima>          # etapa 2: solo el resultado
  COPY --from=build <ruta>  # copiar el artefacto
\`\`\`

Beneficios:

* **Tamaño**: la imagen final solo tiene runtime + binario.
* **Seguridad**: sin compiladores, SDKs ni dependencias de build (menos CVE).
* **Caché**: cada etapa cachea por separado.
* **Target específico**: \`--target=build\` para usar la etapa de build en CI (tests, análisis) sin construir la final.
* Etapas adicionales: una para tests, otra para scan, otra para runtime.

En el pipeline:

* \`docker build --target=test\` para correr tests dentro del contenedor.
* La imagen final se escanea (menos paquetes = menos hallazgos).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Etapa build (node:20 + npm ci + compile)
  │
  ▼
COPY --from=build /app/dist → Etapa runtime (alpine, solo binario)
  │
  ▼
Imagen final: ~150 MB (vs 1.2 GB con toolchain)
  │
  ▼
Escaneo: pocas capas → pocas vulnerabilidades
  │
  ▼
Push → deploy
\`\`\`

### 💻 Ejemplo básico

Multi-stage con etapa de tests:

\`\`\`dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM build AS test          # etapa de tests reutiliza build
RUN npm test

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
USER node
CMD ["node", "dist/server.js"]
\`\`\`

\`\`\`bash
docker build --target=test -t app:test .
docker run --rm app:test        # corre los tests
\`\`\`

### 🏢 Caso de uso profesional

Una app Go: la etapa build compila con Go y caches, la etapa final usa \`scratch\` (binario estático solo). La imagen pasa de 800 MB a 12 MB. El escaneo del pipeline encuentra 0 vulnerabilidades (no hay SO ni paquetes que escanear). Los despliegues en Kubernetes son instantáneos y la superficie de ataque es mínima.

### ⚠️ Errores comunes

* Copiar node_modules/entorno completo en vez del artefacto.
* Etapas sin nombre (imposible usar --target).
* Compilar en la imagen final (perder el beneficio).
* Imágenes con secretos en la etapa build que quedan en capas.
* No usar --target para tests/análisis (duplicar trabajo).

### 📋 Lo que debes recordar

* Multi-stage: build con toolchain, runtime mínimo.
* COPY --from=build solo el artefacto.
* --target para reutilizar etapas (tests, scan).
* Imagen pequeña = menos vulnerabilidades y deploys rápidos.

### 🧪 Autoevaluación rápida

1. ¿Qué problema resuelve multi-stage?
2. ¿Cómo se usa la etapa de build para tests?
3. ¿Por qué la imagen final tiene menos vulnerabilidades?

---

1. Evita que el toolchain y las dependencias de build vivan en la imagen final: tamaño y superficie de ataque se reducen drásticamente.
2. Con \`docker build --target=test\` para construir la etapa de tests y \`docker run\` para ejecutarlos.
3. Porque la imagen final solo contiene runtime + binario: menos paquetes y capas significa menos superficie para vulnerabilidades.
`
export default content
