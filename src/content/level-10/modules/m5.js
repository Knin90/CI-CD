const content = `
## Módulo 5 — Dependency scanning

### 🎯 Objetivos de aprendizaje

* Explicar el escaneo de dependencias en el pipeline.
* Detectar vulnerabilidades y actualizaciones disponibles.
* Automatizar la actualización segura de dependencias.

### ❓ Problema real que resuelve

Las dependencias envejecen y acumulan vulnerabilidades; mantenerlas al día a mano es imposible en proyectos con cientos de paquetes. El escaneo de dependencias detecta qué versiones tienen CVEs y qué actualizaciones las corrigen; los bots (Dependabot, Renovate) abren los PRs de actualización con el pipeline como verificación. El ecosistema se mantiene sano con trabajo automático.

### 💡 Analogía

El escaneo de dependencias es como la revisión periódica del inventario del almacén: cada lote (paquete) se verifica contra los avisos de retiro (CVE) y las nuevas versiones disponibles. Cuando un lote es peligroso, se abre automáticamente una orden de reposición (PR del bot) que pasa por el control de calidad (tests) antes de entrar al almacén.

### 📖 Explicación técnica

Flujo completo:

1. **Detectar**: el escáner compara las versiones instaladas con las bases de datos (npm audit, Dependabot alerts, Renovate).
2. **Alertar**: vulnerabilidades reportadas en el repo (security tab) o en el pipeline.
3. **Actualizar**: Dependabot/Renovate abren PRs con la versión segura.
4. **Verificar**: el PR corre el pipeline completo (tests, SCA, SAST).
5. **Merge**: si todo verde, la dependencia se actualiza con confianza.

Consideraciones:

* Automatización de actualizaciones de **seguridad** (prioridad) vs **feature** (agrupadas, planificadas).
* Umbrales: actualizar automáticamente lo crítico; lo demás con revisión.
* Breaking changes de dependencias: el pipeline los detecta (tests rojos) — la actualización queda documentada.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Escáner detecta: express@4.17.1 → CVE-2022-24999 (medium)
  │
  ▼
Alerta en el repo + Dependabot abre PR:
  "chore(deps): bump express to 4.18.0"
  │
  ▼
Pipeline del PR: tests + SCA + SAST → verde
  │
  ▼
Merge → main → release con la dependencia segura
\`\`\`

### 💻 Ejemplo básico

Configuración de Dependabot:

\`\`\`yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: "/"
    schedule:
      interval: weekly
    open-pull-requests-limit: 10
    ignore:
      - dependency-name: "*"
        update-types: ["version-update:semver-major"]
\`\`\`

### 🏢 Caso de uso profesional

Un proyecto con 400 dependencias usa Dependabot: cada semana abre los PRs de actualización; los de seguridad (críticas) se actualizan automáticamente en horas, el resto se agrupan y revisan. Un CVE crítico en una librería popular se parchea en 24 horas sin intervención manual — la cadena de dependencias ya no es el eslabón débil.

### ⚠️ Errores comunes

* Escaneo sin actualización (alertas que nadie procesa).
* Actualizaciones automáticas sin tests (romper sin detectar).
* Ignorar breaking changes de dependencias.
* PRs de dependencias sin revisar ni medir (deuda técnica).
* Sin umbrales (actualizar todo a la vez = caos).

### 📋 Lo que debes recordar

* Escaneo detecta CVEs y versiones; los bots abren los PRs.
* El pipeline verifica cada actualización (tests + SCA).
* Seguridad primero: críticas automáticas; el resto controlado.
* La cadena de dependencias se mantiene con automatización, no con heroísmo.

### 🧪 Autoevaluación rápida

1. ¿Cómo se automatiza la actualización de dependencias?
2. ¿Qué papel juega el pipeline en cada PR de dependencia?
3. ¿Qué umbrales conviene configurar?

---

1. Con bots como Dependabot o Renovate, que detectan versiones y abren PRs de actualización automáticamente.
2. Verifica cada actualización: corre tests, SCA y SAST; si todo verde, la dependencia mergea con confianza.
3. Actualizaciones de seguridad (críticas) automáticas; features agrupadas y planificadas; majors (breaking) con revisión explícita.
`
export default content
