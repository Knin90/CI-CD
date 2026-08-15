const content = `
## Módulo 14 — Pipeline graphs

### 🎯 Objetivos de aprendizaje

* Leer e interpretar el grafo de un pipeline.
* Diseñar grafos eficientes (paralelismo + dependencias).
* Usar la visualización para diagnosticar cuellos de botella.

### ❓ Problema real que resuelve

La vista de ejecución de un pipeline es un **grafo**: nodos (jobs) y flechas (dependencias), con estados por nodo. Saber leerlo — qué espera a qué, qué corre en paralelo, dónde está el cuello de botella — convierte la visualización en una herramienta de diagnóstico y diseño: se ve de un vistazo por qué el pipeline tarda y dónde falló.

### 💡 Analogía

El grafo del pipeline es el plano del metro: cada estación (job) tiene líneas (dependencias) y colores (stages). El plano muestra si puedes ir directo (paralelo) o si debes transbordar (secuencia), y dónde se forman los cuellos de botella (estaciones saturadas). Un buen plano hace que cualquier trayecto se entienda sin leer el código.

### 📖 Explicación técnica

* **Nodos**: jobs, con su estado (verde/rojo/amarillo/saltado).
* **Flechas**: dependencias (\`needs\`) y agrupaciones por stage.
* **Lectura**:
  * Jobs en la misma columna (stage) → paralelos.
  * Flechas → orden y dependencias.
  * Nodo rojo → fallo; los nodos que dependen de él quedan sin ejecutar.
* **Diagnóstico de tiempo**:
  * El camino crítico = la ruta más larga del grafo; es el tiempo mínimo del pipeline.
  * Un job lento en el camino crítico alarga todo; un job lento paralelo no.
* **Diseño**: para reducir tiempo, acortar el camino crítico (paralelizar, dividir jobs, cachear) en vez de acelerar jobs paralelos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
             lint ──►────┐
                         ▼
build ──► unit ──► package ──► deploy
              ▲
     sast ────┘

Camino crítico: build → unit → package → deploy
  (la suma de estos es el tiempo mínimo)

lint y sast corren en paralelo (fuera del camino crítico)
\`\`\`

### 💻 Ejemplo básico

Visualización del grafo (GitLab):

\`\`\`text
build ──► test ──► deploy (producción)
            │
            ├── unit (paralelo)
            └── integration (paralelo)

Si unit tarda 8 min y integration 6 min:
  camino crítico de test = 8 min (el máximo, no la suma)
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline tarda 40 minutos. El equipo dibuja el grafo y encuentra el camino crítico: build (12 min) → e2e (20 min) → deploy. Los otros 10 jobs son paralelos y no importan. Atacan el camino crítico: caché de dependencias en build (−5 min) y e2e en paralelo por servicio (−10 min). El pipeline baja a 22 minutos sin tocar los jobs paralelos.

### ⚠️ Errores comunes

* Acelerar jobs paralelos en vez del camino crítico (no reduce el total).
* Grafos ilegibles por dependencias innecesarias.
* Ignorar el nodo rojo y sus dependientes (¿qué no corrió?).
* No distinguir "esperando runner" (cola) de "ejecutando" en el grafo.
* Diseñar el pipeline sin pensar en el grafo (todo secuencial por defecto).

### 📋 Lo que debes recordar

* El grafo muestra nodos (jobs), flechas (dependencias) y estados.
* El camino crítico define el tiempo mínimo del pipeline.
* Optimiza el camino crítico, no los jobs paralelos.
* El grafo es la herramienta de diagnóstico visual del pipeline.

### 🧪 Autoevaluación rápida

1. ¿Qué representan los nodos y las flechas de un grafo de pipeline?
2. ¿Qué es el camino crítico?
3. ¿Dónde debe enfocarse la optimización de tiempo?

---

1. Los nodos son los jobs con su estado; las flechas son las dependencias (\`needs\`) entre ellos.
2. La ruta más larga del grafo: la suma de sus duraciones es el tiempo mínimo de ejecución del pipeline.
3. En el camino crítico: acortar jobs paralelos no reduce el tiempo total.
`
export default content
