const content = `
## Módulo 11 — Parallel testing

### 🎯 Objetivos de aprendizaje

* Explicar cómo se paralelizan los tests en CI.
* Configurar paralelismo por sharding y por proceso.
* Gestionar aislamiento de datos en tests paralelos.

### ❓ Problema real que resuelve

Una suite de tests que tarda 30 minutos bloquea el feedback. La paralelización ejecuta los tests en varios procesos/máquinas a la vez: el tiempo total pasa de la suma al máximo. Es la palanca más grande para acelerar el testing en CI — con el costo de gestionar aislamiento y recursos.

### 💡 Analogía

Corregir 100 exámenes: un profesor solo tarda 10 horas; 10 profesores con 10 exámenes cada uno tardan 1 hora. La paralelización reparte el trabajo. Pero los profesores no deben corregir el mismo examen (datos compartidos) ni depender de lo que otro corrigió: aislamiento por lote.

### 📖 Explicación técnica

Niveles de paralelismo:

* **Dentro del proceso** (hilos): tests que corren en threads (rápido, pero con riesgos de estado compartido).
* **Multi-proceso**: división de la suite en N procesos en la misma máquina.
* **Multi-máquina (sharding)**: división en N jobs/runners; cada job ejecuta una fracción de la suite.

Sharding:

* GitLab: \`parallel: 4\` + \`CI_NODE_INDEX\` para particionar (jest/playwright lo soportan nativamente).
* GitHub: matrix con shard id; jest \`--shard\`, Playwright \`--shard\`.
* División balanceada: por número de tests, por archivo, por duración estimada (última es la mejor).

Aislamiento:

* Datos por shard (bases de datos separadas o datos con prefijo único).
* Sin dependencia entre shards (cada uno independiente).
* Reportes combinados: cada shard publica su reporte; se unifican.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Suite: 1.000 tests, 30 min secuencial
  │
  ▼
Sharding en 5 jobs (200 tests cada uno, ~6 min)
  ├── Shard 1: tests 1-200   (job 1)
  ├── Shard 2: tests 201-400 (job 2)
  ├── Shard 3: tests 401-600 (job 3)
  ├── Shard 4: tests 601-800 (job 4)
  └── Shard 5: tests 801-1000 (job 5)
  │
  ▼
Reportes combinados → 6 min totales (vs 30)
\`\`\`

### 💻 Ejemplo básico

Sharding con Jest (GitHub Actions matrix):

\`\`\`yaml
strategy:
  matrix:
    shard: [1, 2, 3, 4]
steps:
  - run: npx jest --shard=\${{ matrix.shard }}/4
\`\`\`

### 🏢 Caso de uso profesional

Una suite E2E de 45 minutos se paraleliza en 9 shards con Playwright: el tiempo baja a 6 minutos. Cada shard usa su propia base de datos de prueba (aislamiento total) y publica sus reportes; el pipeline combina los resultados y el PR ve un único resumen. El feedback E2E pasa de "mañana lo sabremos" a "en el mismo PR".

### ⚠️ Errores comunes

* Shards con datos compartidos (tests que chocan entre sí).
* Partición desbalanceada (un shard tarda 20 min y los otros 2).
* Dependencias entre shards (orden implícito).
* Ignorar el límite de runners (shards que se encolan).
* Reportes no combinados (ver N reportes sueltos).

### 📋 Lo que debes recordar

* Paraleliza por shards (jobs) y por procesos.
* Sharding: partición balanceada de la suite.
* Aislamiento de datos entre shards: obligatorio.
* Combina los reportes para un resultado único.

### 🧪 Autoevaluación rápida

1. ¿Qué es el sharding de tests?
2. ¿Qué requisito crítico tienen los shards?
3. ¿Cómo se balancea la partición?

---

1. Dividir la suite de tests en N fracciones que se ejecutan en N jobs/máquinas en paralelo.
2. Aislamiento: cada shard debe ser independiente (datos propios, sin dependencia de otros shards).
3. Por duración estimada (o número de tests): los shards deben tardar aproximadamente lo mismo.
`
export default content
