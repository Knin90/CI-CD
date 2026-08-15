const content = `
## Módulo 8 — IaC scanning

### 🎯 Objetivos de aprendizaje

* Escanear código de infraestructura (Terraform, K8s, CloudFormation).
* Detectar configuraciones inseguras antes del apply.
* Usar el escaneo como gate en el pipeline de IaC.

### ❓ Problema real que resuelve

La infraestructura como código hereda los problemas del código: configuraciones inseguras (buckets públicos, puertos abiertos, permisos amplios, sin cifrado) se versionan y aplican automáticamente. El IaC scanning analiza los manifiestos ANTES del apply y detecta las malas configuraciones — evitando que una política insegura llegue a la infraestructura real.

### 💡 Analogía

El IaC scanning es como la revisión del plano antes de construir: el arquitecto (escáner) revisa el plano (Terraform/K8s) y detecta que la puerta del tesoro no tiene cerradura (bucket público), que la escalera de emergencia no llega al piso 5 (sin cifrado) o que el sistema eléctrico expone todo (permisos amplios). Es mucho más barato corregir el plano que demoler el edificio.

### 📖 Explicación técnica

Qué escanea:

* **Terraform/HCL**: recursos cloud (S3 público, SG abiertos, IAM amplios, RDS sin cifrado).
* **Kubernetes**: manifests/Helm (privileged, root, hostNetwork, secretos en env, limits faltantes).
* **CloudFormation**: igual que Terraform para AWS.
* **Dockerfiles** (parte de IaC): root, puertos, secretos.

Herramientas: Checkov, tfsec/Trivy, KICS, kube-bench, Terrascan.

En el pipeline:

* Job de \`iac-scan\` en cada PR que toca infraestructura.
* \`terraform plan\` + escaneo del plan (lo que realmente se va a aplicar).
* **Gate**: hallazgos críticos → bloquear el apply.
* Reporte por severidad + fix sugerido (checkov sugiere correcciones).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
PR: changes main.tf
  │
  ▼
checkov -d .  (o trivy config)
  │
  ├── CKV_AWS_53: S3 bucket sin cifrado (high)
  ├── CKV_AWS_21: SG permite 0.0.0.0/0:22 (critical)
  └── CKV2_AWS_12: IAM sin límites (medium)
  │
  ▼
Gate: críticas/altas → FAIL → el apply se bloquea
  │
  ▼
Corrección (cifrado, SG restringido) → scan verde → plan → apply
\`\`\`

### 💻 Ejemplo básico

Escaneo de IaC en CI:

\`\`\`yaml
- name: Escanear IaC
  run: |
    checkov -d . --compact --output sarif > checkov.sarif
    checkov -d . --compact --quiet || true
- name: Gate
  run: |
    checkov -d . --check CKV_AWS_53,CKV_AWS_21 --compact
\`\`\`

### 🏢 Caso de uso profesional

Un equipo detecta con Checkov que su módulo de S3 abría el bucket al público por una variable mal configurada: el escaneo bloquea el PR de infraestructura con el hallazgo CKV_AWS_53. Corrigen la política de acceso, el escaneo pasa y el apply se ejecuta. El bucket público jamás llegó a existir.

### ⚠️ Errores comunes

* Aplicar sin escanear (el plan se aplica y el error ya está en producción).
* Escanear solo el código y no el plan (recursos que aparecen en el apply).
* Umbrales laxos o gates desactivados.
* No corregir: excepciones sin documentar.
* Escaneo después del apply (gate tarde).

### 📋 Lo que debes recordar

* IaC scanning: Terraform, K8s, CloudFormation, Dockerfiles.
* Checkov, tfsec/Trivy, KICS.
* Escanear antes del apply, incluido el plan.
* Gate por severidad: la infraestructura insegura no se aplica.

### 🧪 Autoevaluación rápida

1. ¿Qué configuración detecta el escaneo de IaC?
2. ¿Cuándo debe correr respecto al apply?
3. ¿Qué herramientas se usan?

---

1. Configuraciones inseguras: buckets públicos, security groups abiertos, IAM amplios, sin cifrado, privileged en K8s.
2. Antes del apply (en el PR y sobre el plan): lo que no pasa el gate no se aplica.
3. Checkov, tfsec/Trivy config, KICS, Terrascan, kube-bench.
`
export default content
