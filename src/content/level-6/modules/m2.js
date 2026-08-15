const content = `
## Módulo 2 — Dependencies

### 🎯 Objetivos de aprendizaje

* Explicar el papel de las dependencias en el build y su gestión.
* Usar lockfiles para fijar versiones exactas.
* Entender el riesgo de la cadena de suministro de dependencias.

### ❓ Problema real que resuelve

Las aplicaciones modernas dependen de cientos de paquetes. Sin gestión, las dependencias "flotan": cada instalación trae versiones nuevas, el build cambia sin tocar código y los fallos aparecen "de la nada". La gestión de dependencias fija versiones exactas (lockfiles), controla actualizaciones y expone la superficie de riesgo (la cadena de suministro).

### 💡 Analogía

Las dependencias son los ingredientes comprados a proveedores: el lockfile es el contrato con cada proveedor ("esta marca, esta presentación, esta fecha"). Si el proveedor cambia el producto sin avisar (versión nueva), la receta (build) sale distinta. El contrato (lockfile) impide el cambio sorpresa; el audit (SCA) vigila que el proveedor no sea peligroso.

### 📖 Explicación técnica

* **Dependencias directas**: las que declara tu proyecto (\`package.json\`, \`requirements.txt\`, \`go.mod\`).
* **Dependencias transitivas**: dependencias de tus dependencias (decenas a cientos).
* **Lockfile** (\`package-lock.json\`, \`poetry.lock\`, \`go.sum\`, \`Gemfile.lock\`): fija la resolución EXACTA de todo el árbol. Se commitea.
* **Semver**: \`^1.2.0\` permite minor/patch, no major; el lockfile congela la resolución actual.
* **Actualización controlada**: \`npm update\`, \`renovate/dependabot\` (PRs de dependencias).
* **Riesgo de cadena de suministro**: un paquete comprometido inyecta código en tu build (ver Security: SCA, supply chain).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
package.json (declaraciones: ^1.2.0)
  │
  ▼
Resolución del árbol (todas las versiones exactas)
  │
  ▼
package-lock.json (congelado, commitado)
  │
  ▼
npm ci → instala EXACTAMENTE lo del lock
  │
  ▼
Build reproducible (no importa cuándo ni dónde)
\`\`\`

### 💻 Ejemplo básico

Gestión de dependencias en CI:

\`\`\`bash
# En CI: instalar lo congelado
npm ci                # Node
pip install -r requirements.txt  # Python (o poetry install)
go mod download       # Go (usa go.sum)

# Actualización controlada (no en CI): PRs de bots
npx renovate
\`\`\`

### 🏢 Caso de uso profesional

Un equipo sufría builds que fallaban "sin motivo": una dependencia transitiva publicaba una versión con un bug. Con el lockfile commitado, el build quedó congelado y los fallos desaparecieron; ahora las actualizaciones llegan por PRs de Renovate (con sus tests), y el análisis de vulnerabilidades (SCA) corre en cada PR para vigilar la cadena de suministro.

### ⚠️ Errores comunes

* Lockfile no commitado (o borrado del .gitignore).
* \`npm install\` en CI en vez de \`npm ci\` (resuelve de nuevo).
* Actualizar dependencias "cuando algo se rompe" (nunca se actualiza).
* Ignorar las actualizaciones de seguridad críticas.
* Instalar dependencias sin revisar su origen (typosquatting, paquetes abandonados).

### 📋 Lo que debes recordar

* Lockfile = contrato de versiones exactas; commitealo.
* Dependencias directas y transitivas: el árbol completo se congela.
* Actualiza con PRs controlados (renovate/dependabot), no a ciegas.
* Las dependencias son superficie de ataque: vigílalas (SCA).

### 🧪 Autoevaluación rápida

1. ¿Qué es un lockfile y por qué se commitea?
2. ¿Qué diferencia hay entre dependencias directas y transitivas?
3. ¿Cómo se actualizan las dependencias de forma controlada?

---

1. Un archivo que fija la resolución exacta de todo el árbol de dependencias; se commitea para que el build sea reproducible.
2. Directas: declaradas por tu proyecto. Transitivas: dependencias de tus dependencias (el árbol completo).
3. Con PRs automáticos de bots (Renovate/Dependabot) que actualizan versiones y corren los tests antes de mergear.
`
export default content
