const content = `
## Módulo 12 — Drift detection

### 🎯 Objetivos de aprendizaje

* Definir drift de infraestructura y sus causas.
* Detectar drift con Terraform plan de forma periódica.
* Corregir drift o declararlo intencional.

### ❓ Problema real que resuelve

Alguien cambia un recurso "a mano" en la consola del cloud: el estado real ya no coincide con el código. El drift es silencioso: el código dice una cosa y la infraestructura otra. Detectarlo a tiempo evita que el siguiente apply haga cambios sorpresa (o que la infra se rompa sin explicación). Terraform plan es la herramienta de detección: si muestra cambios sin que nadie tocara el código, hay drift.

### 💡 Analogía

El drift es el jardín del vecino abandonado: el plano de la urbanización (código) dice "césped", pero el vecino puso cemento (cambio manual). Nadie se entera hasta que el plano y la realidad se comparan. La detección de drift es el paseo periódico del inspector comparando plano y realidad.

### 📖 Explicación técnica

* **Drift**: diferencia entre el estado deseado (código/state) y el estado real de la infraestructura.
* Causas: cambios manuales en la consola, cambios fuera de Terraform (scripts, otros tools), degradación de recursos, estado desactualizado.
* **Detección**: \`terraform plan\` periódico (cron/pipeline programado) — si produce cambios y nadie los hizo, hay drift.
* Herramientas: pipelines programados (schedule triggers — nivel 2), \`terraform plan -detailed-exitcode\` (exit code 2 = hay cambios), Atlantis/CI con jobs de drift, Terraform Cloud (auto-detection).
* Corrección: \`terraform apply\` (reconciliar a lo deseado) o aceptar el drift (cambio intencional no versionado — caso de gobernanza).
* Buenas prácticas: detectar en todos los entornos (al menos prod), alertar al equipo cuando hay drift, definir política: ¿se corrige automáticamente o se revisa?, auditar cambios manuales (¿por qué nadie usó el pipeline?).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline programado (ej. diario)
   ↓
terraform plan (código + state vs realidad)
   ↓
¿Cambios sin commit que los justifique? → DRIFT
   ↓
Alerta + revisión
   ↓
¿Corregir? → apply (reconciliar)   ¿Intencional? → documentar
\`\`\`

### 🧪 Ejercicios

1. Programa un job de drift detection en tu pipeline (plan periódico con alerta).
2. Introduce drift a propósito (cambia un tag en la consola) y detecta el plan.
3. Define la política de tu equipo: corregir automático o revisar primero.

### ⚠️ Errores comunes

* Nunca detectar drift: los applys sorpresa llegan en el peor momento.
* Detectar pero no actuar: los reportes de drift se acumulan sin leer.
* Corregir drift a mano en la consola (aumenta el drift).
* Confundir drift con cambios legítimos del pipeline (los pipelines también cambian la infra).

### 🔗 Conexión DevOps

El drift detection conecta Terraform (nivel 15), la reconciliación (nivel 17 — GitOps corrige drift automáticamente) y la observabilidad (nivel 18). Infraestructura sin detección de drift es un castillo de naipes.
`
export default content
