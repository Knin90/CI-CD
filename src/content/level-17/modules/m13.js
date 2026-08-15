const content = `
## Módulo 13 — GitOps security

### 🎯 Objetivos de aprendizaje

* Asegurar el modelo GitOps de extremo a extremo.
* Proteger el repo, el controller y las credenciales.
* Evitar los vectores de ataque específicos de GitOps.

### ❓ Problema real que resuelve

GitOps concentra el poder en dos puntos: el repo (quien escribe en él controla el cluster) y el controller (quien lo compromete controla el cluster). La seguridad de GitOps protege ambos: repo con protección y revisión, controller con permisos mínimos y credenciales seguras — porque un repo gitops comprometido es un cluster comprometido.

### 💡 Analogía

La seguridad de GitOps es la seguridad de la bóveda con dos cerraduras: el repo (una llave — quien escribe controla el contenido) y el controller (otra llave — quien lo controla ejecuta). Cada cerradura tiene su propia protección: la primera con firmas y revisión, la segunda con permisos mínimos — y ambas con auditoría de aperturas.

### 📖 Explicación técnica

* **Protección del repo** (la superficie principal):
  * Protección de ramas: PRs requeridos, approvals, sin push directo (nivel 1).
  * **Firma de commits** (GPG/SSH): solo commits firmados se aplican.
  * Code review de cambios de infraestructura (nivel 1 — code review).
  * Repos con acceso mínimo: quién puede mergear en el repo gitops.
* **Protección del controller**:
  * Permisos RBAC mínimos (solo los namespaces que gestiona).
  * NetworkPolicies que limiten el acceso del controller.
  * Actualizaciones del controller al día (CVEs — nivel 10).
* **Credenciales**: repos privados (SSH/token protegido — nivel 11), secrets cifrados en el repo (SOPS/Sealed Secrets — módulo 8), nunca tokens en claro en los manifests.
* **Supply chain** (nivel 10): verificar firmas de imágenes (cosign), SBOM de charts, no usar charts de fuentes no verificadas.
* **Auditoría**: qué se aplicó, cuándo, quién aprobó (Git history + logs del controller), alertas de sync anómalo (módulo 12).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Repo gitops protegido (ramas + firmas + PRs)
   ↓
Controller (RBAC mínimo, actualizado)
   ↓
Conexión repo segura (SSH/token, repos privados)
   ↓
Secrets cifrados (SOPS/Sealed) en Git
   ↓
Auditoría: commits + syncs + alertas
\`\`\`

### 🧪 Ejercicios

1. Configura protección de ramas + firma de commits en tu repo gitops.
2. Reduce el RBAC del controller al mínimo necesario.
3. Migra los secrets de tus repos gitops a cifrado (SOPS/Sealed Secrets).

### ⚠️ Errores comunes

* Repo gitops sin protección (push directo = cluster sin revisión).
* Controller con permisos de cluster-admin (blast radius total).
* Tokens de repo en claro en los manifests del controller.
* Secrets en claro en el repo (el anti-patrón más grave de GitOps).

### 🔗 Conexión DevOps

La seguridad de GitOps es DevSecOps aplicado al modelo pull: conecta seguridad (nivel 10), secrets (nivel 11), protección de ramas (nivel 1) y supply chain (nivel 10). Un GitOps inseguro es más peligroso que el push clásico, porque centraliza el poder en Git.
`
export default content
