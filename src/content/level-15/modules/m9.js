const content = `
## Módulo 9 — Environment pipelines

### 🎯 Objetivos de aprendizaje

* Diseñar pipelines de Terraform por entorno.
* Usar workspaces o directorios separados por entorno.
* Aplicar la misma lógica de entornos (nivel 12) a la infraestructura.

### ❓ Problema real que resuelve

La infraestructura de dev no debe ser la de producción: configuraciones, tamaños y credenciales distintas. Pero tampoco debe ser código duplicado. Los environment pipelines de Terraform despliegan la misma lógica con valores y estados distintos por entorno — con más automatización en dev y más control en prod.

### 💡 Analogía

Los environment pipelines son los turnos de la central eléctrica: el protocolo (terraform code) es el mismo, pero cada turno (entorno) tiene su sala de control (state/workspace) y sus permisos. El turno de noche (prod) tiene más supervisión; el de la mañana (dev) opera con más autonomía.

### 📖 Explicación técnica

* Estrategias de separación por entorno:
  * **Workspaces**: el mismo código con states separados por workspace (\`terraform workspace new prod\`) — bueno para infraestructura idéntica.
  * **Directorios/envs**: \`environments/dev/\`, \`environments/prod/\` con backends distintos — mejor cuando los entornos difieren.
  * **Módulos + tfvars**: código compartido en módulos y \`terraform.tfvars\` por entorno (dev.tfvars, prod.tfvars).
* Pipeline por entorno: cada entorno tiene su job/pipeline: dev (auto-apply), staging (review ligera), prod (approval + ventana).
* Variables por entorno: tamaño de recursos, replicación, flags de alta disponibilidad.
* Credenciales: cada pipeline usa credenciales del entorno correspondiente (nivel 11/12) — el pipeline de dev no puede aplicar en prod.
* Buenas prácticas: promover la misma versión de módulos por los entornos (como artifacts — nivel 12), ejecutar primero dev, luego staging, luego prod (promoción).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Módulos compartidos
   ↓
dev: backend-dev + dev.tfvars → plan → auto-apply
staging: backend-staging + staging.tfvars → plan → review → apply
prod: backend-prod + prod.tfvars → plan → approval → apply
   ↓
Misma lógica, estados y credenciales aislados
\`\`\`

### 🧪 Ejercicios

1. Estructura tu repo de IaC por entornos (módulos + tfvars).
2. Configura backends remotos distintos por entorno.
3. Diseña el flujo de promoción: qué pasa de dev a staging y de staging a prod.

### ⚠️ Errores comunes

* Un solo state para todos los entornos (los cambios se mezclan).
* Código duplicado por entorno (los entornos divergen y se rompe la paridad).
* El pipeline de dev con credenciales de prod (nivel 12 — isolation).
* Promoción manual: "copio el código a prod" sin pipeline.

### 🔗 Conexión DevOps

Los environment pipelines aplican el nivel 12 (Environments) a la infraestructura: conectan workspaces/backends (módulo 8), credenciales (nivel 11), approval (módulo 6) y la promoción de entornos (nivel 12).
`
export default content
