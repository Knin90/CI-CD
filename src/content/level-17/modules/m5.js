const content = `
## Módulo 5 — Reconciliation

### 🎯 Objetivos de aprendizaje

* Definir la reconciliación y el loop de control.
* Entender cómo el controller compara deseado y actual.
* Aprovechar la auto-reparación (self-healing).

### ❓ Problema real que resuelve

Las cosas cambian sin permiso: un pod muere, alguien escala a mano, un recurso se degrada. La reconciliación es el mecanismo que garantiza que el estado real siempre vuelva al deseado: el controller compara constantemente, detecta diferencias y actúa — el sistema se auto-repara en lugar de esperar a un humano.

### 💡 Analogía

La reconciliación es el termostato de la casa: tiene una temperatura deseada (setpoint) y mide la real constantemente. Si la temperatura baja (drift), enciende la calefacción (acción) hasta volver al setpoint. El termostato no "confía" en que la casa mantenga la temperatura: la vigila y corrige.

### 📖 Explicación técnica

* **Reconciliation loop**: ciclo continuo — leer estado deseado (Git) → leer estado actual (cluster) → comparar → actuar para converger → repetir.
* Implementación: controllers (Kubernetes native: Deployment controller, ReplicaSet) y controllers GitOps (Argo CD, Flux — módulos 9/10) que hacen lo mismo a nivel de repos.
* **Self-healing**: si el drift aparece (recurso borrado, escala cambiada, config alterada), el controller lo revierte automáticamente al deseado.
* Frecuencia: los controllers reconcilian constantemente (eventos + polling periódico).
* Diferencia con "aplicar una vez": el CI/CD push aplica y termina; la reconciliación es un estado permanente.
* Buenas prácticas: definir qué es auto-reparable y qué requiere alerta humana (algunos drifts deben avisar, no corregirse en silencio), observar el ciclo de reconciliación (módulo 12), no pelear contra el controller (corregir en Git).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Loop continuo:
   Deseado (Git) ──┐
                   ├─ comparar
   Actual (cluster) ──┘
   ↓
¿Difieren? → acción de convergencia
   ↓
Esperar → repetir (siempre activo)
\`\`\`

### 🧪 Ejercicios

1. Borra un Deployment gestionado por GitOps: observa cómo el controller lo recrea.
2. Escala un Deployment a mano: observa cómo se revierte al deseado.
3. Identifica en tu cluster qué drifts deberían alertar en lugar de corregirse solos.

### ⚠️ Errores comunes

* Pelear contra el controller editando a mano (se revierte; corregir en Git).
* Reconciliación silenciosa: drifts corregidos sin que nadie se entere (perder visibilidad).
* Desactivar el self-healing por miedo (se pierde la garantía de convergencia).
* Confundir reconciliación con "aplicar una vez": el loop es continuo.

### 🔗 Conexión DevOps

La reconciliación es el motor de GitOps: conecta el estado deseado (módulo 2), el pull (módulo 6), la corrección de drift (módulo 12) y los controllers (módulos 9/10). Sin reconciliación, GitOps es solo "versionar YAML".
`
export default content
