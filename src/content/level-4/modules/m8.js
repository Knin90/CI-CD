const content = `
## Módulo 8 — Runner environments

### 🎯 Objetivos de aprendizaje

* Explicar cómo los runners se asocian a entornos (dev, staging, prod).
* Configurar entornos protegidos con runners específicos.
* Aislar la ejecución por entorno.

### ❓ Problema real que resuelve

Un job de despliegue a producción no debe ejecutarse en el mismo plano que un job de desarrollo: necesita credenciales de producción, acceso a la red de producción y una auditoría más estricta. Los entornos de runners aíslan la ejecución: cada entorno tiene sus runners, sus secretos y sus políticas.

### 💡 Analogía

Un hospital tiene áreas separadas: quirófano (producción), consultas (staging) y recepción (dev). El personal del quirófano usa uniformes y protocolos distintos, y nadie entra sin acreditación. Los entornos de runners son esas áreas: cada una con su acceso, sus reglas y su personal (runners).

### 📖 Explicación técnica

* **Entorno** (environment): agrupación lógica de despliegues con su configuración: secretos, aprobaciones, política de ramas y runners.
* GitHub Actions: \`environment: production\` en el job; el entorno tiene "deployment branches", reviewers y **environment secrets**. Los runners se asocian a nivel de repo/org, pero los jobs de un entorno usan los secretos de ese entorno.
* GitLab: \`environment: production\` + \`tags\` apuntan a runners del entorno; \`protected environments\`.
* Azure: agent pools por entorno (Dev pool, Prod pool) con \`demands\`.
* Aislamiento físico vs lógico: idealmente los runners de producción corren en infraestructura separada (red privada, sin acceso desde dev).
* Políticas por entorno: qué ramas pueden desplegar, quién aprueba, qué secretos existen.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Entorno: production (protegido)
  │
  ├── Runners: pool prod (red interna, credenciales prod)
  ├── Secretos: PROD_API_KEY, DB_PASSWORD
  ├── Aprobaciones: reviewers autorizados
  └── Ramas permitidas: main, release/*
  │
  ▼
Job deploy con environment: production
  → solo runners del pool prod
  → solo con aprobación
  → con secretos de producción
\`\`\`

### 💻 Ejemplo básico

Job con entorno y runner específico (GitHub):

\`\`\`yaml
deploy-production:
  runs-on: [self-hosted, internal]
  environment: production
  needs: [staging]
  steps:
    - run: ./deploy.sh
      env:
        API_KEY: \${{ secrets.PROD_API_KEY }}
\`\`\`

### 🏢 Caso de uso profesional

Una fintech separa sus runners por entorno: los de dev corren en VMs baratas compartidas; los de staging en un pool aislado con datos sintéticos; los de producción en infraestructura dedicada dentro de la red interna con acceso solo a las bases de producción. Un job de deploy de producción solo puede ejecutarse en el pool de producción con aprobación — el aislamiento es físico y lógico.

### ⚠️ Errores comunes

* Todos los entornos en el mismo pool de runners.
* Secretos de producción visibles para jobs de dev (entornos sin separar).
* Deploy de producción desde una rama feature (sin política de ramas del entorno).
* Runners de producción con acceso a todo (sin aislamiento real).
* Ignorar la protección del entorno (sin approvals).

### 📋 Lo que debes recordar

* Los entornos agrupan runners, secretos, aprobaciones y políticas.
* Aislamiento lógico (entornos) y físico (infraestructura separada).
* Los jobs de producción usan secretos y runners de producción.
* Protege los entornos: ramas permitidas y approvals.

### 🧪 Autoevaluación rápida

1. ¿Qué agrupa un entorno en CI/CD?
2. ¿Por qué los runners de producción deberían estar aislados?
3. ¿Cómo se asocia un job a un entorno?

---

1. Runners/pool, secretos, aprobaciones, política de ramas permitidas y configuración específica del entorno.
2. Para limitar el impacto de un compromiso: los runners de producción solo tienen acceso a producción y sus credenciales; un compromiso en dev no escala a producción.
3. Declarando \`environment: production\` (o equivalente) en el job; la plataforma aplica las políticas del entorno.
`
export default content
