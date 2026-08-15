const content = `
## Módulo 4 — terraform plan

### 🎯 Objetivos de aprendizaje

* Entender \`terraform plan\` y qué información produce.
* Revisar y publicar planes en el PR.
* Usar el plan como base de la aprobación.

### ❓ Problema real que resuelve

Antes de cambiar infraestructura hay que saber exactamente qué va a cambiar: crear, modificar o destruir recursos. \`terraform plan\` compara el estado deseado (código) con el estado actual (state remoto) y muestra el diff — sin tocar nada. Es la herramienta de revisión: permite decidir con información antes de ejecutar.

### 💡 Analogía

\`terraform plan\` es el presupuesto detallado del contratista antes de la reforma: te dice qué paredes se tiran (destroy), cuáles se pintan (update) y cuáles se construyen (create), con sus costes. Nadie firma una reforma sin ver el presupuesto — y nadie aplica Terraform sin ver el plan.

### 📖 Explicación técnica

* **\`terraform plan\`**: calcula los cambios entre el estado deseado y el real; muestra \`+\` (create), \`~\` (update in-place), \`-/+\` (replace: destroy + create), \`-\` (destroy).
* Requiere: código válido + state remoto (módulo 8) + credenciales de lectura del provider.
* Salidas: texto del plan, \`-out=planfile\` (binario para aplicar exactamente ese plan), JSON (\`-json\`) para análisis programático.
* En CI/CD: el plan corre en cada PR; se publica como comentario (terraform-plan bot, Atlantis, GitHub Actions) para que el revisor vea el diff; la aprobación del PR es la aprobación del plan.
* El plan es un **fotograma**: refleja el estado en ese momento; si el estado cambia, el plan queda obsoleto.
* Buenas prácticas: aplicar siempre el planfile (\`apply planfile\`), nunca \`apply\` sin plan, revisar especialmente los \`-\` (destrucciones).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Código + state remoto
   ↓
terraform plan
   ↓
Diff: + recursos nuevos, ~ modificados, - destruidos
   ↓
Planfile (si -out) + publicación en PR
   ↓
Revisión → aprobación → apply
\`\`\`

### 🧪 Ejercicios

1. Ejecuta un plan sobre tu infraestructura y clasifica los cambios (+, ~, -, -/+).
2. Publica el plan como comentario automático en tu PR.
3. Usa \`terraform plan -out=planfile\` y aplica exactamente ese plan.

### ⚠️ Errores comunes

* \`apply\` sin plan: se ejecutan cambios que nadie vio.
* Revisar el plan "por encima" sin fijarse en los destroys.
* Plan obsoleto aplicado tarde (el estado cambió; el plan ya no vale).
* Planes gigantes no revisables: dividir por entornos/módulos.

### 🔗 Conexión DevOps

\`terraform plan\` es donde la infraestructura se vuelve revisable: conecta plan artifacts (módulo 5), approval (módulo 6), code review (nivel 1) y el estado remoto (módulo 8).
`
export default content
