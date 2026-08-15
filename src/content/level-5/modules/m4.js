const content = `
## Módulo 4 — Job dependencies

### 🎯 Objetivos de aprendizaje

* Declarar dependencias entre jobs con \`needs\`.
* Pasar salidas y artefactos entre jobs dependientes.
* Construir grafos de ejecución eficientes.

### ❓ Problema real que resuelve

Los jobs se relacionan: el deploy necesita el build, los tests necesitan el artefacto del build, la firma necesita el binario. Sin dependencias declaradas, el orden es arbitrario (o todo secuencial). Las dependencias expresan el grafo real del trabajo: qué job espera a cuál, qué datos pasan entre ellos — y el orquestador optimiza la ejecución respetando ese grafo.

### 💡 Analogía

En una obra, el electricista no puede trabajar hasta que el albañil termine las paredes (dependencia), pero el plomero y el electricista pueden trabajar en paralelo (independencia). El jefe de obra (orquestador) conoce el grafo de dependencias y coordina los oficios para que nada se pise y nada espere de más.

### 📖 Explicación técnica

* \`needs\` (GitHub, GitLab) / \`dependsOn\` (Azure, Jenkins): lista de jobs que deben completarse con éxito antes.
* Sin \`needs\`, el orden lo da la **stage**: todos los jobs de la stage anterior deben terminar. Con \`needs\`, el job puede correr en cuanto sus dependencias específicas terminan — sin esperar al resto de la stage.
* Pasar datos:
  * **Salidas** (\`outputs\`): valores simples del job (\`needs.build.outputs.version\`).
  * **Artefactos**: archivos publicados por el job dependiente.
* El grafo de dependencias debe ser **acíclico** (sin ciclos).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
        lint ──┐
              ▼
build ──► unit ──► package ──► deploy
  ▲        ▲
  │        │
sast ──────┘ (espera lint + sast)

- build espera lint y sast (no toda la stage)
- unit espera build
- package espera unit
- deploy espera package
\`\`\`

### 💻 Ejemplo básico

Needs con salidas (GitHub Actions):

\`\`\`yaml
build:
  runs-on: ubuntu-latest
  outputs:
    version: \${{ steps.v.outputs.val }}
  steps:
    - id: v
      run: echo "val=1.4.0" >> "\$GITHUB_OUTPUT"

deploy:
  runs-on: ubuntu-latest
  needs: [build]
  steps:
    - run: echo "Desplegando \${{\\ needs.build.outputs.version }}"
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline de monorepo con 30 servicios: los jobs de tests por servicio son independientes y corren en paralelo; el job de "build completo" depende solo de los tests de los servicios que importa; el deploy depende del build y de la firma. El grafo expresa la realidad del proyecto y el pipeline ejecuta en 12 minutos lo que antes (todo secuencial) tardaba 45.

### ⚠️ Errores comunes

* No declarar dependencias: jobs que corren sin sus inputs.
* Dependencias circulares: el grafo no se puede planificar.
* Consumir salidas de jobs no listados en \`needs\`.
* Depender de toda la stage por inercia (perder el paralelismo de \`needs\`).
* Jobs que esperan inputs pero no declaran artefactos.

### 📋 Lo que debes recordar

* \`needs\` declara qué jobs deben terminar antes.
* \`needs\` permite avanzar sin esperar toda la stage.
* Salidas y artefactos pasan datos entre dependencias.
* Grafo acíclico obligatorio.

### 🧪 Autoevaluación rápida

1. ¿Qué ventaja da \`needs\` frente a esperar toda la stage?
2. ¿Cómo se pasa un valor simple de un job a otro?
3. ¿Qué sucede con una dependencia circular?

---

1. Eficiencia: el job corre en cuanto sus dependencias específicas terminan, sin esperar al resto de los jobs de la stage anterior.
2. Con \`outputs\` del job que produce y \`needs.<id>.outputs.<clave>\` del job que consume.
3. El grafo no se puede planificar: es un error de configuración que impide ejecutar los jobs involucrados.
`
export default content
