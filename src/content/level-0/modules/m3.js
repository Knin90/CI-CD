const content = `
## Módulo 3 — ¿Qué es CD? Entrega y Despliegue Continuo

### 🎯 Objetivos de aprendizaje

* Distinguir los dos significados de **CD**: Continuous Delivery (entrega) y Continuous Deployment (despliegue).
* Entender que CD automatiza el camino del artefacto validado hasta producción.
* Explicar por qué "todo el código en main está listo para producción" es el estado ideal.

### ❓ Problema real que resuelve

CI responde a "¿el código está bien?"; CD responde a "¿el código llega a producción?". Sin CD, aunque el código esté validado, el despliegue depende de personas, documentación manual, comandos copiados y procedimientos frágiles. Eso hace que producir sea lento, propenso a errores y dependiente de "quién sabe cómo se despliega". CD automatiza ese camino: el artefacto validado por CI se empaqueta, se promueve por entornos (staging, producción) y se despliega de forma reproducible y auditable.

### 💡 Analogía

CI es como la inspección de calidad de una fábrica: cada pieza se revisa automáticamente. CD es la cinta transportadora que lleva las piezas aprobadas hasta el almacén y las coloca en el estante correcto. Si la cinta la operan personas con instrucciones impresas, es lenta y se equivoca; si está automatizada y programada, cada pieza aprobada llega sola al destino correcto, registrando todo el trayecto.

### 📖 Explicación técnica

* **Continuous Delivery**: práctica donde el software se mantiene siempre en un estado **listo para producción** después de cada cambio. El pipeline lleva el código por CI (validación), empaquetado y entornos de prueba; el paso final a producción se hace con un **clic o aprobación**, no con scripts manuales.
* **Continuous Deployment**: el paso siguiente: **toda** cambio que supere las validaciones se despliega a producción **automáticamente**, sin aprobación humana. Solo se despliega si todo el pipeline está verde.
* La diferencia práctica: en Delivery hay un "botón" humano; en Deployment no hay botón.
* CD requiere **entornos confiables**, artefactos inmutables (la misma imagen de staging es la de producción), estrategias de despliegue seguras (rolling, canary) y monitoreo para detectar fallos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline CI (verde)
  │
  ▼
Empaquetar artefacto (imagen, paquete)
  │
  ▼
Publicar en registry (inmutable, versionado)
  │
  ▼
Desplegar en staging
  │
  ▼
Validar en staging (tests, smoke, health checks)
  │
  ▼
Continuous Delivery: aprobación humana → production
  │
Continuous Deployment: automático → production
  │
  ▼
Verificar en producción (health checks, métricas)
\`\`\`

### 💻 Ejemplo básico

En GitHub Actions, un job de "deploy" que espera aprobación (Delivery):

\`\`\`yaml
deploy-production:
  runs-on: ubuntu-latest
  environment: production
  needs: [ci, build-image]
  steps:
    - run: ./deploy.sh --env production
\`\`\`

La clave está en \`environment: production\`: la plataforma exige aprobación manual antes de ejecutar el job si el entorno está protegido. Sin \`environment\`, el job correría automáticamente (Continuous Deployment).

### 🏢 Caso de uso profesional

Una fintech necesita desplegar 30 veces al día sin errores. Usa Continuous Delivery para staging (automático) y un approval gate para producción: cada cambio en verde se prueba en staging automáticamente, y un responsable con permisos pulsa "aprobar" para que el mismo artefacto, con el mismo hash de imagen, se despliegue en producción. Así logran velocidad sin perder control regulatorio.

### ⚠️ Errores comunes

* Confundir Delivery con Deployment: no son lo mismo y el nivel de automatización cambia los requisitos de seguridad.
* Desplegar un artefacto distinto al validado ("build another, deploy many"): rompe la confianza del pipeline.
* Saltarse entornos: ir de CI directo a producción sin staging.
* Sin health checks post-deploy, un despliegue "exitoso" puede ser un fallo silencioso.

### 📋 Lo que debes recordar

* **Continuous Delivery**: siempre listo para producción; el último paso requiere aprobación.
* **Continuous Deployment**: todo cambio en verde se despliega a producción automáticamente.
* CD automatiza el camino del artefacto validado hasta producción, de forma reproducible y auditable.
* Artefactos inmutables + entornos confiables + verificación post-deploy son requisitos de CD.

### 🧪 Autoevaluación rápida

1. ¿Cuál es la diferencia operativa entre Continuous Delivery y Continuous Deployment?
2. ¿Por qué CD exige artefactos inmutables?
3. ¿Qué requiere CD que CI no requiere necesariamente?

---

1. En Delivery el paso final a producción requiere una aprobación humana; en Deployment es automático: todo cambio que pase las validaciones llega a producción sin intervención.
2. Porque el artefacto que se valida en CI y se prueba en staging debe ser exactamente el mismo que se despliega en producción; si se reconstruye, la validación ya no garantiza nada.
3. Entornos confiables, estrategias de despliegue seguras (rolling/canary), secretos gestionados y verificación post-deploy (health checks y métricas).
`
export default content
