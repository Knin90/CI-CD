const content = `
## Módulo 13 — Kubernetes environments

### 🎯 Objetivos de aprendizaje

* Diseñar entornos (dev/staging/prod) en Kubernetes.
* Usar namespaces y clusters para aislar entornos.
* Configurar quotas, límites y secretos por entorno.

### ❓ Problema real que resuelve

¿Dónde viven dev, staging y producción en Kubernetes? Las opciones (un cluster por entorno vs namespaces en un cluster compartido) tienen trade-offs de aislamiento, coste y gestión. Este módulo define cómo estructurar entornos en Kubernetes para que el pipeline despliegue al lugar correcto con las protecciones correctas.

### 💡 Analogía

Los entornos en Kubernetes son los pisos del edificio: namespaces son los pisos (misma estructura, separados por puertas), y los clusters son los edificios completos (misma estructura, separados por calles). Dev puede compartir edificio con staging (pisos distintos), pero producción merece su propio edificio con su propia seguridad.

### 📖 Explicación técnica

* **Namespaces**: mecanismo nativo de partición lógica — separan recursos, RBAC, quotas. Ideales para dev/staging en un cluster compartido.
* **Clusters separados por entorno**: aislamiento físico total (red, fallos, blast radius). Recomendado para producción (o para todo, si hay presupuesto).
* Configuración por entorno:
  * **ResourceQuota** y **LimitRange** por namespace: controlan cuánto consume cada entorno (evitar que dev se coma el cluster).
  * **Secrets y ConfigMaps** por namespace (nivel 12 + módulos 6/7).
  * **RBAC**: identidades y permisos distintos por entorno.
  * **NetworkPolicies**: aislamiento de red entre namespaces.
* En CI/CD: el pipeline elige namespace/cluster según el entorno (\`--namespace=staging\`), con protecciones de entorno (nivel 12) para prod.
* Buenas prácticas: producción en cluster propio, quotas en entornos compartidos, naming coherente, etiquetar recursos por entorno.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Cluster compartido (dev + staging en namespaces)
   ├── namespace dev ── quota pequeña ── secrets dev
   └── namespace staging ── quota media ── secrets staging
Cluster de producción (aislado)
   └── namespace prod ── RBAC estricto ── secrets prod
\`\`\`

### 🧪 Ejercicios

1. Crea namespaces dev/staging/prod con ResourceQuota y LimitRange.
2. Configura RBAC distinto: el pipeline de dev no puede tocar el namespace prod.
3. Decide y justifica la topología de tu proyecto (clusters compartidos vs separados).

### ⚠️ Errores comunes

* Todos los entornos en el namespace \`default\` sin separación.
* Entornos compartiendo secrets (un leak de dev abre prod).
* Sin quotas: un entorno consume todo el cluster y mata a los demás.
* Producción y dev en el mismo cluster sin NetworkPolicies (blast radius compartido).

### 🔗 Conexión DevOps

Los entornos en Kubernetes materializan el nivel 12 (Environments) en el cluster: conectan namespaces con isolation (nivel 12), secrets por entorno (módulo 7), RBAC (nivel 11) y GitOps (módulo 14).
`
export default content
