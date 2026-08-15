const content = `
## Módulo 7 — CI vs CD: dónde termina uno y empieza el otro

### 🎯 Objetivos de aprendizaje

* Trazar la frontera exacta entre CI y CD en un pipeline completo.
* Comprender que CI es condición necesaria pero no suficiente para CD.
* Mapear cada etapa de un pipeline profesional a su fase (CI o CD).

### ❓ Problema real que resuelve

Es común escuchar "ya tenemos CI/CD" cuando en realidad solo hay un build automático, o peor, "ya tenemos CI" cuando todo se hace manualmente. Sin entender la frontera, los equipos no saben qué automatizar ni dónde están los huecos de su pipeline. Saber separar CI de CD permite diagnosticar el estado real de la entrega de software de un equipo.

### 💡 Analogía

Un restaurante con cocina y sala: **CI** es la cocina — lavar, cortar y cocinar los ingredientes, siempre validando que cada plato salga bien. **CD** es el servicio — llevar el plato al comedor. Sin cocina validada no hay platos confiables; sin servicio no llega nada al cliente. Se puede tener una cocina excelente y un servicio terrible (manual, lento), o una cocina regular y un servicio rápido. El pipeline profesional automatiza ambas partes.

### 📖 Explicación técnica

* **CI (Integración Continua)**: cubre desde el commit hasta el artefacto validado. Build, tests, análisis estático, seguridad, empaquetado. Pregunta: *¿el código es correcto y está integrado?*
* **CD (Entrega/Despliegue Continuo)**: cubre desde el artefacto validado hasta producción. Publicación en registry, promoción por entornos, despliegue, verificación. Pregunta: *¿el artefacto llega de forma segura a producción?*
* El **artefacto** es la frontera: lo que CI produce y CD consume.
* CD **presupone** CI: no tiene sentido desplegar un artefacto no validado.
* La fase de "empaquetar/publicar el artefacto" suele considerarse el puente entre ambas; en la práctica se define como el último paso de CI o el primero de CD según la plataforma.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Commit
  │
  ▼
┌─────────────────────────────────────┐
│  CI — Integración Continua           │
│  Lint → Unit tests → Integration     │
│  → Security → Build                  │
│  Pregunta: ¿el código está bien?     │
└──────────────────┬──────────────────┘
                   │
                   ▼
             ARTEFACTO VALIDADO  ← frontera
                   │
                   ▼
┌─────────────────────────────────────┐
│  CD — Entrega / Despliegue          │
│  Registry → Staging → Aprobación    │
│  → Producción → Verificación        │
│  Pregunta: ¿llega seguro a prod?    │
└─────────────────────────────────────┘
\`\`\`

### 💻 Ejemplo básico

Pipeline completo con CI y CD separados (GitHub Actions con dos jobs):

\`\`\`yaml
name: CI

on: [push, pull_request]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: docker build -t app:\${{ github.sha }} .
      - run: docker push registry.example.com/app:\${{ github.sha }}
\`\`\`

\`\`\`yaml
name: CD

on:
  workflow_run:
    workflows: [CI]
    types: [completed]

jobs:
  deploy:
    if: \${{ github.event.workflow_run.conclusion == 'success' }}
    runs-on: ubuntu-latest
    environment: production
    steps:
      - run: ./deploy.sh --image \${{ github.sha }}
\`\`\`

### 🏢 Caso de uso profesional

En una auditoría de procesos, un equipo declara "tenemos CI/CD". Al revisar, descubren que solo tienen CI (build y tests) y que el despliegue es un script manual que corre una persona. El diagnóstico con el modelo CI/CD muestra el hueco: falta CD. Automatizan la publicación de imágenes y el despliegue a staging, y con eso reducen a la mitad el tiempo de entrega.

### ⚠️ Errores comunes

* Llamar CI a un simple "build automático" sin tests.
* Llamar CD a un "deploy manual con script documentado".
* Poner la aprobación humana en el medio de CI (frena la integración).
* No tener claro cuál es el artefacto que cruza la frontera.

### 📋 Lo que debes recordar

* CI valida el código; CD entrega el artefacto validado.
* La frontera es el artefacto.
* CD presupone CI.
* CI sin CD = código validado que se despliega a mano; CD sin CI = desplegar sin validar.

### 🧪 Autoevaluación rápida

1. ¿Cuál es la frontera entre CI y CD?
2. ¿Es posible tener CI sin CD? ¿Y CD sin CI? ¿Cuál es el riesgo de cada caso?
3. ¿En qué fase se publica el artefacto en el registry?

---

1. El artefacto validado: lo que CI produce (y valida) y lo que CD consume para desplegar.
2. Sí a ambas. CI sin CD deja el despliegue manual (lento y frágil); CD sin CI despliega código sin validar (peligroso). El pipeline profesional necesita ambas.
3. Es el puente: normalmente el último paso de CI (publicar lo construido) o el primer paso de CD (tomar el artefacto), según la convención de la plataforma; lo importante es que sea automático y auditable.
`
export default content
