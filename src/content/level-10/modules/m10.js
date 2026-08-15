const content = `
## Módulo 10 — Security gates

### 🎯 Objetivos de aprendizaje

* Definir los security gates y sus umbrales.
* Configurar gates multi-herramienta en el pipeline.
* Balancear seguridad con fluidez del flujo.

### ❓ Problema real que resuelve

Los escaneos generan hallazgos, pero sin gates son decorativos: nada impide publicar código con vulnerabilidades críticas. El security gate define los umbrales (cuántas críticas/altas se toleran) y hace que el pipeline FALLE cuando se superan — la política de seguridad ejecutada automáticamente, no por recordatorio.

### 💡 Analogía

El security gate es el control de embarque: el pasajero (código) pasa por varios puestos (SAST, SCA, imagen, IaC) y cada uno evalúa su equipaje (hallazgos). Si lleva algo prohibido (crítico), no embarca (no se publica/mergea). Los puestos no deciden: aplican reglas. El gate es el conjunto de esas reglas.

### 📖 Explicación técnica

Componentes de un security gate:

* **Umbrales por severidad**: 0 críticas, máx N altas, tolerancia para medias/bajas.
* **Por herramienta**: SAST (hallazgos del código), SCA (dependencias), escaneo de imagen, secretos, IaC, licencias.
* **Por contexto**: gates estrictos para producción, relajados para desarrollo.
* **Excepciones**: flujo documentado para aceptar riesgos (con fecha, responsable y justificación).
* **Reporte**: cada gate publica su resultado (SARIF, badges).

En el pipeline:

\`\`\`text
SAST gate → SCA gate → secret gate → imagen gate → IaC gate
  │          │            │             │            │
  └──────────┴──── all green → deploy permitido
  │
  └──── cualquiera rojo → pipeline detenido
\`\`\`

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
PR → pipeline
  │
  ▼
Gates de seguridad (todos con umbrales):
  ├── SAST: 0 críticas, 2 altas máx → 1 alta ✓
  ├── SCA: 0 críticas → 1 crítica ✗ → FAIL
  ├── Secretos: 0 → 0 ✓
  ├── Imagen: 0 altas → 0 ✓
  └── Licencias: prohibidas 0 → 0 ✓
  │
  ▼
Pipeline ROJO → PR bloqueado → remediar → green → merge
\`\`\`

### 💻 Ejemplo básico

Gate combinado:

\`\`\`bash
set -e
semgrep scan --config auto --json -o sast.json . && test "\$(jq '.results|length' sast.json)" -le 5
trivy fs --exit-code 1 --severity CRITICAL,HIGH .
npm audit --audit-level=critical
gitleaks detect --report-path leak.json --redact && [ ! -s leak.json ]
echo "SECURITY GATES OK"
\`\`\`

### 🏢 Caso de uso profesional

Una empresa define sus gates: 0 críticas en todo, máx 3 altas en SAST, 0 secretos, 0 vulnerabilidades críticas en imágenes y licencias sin copyleft. Cada PR corre los 5 gates; la tasa de merge con vulnerabilidades cae a cero. Las excepciones pasan por un proceso documentado con responsable y fecha de remediación.

### ⚠️ Errores comunes

* Gates sin umbrales claros ("falla si hay hallazgos" = bloquea todo).
* Umbrales demasiado laxos (el gate no filtra nada).
* Gates desactivados "para no frenar el release".
* Excepciones sin control (se acumulan indefinidamente).
* Reportes sin revisar (el gate pasa pero nadie mira el ruido).

### 📋 Lo que debes recordar

* Gate = umbrales automáticos que detienen el pipeline.
* Multi-herramienta: SAST, SCA, secretos, imagen, IaC, licencias.
* Umbrales por severidad y por contexto.
* Excepciones documentadas, no silenciosas.

### 🧪 Autoevaluación rápida

1. ¿Qué compone un security gate?
2. ¿Qué pasa cuando un gate falla?
3. ¿Cómo se gestionan las excepciones?

---

1. Umbrales por severidad (0 críticas, máx N altas) aplicados por cada herramienta de seguridad del pipeline.
2. El pipeline se detiene: el código no se publica ni mergea hasta remediar (o aprobar una excepción).
3. Con un proceso documentado: justificación, responsable, fecha límite de remediación y aprobación.
`
export default content
