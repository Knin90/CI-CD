const content = `
## Módulo 3 — DAST

### 🎯 Objetivos de aprendizaje

* Definir DAST: análisis dinámico contra la app en ejecución.
* Ejecutar DAST en el pipeline contra entornos desplegados.
* Complementar SAST con DAST.

### ❓ Problema real que resuelve

El SAST analiza el código; el DAST ataca la aplicación EN EJECUCIÓN como lo haría un atacante externo: envía peticiones maliciosas y observa las respuestas. Detecta vulnerabilidades que solo aparecen en runtime (configuración real, lógica de negocio, cabeceras) y que el análisis estático no ve. Complementa al SAST desde la perspectiva del atacante.

### 💡 Analogía

El SAST es el médico que lee los análisis de sangre (código); el DAST es el especialista que pone al paciente a correr en una cinta (app en ejecución) y observa su reacción bajo esfuerzo. Ambos son necesarios: los análisis no muestran cómo se comporta el cuerpo (sistema) en movimiento.

### 📖 Explicación técnica

* **DAST (Dynamic Application Security Testing)**: analiza la aplicación en ejecución enviando peticiones (a menudo maliciosas) y evaluando las respuestas.
* Qué detecta: inyecciones (SQL, command), XSS reflejado, problemas de auth/sesión, cabeceras de seguridad faltantes, exposición de datos, configuraciones expuestas.
* Herramientas: OWASP ZAP, Burp Suite, Nikto, nuclei, StackHawk.
* En el pipeline:
  * Se ejecuta contra **staging** (app desplegada), nunca producción.
  * Tras el deploy, con autenticación si la app la requiere.
  * Reporta por severidad; gate según umbral.
* Limitaciones: solo ve lo alcanzable desde la red; no cubre lógica profunda sin guía (scripts de recorrido).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Deploy a staging
  │
  ▼
DAST (OWASP ZAP) ataca la app desplegada
  ├── Escaneo pasivo: observa tráfico, cabeceras, cookies
  ├── Escaneo activo: peticiones maliciosas (SQLi, XSS)
  └── Verificación de configs (cors, cabeceras, errores)
  │
  ▼
Reporte: hallazgos por severidad + evidencia
  │
  ▼
Gate: críticas/altas → NO publicar / bloquear release
\`\`\`

### 💻 Ejemplo básico

DAST con OWASP ZAP en CI:

\`\`\`yaml
- name: DAST contra staging
  run: |
    docker run -t ghcr.io/zaproxy/zaproxy zap-baseline.py \\
      -t https://staging.example.com \\
      -r zap-report.html
- uses: actions/upload-artifact@v4
  with: { name: zap, path: zap-report.html }
\`\`\`

### 🏢 Caso de uso profesional

Un equipo complementa su pipeline: SAST en cada PR y DAST (ZAP) en cada deploy a staging. El DAST detecta una cabecera de seguridad faltante y un endpoint que devolvía datos sensibles en errores. El SAST no lo había visto (depende de la configuración en runtime). Corrigen ambos, el DAST vuelve a verde y la release sale con la app verificada desde fuera.

### ⚠️ Errores comunes

* DAST solo en producción (riesgo de daño y datos reales).
* Ejecutar DAST sin autenticación (cubre poco de la app real).
* DAST sin gate (escaneo decorativo).
* Confiar solo en DAST o solo en SAST (se complementan).
* Falsos positivos no triados que generan ruido.

### 📋 Lo que debes recordar

* DAST = análisis dinámico contra la app en ejecución.
* Se ejecuta en staging (nunca producción), tras el deploy.
* Complementa al SAST: ve lo que solo aparece en runtime.
* Gate por severidad + reporte con evidencia.

### 🧪 Autoevaluación rápida

1. ¿Qué diferencia hay entre SAST y DAST?
2. ¿Contra qué entorno se ejecuta el DAST?
3. ¿Qué detecta el DAST que el SAST no?

---

1. SAST analiza el código sin ejecutarlo; DAST ataca la aplicación en ejecución enviando peticiones y observando respuestas.
2. Contra staging (la app desplegada), nunca contra producción.
3. Vulnerabilidades de runtime y configuración: cabeceras faltantes, errores que filtran datos, auth/sesión, CORS mal configurado.
`
export default content
