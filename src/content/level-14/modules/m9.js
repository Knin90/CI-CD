const content = `
## Módulo 9 — Image updates

### 🎯 Objetivos de aprendizaje

* Actualizar la imagen de un Deployment desde el pipeline.
* Usar tags inmutables y actualización por digest.
* Evitar el anti-patrón de \`latest\`.

### ❓ Problema real que resuelve

El pipeline construye una imagen nueva por commit; el cluster debe empezar a usar esa imagen exacta. Actualizar la imagen "a mano" o con \`latest\` rompe la trazabilidad: no se sabe qué versión corre. La actualización de imágenes debe ser automática, precisa (tag/digest inmutable) y verificada.

### 💡 Analogía

Actualizar la imagen es cambiar la página del libro de texto: el profesor (pipeline) entrega la página nueva numerada (tag sha-abc123) y los alumnos (pods) la sustituyen. Si la página solo dijera "la más reciente" (latest), nadie sabría qué edición está leyendo cada alumno.

### 📖 Explicación técnica

* Estrategias para actualizar la imagen:
  * **kubectl set image**: \`kubectl set image deployment/app app=repo/app:sha-abc123\` — actualiza la plantilla y dispara el rollout.
  * **kubectl patch / edit** del manifest con la nueva referencia.
  * **Helm upgrade** con \`--set image.tag=sha-abc123\` (módulo 8).
  * **Kustomize**: \`images:\` con \`newTag\` por overlay.
  * **GitOps** (módulo 14): el pipeline actualiza el manifest en Git y el controller lo aplica.
* **Tags inmutables**: el tag identifica una imagen única para siempre (\`sha-abc123\`, \`1.2.3\`). \`latest\` es mutable: no garantiza nada.
* Mejor aún: **digest** (\`repo/app@sha256:...\`) — identificación criptográfica de la imagen exacta.
* El cambio de imagen crea un nuevo ReplicaSet y un rolling update (módulo 10).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline: build → push (tag sha-abc123)
   ↓
Actualiza referencia: set image / helm --set / kustomize
   ↓
Deployment detecta plantilla nueva
   ↓
Rolling update (ReplicaSet nuevo)
   ↓
Verificación: rollout status + health checks
\`\`\`

### 🧪 Ejercicios

1. Actualiza la imagen de un Deployment con \`kubectl set image\` usando un tag inmutable.
2. Compara con usar \`latest\`: ¿qué información se pierde?
3. Automatiza la actualización de imagen en tu pipeline (set image / helm --set / kustomize).

### ⚠️ Errores comunes

* Tags \`latest\`: no se sabe qué versión corre ni se puede hacer rollback preciso.
* Actualización manual de la imagen (drift entre Git y cluster).
* \`kubectl set image\` sin verificar el rollout (el deploy "termina" antes de estar listo).
* Sobreescribir la imagen con \`kubectl edit\` sin versionar el cambio.

### 🔗 Conexión DevOps

Las image updates unen el container registry (nivel 9), el deployment pipeline (módulo 1) y los rolling updates (módulo 10). En GitOps, la actualización se hace en Git (módulo 14) — el patrón más auditable.
`
export default content
