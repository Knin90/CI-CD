const content = `
## Módulo 6 — Pull-based deployment

### 🎯 Objetivos de aprendizaje

* Implementar despliegues pull-based.
* Configurar el controller para vigilar el repo.
* Entender el ciclo: commit → detección → aplicación → verificación.

### ❓ Problema real que resuelve

El despliegue pull-based resuelve el "último kilómetro" de GitOps: cómo los cambios en Git llegan al cluster sin que nadie los empuje. El controller detecta el cambio en el repo, calcula la diferencia y aplica — cerrando el ciclo de forma automática, auditable y resiliente (el cluster sigue funcionando aunque el CI se caiga).

### 💡 Analogía

El pull-based deployment es el lector automático del buzón: el vecino (controller) revisa el buzón (repo) cada cierto tiempo; cuando llega una carta nueva (commit), la lee (detección) y actúa según su contenido (aplica). No depende de que el cartero llame a la puerta (push); el buzón se revisa solo.

### 📖 Explicación técnica

* Flujo pull-based:
  1. **CI construye** la imagen y **actualiza Git** (manifiestos con la nueva imagen o tag) — push a Git es la parte permitida.
  2. **Controller detecta** el cambio (webhook o polling del repo).
  3. **Controller aplica** el estado deseado (kubectl apply / helm upgrade internos).
  4. **Verificación**: el controller reporta el estado de sincronización (synced/out-of-sync) y el resultado.
* Implementaciones: Argo CD (módulo 9), Flux (módulo 10) — con intervalos de reconciliación configurables.
* Características: la aplicación es **continua** (el controller no "termina"; mantiene el estado), el resultado se observa (módulo 12 — sync status), el rollback es revertir el commit.
* El CI ya no necesita credenciales del cluster: solo acceso de escritura al repo (que ya tenía).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
CI: build → push imagen → commit manifests (nueva imagen)
   ↓
Controller detecta cambio (poll/webhook)
   ↓
Compara repo vs cluster (diff)
   ↓
Aplica (kubectl apply / helm)
   ↓
Reporta: synced ✓ (o out-of-sync)
\`\`\`

### 🧪 Ejercicios

1. Configura un controller GitOps (Argo CD o Flux) para una app simple.
2. Actualiza la imagen en el repo y observa el deploy automático.
3. Rompe la sincronización (cambio manual en el cluster) y observa el estado out-of-sync.

### ⚠️ Errores comunes

* El CI sigue aplicando directo al cluster (vuelve al push sin darse cuenta).
* Controller sin observar: se aplica pero nadie ve el estado de sync.
* Polling demasiado lento (el cambio tarda minutos en llegar).
* Repo sin protección: cambios sin revisión se aplican solos.

### 🔗 Conexión DevOps

El pull-based deployment es la implementación del modelo pull (módulo 7): conecta el estado deseado (módulo 2), la reconciliación (módulo 5), los controllers (módulos 9/10) y la observabilidad del sync (módulo 12).
`
export default content
