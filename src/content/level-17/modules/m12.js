const content = `
## Módulo 12 — Drift correction

### 🎯 Objetivos de aprendizaje

* Detectar drift con GitOps (out-of-sync).
* Corregir drift automáticamente (auto-sync/self-healing).
* Decidir qué drifts corregir y cuáles alertar.

### ❓ Problema real que resuelve

El cluster se desvía del estado deseado por cambios manuales, degradación o recursos eliminados. GitOps detecta el drift (estado out-of-sync) y lo corrige — automáticamente (self-healing) o con aprobación. Sin esta corrección, el cluster se aleja de Git silenciosamente y el "source of truth" deja de ser verdad.

### 💡 Analogía

El drift correction es el mantenimiento de la fachada del edificio según el plano municipal: si alguien pinta la fachada de otro color (cambio manual) o se cae un ladrillo (degradación), el responsable (controller) lo detecta comparando con el plano (Git) y restaura el color y el ladrillo (reconcilia). El edificio siempre se ve según el plano aprobado.

### 📖 Explicación técnica

* **Detección**: el controller compara el estado del cluster con el repo y marca los recursos **out-of-sync** (Argo CD) / el estado de reconciliación (Flux).
* **Corrección automática**: auto-sync (aplicar automáticamente) + self-healing (revertir cambios manuales al cluster).
  * Auto-sync: sincroniza cuando hay diferencia repo→cluster.
  * Self-healing: revierte modificaciones hechas directamente en el cluster (nadie toca el cluster; si lo tocan, se deshace).
* **Corrección manual**: sync con aprobación — el operador revisa el diff (qué cambió y por qué) antes de aplicar (útil en prod).
* **Prune**: eliminar recursos que ya no están en Git (auto-prune con cuidado: puede borrar recursos legítimos si el repo está mal).
* Política de drift: auto-corregir drifts "inocentes" (borrados accidentales, escala cambiada); alertar drifts que indican problema real (alguien intentó cambiar el cluster a propósito — señal de auditoría/seguridad, módulo 13).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Alguien borra un Deployment en el cluster (drift)
   ↓
Controller detecta: cluster ≠ Git (out-of-sync)
   ↓
¿Self-healing? → revierte (vuelve a crear el Deployment)
   ↓
¿Manual? → alerta + operador revisa el diff → sync
   ↓
Cluster = Git de nuevo
\`\`\`

### 🧪 Ejercicios

1. Borra un recurso gestionado y observa la detección de drift (out-of-sync).
2. Activa self-healing y verifica que el cambio manual se revierte solo.
3. Configura una alerta para drifts en producción (en vez de corrección silenciosa).

### ⚠️ Errores comunes

* Self-healing sin alertas: los cambios manuales se deshacen en silencio (se pierde la señal de auditoría).
* Auto-prune sin revisión: un error en el repo borra recursos legítimos.
* Drift ignorado (out-of-sync permanente): Git deja de ser la verdad.
* Pelear contra el controller editando a mano repetidamente.

### 🔗 Conexión DevOps

El drift correction es la aplicación práctica de la reconciliación (módulo 5): conecta detección (módulos 9/10), observabilidad (módulo 12) y seguridad (módulo 13 — drifts intencionales son señales de ataque).
`
export default content
