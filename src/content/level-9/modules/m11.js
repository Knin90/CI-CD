const content = `
## Módulo 11 — Pull images

### 🎯 Objetivos de aprendizaje

* Extraer imágenes en el pipeline y en los entornos.
* Usar digest para despliegues reproducibles.
* Aplicar pull policies correctas.

### ❓ Problema real que resuelve

Los entornos y los jobs necesitan la imagen correcta: los despliegues extraen la versión exacta del registry y los jobs de CI extraen imágenes base o de test. Un pull mal gestionado (última disponible, sin digest, políticas incorrectas) produce despliegues no reproducibles y entornos con versiones equivocadas.

### 💡 Analogía

El pull es retirar el vehículo correcto del depósito: la orden de retirada (referencia de la imagen) debe identificar el coche exacto (versión + digest). Si la orden dice "dame el coche actual" (latest), puedes llevarte uno distinto cada vez; con "dame el coche con chasis X" (digest), siempre es el mismo.

### 📖 Explicación técnica

Referencias:

* **Tag**: \`registry/app:v1.4.0\` (legible).
* **Digest**: \`registry/app@sha256:9f86...\` (exacto, inmutable).
* **Tag + digest**: \`registry/app:v1.4.0@sha256:...\` — lo profesional: legible Y exacto.

Pull policies (Kubernetes):

* \`IfNotPresent\`: usa la local si existe (rápido, pero puede quedar vieja).
* \`Always\`: siempre descarga (actual, pero lento y con riesgo si el tag es mutable).
* \`Never\`: solo local (para nodos offline).
* Con digest, la imagen es inmutable: \`IfNotPresent\` es seguro.

En el pipeline:

* Extraer imágenes base con digest (reproducibilidad).
* Los jobs de test extraen la imagen de la app (del registry) para probar el artefacto real.
* Pre-carga de imágenes en runners (cold start más rápido).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Deploy a producción
  │
  ▼
kubectl set image deployment/app app=registry/app:v1.4.0@sha256:9f86...
  │
  ▼
Kubelet: pull (IfNotPresent — ya está en el nodo o se descarga)
  │
  ▼
Se despliega EXACTAMENTE la imagen verificada
  │
  ▼
Rollback: se referencia el digest anterior (v1.3.9)
\`\`\`

### 💻 Ejemplo básico

Pull con digest en Kubernetes:

\`\`\`yaml
containers:
  - name: app
    image: registry.example.com/app:v1.4.0@sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
    imagePullPolicy: IfNotPresent
\`\`\`

### 🏢 Caso de uso profesional

Un equipo despliega con tag+digest en todos los entornos. Tras un incidente causado por \`latest\` mutable en un entorno de staging compartido (dos equipos pisándose imágenes), la política pasa a digest obligatorio: cada despliegue referencia exactamente la imagen verificada, y staging deja de ser una ruleta rusa.

### ⚠️ Errores comunes

* Desplegar \`latest\` (cambia entre pulls).
* Pull policy \`Always\` con tags mutables.
* Sin digest: no se sabe qué se está ejecutando.
* Extraer en el job sin autenticación configurada.
* Caché de imágenes desactualizado en nodos.

### 📋 Lo que debes recordar

* Referencia profesional: tag + digest.
* Con digest, la imagen es inmutable y reproducible.
* Pull policies según el caso (IfNotPresent con digest).
* Los jobs extraen el artefacto real del registry para probarlo.

### 🧪 Autoevaluación rápida

1. ¿Qué referencia de imagen es la más confiable?
2. ¿Qué hace la policy \`IfNotPresent\`?
3. ¿Qué riesgo tiene \`Always\` con tags mutables?

---

1. Tag + digest (\`app:v1.4.0@sha256:...\`): legible y exacto, inmutable.
2. Usa la imagen local si existe; solo descarga si no está presente (rápido y con digest es seguro).
3. Re-descarga en cada despliegue y puede traer un contenido distinto si el tag fue sobreescrito — despliegues no reproducibles.
`
export default content
