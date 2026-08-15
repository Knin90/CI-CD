const content = `
## Módulo 13 — Runner scaling

### 🎯 Objetivos de aprendizaje

* Explicar por qué los runners necesitan escalado.
* Comparar escalado manual, programado y automático.
* Configurar autoescalado según la cola de jobs.

### ❓ Problema real que resuelve

La carga de los runners es irregular: pocos jobs a las 9am, cien jobs después de una release, cero de madrugada. Con runners fijos, o pagas capacidad ociosa, o sufres colas infinitas en los picos. El escalado ajusta la capacidad a la demanda: más runners cuando hay cola, menos cuando no.

### 💡 Analogía

Una cafetería con horarios variables: por la mañana hay fila (pico) y por la tarde vacía. Contratar empleados fijos para el pico desperdicia la tarde; el modelo correcto es refuerzos (escalado): más personal en horas punta, menos en horas bajas. Los runners se escalan igual: por demanda.

### 📖 Explicación técnica

Modelos de escalado:

* **Manual**: agregas/quitas runners a mano. Simple, lento, propenso a errores.
* **Programado**: escala según horario (\`cron\` que sube el pool antes del pico). Útil si la carga es predecible.
* **Automático por cola** (recomendado): el controlador observa la cola de jobs pendientes y crea runners mientras haya demanda, destruyéndolos al terminar.
* **Por métricas**: escala por CPU/memoria de los runners existentes (menos preciso que la cola).

Implementaciones:

* **ARC (GitHub)**: escala pods según la cola (\`HorizontalRunnerAutoscaler\`).
* **GitLab**: autoescalado con executor de Kubernetes o Docker Machine.
* **Azure**: agent pools elásticos (elastic pools) que escalan por demanda.
* **Terraform + scripts**: autoescalado propio en cloud.

Métricas a vigilar: tiempo en cola (p95), runners en uso, costo por ejecución, tasa de fallo por infraestructura.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Cola de jobs pendientes
  │
  ▼
Controlador mide la demanda (jobs en cola)
  │
  ├── Cola > N → crear más runners (pod/VM)
  ├── Sin cola → mantener mínimo (cero si es posible)
  └── Jobs terminados → destruir runners
  │
  ▼
Capacidad = demanda (ni ociosa, ni bloqueada)
\`\`\`

### 💻 Ejemplo básico

ARC con autoescalado (Kubernetes):

\`\`\`yaml
apiVersion: actions.summerwind.dev/v1alpha1
kind: HorizontalRunnerAutoscaler
metadata:
  name: ci-autoscaler
spec:
  scaleTargetRef:
    name: ci-runner-deployment
  minReplicas: 1
  maxReplicas: 20
  scaleUpTriggers:
    - githubEvent:
        workflowJob: {}
      duration: "5m"
\`\`\`

### 🏢 Caso de uso profesional

Un equipo con 15 servicios y releases frecuentes migra a ARC: en condiciones normales hay 1 pod; cuando una release dispara 40 jobs, el autoscaler crea hasta 20 pods en minutos; al terminar, vuelve a 1. El p95 de tiempo en cola pasa de 25 minutos a 2, y la infraestructura de CI cuesta la mitad porque no hay capacidad ociosa.

### ⚠️ Errores comunes

* Escalado manual olvidado: colas en los picos y runners ociosos en horas bajas.
* Autoescalado sin límite máximo: factura inesperada.
* Arranque lento de máquinas: la cola crece mientras arranca el runner.
* Escalar por CPU en vez de por cola: la señal equivocada.
* Sin métricas de cola: no se sabe cuándo escalar.

### 📋 Lo que debes recordar

* La demanda de runners es irregular: escala por cola de jobs.
* Modelos: manual, programado, automático (recomendado).
* ARC (GitHub), K8s executor (GitLab), elastic pools (Azure).
* Vigila el tiempo en cola y los límites máximos.

### 🧪 Autoevaluación rápida

1. ¿Por qué los runners necesitan escalado?
2. ¿Cuál es la señal correcta para escalar?
3. ¿Qué implementación permite autoescalar runners en Kubernetes con GitHub Actions?

---

1. Porque la carga es irregular: capacidad fija significa colas en los picos o capacidad ociosa en horas bajas.
2. La cola de jobs pendientes: cuantos más jobs en cola, más runners; cuando la cola se vacía, se destruyen.
3. Actions Runner Controller (ARC) con HorizontalRunnerAutoscaler, que crea y destruye pods según la demanda.
`
export default content
