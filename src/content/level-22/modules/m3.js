const content = `
## Módulo 3 — Dependency failure

### 🎯 Objetivos de aprendizaje

* Diagnosticar fallos de dependencias y lockfiles.
* Resolver conflictos de versiones y registries.
* Prevenir fallos de dependencias con buenas prácticas.

### ❓ Problema real que resuelve

"Module not found", "No matching version found", "peer dependency conflict": los fallos de dependencias son de los más comunes y frustrantes del CI/CD. El código no cambió, pero el build se rompe porque una dependencia resolvió distinto, un lockfile quedó desactualizado o un registry devolvió un error. Aprender a diagnosticar y prevenir estos fallos ahorra horas y estabiliza el pipeline.

### 💡 Analogía

Las dependencias son los ingredientes de una receta: si la receta (lockfile) dice "2 tazas de harina" pero el almacén (registry) entrega otra marca (versión) o el ingrediente desapareció (paquete retirado), el plato (build) sale distinto — o no sale. El lockfile es la receta escrita exactamente; sin él, cada cocina (máquina) produce algo distinto.

### 📖 Explicación técnica

* **Lockfile** (\`package-lock.json\`, \`pnpm-lock.yaml\`, \`yarn.lock\`, \`go.sum\`, \`Cargo.lock\`, \`poetry.lock\`): fija las versiones exactas para que el build sea reproducible (nivel 6).
* Fallos típicos:
  * Lockfile desactualizado (package.json cambió pero el lock no se regeneró).
  * Versión que no existe o fue retirada del registry (yanked).
  * Conflicto de peer/transitive dependencies (dos paquetes piden versiones incompatibles).
  * Registry inaccesible, auth fallida (módulo 6 y 9), caché corrupta.
  * \`supply chain\`: dependencia comprometida o retirada por seguridad (nivel 10).
* Método: lee el nombre del paquete y la versión esperada → compara con el lockfile → comprueba el registry (acceso, versión disponible) → reproduce con \`install --force\` o limpiando caché → decide: actualizar, pin o arreglar el conflicto.
* Buenas prácticas: commitear el lockfile, regenerarlo al cambiar package.json (con el mismo gestor), versiones pinneadas, mirror/registry interno para estabilidad, escaneo de vulnerabilidades (nivel 10).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Build inicia → gestor de paquetes lee el manifest
   ↓
Lockfile presente y consistente
   ↓
Resuelve versiones (registry o caché)
   ↓
¿Error? → lee: paquete + versión esperada
   ↓
Comprueba registry y lockfile
   ↓
Reproduce con caché limpia / install forzado
   ↓
Arregla: regenerar lock, pin, o resolver conflicto
\`\`\`

### 🧪 Ejercicios

1. Cambia una versión en package.json sin regenerar el lockfile y observa el error.
2. Simula un registry inaccesible (URL falsa) y diagnostica el mensaje.
3. Reproduce el "no matching version" y explica por qué ocurrió.

### ⚠️ Errores comunes

* Ignorar el lockfile (builds no reproducibles — el "en mi máquina funciona").
* Borrar el lockfile "para arreglar" en vez de regenerarlo con el gestor.
* Actualizar dependencias a ciegas (rompe compatibilidad).
* Confundir fallo de red/auth con fallo de versión (leer el mensaje completo).

### 🔗 Conexión DevOps

Las dependencias conectan con build automation (nivel 6), artifacts (nivel 8), supply chain security (nivel 10), cachés (nivel 19) y registries (módulo 9). Un lockfile correcto y un diagnóstico ordenado eliminan la mayoría de los fallos de build.
`
export default content
