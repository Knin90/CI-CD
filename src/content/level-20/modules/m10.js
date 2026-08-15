const content = `
## Módulo 10 — Infrastructure testing

### 🎯 Objetivos de aprendizaje

* Probar la infraestructura dentro del testing de pipelines.
* Validar IaC y configuraciones de infra en el pipeline.
* Verificar la infraestructura resultante tras el deploy.

### ❓ Problema real que resuelve

El pipeline no solo despliega apps: despliega infraestructura (Terraform), configuración (Ansible) y clusters (Kubernetes). El infrastructure testing valida esa capa dentro del pipeline — estático en CI, integración tras el apply — para que la infraestructura tenga la misma red de seguridad que el código de la app.

### 💡 Analogía

El infrastructure testing es la revisión estructural del puente antes de abrirlo al tráfico: no basta con que "se construyó" (apply OK); hay que probar la estructura (estáticos — plan), cargarla (integración — endpoints reales) y verificar el cumplimiento (compliance — políticas). El puente se abre al tráfico solo con las pruebas aprobadas.

### 📖 Explicación técnica

* Niveles de testing de infraestructura (nivel 15 — infrastructure testing):
  * **Estático** (CI): tfsec/checkov (seguridad — nivel 15), tflint, conftest/OPA (políticas sobre el plan), terraform validate (módulo 3 de nivel 15).
  * **Integración** (tras apply, en entornos de prueba): Terratest, Kitchen-Terraform — crea la infra, verifica propiedades reales (¿el endpoint responde? ¿la BD acepta conexiones?), destruye.
  * **Compliance**: políticas de la organización (encryption, exposición pública, tagging).
* Para Ansible (nivel 16): Molecule + Testinfra/Goss (módulo 5 de nivel 16).
* Para Kubernetes (nivel 14): kubeconform (manifests), policies (OPA/Gatekeeper), validación de charts (helm lint).
* Dónde en el pipeline: estáticos en el PR (rápidos); integración en entornos efímeros (create → test → destroy — módulo 6).
* Buenas prácticas: probar módulos compartidos, entornos efímeros para integración, compliance en todos los entornos, no solo en prod.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
CI: estáticos (validate, tfsec, tflint, OPA sobre plan)
   ↓
Entorno efímero: terraform apply
   ↓
Integración: Terratest (endpoints, conexiones, estado)
   ↓
Compliance: políticas verificadas
   ↓
Destroy del entorno
   ↓
¿Todo OK? → promoción de la infraestructura
\`\`\`

### 🧪 Ejercicios

1. Añade los tests estáticos de infra (tfsec/tflint/checkov) a tu pipeline.
2. Escribe un test de integración (Terratest) para un recurso crítico.
3. Ejecuta las políticas de compliance de tu organización en todos los entornos.

### ⚠️ Errores comunes

* Infraestructura sin tests (solo la app los tiene).
* Tests solo estáticos (nunca se valida el resultado real del apply).
* Entornos de prueba permanentes (coste y drift).
* Compliance solo en papel (las políticas no se ejecutan en el pipeline).

### 🔗 Conexión DevOps

El infrastructure testing une el testing de pipelines (nivel 20) con los niveles 14-16 (Kubernetes, Terraform, Ansible): la infraestructura entra en la misma cultura de pruebas que la aplicación.
`
export default content
