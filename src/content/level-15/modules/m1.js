const content = `
## Módulo 1 — Terraform in pipelines

### 🎯 Objetivos de aprendizaje

* Integrar Terraform en el pipeline CI/CD.
* Diseñar el flujo seguro: fmt → validate → plan → apply.
* Ejecutar Terraform desde CI con credenciales seguras.

### ❓ Problema real que resuelve

La infraestructura (redes, VMs, clusters) también es código y debe pasar por el mismo rigor que la aplicación: validación, revisión y despliegue controlado. Terraform en el pipeline automatiza el ciclo de la infraestructura — con gates donde importa (el apply a producción) y validaciones automáticas en cada cambio.

### 💡 Analogía

Terraform en el pipeline es el inspector de obras: antes de construir (apply), el inspector revisa los planos (fmt/validate), simula la obra (plan) y pide aprobación (approval). Nadie construye un edificio sin que el inspector firme — y la obra se ejecuta con el plano exacto aprobado, no improvisando.

### 📖 Explicación técnica

* Ciclo estándar de Terraform en CI/CD:
  1. **fmt**: formato consistente del código.
  2. **validate**: sintaxis y coherencia interna.
  3. **plan**: calcula los cambios (diff) contra el estado actual.
  4. **Revisión/approval** (para entornos sensibles).
  5. **apply**: ejecuta los cambios.
* Estado remoto (módulo 8): el pipeline debe usar el mismo backend que los desarrolladores (S3/GCS/Azurerm + lock) — sin estado compartido no hay plan correcto.
* Credenciales: cloud credentials por entorno (nivel 11 — OIDC ideal), nunca en el repo.
* El pipeline debe ser **idempotente**: correr apply dos veces no cambia nada (declarativo).
* Buenas prácticas: separar plan (CI) de apply (CD), bloquear el estado, versionar la versión de Terraform (\`required_version\`), revisar el plan en el PR (comment con el diff).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
terraform fmt + validate (CI)
   ↓
terraform plan (lee estado remoto + código)
   ↓
Diff publicado (PR comment / artifact)
   ↓
Approval (prod) / automático (dev)
   ↓
terraform apply
   ↓
Infraestructura = estado deseado
\`\`\`

### 🧪 Ejercicios

1. Configura el ciclo fmt → validate → plan en tu CI.
2. Publica el plan como comment en el PR.
3. Separa apply con approval para producción.

### ⚠️ Errores comunes

* apply directo sin plan (no se sabe qué va a cambiar).
* Estado remoto mal configurado: dos pipelines planeando con estados distintos.
* Credenciales de cloud en variables del pipeline (nivel 11).
* Correr Terraform con permisos de admin de la cuenta (least privilege, nivel 12).

### 🔗 Conexión DevOps

Este módulo abre el nivel 15: conecta IaC (nivel 0), secrets/credenciales (nivel 11), approval gates (nivel 12) y environments (nivel 12). Terraform en el pipeline es CI/CD aplicado a la infraestructura.
`
export default content
