const content = `
## Módulo 3 — Artifact storage

### 🎯 Objetivos de aprendizaje

* Explicar dónde y cómo se almacenan los artefactos.
* Comparar almacenamiento efímero (pipeline) y duradero (registry).
* Configurar retención y limpieza.

### ❓ Problema real que resuelve

Los artefactos necesitan un hogar: guardarlos en los jobs (efímeros, se pierden) o en la máquina de alguien (no accesible) inutiliza el pipeline. El almacenamiento de artefactos — efímero para la ejecución, duradero para el entregable — define qué sobrevive, durante cuánto tiempo y quién puede accederlo.

### 💡 Analogía

El almacenamiento de artefactos es como el sistema de almacén de una empresa: la mesa de trabajo del operario (almacenamiento efímero del job) se limpia al terminar el turno; el almacén central (registry) conserva el inventario etiquetado y con caducidad. Confundir ambas cosas (usar la mesa como almacén) pierde el inventario.

### 📖 Explicación técnica

Niveles de almacenamiento:

* **Efímero (pipeline)**: artefactos del job disponibles durante la ejecución y unos días después (descargables de la UI). GitHub: 90 días por defecto; GitLab: según configuración. Para debug y traspaso entre jobs.
* **Duradero (registry)**: el entregable de la release — imágenes, paquetes — con retención larga o indefinida. Es la fuente de verdad de qué versiones existen.
* **Archivo/objeto (cold)**: artefactos históricos, backups, compliance (S3, Glacier) con acceso raro.

Consideraciones:

* **Retención**: política por tipo (release inmutables = larga; build intermedio = corta).
* **Limpieza**: purga de artefactos viejos, imágenes sin tag, snapshots.
* **Costo**: almacenamiento + transferencia; artefactos grandes (binarios de app móvil) pesan.
* **Acceso**: quién puede descargar (auditoría, QA, compliance).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Build → artefacto
  │
  ├── Almacenamiento efímero (pipeline, 30 días)
  │     └── traspaso entre jobs + debug
  │
  ├── Almacenamiento duradero (registry, indefinido)
  │     └── la versión oficial de la release
  │
  └── Archivo (S3/Glacier, compliance)
        └── histórico
  │
  ▼
Políticas de retención y limpieza por nivel
\`\`\`

### 💻 Ejemplo básico

Retención en GitLab:

\`\`\`yaml
build:
  artifacts:
    paths: [dist/]
    expire_in: 30 days    # efímero: 30 días
\`\`\`

Y la imagen con retención larga en el registry:

\`\`\`bash
docker push registry.example.com/app:v1.4.0
# política del registry: tags v* = inmutable, retención indefinida
\`\`\`

### 🏢 Caso de uso profesional

Un equipo de app móvil publica APK/IPA de cada release en el registry con retención indefinida, pero los artefactos intermedios de los PRs expiran en 7 días. Una auditoría necesita el build exacto de una release de hace 2 años: está en el registry con su digest y su firma. Los artefactos de debug de PRs viejos se purgaron solos sin llenar el almacenamiento.

### ⚠️ Errores comunes

* Retención infinita para todo (almacenamiento descontrolado).
* Guardar solo en el pipeline efímero (el entregable se pierde).
* Sin limpieza de imágenes huérfanas o sin tag.
* Artefactos gigantes sin compresión ni política.
* Acceso sin auditoría (quién descargó qué).

### 📋 Lo que debes recordar

* Efímero para la ejecución; duradero (registry) para el entregable.
* Políticas de retención por tipo de artefacto.
* Limpieza programada para controlar costos.
* El registry es la fuente de verdad de las versiones.

### 🧪 Autoevaluación rápida

1. ¿Qué diferencia hay entre almacenamiento efímero y duradero?
2. ¿Qué política de retención conviene para imágenes de release?
3. ¿Por qué limpiar el almacenamiento?

---

1. El efímero (pipeline) dura días y sirve para traspaso entre jobs y debug; el duradero (registry) conserva el entregable de la release a largo plazo.
2. Larga o indefinida e inmutable: las versiones publicadas deben existir siempre para reproducir y revertir.
3. Para controlar costos y desorden: artefactos viejos, imágenes huérfanas y snapshots consumen almacenamiento sin valor.
`
export default content
