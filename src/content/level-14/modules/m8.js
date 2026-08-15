const content = `
## Módulo 8 — Helm

### 🎯 Objetivos de aprendizaje

* Definir Helm y el concepto de Charts.
* Parametrizar manifests con values y templates.
* Usar \`helm upgrade\` en pipelines CI/CD.

### ❓ Problema real que resuelve

Los manifests por entorno se duplican: casi iguales, cambiando imagen, réplicas y configuración. Helm empaqueta la app como un **Chart** (templates + values) y despliega la misma definición con valores distintos por entorno — eliminando la duplicación y haciendo los releases reproducibles y versionables.

### 💡 Analogía

Helm es el formulario de pedido del restaurante: el menú (chart) es el mismo, pero cada mesa (entorno) marca sus opciones (values): sin cebolla, más picante, dos raciones. La cocina (Kubernetes) prepara lo mismo con las variaciones pedidas — sin escribir una receta distinta por mesa.

### 📖 Explicación técnica

* **Helm**: gestor de paquetes de Kubernetes. **Chart**: paquete con templates YAML + values + metadata.
* Estructura de un chart: \`Chart.yaml\` (metadata), \`values.yaml\` (defaults), \`templates/\` (manifests con \`{{ .Values.x }}\`), \`charts/\` (dependencias).
* Despliegue: \`helm install app ./chart\` (crear), \`helm upgrade app ./chart -f values-prod.yaml\` (actualizar), \`helm rollback app 1\` (revertir).
* **Release**: una instancia de un chart desplegada (helm mantiene el historial de releases → rollback fácil).
* En CI/CD: el pipeline corre \`helm lint\` (validar) y \`helm upgrade --install\` con los values del entorno; el tag de imagen se pasa como value (\`--set image.tag=sha-abc123\`).
* Buenas prácticas: values por entorno (\`values-dev.yaml\`, \`values-prod.yaml\`), charts versionados en el repo, \`helm lint\` + \`--dry-run\` en CI antes de aplicar.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Chart + values-prod.yaml
   ↓
helm template → manifiestos renderizados
   ↓
helm upgrade --install → API server
   ↓
Release creado/actualizado (historial)
   ↓
helm rollback release N (si falla)
\`\`\`

### 🧪 Ejercicios

1. Crea un chart simple para tu app (Deployment + Service) con values.
2. Despliega con values distintos en dev y staging (misma app, distinta config).
3. Añade \`helm lint\` y \`--dry-run\` a tu pipeline CI.

### ⚠️ Errores comunes

* Copiar charts enteros por entorno en vez de usar values.
* Valores sensibles en values.yaml (van en Secrets, módulo 7).
* \`helm upgrade\` sin revisar el diff (\`--dry-run\` / \`helm diff\`).
* Charts desactualizados que nadie mantiene (dependencias rotas).

### 🔗 Conexión DevOps

Helm es el puente entre manifests (módulo 3) y CI/CD: el pipeline parametriza releases por entorno, integra image updates (módulo 9) y se combina con GitOps (módulo 14). Es la herramienta estándar para empaquetar apps en Kubernetes.
`
export default content
