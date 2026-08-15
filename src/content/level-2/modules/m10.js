const content = `
## Módulo 10 — Manual approvals

### 🎯 Objetivos de aprendizaje

* Explicar qué es una aprobación manual y cuándo es necesaria.
* Configurar gates de aprobación en entornos protegidos.
* Entender el trade-off entre automatización y control humano.

### ❓ Problema real que resuelve

No todo debe desplegarse automáticamente: en entornos sensibles (producción, datos de clientes) o en contextos regulados, alguien con responsabilidad debe revisar y aprobar antes del despliegue. La aprobación manual crea un **gate explícito**: el pipeline se detiene hasta que una persona autorizada decide continuar, dejando registro auditable de quién aprobó y cuándo.

### 💡 Analogía

Una compuerta de un canal: el agua (pipeline) fluye hasta la compuerta y se detiene; un operador autorizado decide abrirla (aprobar) o no. Sin la compuerta, el agua pasaría sola; con ella, hay control y registro de cada apertura.

### 📖 Explicación técnica

* **Aprobación manual**: punto del pipeline que requiere intervención humana para continuar.
* Implementación típica: **entornos protegidos** con \`environment: production\` y reviewers configurados (GitHub Actions: environment protection rules; GitLab: \`when: manual\` + \`environment\`; Azure: approvals en environments).
* El gate se aplica a nivel de **entorno** (production) y suele combinar:
  * Lista de **reviewers autorizados**.
  * **Mensaje** con contexto (qué se despliega, versión, cambios).
  * Registro **auditable** (quién, cuándo, resultado).
* La aprobación no elimina la automatización: solo detiene el paso final; todo lo demás sigue automático.
* Consideraciones: las aprobaciones manuales añaden latencia y dependencia humana; úsalas donde aportan control real, no por costumbre.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline llega al job de deploy-production
  │
  ▼
El job requiere aprobación (environment protegido)
  │
  ▼
Estado: "En espera de aprobación" + notificación a reviewers
  │
  ├── Aprobado → el job se ejecuta → deploy
  │              └── Registro: quién, cuándo, versión
  └── Rechazado → el pipeline se cancela (registro incluido)
\`\`\`

### 💻 Ejemplo básico

Aprobación con environment protegido (GitHub Actions):

\`\`\`yaml
deploy-production:
  runs-on: ubuntu-latest
  environment: production
  needs: [ci, staging]
  steps:
    - run: ./deploy.sh --env production
\`\`\`

La protección del entorno \`production\` en la configuración de GitHub exige aprobación de los reviewers listados antes de ejecutar el job.

### 🏢 Caso de uso profesional

Una plataforma de pagos exige aprobación humana para producción por compliance: el pipeline llega automáticamente hasta el job de producción con una descripción clara ("Desplegar v1.4.2: fix de seguridad en checkout"), el release manager aprobado recibe la notificación, revisa y aprueba. El despliegue se ejecuta y el registro queda para auditoría. Todo lo demás — CI, staging, escaneos — es automático.

### ⚠️ Errores comunes

* Aprobaciones sin contexto: el aprobador no sabe qué está aprobando.
* Too many gates: el pipeline se vuelve lento y el equipo busca atajos.
* Reviewers no notificados: el pipeline espera eternamente.
* Aprobar sin revisar: el gate pierde todo su valor.
* Aprobaciones manuales donde no aportan (staging innecesario).

### 📋 Lo que debes recordar

* El gate de aprobación detiene el pipeline hasta decisión humana.
* Se implementa con entornos protegidos y reviewers.
* La aprobación es auditable: quién, cuándo, qué se desplegó.
* Úsala donde el control humano aporta; no por costumbre.

### 🧪 Autoevaluación rápida

1. ¿Cómo se implementa típicamente una aprobación manual?
2. ¿Qué información debe tener el aprobador?
3. ¿Qué desventaja tiene abusar de las aprobaciones manuales?

---

1. Con entornos protegidos: el job de deploy se asocia a un entorno (ej: production) que exige aprobación de reviewers antes de ejecutarse.
2. Contexto completo: qué versión se despliega, qué cambios incluye, riesgos, y el estado de las validaciones previas.
3. Latencia y dependencia humana: el pipeline espera, y si el aprobador tarda o no está disponible, la entrega se bloquea; además el equipo puede buscar atajos.
`
export default content
