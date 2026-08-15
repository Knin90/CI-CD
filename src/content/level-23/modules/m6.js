const content = `
## Módulo 6 — Parallelization

### 🎯 Objetivos de aprendizaje

* Paralelizar jobs independientes del pipeline.
* Usar matrix builds y splits de tests.
* Equilibrar paralelismo y coste.

### ❓ Problema real que resuelve

El pipeline corre todo en serie: 12 jobs que no dependen entre sí, 40 minutos en total, cuando podrían correr en 8. La paralelización (nivel 19) ejecuta jobs independientes a la vez, usando los runners disponibles, y acorta el tiempo total del pipeline — sin cambiar la cobertura. Resuelve el CI lento por subutilización.

### 💡 Analogía

La paralelización es la cocina con varios fogones: en vez de cocinar los 5 platos uno tras otro en un solo fogón (serie), cada plato independiente va en su fogón (paralelo) y la cena está lista en el tiempo del plato más lento, no en la suma de todos. Eso sí: la cocina necesita fogones (runners) — paralelizar sin capacidad solo llena la cola (nivel 4).

### 📖 Explicación técnica

* **Paralelización**: jobs sin dependencias corren simultáneamente (nivel 5 y 19: \`needs\`, stages paralelas).
* Formas:
  * **Jobs independientes en paralelo**: lint, tests por área, build por plataforma — corren a la vez.
  * **Matrix builds**: el mismo job con variaciones (versiones de runtime, OS, navegadores — nivel 19).
  * **Split de tests**: la suite de tests se divide en N shards que corren en paralelo y se agregan (nivel 7).
  * **DAGs**: \`needs\` define solo las dependencias reales; lo que no depende, paralelo (nivel 19).
* **Coste**: más paralelo = más runners = más coste (hosted — nivel 21) o más carga (self-hosted — nivel 4). El equilibrio: paraleliza hasta que el tiempo marginal no compense el coste.
* Limitaciones: recursos (cuota de jobs concurrentes — nivel 4), tests que comparten estado (no paralelizables sin aislamiento — nivel 7), y dependencias reales que obligan a esperar.
* Buenas prácticas: dependencias mínimas (solo lo real — nivel 19), splits balanceados (no un shard de 2 min y otro de 30), y monitorizar la utilización de runners.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Jobs sin dependencias → paralelos
   ↓
lint ║ tests split ║ build matrix
   ↓
Cada job en un runner disponible
   ↓
Tiempo total = el job más lento (no la suma)
   ↓
Resultados se agregan
   ↓
Equilibrio: velocidad vs coste de runners
\`\`\`

### 🧪 Ejercicios

1. Identifica 3 jobs independientes de tu pipeline y paralelízalos.
2. Divide tu suite de tests en shards y compara el tiempo.
3. Mide la utilización de tus runners antes y después de paralelizar.

### ⚠️ Errores comunes

* Paralelizar sin runners (todo se encola y el tiempo no mejora — nivel 4).
* Tests que comparten estado paralelizados (fallos flaky — nivel 7).
* Dependencias en cascada innecesarias (nada es paralelo — nivel 19).
* Splits desbalanceados (un shard domina el tiempo total).

### 🔗 Conexión DevOps

La paralelización conecta con jobs y stages (nivel 5), matrix builds (nivel 19), testing (nivel 7), runners (nivel 4) y fast feedback (módulo 5). Es la herramienta principal para acortar el pipeline sin perder cobertura.
`
export default content
