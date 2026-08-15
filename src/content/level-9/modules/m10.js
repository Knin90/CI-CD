const content = `
## Módulo 10 — Push images

### 🎯 Objetivos de aprendizaje

* Publicar imágenes al registry desde el pipeline.
* Orquestar el flujo: build → tag → scan → push.
* Definir cuándo publicar (releases) y a qué registry.

### ❓ Problema real que resuelve

La imagen construida solo existe en el runner: el push la hace disponible en el registry para los despliegues. El push bien orquestado — tras build, scan y firma, con el tag correcto y solo en los eventos correctos — es la publicación formal del artefacto.

### 💡 Analogía

El push es la entrega del vehículo terminado al depósito central: el taller (pipeline) verifica (scan), etiqueta (tag) y entrega (push) el coche con su matrícula. El depósito solo acepta coches inspeccionados y correctamente identificados; los conductores (entornos) los retiran de ahí.

### 📖 Explicación técnica

Flujo de publicación:

1. **Build**: construir la imagen (con caché).
2. **Tag**: asignar la identidad (\`v1.4.0\`, commit).
3. **Scan**: verificar vulnerabilidades (gate).
4. **Firma** (opcional pero recomendado): cosign.
5. **Push**: \`docker push\` al registry (con auth).
6. **Evidencia**: reporte del scan + SBOM.

Cuándo publicar:

* **Releases** (tag \`v*\`): la imagen oficial.
* **PRs**: imágenes de preview con tag de commit (para entornos de PR).
* **Nunca** en cada push de rama de desarrollo (salvo necesidad explícita).

Consideraciones:

* Publicar y no usar = costo y desorden: política de retención.
* El push debe ser idempotente (misma imagen → mismo digest).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Trigger: tag v1.4.0
  │
  ▼
docker build (cache) → app:build
  │
  ▼
docker tag app:build registry/app:v1.4.0
  │
  ▼
trivy scan → gate (¿críticas?) → OK
  │
  ▼
cosign sign registry/app:v1.4.0
  │
  ▼
docker push registry/app:v1.4.0
  │
  ▼
Registry: imagen inmutable + SBOM + firma
\`\`\`

### 💻 Ejemplo básico

Push con build-push-action:

\`\`\`yaml
- uses: docker/build-push-action@v6
  with:
    push: true
    tags: |
      registry.example.com/app:v1.4.0
      registry.example.com/app:latest
    cache-from: type=gha
    cache-to: type=gha,mode=max
\`\`\`

### 🏢 Caso de uso profesional

Un equipo publica imágenes solo en releases (trigger por tag): cada \`v1.4.0\` produce la imagen escaneada, firmada y con SBOM en el registry corporativo. Los PRs generan imágenes de preview etiquetadas con el commit (para entornos de prueba efímeros) que expiran en 7 días. El registry refleja exactamente las versiones oficiales.

### ⚠️ Errores comunes

* Push sin escanear ni firmar.
* Push en cada push de rama (registry lleno de basura).
* Taggeo \`latest\` como identidad.
* Push sin política de retención.
* Publicar sin evidencia (SBOM/reporte).

### 📋 Lo que debes recordar

* Flujo: build → tag → scan → firma → push → evidencia.
* Publica en releases (tags v*); previews con commit para PRs.
* Push idempotente y con retención.
* El registry debe reflejar las versiones oficiales.

### 🧪 Autoevaluación rápida

1. ¿Qué pasos preceden al push?
2. ¿Cuándo debe publicarse la imagen oficial?
3. ¿Qué evidencia acompaña a la publicación?

---

1. Build, taggeo con identidad, escaneo (gate) y firma.
2. En releases (trigger por tag \`v*\`), tras la validación completa.
3. El reporte del escaneo, el SBOM y la firma (cosign), junto con el digest de la imagen.
`
export default content
