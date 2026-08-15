const content = `
## Módulo 2 — Artifact lifecycle

### 🎯 Objetivos de aprendizaje

* Recorrer el ciclo de vida de un artefacto: nace, viaja, se promueve, se retira.
* Entender la promoción como el corazón del ciclo.
* Aplicar retención y auditoría al ciclo completo.

### ❓ Problema real que resuelve

Un artefacto sin ciclo de vida es una caja perdida: nadie sabe dónde está, qué versión es, si se desplegó, cuándo expira. El ciclo de vida define cada estado del artefacto — producido, verificado, publicado, promovido, retirado — y las reglas de transición. Es lo que hace que "desplegar la versión X" sea una operación con trazabilidad total.

### 💡 Analogía

El ciclo de vida del artefacto es como la carrera de un paquete en una empresa de mensajería: recogido (build), inspeccionado (verificación), en almacén (registry), en tránsito (promoción), entregado (deploy) y archivado (retención). Cada estado tiene registro de fecha y responsable. Un paquete sin estados es un paquete perdido.

### 📖 Explicación técnica

Estados del ciclo de vida:

1. **Producido**: el build genera el artefacto con su identidad (versión, commit, hash).
2. **Verificado**: smoke tests y firma confirman que es válido y auténtico.
3. **Publicado**: se almacena en el registry (inmutable).
4. **Promovido**: la misma versión se mueve entre entornos (staging → producción), con aprobaciones si aplica.
5. **Desplegado**: el entorno corre esa versión exacta.
6. **Retenido/retirado**: política de retención (días o indefinido) y limpieza.

Reglas del ciclo:

* **Inmutabilidad**: un artefacto publicado no cambia; el cambio es una versión nueva.
* **Promoción**: nunca se reconstruye para desplegar (build once, deploy many).
* **Auditoría**: cada transición registra quién, cuándo y qué versión.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Producido (build) → v1.4.0, commit abc
  │
  ▼
Verificado (smoke + firma) ✓
  │
  ▼
Publicado (registry, inmutable)
  │
  ▼
Promovido: staging → aprobación → producción
  │
  ▼
Desplegado: producción corre v1.4.0
  │
  ▼
Retención: v* indefinido · intermedios 30 días
  │
  ▼
Auditoría: registro de cada transición
\`\`\`

### 💻 Ejemplo básico

Promoción del mismo artefacto:

\`\`\`text
registry: app:v1.4.0 (inmutable)
  ├── deploy staging  → usa app:v1.4.0
  ├── deploy prod     → usa app:v1.4.0 (mismo digest)
  └── rollback        → vuelve a app:v1.3.9 (del registry)
\`\`\`

### 🏢 Caso de uso profesional

Un equipo de plataforma define el ciclo completo: cada artefacto nace con identidad, se firma, se publica inmutable en el registry, se promueve por entornos con aprobación en producción, y se retira por política. Ante una auditoría de compliance, exportan el registro de transiciones: qué versión, qué entorno, qué aprobador, qué fecha — el ciclo de vida es la auditoría.

### ⚠️ Errores comunes

* Promover reconstruyendo (rompe la inmutabilidad).
* Artefactos sin estado definido (¿publicado? ¿promovido?).
* Sin auditoría de transiciones.
* Retención sin reglas (todo o nada).
* Desplegar artefactos no verificados ni firmados.

### 📋 Lo que debes recordar

* Ciclo: producir → verificar → publicar → promover → desplegar → retener/retirar.
* Inmutabilidad y promoción sin reconstrucción.
* Cada transición es auditable.
* La retención se define por política, no por olvido.

### 🧪 Autoevaluación rápida

1. ¿Qué estados tiene el ciclo de vida de un artefacto?
2. ¿Qué significa promover un artefacto?
3. ¿Por qué el ciclo debe ser auditable?

---

1. Producido, verificado, publicado, promovido, desplegado y retenido/retirado.
2. Mover la misma versión (sin reconstruir) a través de los entornos: staging → aprobación → producción.
3. Porque la trazabilidad de qué versión se desplegó, cuándo y quién lo aprobó es la base de la auditoría y del diagnóstico de incidentes.
`
export default content
