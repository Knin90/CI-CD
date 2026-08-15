const content = `
## Módulo 9 — License scanning

### 🎯 Objetivos de aprendizaje

* Explicar por qué las licencias de dependencias son un riesgo.
* Escanear licencias en el pipeline.
* Aplicar políticas de licencias permitidas.

### ❓ Problema real que resuelve

Cada dependencia trae una licencia: algunas (GPL, AGPL) imponen obligaciones que pueden ser incompatibles con un producto comercial (copyleft: obligan a liberar el código). Usar una dependencia con licencia incompatible es un riesgo legal real. El escaneo de licencias lista las licencias del árbol de dependencias y las compara con la política de la empresa.

### 💡 Analogía

Las licencias son los términos del contrato con cada proveedor: algunos contratos dicen "puedes usar esto gratis, pero si lo integras, tu producto también debe ser gratis" (copyleft). Firmar ese contrato sin leerlo (instalar la dependencia sin revisar la licencia) compromete legalmente a toda la empresa. El escaneo de licencias es el departamento legal que lee los contratos antes de firmar.

### 📖 Explicación técnica

* **Licencias copyleft fuertes**: GPL, AGPL — obligan a distribuir el código derivado con la misma licencia.
* **Copyleft débiles**: LGPL, MPL — condiciones más laxas según el uso.
* **Permisivas**: MIT, Apache-2.0, BSD — uso libre con atribución.
* **Comerciales**: requieren pago o licencia.
* Herramientas: license-checker, FOSSA, Snyk (licencias), Trivy (\`--license-full\`), OSS Review Toolkit (ORT).
* En el pipeline: escanear el árbol de dependencias en cada PR; reportar licencias; **gate**: fallar si aparece una licencia prohibida.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Árbol de dependencias (lockfile)
  │
  ▼
Escáner de licencias
  │
  ├── lodash → MIT (permitida) ✓
  ├── react → MIT (permitida) ✓
  └── gpl-lib → GPL-3.0 (¡PROHIBIDA!) ✗
  │
  ▼
Gate: licencia prohibida → FAIL → PR bloqueado
  │
  ▼
Decisión: reemplazar la dependencia o aprobar la excepción
\`\`\`

### 💻 Ejemplo básico

Escanear licencias con Trivy:

\`\`\`bash
trivy fs --license-full --severity HIGH .
# o con license-checker (Node):
npx license-checker --failOn 'GPL;AGPL'
\`\`\`

### 🏢 Caso de uso profesional

Un equipo de producto descubre en el pipeline que una dependencia nueva (una librería de procesamiento de imágenes) usa AGPL: el gate bloquea el PR. El equipo legal confirma el riesgo, el equipo evalúa alternativas y reemplaza la librería por una MIT. La política de licencias evitó un problema legal que habría costado muchísimo más tarde.

### ⚠️ Errores comunes

* Instalar dependencias sin revisar licencias (riesgo legal silencioso).
* Escaneo sin política (reportar sin decidir).
* Confundir "open source" con "libre de condiciones".
* Excepciones sin aprobación legal documentada.
* Solo revisar dependencias directas (las transitivas también importan).

### 📋 Lo que debes recordar

* Las licencias imponen obligaciones legales (copyleft vs permisivas).
* Escanea el árbol completo en cada PR.
* Política de licencias permitidas/prohibidas con gate.
* Excepciones documentadas y aprobadas.

### 🧪 Autoevaluación rápida

1. ¿Qué riesgo plantean las licencias copyleft?
2. ¿Qué licencias son permisivas?
3. ¿Cómo se aplica la política de licencias?

---

1. Obligan a distribuir el código derivado bajo la misma licencia (copyleft): incompatible con productos comerciales cerrados.
2. MIT, Apache-2.0 y BSD: uso libre con atribución.
3. Escaneando el árbol de dependencias en cada PR y fallando si aparece una licencia prohibida; las excepciones se aprueban y documentan.
`
export default content
