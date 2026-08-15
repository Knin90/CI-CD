const content = `
## Módulo 4 — Área 4: Infraestructura y Operaciones

### 🎯 Objetivos de aprendizaje

* Evaluar infraestructura, operación y troubleshooting.
* Repasar IaC, Kubernetes, observabilidad y debugging.
* Demostrar la operación profesional del pipeline y la plataforma.

### ❓ Problema real que resuelve

El Área 4 verifica la operación: infraestructura como código (nivel 15), configuración (nivel 16), orquestación (nivel 14), observabilidad (nivel 18) y troubleshooting (nivel 22). El pipeline no solo construye y despliega: opera la plataforma de forma reproducible, visible y diagnosticable. Sin esta área, el pipeline existe pero la operación es improvisada.

### 💡 Analogía

El Área 4 es el examen del mantenimiento y la operación del edificio: se evalúan los planos de infraestructura (IaC), los sistemas del edificio (Kubernetes, config), los sensores (observabilidad) y la capacidad de reparar (troubleshooting). Un edificio bien construido pero mal operado se degrada — igual que un pipeline sin operación profesional.

### 📖 Explicación técnica

* **IaC** (nivel 15): Terraform (o equivalente) — plan/apply, state remoto, drift, entornos (módulo 11 de 22).
* **Configuración** (nivel 16): Ansible (o equivalente) — inventarios, idempotencia, check mode (módulo 12 de 22).
* **Kubernetes** (nivel 14): manifests/Helm, despliegues verificados, estrategias (nivel 13), rollback (nivel 22).
* **Observabilidad** (nivel 18): métricas, logs, trazabilidad de la app y del pipeline (módulo 17 de 23); alertas que importan.
* **Troubleshooting** (nivel 22): metodología (estabilizar → observar → clasificar → hipótesis → experimentar → verificar), diagnóstico por capa (build, dependencias, runners, Docker, K8s, Terraform, red — módulos del 22), runbooks y producción (módulo 20 de 22).
* Preguntas de evaluación típicas: ¿cómo gestionas el state y el drift en IaC? ¿cómo verificas un despliegue en Kubernetes? ¿qué métricas y alertas vigilarías? ¿cómo diagnosticas un pipeline rojo? ¿qué haces en un incidente de producción?

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
IaC: plan/apply + state remoto + drift
   ↓
Config: Ansible idempotente (check mode)
   ↓
K8s: deploy verificado + estrategias + rollback
   ↓
Observabilidad: métricas, logs, alertas
   ↓
Incidente → metodología de troubleshooting
   ↓
Runbooks + postmortem
   ↓
Plataforma operada profesionalmente
\`\`\`

### 🧪 Ejercicios

1. Explica cómo gestionarías state y drift en Terraform.
2. Diseña el monitoreo de una app y su pipeline (métricas y alertas clave).
3. Autoevalúate: describe tu metodología para diagnosticar un pipeline roto.

### ⚠️ Errores comunes

* IaC sin state remoto ni drift (nivel 15).
* Deploys sin verificación (nivel 20 de 22).
* Observabilidad sin alertas accionables (nivel 18).
* Debugging sin método (cambiar "a ver si pasa" — nivel 22).

### 🔗 Conexión DevOps

El Área 4 conecta con IaC (nivel 15), Ansible (nivel 16), Kubernetes (nivel 14), observabilidad (nivel 18) y troubleshooting (nivel 22). Es el examen de la operación: la plataforma reproducible, visible y diagnosticable de principio a fin.
`
export default content
