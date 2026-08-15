const content = `
## Módulo 6 — Dependencies

### 🎯 Objetivos de aprendizaje

* Explicar las dependencias entre jobs, stages y pipelines.
* Declarar dependencias correctamente (\`needs\`, \`depends_on\`).
* Entender el grafo de dependencias como el plan de ejecución.

### ❓ Problema real que resuelve

Algunos jobs necesitan el resultado de otros: no puedes publicar la imagen sin haberla construido, ni desplegar sin haber probado. Las dependencias definen ese orden y permiten que los jobs **independientes** corran en paralelo. Sin dependencias bien declaradas, el pipeline corre en un orden arbitrario o todo en secuencia, desperdiciando tiempo.

### 💡 Analogía

Es como preparar una cena con varios cocineros: la salsa no se puede servir sin que el tomate esté listo (dependencia), pero la ensalada y el postre se pueden hacer en paralelo (independencia). El jefe de cocina (orquestador) conoce el grafo: qué plato espera a cuál y qué se cocina a la vez.

### 📖 Explicación técnica

* Las dependencias forman un **grafo dirigido**: nodos = jobs, flechas = "debe terminar antes".
* \`needs\` (GitHub Actions, GitLab) o \`depends_on\` (Jenkins, Azure) declaran las dependencias de un job.
* Beneficios:
  * **Orden correcto**: los jobs se ejecutan cuando sus inputs están listos.
  * **Paralelismo**: los jobs sin dependencias corren a la vez.
  * **Eficiencia**: no se espera toda la stage si el job solo necesita un job concreto.
* Tipos de dependencia:
  * Entre **jobs** (\`needs\`): el más granular.
  * Entre **stages**: secuencia implícita por defecto.
  * Entre **pipelines** (multi-proyecto): un pipeline espera el resultado de otro (\`workflow_run\`, \`trigger\`).
* Dependencias condicionales: pasar variables o artefactos entre jobs dependientes (\`needs.<id>.outputs\`).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
         lint ───┐
                 ▼
checkout ──► build ──► unit ──► package ──► deploy
                 ▲
         sast ───┘

  lint y sast corren en paralelo (independientes)
  build espera lint y sast
  unit espera build
  package espera unit
  deploy espera package
\`\`\`

### 💻 Ejemplo básico

Dependencias con needs y salidas (GitHub Actions):

\`\`\`yaml
jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      version: \${{ steps.semver.outputs.version }}
    steps:
      - id: semver
        run: echo "version=1.2.0" >> "\$GITHUB_OUTPUT"

  deploy:
    runs-on: ubuntu-latest
    needs: [build]
    steps:
      - run: echo "Desplegando \${{ needs.build.outputs.version }}"
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline de 12 jobs en un monorepo: los jobs de lint y tests por servicio son independientes y corren en paralelo (6 minutos totales en vez de 30 secuenciales); el job de build del monorepo espera a los tests de los servicios que lo importan (\`needs\`); el deploy espera el build y la firma. El grafo de dependencias optimiza el tiempo sin sacrificar el orden lógico.

### ⚠️ Errores comunes

* Dependencias mal declaradas: jobs que corren antes de tiempo y fallan.
* Dependencias circulares: el pipeline no puede planificar la ejecución.
* Ignorar el paralelismo: todo en secuencia por defecto.
* Dependencias con \`needs\` pero consumiendo artefactos de jobs no listados.
* Pipelines multi-proyecto sin gestionar dependencias entre repositorios.

### 📋 Lo que debes recordar

* Las dependencias forman un grafo de ejecución.
* \`needs\`/dependencias permiten orden + paralelismo.
* Los jobs independientes corren en paralelo.
* Las salidas (\`outputs\`) pasan datos entre jobs dependientes.

### 🧪 Autoevaluación rápida

1. ¿Qué define el grafo de dependencias de un pipeline?
2. ¿Qué beneficio aporta declarar dependencias a nivel de job (\`needs\`)?
3. ¿Qué sucede con una dependencia circular?

---

1. El orden de ejecución: qué jobs deben terminar antes de que otros comiencen, y cuáles pueden correr en paralelo.
2. Granularidad y eficiencia: un job espera solo a sus dependencias reales, no a toda la stage; los independientes corren a la vez.
3. El pipeline no puede planificar la ejecución: es un error de configuración que impide ejecutar los jobs involucrados.
`
export default content
