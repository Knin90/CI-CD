const content = `
## Módulo 9 — Compilation

### 🎯 Objetivos de aprendizaje

* Explicar el proceso de compilación y su papel en el build.
* Manejar errores de compilación en el pipeline.
* Diferenciar compilación de empaquetado.

### ❓ Problema real que resuelve

La compilación transforma el código fuente en código ejecutable: es la primera validación real del código (tipos, sintaxis, referencias). Un pipeline sin compilación no puede detectar errores estructurales; un compilador bien configurado en CI atrapa esos errores en minutos, en cualquier máquina, sin depender del entorno del desarrollador.

### 💡 Analogía

La compilación es como el ensamblaje del mueble siguiendo el manual: si una pieza no encaja (error de tipo) o falta (import faltante), el mueble no se arma — y lo sabes ANTES de pintarlo y venderlo. El pipeline es el ensamblador profesional que arma el mueble en cada entrega, sin "en mi taller sí encajaba".

### 📖 Explicación técnica

* **Compilar**: transformar código fuente (TS, Java, Go, C++) a código ejecutable/bytecode. Incluye: análisis de tipos, resolución de imports, generación de código.
* **Transpilar** (JS/TS): convertir a otra forma del mismo lenguaje (TS → JS, JSX → JS).
* **Bundling** (JS): combinar módulos en archivos optimizados.
* Errores de compilación: tipos, imports, sintaxis — el compilador falla con mensajes precisos (archivo:línea).
* En CI: el job de build ejecuta la compilación en un entorno limpio; un error detiene el pipeline.
* El **empacado** es posterior: reunir lo compilado en un artefacto (jar, imagen, bundle).
* Compilación **incremental** y en **paralelo**: compilar solo lo que cambió acelera builds grandes (Maven, Gradle, tsc incremental, Go).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Código fuente
  │
  ▼
Análisis (tipos, imports, sintaxis)
  │
  ├── Error → mensaje archivo:línea → build ROJO
  │
  ▼
Generación de código (bytecode/binario)
  │
  ▼
Empaquetado (jar, imagen, bundle)
  │
  ▼
Artefacto
\`\`\`

### 💻 Ejemplo básico

Compilación en CI (TypeScript):

\`\`\`bash
npm ci
npx tsc --noEmit        # compila SOLO para validar tipos
npm run build           # compila + bundlea
\`\`\`

Java:

\`\`\`bash
mvn -B compile          # compila sin empaquetar
mvn -B package          # compila + tests + empaqueta
\`\`\`

### 🏢 Caso de uso profesional

Un equipo TypeScript tenía errores de tipos que solo aparecían "al levantar la app en local". Agregan \`tsc --noEmit\` como step del pipeline de CI: cada PR valida los tipos en segundos. Los errores de compilación pasan de "sorpresa en runtime" a "feedback en el PR", y el código base queda más limpio porque el compilador exige coherencia.

### ⚠️ Errores comunes

* No compilar en CI (solo lint y tests): errores de tipos pasan.
* Mezclar compilación y empaquetado en un solo paso opaco.
* Compilar en modo release para validar (lento): usar validación sin emitir (\`--noEmit\`).
* Ignorar warnings del compilador (futuros errores).
* Compilación no determinista (depende de variables de entorno).

### 📋 Lo que debes recordar

* Compilación = primera validación estructural del código.
* Compilar en CI con entorno limpio: los errores son precisos.
* Empaquetado ≠ compilación: son fases distintas.
* Valida tipos sin emitir para feedback rápido.

### 🧪 Autoevaluación rápida

1. ¿Qué valida la compilación?
2. ¿Qué diferencia hay entre compilar y empaquetar?
3. ¿Qué comando valida tipos TypeScript sin generar archivos?

---

1. La estructura del código: tipos, imports, sintaxis y referencias — errores con mensajes precisos de archivo y línea.
2. Compilar transforma el código a ejecutable; empaquetar reúne lo compilado en un artefacto (jar, imagen, bundle).
3. \`npx tsc --noEmit\`: compila en memoria solo para validar tipos, sin emitir archivos.
`
export default content
