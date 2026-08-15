const content = `
## Módulo 3 — terraform validate

### 🎯 Objetivos de aprendizaje

* Validar sintaxis y coherencia del código Terraform.
* Configurar validación en CI antes del plan.
* Distinguir validación de plan (qué se valida en cada paso).

### ❓ Problema real que resuelve

El código Terraform con errores de sintaxis, referencias rotas o configuraciones inválidas llega al plan y falla tarde, o peor, se aplica mal. \`terraform validate\` detecta errores de configuración sin tocar la infraestructura ni el estado — un chequeo rápido y barato que corre en cada commit.

### 💡 Analogía

\`terraform validate\` es la revisión ortográfica del manuscrito: antes de enviar el libro a la imprenta (plan/apply), se revisa que no haya erratas ni frases rotas. No garantiza que la historia sea buena (eso lo hace el plan), pero evita imprimir un libro con palabras inventadas.

### 📖 Explicación técnica

* **\`terraform validate\`**: comprueba sintaxis, referencias válidas entre recursos, atributos obligatorios y coherencia de módulos.
* Qué detecta: sintaxis HCL inválida, referencias a recursos inexistentes, nombres duplicados, valores de tipo incorrecto, problemas de módulos.
* Qué NO detecta: si los cambios son correctos para la infraestructura real (eso lo hace \`plan\`), ni errores del provider (requieren init + acceso).
* Requisito: requiere \`terraform init\` previo (para los providers y módulos).
* En CI: correr en cada PR (rápido y sin credenciales), como primer gate — antes de plan.
* Buenas prácticas: \`terraform validate\` en CI para cada cambio, junto con \`fmt\` (módulo 2) y linting (tflint), como quality gate temprano.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Código Terraform
   ↓
terraform init (providers + módulos)
   ↓
terraform validate
   ↓
¿Errores? → CI falla (feedback rápido)
   ↓
¿OK? → terraform plan (módulo 4)
\`\`\`

### 🧪 Ejercicios

1. Añade \`terraform validate\` como primer gate de tu pipeline de IaC.
2. Introduce a propósito un error de sintaxis y una referencia rota: observa qué detecta.
3. Compara lo que valida \`validate\` con lo que descubre \`plan\`.

### ⚠️ Errores comunes

* Saltarse validate e ir directo a plan (los errores aparecen más tarde).
* Creer que validate aprueba la infraestructura (solo es un chequeo de forma).
* Correr validate sin init: falla por providers/módulos no descargados.
* Confiar en validate para detectar problemas de permisos o proveedor (no los detecta).

### 🔗 Conexión DevOps

\`terraform validate\` es el primer control de calidad del ciclo IaC: conecta el pipeline (módulo 1), el linting (tflint — nivel 15) y el plan (módulo 4). Un validate temprano ahorra ciclos de plan/apply costosos.
`
export default content
