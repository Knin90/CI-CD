const content = `
## Módulo 11 — IaC security scanning

### 🎯 Objetivos de aprendizaje

* Escanear el código de infraestructura por vulnerabilidades.
* Usar herramientas de IaC scanning (checkov, tfsec).
* Bloquear despliegues con problemas de seguridad.

### ❓ Problema real que resuelve

La infraestructura mal configurada es una puerta abierta: buckets públicos, grupos de seguridad abiertos a 0.0.0.0/0, cifrado desactivado, permisos excesivos. El escaneo de IaC detecta estas malas configuraciones **en el código**, antes del apply — cuando el fix es un cambio de línea y no un incidente de seguridad.

### 💡 Analogía

El IaC scanning es la revisión del arquitecto antes de construir: revisa los planos buscando problemas — salidas de emergencia bloqueadas, puertas que se abren hacia fuera, materiales inflamables — antes de que el edificio exista. Es mucho más barato corregir el plano que derribar la pared.

### 📖 Explicación técnica

* **IaC scanning**: análisis estático de los archivos Terraform/CloudFormation/Helm/K8s buscando configuraciones inseguras.
* Herramientas: checkov (Bridgecrew), tfsec, KICS, Terrascan — reglas sobre buckets, security groups, IAM, cifrado, logging, red.
* Qué detectan: almacenamiento público, encriptación desactivada, puertos abiertos, wildcard IAM (\`*\`), admin credentials hardcodeadas, backups sin versionar, TLS ausente.
* En CI/CD: se ejecuta como gate en el PR (estático, sin credenciales) y se bloquea el merge/apply si hay hallazgos críticos (fail build).
* Integración: con SARIF (reportes), con OPA/Conftest (políticas custom de la organización).
* Buenas prácticas: umbrales de severidad (block en HIGH/CRITICAL, warning en MEDIUM), revisar hallazgos, corregir en el código (no "apply y arreglar luego"), políticas propias para reglas de negocio.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Código IaC en el PR
   ↓
checkov / tfsec (estático)
   ↓
Hallazgos por severidad
   ↓
¿CRITICAL/HIGH? → build falla (bloquea)
   ↓
¿OK? → plan + apply
\`\`\`

### 🧪 Ejercicios

1. Ejecuta checkov o tfsec sobre tu código Terraform y clasifica los hallazgos.
2. Configura el escaneo como gate del pipeline (bloquear en críticos).
3. Corrige un hallazgo real (por ejemplo, un bucket público) y verifica que desaparece.

### ⚠️ Errores comunes

* Escaneo sin gate: se ejecuta, pero nadie lo mira ni bloquea.
* Ignorar hallazgos "porque es dev" (dev también se explota).
* Corrección post-apply ("ya lo arreglo en la consola") — drift y no reproducibilidad.
* Solo escanear el código, no los módulos de terceros.

### 🔗 Conexión DevOps

El IaC scanning es DevSecOps aplicado a la infraestructura: conecta seguridad en CI/CD (nivel 10), supply chain security (nivel 10) y quality gates (nivel 7). La infraestructura insegura se bloquea donde el fix es barato: en el código.
`
export default content
