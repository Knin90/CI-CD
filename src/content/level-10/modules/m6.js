const content = `
## Módulo 6 — Secret scanning

### 🎯 Objetivos de aprendizaje

* Explicar por qué los secretos terminan en los repos y cómo evitarlo.
* Escanear repos e imágenes en busca de secretos.
* Responder a una fuga: rotar, purgar, prevenir.

### ❓ Problema real que resuelve

Los secretos (tokens, claves, contraseñas) aparecen en repos por error o por mala práctica: commitear \`.env\`, hardcodear claves, pegar tokens en configs. Una vez en git, el secreto está comprometido para siempre (el historial lo conserva). El secret scanning detecta fugas automáticamente y habilita la respuesta correcta: rotar YA y prevenir la próxima.

### 💡 Analogía

El secret scanning es como el detector de metales en la puerta del banco: detecta si alguien sale con llaves de las cajas fuertes (secretos). Cuando suena la alarma, la respuesta no es "esconder el detector": es cambiar la cerradura (rotar el secreto) y revisar quién más salió (auditar). El detector evita que las fugas pasen desapercibidas.

### 📖 Explicación técnica

Qué escanea:

* **Repos**: commits (incluido el historial), PRs — patrones de tokens (AWS keys, GitHub tokens, API keys), archivos sensibles (\`.env\`, \`.pem\`).
* **Imágenes**: secretos embebidos en capas.
* **Archivos de config**: .npmrc, .env, settings.xml con credenciales.

Herramientas: GitHub secret scanning (integrado, alerta a proveedores), gitleaks, trufflehog, detect-secrets.

En el pipeline:

* Hook pre-commit (detección local, Shift Left).
* Job de CI: \`gitleaks\` en cada push/PR.
* **Gate**: hallazgo → PR bloqueado.

Respuesta a una fuga (runbook):

1. **Rotar** el secreto inmediatamente (revocar, regenerar).
2. **Purgar** el historial de git (history rewrite) o marcar el repo.
3. **Auditar** el alcance (quién pudo leerlo, logs de acceso).
4. **Prevenir**: secret scanning en CI, secretos en el gestor, pre-commit.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Commit con .env → push
  │
  ▼
gitleaks detecta: AWS_ACCESS_KEY (pattern match)
  │
  ├── Gate ROJO → el push/PR se bloquea
  └── Alerta al equipo
  │
  ▼
Respuesta: rotar la clave YA (revocar + regenerar)
  │
  ▼
Prevención: pre-commit + secretos en el gestor + escaneo continuo
\`\`\`

### 💻 Ejemplo básico

Escaneo con gitleaks:

\`\`\`yaml
- name: Secret scanning
  run: |
    gitleaks detect --source . --report-path gitleaks.json --redact
- name: Gate
  run: |
    [ ! -s gitleaks.json ] && echo "Sin fugas" || exit 1
\`\`\`

### 🏢 Caso de uso profesional

Un desarrollador commitea por error un token de la API de pagos. El secret scanning de GitHub lo detecta y **notifica al proveedor** del token, que lo revoca automáticamente; el equipo rota la clave en el gestor de secretos y purga el historial. El impacto es mínimo porque la detección fue inmediata. La lección se convierte en política: secretos solo en el gestor.

### ⚠️ Errores comunes

* Rotar tarde ("fue solo un repo privado") — los repos se clonan y se comparten.
* Borrar el commit sin purgar el historial (el secreto sigue en git).
* Escaneo sin gate (detectar y no bloquear).
* Confiar en la memoria ("yo nunca commiteo secretos").
* Secretos en imágenes (capas que se distribuyen).

### 📋 Lo que debes recordar

* Un secreto en git está comprometido: hay que ROTARLO.
* Escaneo en pre-commit (local) y en CI (gate).
* Respuesta: rotar → purgar → auditar → prevenir.
* Los secretos viven en el gestor, nunca en el repo ni en imágenes.

### 🧪 Autoevaluación rápida

1. ¿Por qué un secreto commiteado se considera comprometido?
2. ¿Qué respuesta se da ante una fuga?
3. ¿Qué herramientas detectan secretos?

---

1. Porque el historial de git lo conserva para siempre: cualquiera con acceso al repo (o a un clon) puede leerlo en cualquier momento.
2. Rotar inmediatamente (revocar/regenerar), purgar el historial, auditar el alcance y prevenir con escaneos.
3. GitHub secret scanning (integrado), gitleaks, trufflehog y detect-secrets.
`
export default content
