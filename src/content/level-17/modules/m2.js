const content = `
## Módulo 2 — Desired state

### 🎯 Objetivos de aprendizaje

* Definir el concepto de estado deseado.
* Describir el sistema completo de forma declarativa.
* Entender que el estado deseado es la especificación, no el resultado.

### ❓ Problema real que resuelve

Para saber si el sistema funciona hay que saber qué se espera de él. El estado deseado es la especificación completa y declarativa de cómo debe estar el sistema: qué aplicaciones, qué versiones, qué configuración, cuántas réplicas. Sin una especificación clara, "funciona" es una opinión; con ella, es una comparación objetiva.

### 💡 Analogía

El estado deseado es el plano de la casa entregado al constructor: define cuántas habitaciones, dónde van las puertas y qué materiales. El constructor no "improvisa una casa bonita": ejecuta el plano. Y cualquier desviación del plano (una puerta en otro sitio) es un defecto detectable — aunque la casa "funcione" como vivienda.

### 📖 Explicación técnica

* **Estado deseado (desired state)**: especificación declarativa del sistema — manifests de Kubernetes, charts de Helm, configs — versionada en Git.
* Características: completo (todo el sistema), declarativo (qué, no cómo), versionado (cada cambio es un commit), revisable (PRs).
* Alcance: aplicaciones (Deployments, Services), configuración (ConfigMaps), infraestructura (opcional — Crossplane/ACR), todo lo que define el runtime.
* Relación con el estado actual: el estado actual es lo que realmente corre; GitOps compara y reconcilia (módulo 5).
* El estado deseado **no es un snapshot**: es la especificación viva que el sistema debe cumplir siempre — el "target" continuo.
* Buenas prácticas: describir todo (nada de "este recurso se creó a mano"), versionar en repos dedicados (app vs infra), definir el estado deseado con la herramienta adecuada (k8s manifests, Helm, kustomize).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Git: estado deseado (manifests + configs)
   ↓
Controller lee la especificación
   ↓
Compara con el estado actual del cluster
   ↓
¿Difieren? → reconcilia (módulo 5)
   ↓
Cluster converge al estado deseado
\`\`\`

### 🧪 Ejercicios

1. Enumera todo lo que corre en tu cluster: ¿está todo descrito en algún repo?
2. Escribe el estado deseado de tu app (Deployment, Service, ConfigMap) en un repo.
3. Identifica recursos que se crearon fuera de Git (drift potencial).

### ⚠️ Errores comunes

* Estado deseado incompleto (recursos huérfanos fuera de Git).
* Descripciones "imperativas" mezcladas (comandos sueltos que no son especificación).
* Estado deseado sin versionar: "el cluster es el repo".
* Especificación y realidad divergentes sin que nadie lo sepa (drift no detectado).

### 🔗 Conexión DevOps

El estado deseado es el concepto fundacional de GitOps: conecta manifests (nivel 14), declarative infrastructure (módulo 4) y la reconciliación (módulo 5). Todo GitOps se construye sobre esta idea.
`
export default content
