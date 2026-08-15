const content = `
## Módulo 11 — GitOps workflow

### 🎯 Objetivos de aprendizaje

* Diseñar el flujo de trabajo completo de GitOps.
* Combinar CI (construir) con GitOps (desplegar).
* Definir PRs, revisión y promoción por entornos.

### ❓ Problema real que resuelve

GitOps necesita un flujo de trabajo claro: quién construye, quién actualiza Git, cómo se revisa y cómo se promueve por entornos. El GitOps workflow define la cadena completa — del código al cluster — con las responsabilidades separadas: el CI construye y actualiza el repo, la revisión ocurre en Git (PRs), y el controller despliega por entorno.

### 💡 Analogía

El GitOps workflow es la línea editorial del periódico: los redactores (CI) escriben y entregan artículos al editor (Git), el editor los revisa y aprueba (PRs), y la imprenta (controller) los publica automáticamente en cada edición (entorno). Nadie imprime un artículo que no pasó por la mesa del editor.

### 📖 Explicación técnica

* Flujo completo:
  1. **Desarrollador** commitea código de la app.
  2. **CI** construye, testea, escanea y genera la imagen (niveles 6-10).
  3. **CI actualiza el repo GitOps**: manifiestos/charts con la nueva imagen (un PR, no push directo — nivel 1).
  4. **Revisión en Git**: el PR del repo gitops se revisa y mergea.
  5. **Controller** detecta el cambio y despliega (pull — módulo 6).
  6. **Verificación**: health checks + estado de sync (módulo 12).
* **Promoción por entornos** (nivel 12): dev auto-sync; staging revisión ligera; prod approval + ventana — cada entorno tiene su app/overlay en el repo.
* Roles: los desarrolladores no necesitan acceso al cluster (solo a Git); los operadores gestionan el repo gitops y los controllers.
* Buenas prácticas: PRs pequeños, mensajes claros (relacionar con el commit de la app), política de ramas por entorno, revertir = revertir el PR/commit.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
App code → CI (build/test/scan) → imagen
   ↓
CI: PR al repo GitOps (nueva imagen)
   ↓
Revisión + merge
   ↓
Controller: detecta → sync (entorno correspondiente)
   ↓
Health checks + estado sync
   ↓
Promoción: dev → staging → prod (gates)
\`\`\`

### 🧪 Ejercicios

1. Dibuja tu GitOps workflow: código → CI → repo gitops → controller → entornos.
2. Configura el CI para que actualice el repo gitops vía PR (no push directo).
3. Define la política de promoción: qué entornos auto-sync y cuáles requieren aprobación.

### ⚠️ Errores comunes

* El CI empuja directo al repo gitops sin PR (se pierde la revisión).
* Mezclar el repo de código con el repo gitops (los permisos se mezclan).
* Promoción sin gates: todo llega a prod con la misma velocidad.
* Flujo no documentado: cada equipo hace GitOps "a su manera".

### 🔗 Conexión DevOps

El GitOps workflow es la integración final del nivel 17: conecta CI (toda la plataforma), repos (nivel 1), entornos (nivel 12) y los controllers (módulos 9/10). Es el flujo que el proyecto final (nivel 24) debe implementar.
`
export default content
