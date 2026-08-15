const content = `
## Módulo 2 — SAST

### 🎯 Objetivos de aprendizaje

* Definir SAST: análisis estático del código fuente.
* Ejecutar SAST en el pipeline y leer sus hallazgos.
* Integrar SAST como gate de seguridad.

### ❓ Problema real que resuelve

Muchas vulnerabilidades (inyecciones, XSS, secretos hardcodeados, uso inseguro de APIs) se pueden detectar ANALIZANDO EL CÓDIGO SIN EJECUTARLO. El SAST recorre el código fuente en busca de patrones de vulnerabilidades, reportándolas con la línea exacta. Integrado en el pipeline, cada PR recibe el análisis automáticamente — Shift Left de la seguridad.

### 💡 Analogía

El SAST es como el corrector de un libro que revisa el manuscrito antes de imprimir: busca errores (vulnerabilidades) leyendo el texto (código), sin necesidad de vender el libro (ejecutar la app). Encuentra frases peligrosas (inyecciones) y datos sensibles escritos (secretos) antes de que lleguen al público.

### 📖 Explicación técnica

* **SAST (Static Application Security Testing)**: análisis estático del código fuente o binario en busca de vulnerabilidades, sin ejecución.
* Qué detecta: inyección SQL, XSS, path traversal, secretos hardcodeados, uso inseguro de APIs, configuraciones peligrosas.
* Herramientas: Semgrep, CodeQL (GitHub), SonarQube, Bandit (Python), ESLint con plugins de seguridad, Brakeman (Rails).
* En el pipeline:
  * Corre en cada PR (rápido, escanea el diff o el repo completo).
  * Reporta hallazgos por severidad (critical/high/medium/low).
  * **Gate**: bloquear críticas/altas; comentar hallazgos en el PR.
* Falsos positivos: el SAST genera ruido; hay que calibrar reglas y triar.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Código del PR
  │
  ▼
SAST (Semgrep/CodeQL): parsea y aplica reglas de seguridad
  │
  ├── Hallazgo: inyección SQL en src/users.js:42 (high)
  ├── Hallazgo: secreto hardcodeado en config.js:7 (critical)
  └── Hallazgo: XSS en views/profile.jsx:88 (medium)
  │
  ▼
¿Críticas/altas? → Gate ROJO → PR bloqueado + comentarios
  │
  ▼
El autor corrige → nuevo push → SAST verde
\`\`\`

### 💻 Ejemplo básico

SAST con Semgrep:

\`\`\`yaml
- name: SAST
  run: |
    semgrep scan --config auto --json --output semgrep.json .
- name: Gate
  run: |
    python3 -c "
    import json
    r = json.load(open('semgrep.json'))
    highs = [x for x in r['results'] if x['extra']['severity'] in ('ERROR','WARNING')]
    print(f'{len(highs)} hallazgos altos')
    exit(1 if highs else 0)
    "
\`\`\`

### 🏢 Caso de uso profesional

Un equipo detecta con SAST una inyección SQL en un endpoint de búsqueda: el hallazgo llega como comentario en el PR con la línea exacta. El desarrollador corrige usando queries parametrizadas, el SAST vuelve a verde y el código mergea. La vulnerabilidad nunca llegó a producción — el SAST en cada PR es la primera línea de defensa.

### ⚠️ Errores comunes

* SAST solo en releases (los hallazgos llegan tarde).
* Ignorar hallazgos por falsos positivos (calibrar reglas, triar).
* SAST sin gate (escanear y no bloquear).
* Correr SAST solo sobre el diff (vulnerabilidades en código existente).
* No triar ni gestionar los hallazgos (ruido acumulado).

### 📋 Lo que debes recordar

* SAST = análisis estático sin ejecución, en cada PR.
* Detecta inyecciones, XSS, secretos y malas prácticas.
* Gate por severidad + comentarios en el PR.
* Calibra las reglas para reducir falsos positivos.

### 🧪 Autoevaluación rápida

1. ¿Qué analiza el SAST y cómo?
2. ¿Qué tipos de vulnerabilidades detecta?
3. ¿Cómo se integra como gate?

---

1. El código fuente (o binario) sin ejecutarlo, aplicando reglas de patrones de vulnerabilidades.
2. Inyección SQL, XSS, path traversal, secretos hardcodeados y uso inseguro de APIs.
3. Ejecutándolo en cada PR y fallando el pipeline si hay hallazgos por encima del umbral de severidad.
`
export default content
