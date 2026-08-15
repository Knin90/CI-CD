const content = `
## Módulo 16 — Microservices pipelines

### 🎯 Objetivos de aprendizaje

* Diseñar pipelines para arquitecturas de microservicios.
* Construir y desplegar múltiples servicios de forma coordinada.
* Mantener la independencia de despliegue de cada servicio.

### ❓ Problema real que resuelve

En microservicios, cada servicio tiene su propio ciclo de vida: versiones distintas, equipos distintos, deploys independientes. Los pipelines de microservicios mantienen esa independencia (cada servicio construye, testea y despliega solo) mientras coordinan lo compartido (registries, entornos, releases cross-cutting).

### 💡 Analogía

Los pipelines de microservicios son los turnos de las atracciones del parque temático: cada atracción (servicio) tiene su mantenimiento y su horario (pipeline propio), pero todas comparten el sistema eléctrico (registry/infra) y la apertura del parque (release). Una atracción cerrada por mantenimiento no cierra el parque — y arreglar una no retrasa a las demás.

### 📖 Explicación técnica

* Principio: **independencia de despliegue** — cada servicio se despliega solo, sin acoplar su release al de los demás.
* Estructura: pipeline por servicio (repo propio o carpeta en monorepo — módulo 15), con CI propio (build, tests, scan) y CD propio (deploy a entornos).
* Elementos compartidos: container registry (imágenes por servicio — nivel 9), entornos (nivel 12), configuración (Helm charts por servicio — nivel 14), versionado semántico por servicio.
* Coordinación cuando hace falta: multi-project pipelines (módulo 14) para dependencias reales; contract testing entre servicios (nivel 7 — para no depender de E2E cross-service siempre); feature flags (nivel 13) para releases coordinados sin deploys coordinados.
* **La trampa**: "orquestar el deploy de todos juntos" — vuelve a ser un monolitoo con pipeline único (pérdida de independencia). La coordinación debe ser por contrato, no por deploy conjunto.
* Buenas prácticas: contratos de API versionados, tests de contrato en CI, observabilidad por servicio (nivel 18), runbooks por servicio.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Servicio A: [build → test → scan → imagen] → deploy A
Servicio B: [build → test → scan → imagen] → deploy B
Servicio C: [build → test → scan → imagen] → deploy C
   (independientes, mismos entornos/registry)
   ↓
Contract tests A↔B en cada CI
   ↓
Release coordinado (si hace falta) vía flags/contratos
\`\`\`

### 🧪 Ejercicios

1. Dibuja los pipelines de tus servicios: ¿alguno está acoplado indebidamente?
2. Configura el pipeline de un servicio de forma totalmente independiente (build→deploy).
3. Implementa contract tests entre dos servicios que se comunican.

### ⚠️ Errores comunes

* Deploy "de todos a la vez" (vuelve a ser un monolito con pipeline único).
* Dependencias cross-service no gestionadas (se descubre en producción).
* Falta de contract testing: cada servicio "confía" en el otro.
* Duplicación total de infraestructura de pipeline por servicio (sin reutilización — módulo 1).

### 🔗 Conexión DevOps

Los pipelines de microservicios combinan reutilización (módulo 1), multi-project (módulo 14), monorepo (módulo 15), containers (nivel 9) y entornos (nivel 12). Representan la madurez de CI/CD a escala.
`
export default content
