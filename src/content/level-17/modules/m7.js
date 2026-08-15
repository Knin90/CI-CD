const content = `
## Módulo 7 — Push vs Pull

### 🎯 Objetivos de aprendizaje

* Comparar los modelos push y pull de despliegue.
* Entender las ventajas de seguridad y simplicidad del pull.
* Decidir cuándo cada modelo tiene sentido.

### ❓ Problema real que resuelve

¿Quién tiene acceso al cluster? En el modelo push, el pipeline (CI) tiene credenciales del cluster y "empuja" los cambios — más poder, más superficie de ataque, más movimiento de secretos. En el modelo pull, el controller vive dentro del cluster y "tira" de Git — el pipeline externo nunca toca el cluster, y el cluster solo lee de un repo. La diferencia define el modelo de seguridad del despliegue.

### 💡 Analogía

Push vs pull es la entrega del pedido: el push es el repartidor que entra en tu casa con llave (el pipeline tiene credenciales y entra al cluster); el pull es tú (el cluster) yendo a recoger el pedido al almacén (Git) cuando lo necesitas. Con el pull, el repartidor nunca tiene llave de tu casa — menos acceso, menos riesgo.

### 📖 Explicación técnica

* **Push**: el CI/CD externo ejecuta \`kubectl apply\` contra el cluster usando credenciales (kubeconfig).
  * Ventajas: familiar, control inmediato.
  * Desventajas: el CI necesita acceso al cluster (secretos en movimiento), los despliegues dependen del estado del CI, difícil auditar quién cambió el cluster directamente.
* **Pull**: un controller en el cluster (Argo CD/Flux — módulos 9/10) vigila el repo Git y aplica los cambios; el cluster "tira" del estado deseado.
  * Ventajas: el CI no necesita acceso al cluster (solo escribir en Git — repos que ya controla), el cluster es inmune a compromisos del CI, el despliegue no depende del CI (si el CI falla, el controller sigue reconciliando).
  * Desventajas: requiere el controller instalado y mantenido, la "velocidad" de reacción depende del ciclo del controller.
* En la práctica: CI construye y actualiza Git (push a Git — permitido); el cluster pull de Git (no push directo al cluster).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
PUSH (clásico):
   CI → (kubeconfig) → kubectl apply → cluster
   (el CI tiene poder sobre el cluster)

PULL (GitOps):
   CI → commit al repo Git
   cluster ← controller (lee Git, aplica)
   (el CI nunca toca el cluster)
\`\`\`

### 🧪 Ejercicios

1. Dibuja ambos modelos y marca dónde viven las credenciales en cada uno.
2. Compara el blast radius: ¿qué pasa si se compromete el CI en cada modelo?
3. Identifica en tu organización qué despliegues son push y cuáles podrían ser pull.

### ⚠️ Errores comunes

* Modelo pull con el CI aún escribiendo directo al cluster (dos vías, dos verdades).
* Push con credenciales del cluster en el CI sin protección (nivel 11).
* Creer que el pull elimina el CI: el CI sigue construyendo y actualizando Git.
* Pull sin revisión: el controller aplica todo lo que llega al repo (proteger ramas — nivel 1).

### 🔗 Conexión DevOps

Push vs pull es la decisión de arquitectura central de GitOps: conecta seguridad (nivel 10), credenciales (nivel 11), reconciliation (módulo 5) y los controllers (módulos 9/10).
`
export default content
