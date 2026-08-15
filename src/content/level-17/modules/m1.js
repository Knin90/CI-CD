const content = `
## Módulo 1 — ¿Qué es GitOps?

### 🎯 Objetivos de aprendizaje

* Definir GitOps y sus principios fundamentales.
* Entender por qué Git es la fuente de verdad.
* Reconocer GitOps como evolución de CI/CD en Kubernetes.

### ❓ Problema real que resuelve

En el CI/CD clásico, el pipeline empuja cambios al cluster — pero el cluster también cambia por otras vías (a mano, otros pipelines, degradación), y nadie sabe cuál es la verdad. GitOps resuelve la pregunta "¿qué está corriendo y cómo se llegó ahí?": **Git es la única fuente de verdad**, y un controller dentro del cluster garantiza que la realidad siempre coincida con lo que dice Git.

### 💡 Analogía

GitOps es el sistema del GPS con ruta fija: la ruta deseada (Git) está definida y el conductor (controller) corrige cualquier desvío para volver a ella. No hay discusión sobre "por dónde íbamos": la ruta está guardada. Y cada cambio de ruta (un commit) queda registrado — siempre se sabe quién y cuándo.

### 📖 Explicación técnica

* **GitOps**: modelo operativo donde Git es la fuente de verdad del estado deseado y un agente automatizado lo aplica y mantiene.
* Principios:
  1. **Estado deseado declarativo** (módulo 2): todo el sistema se describe declarativamente.
  2. **Git como fuente de verdad** (módulo 3): el estado deseado vive en Git, versionado.
  3. **Pull-based** (módulo 6): el agente dentro del entorno tira de Git (no el pipeline empuja).
  4. **Reconciliación continua** (módulo 5): el agente corrige el drift para converger al deseado.
* Diferencia con CI/CD tradicional: CI/CD empuja (push) y termina cuando el deploy "sale 0"; GitOps mantiene el estado en el tiempo (pull + reconciliación).
* Beneficios: auditoría total (cada cambio es un commit), rollback = revertir commit, auto-reparación (drift corregido), menos credenciales (el pipeline ya no necesita acceso al cluster).
* Origen: popularizado por Weaveworks para Kubernetes; hoy es el estándar de despliegue declarativo.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Git (estado deseado)
   ↓
Controller (dentro del cluster) vigila el repo
   ↓
Cambio en Git → aplica
   ↓
Drift en el cluster → corrige
   ↓
Estado real = estado deseado (siempre)
\`\`\`

### 🧪 Ejercicios

1. Explica GitOps en una frase a un compañero (estado deseado + Git + pull + reconciliación).
2. Compara en un diagrama: push (CI/CD clásico) vs pull (GitOps).
3. Identifica en tu organización qué se despliega con push y qué podría ser GitOps.

### ⚠️ Errores comunes

* Creer que GitOps = "versionar los manifests" (falta la reconciliación automática).
* Mantener Git y el cluster como dos verdades (el cluster gana y hay drift).
* Pipelines con acceso directo al cluster en un modelo GitOps (rompe el pull).
* GitOps sin PRs ni revisión (el "approval" es el merge, no un trámite posterior).

### 🔗 Conexión DevOps

GitOps es la culminación de la cadena: conecta manifests (nivel 14), declarative infrastructure (módulo 4), CI/CD (toda la plataforma) y la observabilidad (nivel 18). El nivel 17 lo desarrolla completo.
`
export default content
