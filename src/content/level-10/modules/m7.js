const content = `
## Módulo 7 — Container scanning

### 🎯 Objetivos de aprendizaje

* Escanear imágenes de contenedor en el pipeline.
* Detectar vulnerabilidades de SO, dependencias y secretos en imágenes.
* Usar el escaneo como gate antes de publicar.

### ❓ Problema real que resuelve

Las imágenes empaquetan un SO completo y dependencias: cada capa puede contener CVEs. El escaneo de contenedores analiza las capas (paquetes del SO, librerías de la app, secretos, configs) antes de publicar — evitando que imágenes vulnerables lleguen al registry y a producción.

### 💡 Analogía

El escaneo del contenedor es la aduana del puerto: cada contenedor (imagen) se inspecciona antes de entrar al país (registry): qué mercancía lleva (paquetes), si hay contrabando (secretos) y si está en la lista de prohibidos (CVEs). El puerto solo acepta contenedores limpios y documentados.

### 📖 Explicación técnica

Qué escanea:

* **Paquetes del SO** (apt, apk, yum) de las capas base.
* **Dependencias de la app** dentro de la imagen (Node, Python, Java, Go).
* **Secretos**: credenciales, claves, tokens embebidos.
* **Configuraciones**: root user, puertos expuestos, capabilities.

Herramientas: Trivy, Grype, Clair, Anchore, scanners integrados de registries (ECR, Docker Hub).

En el pipeline:

1. Tras \`docker build\` (antes del push): \`trivy image app:build\`.
2. Umbrales: \`--exit-code 1 --severity CRITICAL,HIGH\`.
3. Gate: fallo → no publicar.
4. Reporte (SARIF/JSON) + SBOM como evidencia.
5. Escaneo continuo del registry para lo ya publicado.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
docker build → app:build
  │
  ▼
trivy image app:build
  ├── SO: 2 altas (openssl CVE)
  ├── App: 1 crítica (lodash)
  └── Secretos: 0
  │
  ▼
Gate: críticas/altas → FAIL → NO publicar
  │
  ▼
Remediación (base actualizada, deps) → rebuild → scan verde
  │
  ▼
Push + SBOM + firma
\`\`\`

### 💻 Ejemplo básico

Gate de escaneo:

\`\`\`yaml
- name: Escanear imagen (gate)
  run: |
    trivy image --exit-code 1 --severity HIGH,CRITICAL \\
      --format sarif --output trivy.sarif app:build
- name: Publicar reporte
  uses: actions/upload-artifact@v4
  with: { name: trivy-sarif, path: trivy.sarif }
\`\`\`

### 🏢 Caso de uso profesional

Un equipo publica imágenes solo si el escaneo está limpio: la base \`node:20-alpine\` fijada con digest se actualiza periódicamente (el escaneo lo recuerda), y las dependencias de la app se vigilan. Una CVE crítica en la imagen base bloquea la publicación; el equipo actualiza el digest de la base y la imagen sale segura.

### ⚠️ Errores comunes

* Escanear después de publicar (gate tarde).
* Umbrales laxos (solo críticas).
* Imágenes base sin actualizar (CVEs recurrentes).
* Ignorar el SBOM y los reportes.
* Escaneo sin firma (se puede alterar tras el scan).

### 📋 Lo que debes recordar

* Escaneo de capas: SO, dependencias, secretos, config.
* Trivy/Grype/Clair + gates por severidad.
* Escanear ANTES del push; evidencia (reporte + SBOM).
* Escaneo continuo del registry.

### 🧪 Autoevaluación rápida

1. ¿Qué analiza el escaneo de contenedores?
2. ¿Cuándo debe correr en el pipeline?
3. ¿Qué evidencia se genera?

---

1. Paquetes del SO, dependencias de la app, secretos embebidos y configuraciones peligrosas en las capas de la imagen.
2. Inmediatamente después del build y ANTES del push: el resultado decide si la imagen se publica.
3. El reporte de vulnerabilidades (SARIF/JSON), el SBOM de la imagen y la firma.
`
export default content
