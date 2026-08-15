const content = `
## Módulo 8 — Conditional execution

### 🎯 Objetivos de aprendizaje

* Ejecutar jobs/steps solo cuando se cumplen condiciones.
* Usar condiciones sobre ramas, cambios, resultados previos.
* Evitar pipelines que corren "de todo" siempre.

### ❓ Problema real que resuelve

Correr todos los jobs en cada push desperdicia recursos y tiempo: un cambio solo de documentación no necesita los E2E; un cambio solo de backend no necesita rebuild del frontend. La ejecución condicional ejecuta solo lo relevante — según rama, archivos cambiados, resultados previos o inputs — acelerando el feedback y reduciendo el coste.

### 💡 Analogía

La ejecución condicional es el semáforo del cruce: no todos los coches pasan siempre; pasan según la luz (condición). Un cambio de cartel en la tienda (docs) no requiere cerrar el tráfico (E2E) — el semáforo inteligente solo bloquea cuando el trabajo lo requiere.

### 📖 Explicación técnica

* Condiciones típicas:
  * **Por rama**: deploy solo en main; PRs solo corren CI (no deploy).
  * **Por cambios** (path filters): \`paths:\` en GitHub/GitLab — si solo cambió \`docs/\`, no corren los tests; si cambió \`backend/\`, corren los del backend.
  * **Por resultado previo**: un job corre solo si el anterior falló (\`when: on_failure\` — notificaciones), o solo si tuvo éxito (\`needs\` + condición).
  * **Por inputs/variables**: manual trigger con parámetros (deploy a staging vs prod).
  * **Por eventos**: tag push (release), schedule (nivel 2).
* Beneficios: feedback más rápido, runners liberados, pipelines más claros (solo lo relevante).
* Riesgos: condiciones mal definidas que saltan jobs importantes (un cambio de backend sin trigger de tests) — revisar los paths y los casos "por defecto" (¿y si no matchea ninguna condición?).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Push a main (cambia solo backend/)
   ↓
¿paths incluye backend/? → sí → jobs de backend + tests
¿paths incluye frontend/? → no → se saltan
¿rama es main? → sí → deploy habilitado
¿evento es PR? → no → PR jobs se saltan
\`\`\`

### 🧪 Ejercicios

1. Añade path filters a tus jobs (solo correr lo que cambió).
2. Configura un job que corra solo cuando otro falla (notificación).
3. Revisa tus condiciones: ¿hay cambios que se cuelan sin los tests correctos?

### ⚠️ Errores comunes

* Path filters incompletos (un cambio en \`config/\` no dispara nada y rompe todo).
* Condiciones "por si acaso" que se vuelven inmantenibles.
* Saltarse jobs importantes por condiciones mal pensadas.
* Condiciones duplicadas en varios niveles (job + step + stage) que se contradicen.

### 🔗 Conexión DevOps

La ejecución condicional optimiza el pipeline: conecta triggers (nivel 2), jobs/stages (nivel 5), el fast feedback (nivel 23) y el coste de runners (nivel 4).
`
export default content
