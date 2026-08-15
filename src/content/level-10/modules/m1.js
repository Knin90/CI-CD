const content = `
## Módulo 1 — DevSecOps

### 🎯 Objetivos de aprendizaje

* Definir DevSecOps: seguridad integrada, no añadida al final.
* Ubicar los controles de seguridad en el pipeline.
* Entender la seguridad como responsabilidad compartida.

### ❓ Problema real que resuelve

La seguridad tradicional era un equipo aparte que auditaba al final (pentest anual): los hallazgos llegaban tarde, costaban carísimos y generaban conflicto. DevSecOps integra la seguridad EN el proceso de desarrollo y entrega: escaneos automáticos en cada PR, gates de seguridad en el pipeline, y responsabilidad compartida entre devs, ops y security. La seguridad deja de ser un evento y se vuelve una propiedad del flujo.

### 💡 Analogía

La seguridad en el desarrollo es como la higiene en la cocina: no se contrata a un inspector que venga una vez al año (pentest); la higiene es parte de CADA receta — lavarse las manos, temperaturas, fechas (SAST, SCA, gates). Un restaurante que cocina sin higiene y confía en la inspección anual no sobrevive a la primera visita del inspector.

### 📖 Explicación técnica

Principios DevSecOps:

* **Shift left en seguridad**: escanear al escribir (SAST), al instalar (SCA), al construir (imágenes), no al final.
* **Seguridad como código**: políticas, escaneos y gates definidos en el pipeline, versionados y revisados.
* **Automatización**: los controles corren solos en cada PR/release, sin depender de recordatorios humanos.
* **Responsabilidad compartida**: devs corrigen hallazgos, ops despliegan seguro, security define políticas y verifica.

Controles en el pipeline (mapa):

\`\`\`text
Commit → SAST (código) → SCA (deps) → Secret scanning → Build
  → Escaneo de imagen → IaC scan → Security gate → Deploy
\`\`\`

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Código
  │
  ▼
SAST (análisis estático del código)
  │
  ▼
Dependencias (SCA + secret scanning)
  │
  ▼
Contenedor (escaneo de imagen)
  │
  ▼
IaC (Terraform/K8s scan)
  │
  ▼
Security Gate (umbrales de severidad)
  │
  ▼
Deploy (solo si el gate pasa)
\`\`\`

### 💻 Ejemplo básico

Controles DevSecOps en el pipeline:

\`\`\`yaml
security:
  runs-on: ubuntu-latest
  steps:
    - run: npm run sast          # SAST del código
    - run: npm audit --audit-level=high   # SCA de dependencias
    - run: trivy repo .          # escaneo del repo (secretos, IaC)
    - run: trivy image app:build # escaneo de la imagen
\`\`\`

### 🏢 Caso de uso profesional

Un banco con DevSecOps: cada PR corre SAST, SCA, secret scanning y escaneo de imagen; el security gate bloquea vulnerabilidades críticas. En un año, el pentest anual pasa de 15 hallazgos a 1 menor: la seguridad se resolvió en el flujo, no en el evento. El equipo de seguridad define las políticas; los devs las cumplen con feedback automático.

### ⚠️ Errores comunes

* Seguridad solo al final (auditorías) — hallazgos caros y tardíos.
* Herramientas sin gates (escanear y no bloquear).
* Seguridad como "trabajo del equipo de security" (silos).
* Falsos positivos que ignoran todo el escaneo.
* Políticas no versionadas (cambian sin revisión).

### 📋 Lo que debes recordar

* DevSecOps = seguridad integrada en el flujo, no añadida al final.
* Controles automáticos en cada PR/release.
* Gates de seguridad con umbrales claros.
* Responsabilidad compartida: todos corrigen, todos despliegan seguro.

### 🧪 Autoevaluación rápida

1. ¿Qué problema resuelve DevSecOps?
2. ¿Qué controles de seguridad corre un pipeline DevSecOps?
3. ¿Qué es un security gate?

---

1. La seguridad tardía (auditorías al final): hallazgos caros, lentos y conflictivos; integra los controles en cada etapa del flujo.
2. SAST (código), SCA (dependencias), secret scanning, escaneo de imágenes e IaC, con gates que bloquean según severidad.
3. Un conjunto de umbrales automáticos (severidades máximas toleradas) que detiene el pipeline si se superan.
`
export default content
