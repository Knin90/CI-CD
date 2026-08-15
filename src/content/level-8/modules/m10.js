const content = `
## Módulo 10 — Docker images

### 🎯 Objetivos de aprendizaje

* Explicar la imagen Docker como artefacto (layers, tags, digest).
* Construir imágenes optimizadas en el pipeline.
* Publicar, versionar y consumir imágenes de forma segura.

### ❓ Problema real que resuelve

La imagen Docker es el artefacto de despliegue por excelencia: empaqueta la app con su runtime y sus dependencias. Construir imágenes en el pipeline (reproducibles, pequeñas, seguras) y gestionarlas (versión, digest, escaneo) es la base de los despliegues modernos en Kubernetes y las plataformas cloud.

### 💡 Analogía

La imagen Docker es como la caja de distribución de un producto: contiene el producto (app), su manual de montaje (runtime) y sus herramientas (dependencias) selladas en capas. La caja debe ser ligera (capas optimizadas), etiquetada (versión) y verificable (digest). Una caja pesada y sin etiqueta encarece y rompe la distribución.

### 📖 Explicación técnica

Estructura de una imagen:

* **Layers**: capas inmutables (base, dependencias, código) que se cachean y comparten.
* **Tag**: referencia con nombre (\`v1.4.0\`, \`latest\`).
* **Digest**: hash del contenido (identidad exacta).

Construcción en el pipeline:

* **Multi-stage**: build en una etapa (con toolchain) y runtime en otra (solo binario): imágenes pequeñas.
* **Orden de capas**: lo que menos cambia primero (dependencias antes que código) → caché de layers.
* **Base slim/scratch**: menos superficie = menos vulnerabilidades.
* **No-root**: el contenedor corre como usuario no privilegiado.

Publicación:

* Tag semver + push al registry.
* Escaneo (Trivy) antes del push: gate de seguridad.
* Firma (cosign) para autenticidad.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
docker build (multi-stage)
  │
  ├── Stage build: toolchain + deps + compila
  └── Stage runtime: solo el binario (imagen pequeña)
  │
  ▼
Imagen: layers + tag v1.4.0 + digest sha256:...
  │
  ▼
Escaneo (Trivy) → ¿críticas? → gate
  │
  ▼
docker push registry/app:v1.4.0
  │
  ▼
Kubernetes despliega app:v1.4.0@sha256:...
\`\`\`

### 💻 Ejemplo básico

Multi-stage (Dockerfile):

\`\`\`dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
USER node
CMD ["node", "dist/server.js"]
\`\`\`

### 🏢 Caso de uso profesional

Un equipo optimiza sus imágenes: multi-stage (de 1.2 GB a 180 MB), base alpine, usuario no-root y escaneo con Trivy en el pipeline (bloquea críticas). Las imágenes más pequeñas despliegan más rápido, atacan menos superficie y cumplen las políticas de seguridad. El digest garantiza que producción corre exactamente la imagen escaneada.

### ⚠️ Errores comunes

* Imágenes gigantes (toolchain en runtime).
* \`latest\` en despliegues.
* Contenedores como root.
* Imágenes sin escanear ni firmar.
* Capas mal ordenadas: el caché no funciona y cada build recompila todo.

### 📋 Lo que debes recordar

* Imagen = capas + tag + digest; artefacto de despliegue moderno.
* Multi-stage para imágenes pequeñas; capas estables primero.
* Escaneo + firma antes del push.
* Despliega con digest; corre como no-root.

### 🧪 Autoevaluación rápida

1. ¿Qué compone una imagen Docker?
2. ¿Por qué se usan builds multi-stage?
3. ¿Qué garantiza el digest?

---

1. Capas inmutables (base, dependencias, código), un tag con nombre y un digest criptográfico del contenido.
2. Para separar la etapa de compilación (con toolchain) de la de runtime (solo el binario): imágenes más pequeñas y seguras.
3. Que el contenido es exactamente el construido y escaneado: cualquier alteración produce otro digest.
`
export default content
