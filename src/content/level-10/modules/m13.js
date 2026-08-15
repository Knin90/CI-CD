const content = `
## Módulo 13 — SBOM

### 🎯 Objetivos de aprendizaje

* Definir SBOM: inventario de componentes del software.
* Generar SBOM en el pipeline (CycloneDX, SPDX).
* Usar el SBOM para auditoría, vulnerabilidades y compliance.

### ❓ Problema real que resuelve

"¿Qué contiene exactamente este software?" — sin un inventario, cuando aparece una vulnerabilidad (Heartbleed, Log4Shell, xz), no sabes si tu producto está afectado: hay que auditar a mano. El SBOM (Software Bill of Materials) es el inventario estructurado de componentes (dependencias, versiones, licencias) que se genera en el build y permite responder al instante.

### 💡 Analogía

El SBOM es la lista de ingredientes del producto: como la etiqueta de un alimento que lista cada componente con su origen. Cuando hay una alerta sanitaria (ingrediente contaminado = CVE), el fabricante mira la etiqueta y sabe si su producto está afectado. Sin etiqueta, tendría que desmontar cada producto para averiguarlo.

### 📖 Explicación técnica

* **SBOM (Software Bill of Materials)**: inventario de los componentes del software: dependencias, versiones, licencias, hashes.
* Formatos: **CycloneDX** (JSON/XML, popular para seguridad) y **SPDX** (estándar para licencias/compliance).
* Generación: en el build, desde el lockfile y los metadatos — \`syft\`, \`cdxgen\`, \`trivy --format cyclonedx\`.
* Uso:
  * **Respuesta a incidentes**: ¿está afectado por CVE X? → buscar en el SBOM.
  * **Compliance**: políticas (EU Cyber Resilience Act, EO 14028) exigen SBOM.
  * **Auditoría de licencias** y versiones.
* El SBOM se publica como artefacto junto con la imagen/paquete y se firma.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Build → lockfile + metadatos
  │
  ▼
syft app:build -o cyclonedx-json → sbom.json
  │
  ▼
Publicar: artefacto + SBOM firmado (junto a la imagen)
  │
  ▼
Alerta de CVE mundial → buscar en el SBOM
  │
  └── "¿usamos paquete-x@1.2?" → SÍ/NO en segundos
  │
  ▼
Auditoría: inventario exacto de cada release
\`\`\`

### 💻 Ejemplo básico

Generar SBOM con Syft:

\`\`\`yaml
- name: Generar SBOM
  run: |
    syft app:build -o cyclonedx-json=sbom.cdx.json
- name: Publicar SBOM
  uses: actions/upload-artifact@v4
  with: { name: sbom, path: sbom.cdx.json }
\`\`\`

### 🏢 Caso de uso profesional

Cuando estalla Log4Shell, un equipo consulta los SBOM de sus servicios: 3 de 40 usan log4j afectado. Actualizan esos 3 servicios en horas y presentan el inventario a la auditoría. El equipo que no tenía SBOM tardó semanas en auditar a mano. El SBOM convirtió una emergencia en una consulta de base de datos.

### ⚠️ Errores comunes

* SBOM generado sin publicar (no sirve si no acompaña al artefacto).
* SBOM incompleto (solo dependencias directas).
* SBOM sin versiones/hashes (inútil para responder).
* SBOM sin firmar (podría falsificarse).
* Generarlo "para cumplir" sin usarlo en incidentes.

### 📋 Lo que debes recordar

* SBOM = inventario de componentes: dependencias, versiones, licencias.
* Formatos: CycloneDX, SPDX.
* Se genera en el build y se publica con el artefacto.
* Respuesta a incidentes y compliance en segundos.

### 🧪 Autoevaluación rápida

1. ¿Qué contiene un SBOM?
2. ¿Qué formatos existen?
3. ¿Cómo se usa ante una CVE mundial?

---

1. El inventario de componentes del software: dependencias (directas y transitivas), versiones, licencias y hashes.
2. CycloneDX (seguridad, JSON/XML) y SPDX (licencias/compliance).
3. Buscando la versión afectada en el SBOM de cada release: se sabe al instante si el producto está expuesto y qué actualizar.
`
export default content
