const content = `
## Módulo 6 — Continuous Deployment en profundidad

### 🎯 Objetivos de aprendizaje

* Enumerar los requisitos técnicos para automatizar el despliegue a producción.
* Explicar cuándo Continuous Deployment es apropiado y cuándo no.
* Entender el rol del monitoreo como "segunda línea de defensa" del despliegue automático.

### ❓ Problema real que resuelve

El despliegue manual es el cuello de botella y la mayor fuente de errores: pasos olvidados, entornos mal configurados, comandos corridos contra el entorno equivocado. Continuous Deployment elimina el paso humano de la ecuación: si el pipeline completo está verde, producción recibe la nueva versión **automáticamente**. Esto convierte el riesgo de "despliegues raros que salen mal" en el riesgo más manejable de "despliegues frecuentes y pequeños que se revierten rápido".

### 💡 Analogía

Como un semáforo automático en un cruce: no necesita que un policía (humano) decida cada vez si deja pasar los autos; sigue reglas programadas. Si las reglas están bien diseñadas, el tráfico fluye solo y los accidentes se detectan y gestionan por excepción. CD es el semáforo: reglas claras, automatizadas, y cuando algo falla, la detección automática activa la respuesta (rollback o alerta).

### 📖 Explicación técnica

Requisitos para Continuous Deployment seguro:

* **Pipeline de validación excepcionalmente fiable**: unit, integration, e2e, security, smoke tests; los flaky tests son inaceptables porque despliegan sin querer.
* **Entornos de producción configurados por código**: infraestructura reproducible (Terraform), configuración versionada (Ansible), secretos gestionados.
* **Estrategia de despliegue de bajo riesgo**: rolling updates o canary para minimizar el impacto si algo sale mal.
* **Verificación automática post-deploy**: health checks, smoke tests en producción, métricas de error y latencia comparadas con el baseline.
* **Rollback automático o instantáneo**: si la verificación falla, se revierte o se activa la alerta; el equipo responde en minutos.
* **Monitoreo y alertas**: sin observabilidad, un despliegue automático es un salto al vacío.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Commit en main (verde)
  │
  ▼
CI: lint, tests, security, build
  │
  ▼
Publicar imagen inmutable v1.4.0
  │
  ▼
Desplegar en staging automáticamente
  │
  ▼
Validar en staging (e2e, smoke)
  │
  ▼
Desplegar en producción automáticamente
  │
  ▼
Verificación post-deploy (health checks, métricas)
  │
  ├── OK → continuar (monitoreo activo)
  └── FALLO → rollback automático + alerta
\`\`\`

### 💻 Ejemplo básico

En GitHub Actions, desplegar a producción sin aprobación (Continuous Deployment):

\`\`\`yaml
name: CD

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    needs: [ci, publish-image]
    steps:
      - uses: actions/checkout@v4
      - run: |
          kubectl set image deployment/api \\
            api=registry.example.com/api:\${{ github.sha }}
          kubectl rollout status deployment/api --timeout=300s
\`\`\`

Sin \`environment\` protegido ni approval, este job se ejecuta solo con cada push a main.

### 🏢 Caso de uso profesional

Un equipo que entrega una app SaaS de alto tráfico despliega 50 veces al día: cada push a main construye la imagen, la valida con 20 minutos de tests y la despliega con rolling update. Si la tasa de error HTTP 5xx sube del 0,5% en los primeros 5 minutos, un script revierte automáticamente al rollout anterior y alerta al equipo. La velocidad es enorme y los incidentes se resuelven sin intervención humana.

### ⚠️ Errores comunes

* Implementar CD con tests flaky: despliegues accidentales y producción rota.
* Sin verificación post-deploy: producción "desplegada" pero caída.
* Sin rollback automático: un fallo se convierte en incidente prolongado.
* CD en dominios regulados sin considerar compliance (a veces la aprobación humana es obligatoria).

### 📋 Lo que debes recordar

* CD = producción recibe cada cambio en verde automáticamente.
* Exige validación fiable, despliegue de bajo riesgo, verificación post-deploy y rollback.
* El monitoreo es la segunda línea de defensa del despliegue automático.
* No siempre es apropiado: dominios regulados pueden requerir aprobación (entonces es Delivery).

### 🧪 Autoevaluación rápida

1. ¿Qué rol juega el monitoreo en Continuous Deployment?
2. ¿Por qué los tests flaky son inaceptables en CD?
3. ¿Qué diferencia a CD de Delivery en la práctica?

---

1. El monitoreo detecta fallos que la verificación básica no ve (errores 5xx, latencia, saturación) y activa el rollback o la alerta; es la red de seguridad del despliegue automático.
2. Porque un test inestable puede fallar por azar y bloquear un despliegue legítimo, o pasar por azar y desplegar código roto; ambos erosionan la confianza en la automatización.
3. En Delivery, el paso a producción requiere aprobación humana; en Deployment es automático. La automatización total exige más fiabilidad y mejores redes de seguridad.
`
export default content
