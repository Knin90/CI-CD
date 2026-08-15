const content = `
## Módulo 3 — Hosted runners

### 🎯 Objetivos de aprendizaje

* Explicar qué son los runners hosted y sus ventajas.
* Conocer los tipos disponibles (OS, arquitecturas, tamaños).
* Entender sus límites: facturación, capacidad y personalización.

### ❓ Problema real que resuelve

Mantener infraestructura de ejecución (máquinas, actualizaciones, parches, escalado) es caro y distrae del objetivo. Los runners hosted resuelven eso: la plataforma gestiona máquinas limpias, actualizadas y escalables por ti; solo pagas por el uso. Para la mayoría de los proyectos, son la opción por defecto correcta.

### 💡 Analogía

Los runners hosted son como alquilar una cocina profesional por horas: está equipada, limpia, y no tienes que comprarla, mantenerla ni repararla. Si cocinas a diario, alquilar sale caro; si cocinas poco, es perfecto. La decisión hosted vs self-hosted es una decisión de costo y control.

### 📖 Explicación técnica

* **Hosted runners**: infraestructura gestionada por la plataforma (GitHub: \`ubuntu-latest\`, \`windows-latest\`, \`macos-latest\`; Azure: \`vmImage\`; GitLab: \`saas-linux-small\`...).
* Características:
  * **Máquina limpia** por job: cada ejecución arranca de cero (reproducibilidad).
  * **Imágenes preinstaladas**: toolchains populares (Node, Python, Go, Docker) listas.
  * **Escalado automático**: la plataforma gestiona la capacidad.
  * **Mantenimiento cero**: parches y actualizaciones los hace la plataforma.
  * **Facturación por minutos de uso** (cuotas en repos públicos; minutos pagos en privados).
* **IPs dinámicas**: los hosted runners no tienen IPs fijas (relevante para firewalls y SaaS con allowlists).
* Límites: no puedes instalar software permanente (usar \`setup-\` actions o descargar en el job); recursos fijos (CPU/RAM según el tier).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job: runs-on: ubuntu-latest
  │
  ▼
La plataforma arranca una VM limpia
  │
  ▼
Imagen con toolchains preinstaladas
  │
  ▼
Se ejecutan los steps
  │
  ▼
VM destruida (nada persiste)
  │
  ▼
Facturación por minutos usados
\`\`\`

### 💻 Ejemplo básico

Tipos de hosted runners (GitHub):

\`\`\`yaml
jobs:
  test-ubuntu:
    runs-on: ubuntu-latest
  test-windows:
    runs-on: windows-latest
  test-macos:
    runs-on: macos-14
  big:
    runs-on: ubuntu-latest-8-cores    # tiers con más CPU/RAM
\`\`\`

### 🏢 Caso de uso profesional

Una startup con un repo público usa GitHub Actions hosted: los CI de los PRs corren gratis en ubuntu-latest, los releases de la app macOS en \`macos-latest\` (pagando minutos), y el equipo no mantiene ninguna máquina. Cuando crecen, migran solo los jobs pesados (builds nativos) a runners self-hosted para reducir costo, dejando el resto en hosted.

### ⚠️ Errores comunes

* Ignorar la facturación: repos privados consumen minutos pagos.
* Depender de IPs fijas (no existen en hosted).
* Instalar software en cada job (lento): usar setup-actions o imágenes propias.
* Elegir hosted para cargas enormes sin comparar costo con self-hosted.
* No fijar la versión de la imagen (\`ubuntu-latest\` cambia): usar versiones concretas para reproducibilidad.

### 📋 Lo que debes recordar

* Hosted = infraestructura gestionada, limpia y escalada por la plataforma.
* Máquina limpia por job, toolchains preinstaladas, mantenimiento cero.
* Se factura por minutos; IPs dinámicas.
* Ideal por defecto; self-hosted para control o costo.

### 🧪 Autoevaluación rápida

1. ¿Qué ventajas ofrecen los runners hosted?
2. ¿Qué límites tienen?
3. ¿Por qué "ubuntu-latest" puede romper la reproducibilidad?

---

1. Máquina limpia por job, toolchains preinstaladas, escalado automático, mantenimiento cero y facturación por uso.
2. IPs dinámicas (no fijas), recursos limitados por tier, facturación por minutos y sin software permanente instalable.
3. Porque "latest" cambia con el tiempo: un job puede ejecutarse en versiones distintas de la imagen en días distintos; conviene fijar versiones concretas.
`
export default content
