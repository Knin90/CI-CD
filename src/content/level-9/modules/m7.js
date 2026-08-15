const content = `
## Módulo 7 — Image scanning

### 🎯 Objetivos de aprendizaje

* Explicar qué escanea una imagen y cómo (bases de datos CVE, capas).
* Escanear imágenes en el pipeline (Trivy, Grype, Clair).
* Usar el escaneo como gate antes de publicar.

### ❓ Problema real que resuelve

Las imágenes empaquetan SO y paquetes con vulnerabilidades conocidas: si no se escanean, producción corre imágenes con CVEs explotables sin saberlo. El escaneo analiza las capas contra bases de datos de vulnerabilidades (CVE) y reporta los hallazgos por severidad — permitiendo bloquear imágenes críticas antes de publicarlas.

### 💡 Analogía

El escaneo de imágenes es la inspección sanitaria del producto antes de salir de la fábrica: cada ingrediente (paquete, librería del SO) se verifica contra la lista de sustancias prohibidas (CVE). Un producto con ingredientes peligrosos se retiene (gate) hasta corregirlo (nueva imagen) o se documenta el riesgo.

### 📖 Explicación técnica

Qué escanea:

* **Paquetes del SO**: apt/apk/yum (base de la imagen).
* **Dependencias de la app**: lenguajes (Node, Python, Java, Go) si el escáner las detecta.
* **Secretos y configs**: hallazgos adicionales.
* Fuentes: bases de datos CVE (NVD, distro advisories, GitHub Advisory).

Herramientas: **Trivy** (popular, rápido), Grype, Clair, Snyk, scanners integrados de los registries.

En el pipeline:

1. \`trivy image app:build\` tras el build.
2. Evaluar severidades: \`--exit-code 1 --severity CRITICAL,HIGH\`.
3. **Gate**: críticas/altas → fail → no publicar.
4. Publicar el reporte (artefacto/SBOM).
5. Escaneo continuo del registry para imágenes ya publicadas.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
docker build → app:build
  │
  ▼
trivy image --exit-code 1 --severity HIGH,CRITICAL app:build
  │
  ├── 0 hallazgos → OK → firma → push
  ├── 2 altas → FAIL → no se publica
  │     └── (o se aprueba excepción documentada)
  │
  ▼
Reporte: artefacto + SBOM
  │
  ▼
Registry: escaneo continuo de lo publicado
\`\`\`

### 💻 Ejemplo básico

Escaneo con Trivy en CI:

\`\`\`yaml
- name: Escanear imagen
  run: |
    trivy image --exit-code 0 --severity HIGH,CRITICAL \\
      --format table app:build
    trivy image --exit-code 1 --severity CRITICAL \\
      --format sarif --output trivy.sarif app:build
- uses: actions/upload-artifact@v4
  with: { name: trivy, path: trivy.sarif }
\`\`\`

### 🏢 Caso de uso profesional

Un equipo con base \`node:20-alpine\` fija detecta una CVE crítica en un paquete de la imagen base: el escaneo del pipeline bloquea la publicación. El equipo actualiza la base a la versión parcheada (un cambio en el Dockerfile), el escaneo vuelve a verde y la imagen se publica. La CVE nunca llegó a producción — el gate cumplió su función.

### ⚠️ Errores comunes

* Escanear después de publicar (el gate llega tarde).
* Umbrales demasiado laxos (solo críticas, ignorando altas).
* Ignorar el reporte ("son muchas, no da tiempo").
* Imágenes base sin actualizar (CVEs viejas que reaparecen).
* No publicar el reporte ni el SBOM (sin evidencia).

### 📋 Lo que debes recordar

* El escaneo analiza capas y paquetes contra CVEs.
* Trivy/Grype/Clair: herramientas de escaneo.
* Gate: críticas/altas bloquean la publicación.
* Reporte + SBOM como evidencia; escaneo continuo del registry.

### 🧪 Autoevaluación rápida

1. ¿Qué analiza el escaneo de imágenes?
2. ¿Cómo se usa el escaneo como gate?
3. ¿Qué herramienta se usa típicamente en CI?

---

1. Los paquetes del SO y las dependencias de la aplicación en las capas, contrastados contra bases de datos de CVE.
2. Con \`--exit-code 1\` según severidad: si hay críticas/altas, el comando falla y el pipeline no publica la imagen.
3. Trivy (rápido y popular), también Grype, Clair o los escáneres integrados del registry.
`
export default content
