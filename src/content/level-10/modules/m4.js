const content = `
## Módulo 4 — SCA

### 🎯 Objetivos de aprendizaje

* Definir SCA: análisis de la composición de dependencias.
* Ejecutar SCA en el pipeline (npm audit, Trivy, Snyk, Dependency-Check).
* Gestionar vulnerabilidades y licencias de dependencias.

### ❓ Problema real que resuelve

La mayoría de las aplicaciones modernas son 80% dependencias de terceros: las vulnerabilidades viven en los paquetes, no en tu código. El SCA analiza el árbol de dependencias contra bases de datos de vulnerabilidades y licencias, reportando qué paquetes tienen CVEs y qué licencias usan. Es el control de seguridad más rentable del pipeline.

### 💡 Analogía

El SCA es como auditar la cadena de proveedores del restaurante: no solo revisas tu cocina (código), auditas a los proveedores (paquetes): ¿de dónde viene la harina? ¿tiene contaminación conocida (CVE)? ¿la licencia de uso es legal? Un restaurante con buena cocina y proveedores envenenados es un restaurante envenenado.

### 📖 Explicación técnica

* **SCA (Software Composition Analysis)**: analiza las dependencias (directas y transitivas) contra bases de datos de vulnerabilidades (NVD, GitHub Advisory, OSV) y políticas de licencias.
* Qué detecta: CVEs en paquetes, versiones desactualizadas, licencias (GPL, AGPL, comerciales) incompatibles, paquetes abandonados.
* Herramientas: npm audit, Trivy (también escanea imágenes), Snyk, OWASP Dependency-Check, osv-scanner, pip-audit.
* En el pipeline: corre en cada PR (rápido, sobre el lockfile); gate por severidad; los hallazgos se asocian a la dependencia exacta y la versión parcheada.
* Flujo de remediación: actualizar la dependencia (PR del bot), o si no hay parche, excepción documentada.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Lockfile (package-lock.json / go.sum / ...)
  │
  ▼
SCA: compara el árbol de dependencias con CVE DB
  │
  ├── lodash@4.17.20 → CVE-2021-23337 (high)
  ├── express@4.17.1 → CVE-2022-24999 (medium)
  └── paquete-x → licencia GPL (no permitida)
  │
  ▼
Gate: ¿críticas/altas? → FAIL → PR bloqueado
  │
  ▼
Remediación: actualizar → PR del bot → SCA verde
\`\`\`

### 💻 Ejemplo básico

SCA en el pipeline:

\`\`\`bash
npm audit --audit-level=high        # Node (falla si hay altas)
pip-audit -r requirements.txt       # Python
trivy fs --severity HIGH,CRITICAL . # cualquier ecosistema
\`\`\`

### 🏢 Caso de uso profesional

Un equipo detecta con SCA una vulnerabilidad crítica en una librería de autenticación. El hallazgo incluye la versión parcheada; Renovate abre el PR, los tests corren, y la dependencia se actualiza en horas — antes de que la CVE se explote. El SCA en cada PR mantiene la cadena de dependencias al día.

### ⚠️ Errores comunes

* No fijar versiones (las dependencias flotan y el SCA corre contra un árbol distinto).
* SCA sin gate (reporte decorativo).
* Ignorar dependencias transitivas (el SCA las cubre).
* No gestionar licencias (riesgo legal).
* Dependencias sin actualizar por miedo a romper (usar tests + SCA para actualizar seguro).

### 📋 Lo que debes recordar

* SCA = análisis del árbol de dependencias contra CVE y licencias.
* Corre en cada PR sobre el lockfile; gate por severidad.
* Remediación: actualizar con PRs automáticos.
* Cubre directas y transitivas.

### 🧪 Autoevaluación rápida

1. ¿Qué analiza el SCA?
2. ¿Qué herramientas se usan?
3. ¿Cómo se remedia un hallazgo de SCA?

---

1. El árbol de dependencias (directas y transitivas) contra bases de datos de vulnerabilidades y políticas de licencias.
2. npm audit, Trivy, Snyk, OWASP Dependency-Check, osv-scanner, pip-audit.
3. Actualizando la dependencia a la versión parcheada (idealmente con un PR automático del bot) y verificando con el pipeline; sin parche, excepción documentada.
`
export default content
