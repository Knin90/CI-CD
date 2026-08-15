const content = `
## Módulo 4 — Artifact versioning

### 🎯 Objetivos de aprendizaje

* Aplicar versionado consistente a los artefactos.
* Elegir esquemas: semver, digest, fechas, combinaciones.
* Garantizar inmutabilidad y trazabilidad por versión.

### ❓ Problema real que resuelve

"¿Cuál es la versión desplegada?" exige un identificador único, ordenable y estable. El versionado de artefactos define ese identificador y sus reglas: qué versión puede sobreescribirse (ninguna, si es inmutable), cómo se distingue una release de un build de desarrollo, y cómo se traza cada versión a su código.

### 💡 Analogía

Las versiones de artefactos son como los números de serie de un producto: únicos, ordenables y con historia. Un producto sin número de serie es imposible de rastrear, garantizar o repatriar. El artefacto sin versión es lo mismo: no se puede saber cuál es cuál.

### 📖 Explicación técnica

Esquemas de versionado:

* **Semver** (\`v1.4.0\`): semántica (major/minor/patch) — estándar para releases.
* **Digest** (\`sha256:9f86...\`): hash del contenido — identidad criptográfica, ideal para imágenes (inmutable por definición).
* **Fecha/commit** (\`2026-08-14-abc123\`): builds de desarrollo (snapshots).
* **Combinación**: tag semver + digest (lo profesional).

Reglas:

* **Inmutabilidad**: una versión publicada no se sobreescribe (los registries pueden bloquear \`latest\` mutables).
* **Tags flotantes vs fijos**: \`latest\` es mutable y solo para conveniencia; los despliegues usan versiones fijas.
* **Consistencia**: la versión del artefacto = la del tag = la del paquete = la de la app (\`/version\`).
* **Trazabilidad**: cada versión se mapea a un commit (vía tag) y a sus metadatos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
v1.4.0 (tag git) ──► imagen registry:app:v1.4.0
                      └── digest sha256:9f86...
  │
  ├── App expone /version → v1.4.0
  ├── Despliegues usan v1.4.0@sha256:...
  └── Rollback → v1.3.9 (otro tag + digest)
\`\`\`

### 💻 Ejemplo básico

Taggeo de imágenes:

\`\`\`bash
docker tag app:build app:v1.4.0
docker push registry/app:v1.4.0
docker push registry/app:latest     # mutable, solo conveniencia

# Despliegues SIEMPRE con versión fija:
kubectl set image deployment/app app=registry/app:v1.4.0
\`\`\`

### 🏢 Caso de uso profesional

Una plataforma de microservicios versiona todas sus imágenes con semver + digest. El despliegue referencia \`app:v1.4.0@sha256:...\`, nunca \`latest\`. Cuando un incidente apunta a \`latest\` en un entorno de desarrollo, el equipo detecta que alguien desplegó el tag mutable; la política pasa a prohibir \`latest\` en despliegues. La consistencia de versiones se vuelve regla.

### ⚠️ Errores comunes

* Desplegar \`latest\` (mutable, no trazable).
* Sobreescribir versiones publicadas.
* Versión del artefacto distinta del tag del código.
* Versionar a mano (inconsistencias).
* Sin digest: no se puede verificar el contenido.

### 📋 Lo que debes recordar

* Semver para releases; digest para identidad criptográfica; ambos juntos, lo ideal.
* Versiones publicadas = inmutables.
* \`latest\` es mutable: solo conveniencia, nunca despliegue.
* Consistencia: artefacto = tag = paquete = app.

### 🧪 Autoevaluación rápida

1. ¿Qué esquemas de versionado existen y cuándo usarlos?
2. ¿Por qué \`latest\` no debe usarse en despliegues?
3. ¿Qué garantiza el digest de una imagen?

---

1. Semver (releases semánticas), digest/hash (identidad del contenido, imágenes) y fecha-commit (snapshots de desarrollo).
2. Porque es mutable: no identifica una versión concreta, rompe la trazabilidad y el rollback.
3. Que el contenido es exactamente el verificado: cualquier cambio en los layers produce un digest distinto.
`
export default content
