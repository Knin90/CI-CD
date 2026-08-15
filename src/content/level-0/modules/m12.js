const content = `
## Módulo 12 — Infrastructure as Code

### 🎯 Objetivos de aprendizaje

* Definir **Infrastructure as Code (IaC)** y sus beneficios.
* Distinguir IaC declarativa e imperativa.
* Explicar por qué IaC es condición necesaria para CI/CD de infraestructura.

### ❓ Problema real que resuelve

Cuando la infraestructura se configura a mano (servidores levantados con clics en consolas web, configuraciones hechas "a ojo"), nadie sabe exactamente qué hay en producción, los cambios no son reproducibles y cada entorno es un copo de nieve distinto. IaC define la infraestructura en **código versionado**: el mismo código crea el mismo entorno en cualquier lugar y momento, y los cambios pasan por revisión como cualquier otro código.

### 💡 Analogía

Antes, montar un servidor era como construir una casa sin planos: cada albañil (administrador) la construye distinto, y si uno se va, nadie sabe cómo está hecha. IaC es construir con planos digitales: el plano (código) es la fuente de verdad, cualquier constructor lo sigue y produce la misma casa, y las modificaciones se aprueban sobre el plano antes de construir.

### 📖 Explicación técnica

* **IaC**: gestionar y provisionar la infraestructura (servidores, redes, bases de datos, clústeres) mediante definiciones en código, versionadas y ejecutables, en lugar de procesos manuales.
* **Declarativa** (Terraform, CloudFormation, Pulumi): describes el **estado deseado** ("quiero 3 instancias con esta imagen y estas reglas de firewall") y la herramienta calcula y aplica los cambios para alcanzarlo.
* **Imperativa** (scripts con la CLI del proveedor): describes los **pasos** ("crea instancia, configura red, instala nginx") y se ejecutan en orden; el orden importa y el resultado depende del estado previo.
* Beneficios: reproducibilidad (mismo código → mismo entorno), revisión (pull requests sobre la infraestructura), auditoría (todo cambio queda en git), destrucción segura (entornos temporales baratos) y recuperación ante desastres (recrear producción desde el código).
* La infraestructura "como código" se integra con CI/CD: se valida, se planifica y se despliega como cualquier artefacto.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Código IaC (Terraform)
  │
  ▼
terraform validate (sintaxis y lógica)
  │
  ▼
terraform plan (calcular el cambio)
  │
  ▼
Revisión del plan (diff en el PR)
  │
  ▼
terraform apply (aplicar el cambio)
  │
  ▼
Estado actual == Estado deseado
  │
  ▼
Estado remoto guardado (s3, backend)
\`\`\`

### 💻 Ejemplo básico

Infraestructura declarativa mínima con Terraform:

\`\`\`hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"

  tags = {
    Name = "web-server"
  }
}
\`\`\`

Este archivo versionado describe el estado deseado: ejecutar \`terraform apply\` crea la instancia; borrar el bloque y re-aplicar la destruye. Todo reproducible desde cero con \`terraform apply\` en un entorno nuevo.

### 🏢 Caso de uso profesional

Una empresa tenía 12 entornos "copo de nieve" (desarrollo, staging, producción y 9 temporales) configurados a mano por distintas personas. Migran a Terraform: ahora cualquier entorno se crea con \`terraform apply\` desde el mismo código, los cambios de infraestructura pasan por Pull Request con revisión del \`plan\`, y el entorno de staging es bit a bit idéntico en configuración al de producción. Los problemas "funciona en staging pero no en prod" desaparecen.

### ⚠️ Errores comunes

* Mezclar IaC con configuración manual posterior (los cambios manuales generan drift).
* No usar estado remoto: el estado local se pierde o genera conflictos entre personas.
* Aplicar sin revisar el plan: el \`apply\` puede destruir recursos por sorpresa.
* "Infraestructura como código" pero el código no pasa por revisión ni CI.

### 📋 Lo que debes recordar

* IaC = infraestructura definida en código versionado, reproducible y auditable.
* Declarativa (Terraform): estado deseado; Imperativa: pasos.
* El código de infraestructura se revisa, valida y despliega como cualquier software.
* Sin estado remoto y revisión del plan, IaC es peligrosa.

### 🧪 Autoevaluación rápida

1. ¿Cuál es la diferencia entre IaC declarativa e imperativa?
2. ¿Por qué IaC habilita el CI/CD de la infraestructura?
3. ¿Qué es el "drift" en IaC?

---

1. La declarativa describe el estado deseado y la herramienta calcula los cambios (Terraform); la imperativa describe los pasos a ejecutar en orden (scripts).
2. Porque al estar en código versionado, la infraestructura puede validarse, revisarse con PRs, planificarse y aplicarse automáticamente en pipelines, igual que el código de aplicación.
3. La diferencia entre el estado real de la infraestructura y el estado deseado definido en el código, causada normalmente por cambios manuales fuera de IaC.
`
export default content
