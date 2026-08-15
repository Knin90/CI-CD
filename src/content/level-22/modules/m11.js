const content = `
## Módulo 11 — Terraform failure

### 🎯 Objetivos de aprendizaje

* Diagnosticar fallos de Terraform en el pipeline.
* Resolver errores de state, providers y plan/apply.
* Aplicar IaC con seguridad durante el debugging.

### ❓ Problema real que resuelve

\`terraform apply\` falla: un recurso que no se crea, un state desincronizado, un provider que no autentica, un conflicto con recursos creados fuera de IaC. Terraform en CI/CD (nivel 15) automatiza la infraestructura, pero sus fallos pueden dejar la infraestructura a medias. Diagnosticarlos — state, plan, providers — con cuidado es crítico.

### 💡 Analogía

Terraform es el arquitecto que construye según el plano (código) y lleva un registro de lo construido (state). Si el registro se pierde o se desincroniza, el arquitecto no sabe qué ya está construido — y puede intentar construir de nuevo lo que ya existe, o romper lo que no toca. El diagnóstico es verificar el plano (plan) y el registro (state) antes de tocar nada.

### 📖 Explicación técnica

* Fallos típicos:
  * **State**: desincronizado, bloqueado (lock), corrupto, o recursos creados fuera de Terraform que el state no conoce.
  * **Provider**: no autentica (módulo 6), versión incompatible, region/endpoint incorrectos.
  * **Plan/apply**: dependencias cíclicas, cambios destructivos inesperados (\`-/+ destroy\`), quotas del cloud, recursos ya existentes.
  * **Backend**: state remoto inaccesible, lock que no se libera, credenciales del backend.
* Método: \`terraform plan\` primero (¿qué quiere cambiar y por qué?) → revisa el state (\`terraform state list\`, \`state show\`) → verifica el backend y el lock → autenticación del provider → decide: arreglar código, importar el recurso (\`terraform import\`) o reconciliar el state.
* Seguridad: nunca \`apply\` sin revisar el plan (nivel 15), nunca \`state rm\` sin entender las consecuencias, aplicar solo el plan aprobado.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
terraform plan (CI)
   ↓
State remoto descargado (backend + lock)
   ↓
Compara deseado (código) vs real (state)
   ↓
¿Error? → provider, state, backend o plan
   ↓
Verifica: state list / lock / auth / plan detallado
   ↓
Corrige código o importa recursos
   ↓
apply del plan aprobado
\`\`\`

### 🧪 Ejercicios

1. Crea un recurso manualmente (fuera de IaC) y observa el conflicto con Terraform.
2. Provoca un lock de state y diagnostica cómo liberarlo.
3. Revisa un plan con cambios \`-/+ destroy\` y explica por qué ocurren.

### ⚠️ Errores comunes

* \`apply\` sin revisar el plan (destrucción accidental — nivel 15).
* State manual manipulado sin entenderlo (corrupción silenciosa).
* Confundir error de provider (auth) con error de configuración.
* Recursos creados fuera de IaC que Terraform no conoce (drift — nivel 15).

### 🔗 Conexión DevOps

Terraform conecta con IaC (nivel 15), cloud credentials (nivel 21), infrastructure testing (nivel 20) y drift detection (nivel 15). Es el troubleshooting de la infraestructura declarativa: el plan dice la verdad y el state guarda la historia.
`
export default content
