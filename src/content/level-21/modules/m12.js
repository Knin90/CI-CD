const content = `
## Módulo 12 — Infrastructure deployment

### 🎯 Objetivos de aprendizaje

* Desplegar infraestructura cloud desde el pipeline.
* Automatizar IaC en la nube (Terraform/cloud CLIs).
* Orquestar infra + app en el flujo cloud.

### ❓ Problema real que resuelve

El cloud no solo ejecuta apps: también es infraestructura como código (nivel 15). Desplegar infraestructura desde el pipeline (Terraform, Pulumi, CloudFormation, cloud CLIs) automatiza la creación de redes, VMs, clusters y servicios gestionados — con los mismos gates (plan, approval, apply) y la misma verificación que la app.

### 💡 Analogía

El infrastructure deployment en cloud es la urbanización del terreno antes de construir las casas: el pipeline primero "urbaniza" (crea la infraestructura — redes, calles, servicios) y luego construye (despliega las apps). La urbanización sigue su propio plano (IaC) con sus permisos (aprobaciones) — no se construye una casa sin calles.

### 📖 Explicación técnica

* Herramientas de IaC en cloud: Terraform (nivel 15 — multiplataforma), Pulumi (programable), CloudFormation (AWS nativo), ARM/Bicep (Azure nativo), Deployment Manager (GCP).
* En el pipeline: fmt/validate (CI) → plan → approval → apply (CD) — el flujo completo del nivel 15, con credenciales OIDC (módulo 8).
* **Orquestación infra + app**: el pipeline despliega primero la infra (state remoto — nivel 15, outputs) y luego la app (módulos 9-11) sobre ella — los outputs de Terraform alimentan el deploy de la app (endpoints, IDs).
* **Entornos** (nivel 12): infraestructura por entorno (dev/staging/prod) con states y credenciales aislados.
* **Drift detection** (nivel 15): pipelines programados verifican que el cloud coincide con el código.
* Buenas prácticas: aplicar solo el plan aprobado (nivel 15), entornos efímeros para pruebas, destrucción controlada (destroy en entornos de prueba), monitorear el coste del cloud (nivel 23).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
IaC (Terraform/Pulumi/CloudFormation)
   ↓
CI: fmt + validate + scan
   ↓
plan → review → approval (prod)
   ↓
apply (credenciales OIDC, state remoto)
   ↓
Outputs → alimentan el deploy de la app
   ↓
App desplegada sobre la infra lista
   ↓
Drift detection periódico
\`\`\`

### 🧪 Ejercicios

1. Despliega un recurso cloud (VPC/red o servicio gestionado) con Terraform desde el pipeline.
2. Encadena: infra → outputs → deploy de la app.
3. Configura drift detection programado para tu infra cloud.

### ⚠️ Errores comunes

* Aplicar infra sin plan/approval (cambios no revisados — nivel 15).
* Credenciales cloud de la cuenta entera (módulo 8).
* Infra y app sin orquestar (la app llega antes que la red).
* Destruir por error (los destroy requieren revisión extrema — nivel 15).

### 🔗 Conexión DevOps

El infrastructure deployment en cloud cierra el nivel 21: conecta IaC (nivel 15), credenciales OIDC (módulo 8), entornos (nivel 12) y los despliegues de app (módulos 9-11). Es la integración completa del pipeline con la nube.
`
export default content
