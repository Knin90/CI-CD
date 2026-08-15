const content = `
## Módulo 8 — Releases

### 🎯 Objetivos de aprendizaje

* Definir qué es una release y su relación con tags y artefactos.
* Describir un pipeline de release típico.
* Explicar por qué las releases deben ser pequeñas, frecuentes y reversibles.

### ❓ Problema real que resuelve

Sin un proceso de release definido, "sacar una versión" es un evento manual y estresante: build de última hora, script de deploy improvisado, sin changelog, sin plan de rollback. El pipeline de release convierte la release en un **proceso automático y repetible**: el tag marca el punto, el pipeline construye el artefacto final, lo publica, genera el changelog y lo despliega — todo con trazabilidad completa.

### 💡 Analogía

Una release es como el lanzamiento de un producto: el tag es la fecha de lanzamiento acordada, el artefacto es el producto terminado en el almacén, el changelog es la nota de prensa y el despliegue es la distribución a las tiendas. Un lanzamiento profesional tiene todo coordinado; uno improvisado olvida la mitad y nadie sabe qué se lanzó.

### 📖 Explicación técnica

Componentes de una release:

* **Versión**: identificador único, idealmente versionado semántico (\`MAJOR.MINOR.PATCH\`).
* **Tag**: el commit exacto que representa la versión.
* **Artefacto**: el binario/imagen construido desde ese commit (inmutable).
* **Changelog**: qué cambió entre versiones (features, fixes, breaking changes).
* **Notas de release**: contexto para los consumidores (migraciones, cambios de configuración).
* **Despliegue**: la versión llega a los entornos.

Pipeline de release típico:

1. Congelar la rama \`release/vX.Y.Z\` (solo fixes).
2. Validar todo (CI completo).
3. Crear tag \`vX.Y.Z\` y pushearlo.
4. El trigger de tag construye el artefacto final desde el commit exacto.
5. Publicar artefacto en el registry (inmutable, versionado).
6. Generar changelog automático (desde Conventional Commits).
7. Desplegar (staging → aprobación → producción).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Rama release/v1.2.0 (congelada)
  │
  ▼
CI completo en verde
  │
  ▼
git tag v1.2.0 → push
  │
  ▼
Pipeline de release (trigger: tags)
  ├── Build desde el commit exacto
  ├── Publicar app:v1.2.0 (inmutable)
  ├── Generar changelog
  ├── Deploy staging → validar
  └── Deploy producción (con aprobación si aplica)
\`\`\`

### 💻 Ejemplo básico

Versionado semántico:

\`\`\`text
v1.2.0   → MAJOR 1 · MINOR 2 · PATCH 0
  ├── MAJOR: cambios incompatibles (breaking)
  ├── MINOR: nuevas features compatibles
  └── PATCH: correcciones de bugs
\`\`\`

Changelog generado desde Conventional Commits:

\`\`\`text
## v1.2.0
### Features
- feat(api): endpoint de pagos (#456)
- feat(ui): modo oscuro (#460)
### Fixes
- fix(checkout): cálculo del total (#458)
\`\`\`

### 🏢 Caso de uso profesional

Una empresa B2B con clientes que integran su API publica releases cada 2 semanas. Cada release tiene changelog automático, notas de migración y el artefacto inmutable en el registry. Cuando un cliente reporta un bug de la v1.2.0, el equipo consulta el changelog, identifica el PR responsable y publica la v1.2.1 con el fix en horas — sin tocar features en desarrollo.

### ⚠️ Errores comunes

* Releases grandes y poco frecuentes: el riesgo se acumula.
* Construir el artefacto "a mano" fuera del pipeline de release.
* Changelog incompleto: los consumidores no saben qué cambió.
* Versiones sin tag o tags sin artefacto correspondiente.
* Publicar la release sin plan de rollback.

### 📋 Lo que debes recordar

* Release = versión + tag + artefacto inmutable + changelog + despliegue.
* El pipeline de release se dispara con el tag y lo hace todo automáticamente.
* Versionado semántico comunica el impacto del cambio.
* Releases pequeñas y frecuentes reducen el riesgo de cada una.

### 🧪 Autoevaluación rápida

1. ¿Qué componentes conforman una release?
2. ¿Qué trigger dispara el pipeline de release?
3. ¿Qué significa cada parte de \`v1.2.0\` en versionado semántico?

---

1. La versión (identificador), el tag (commit exacto), el artefacto inmutable, el changelog y el despliegue a los entornos.
2. El push de un tag con patrón \`v*\`; el pipeline construye desde el commit exacto, publica el artefacto y despliega.
3. MAJOR 1: cambios incompatibles; MINOR 2: features nuevas compatibles; PATCH 0: correcciones de bugs.
`
export default content
