const content = `
## Módulo 11 — Build reproducibility

### 🎯 Objetivos de aprendizaje

* Explicar qué hace que un build sea reproducible.
* Aplicar técnicas: lockfiles, versiones fijas, entornos limpios, hermeticidad.
* Verificar la reproducibilidad del build.

### ❓ Problema real que resuelve

"Funcionó en mi máquina" es el síntoma de un build no reproducible: el resultado depende de quién, cuándo y dónde se ejecuta. La reproducibilidad garantiza que el MISMO código produce el MISMO artefacto en cualquier entorno y momento: es la base de la confianza en CI/CD, del debug de versiones y de la seguridad (poder verificar que el binario coincide con el código).

### 💡 Analogía

Un plato reproducible es el de la receta exacta: mismos ingredientes (dependencias fijas), mismas cantidades (versiones), mismo horno (entorno) y misma temperatura (herramientas). Si cada cocinero "echa un poco de sal", el plato nunca es igual. El build reproducible es la receta exacta aplicada por una cocina estandarizada.

### 📖 Explicación técnica

Fuentes de no-reproducibilidad:

* Dependencias flotantes (sin lockfile).
* Versiones de herramientas flotantes (Node "latest").
* Variables de entorno / fecha / ruta en el output (timestamps, rutas absolutas).
* Orden no determinista (mapas, concurrencia).
* Entorno sucio (máquina local con cosas instaladas).

Técnicas para reproducir:

* **Lockfiles** y versiones fijas de herramientas.
* **Entorno hermético**: contenedor/imagen con todo lo necesario (Docker multi-stage).
* **Build flags**: eliminar timestamps (\`-trimpath\` en Go, \`SOURCE_DATE_EPOCH\`).
* **Orden determinista**: sort de entradas.
* **Vendoring** (Go) para dependencias sin red.

Verificación:

* **Reproducible builds**: construir dos veces y comparar hashes (\`diffoscope\`, \`reprotest\`).
* Registrar el hash del artefacto en el pipeline (SBOM, firmas).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Build 1 (hoy, CI):     código v1.2 + lock → artefacto hash A
Build 2 (mañana, otra): código v1.2 + lock → artefacto hash A
  │
  ▼
Hashes iguales → REPRODUCIBLE ✓
  │
  └ Hashes distintos → buscar la fuente de variabilidad:
      timestamps, rutas, dependencias, orden
\`\`\`

### 💻 Ejemplo básico

Build reproducible con Docker:

\`\`\`dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
\`\`\`

La imagen base fijada + lockfile + capas inmutables hacen el build determinista.

### 🏢 Caso de uso profesional

Una empresa de software de seguridad publica "reproducible builds": cualquiera puede reconstruir el binario desde el código y comparar el hash con el publicado. El pipeline fija versiones, usa contenedores herméticos, elimina timestamps y verifica con \`reprotest\`. Los clientes verifican que el binario que ejecutan es exactamente el del código fuente — confianza total en la cadena.

### ⚠️ Errores comunes

* Versiones flotantes de todo ("latest").
* Timestamps o rutas absolutas embebidas en el artefacto.
* Entorno no hermético (depende de la máquina).
* No verificar la reproducibilidad (asumirla).
* Orden no determinista en el empaquetado.

### 📋 Lo que debes recordar

* Reproducible = mismo código produce mismo artefacto.
* Lockfiles, versiones fijas, entorno hermético, sin timestamps.
* Verifica comparando hashes de dos builds.
* Es la base de la confianza y de la verificación de la cadena.

### 🧪 Autoevaluación rápida

1. ¿Qué fuentes de no-reproducibilidad existen?
2. ¿Cómo se verifica que un build es reproducible?
3. ¿Qué es un entorno hermético?

---

1. Dependencias flotantes, versiones de herramientas flotantes, timestamps/rutas en el output, orden no determinista y entorno sucio.
2. Construyendo dos veces (en momentos/máquinas distintas) y comparando los hashes de los artefactos (reprotest, diffoscope).
3. Un entorno de build que contiene exactamente lo necesario (imagen con toolchain y dependencias), sin depender del estado de la máquina.
`
export default content
