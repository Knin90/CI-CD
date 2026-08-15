const content = `
## Módulo 9 — Cloud deployments

### 🎯 Objetivos de aprendizaje

* Desplegar aplicaciones en servicios cloud desde el pipeline.
* Usar PaaS, funciones y servicios gestionados.
* Verificar los despliegues cloud.

### ❓ Problema real que resuelve

El cloud ofrece muchos destinos de despliegue: App Service/Cloud Run (PaaS), funciones serverless, VMs, Kubernetes (módulo 11), y el pipeline debe desplegar a cada uno correctamente. Los cloud deployments usan las herramientas de cada servicio (CLIs, acciones, tasks) dentro del pipeline — con credenciales seguras (módulo 8) y verificación post-deploy.

### 💡 Analogía

Los cloud deployments son las distintas salidas del edificio al exterior: puerta principal (PaaS), escalera de emergencia (serverless), garaje (VMs), cada una con su mecanismo de apertura (CLI/tool del servicio). El plan de evacuación (pipeline) sabe qué puerta usar según el destino — y verifica que cada salida queda abierta correctamente.

### 📖 Explicación técnica

* **Destinos de despliegue cloud**:
  * **PaaS**: Azure App Service, AWS Elastic Beanstalk, Google Cloud Run/App Engine — desplegar el artifact (zip/imagen) con la CLI o actions/tasks oficiales.
  * **Serverless/FaaS**: Azure Functions, AWS Lambda, GCP Cloud Functions — publicar funciones con sus configuraciones.
  * **VMs**: Azure VMs, EC2 — con deploy scripts o configuración (Ansible — nivel 16).
  * **Containers**: registries (módulo 10) + servicios de contenedores (AKS/EKS/GKE — módulo 11, App Service containers).
* En el pipeline: build → push artifact → deploy con la tool del servicio → verificación (health checks del endpoint del servicio — nivel 18).
* **Credenciales** (módulo 8): OIDC/service connections con scope al servicio (no la cuenta entera).
* **Entornos** (nivel 12): el cloud despliega por entorno (dev/staging/prod) con su propia configuración y aprobaciones.
* Buenas prácticas: usar las tools oficiales (no scripts improvisados), versionar la configuración del servicio (IaC — nivel 15), verificación post-deploy por servicio, rollback definido por servicio (slot swap en Azure App Service, versiones en Cloud Run).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Build → artifact (imagen/zip)
   ↓
Push al registry/artifacts
   ↓
Deploy: az/webapp / aws lambda / gcloud run (tool oficial)
   ↓
Configuración del entorno aplicada
   ↓
Verificación: health check del servicio
   ↓
¿OK? → release   ¿Fail? → rollback (slot/versión)
\`\`\`

### 🧪 Ejercicios

1. Despliega tu app a un servicio PaaS (App Service/Cloud Run) desde el pipeline.
2. Configura deployment slots (o versiones) para rollback instantáneo.
3. Verifica el despliegue con un health check del endpoint del servicio.

### ⚠️ Errores comunes

* Credenciales cloud con permisos de la cuenta entera (módulo 8).
* Desplegar con scripts ad-hoc en vez de las tools oficiales (no reproducible).
* Sin verificación post-deploy (el servicio "desplegado" puede estar roto).
* Un solo entorno cloud sin slots/versiones para rollback.

### 🔗 Conexión DevOps

Los cloud deployments conectan el pipeline con los servicios gestionados: usan credenciales OIDC (módulo 8), registries (módulo 10), entornos (nivel 12) y verificación (nivel 18). Es la forma moderna de "desplegar sin servidores propios".
`
export default content
