const content = `
## Módulo 7 — Conditional jobs

### 🎯 Objetivos de aprendizaje

* Explicar cuándo y cómo condicionar la ejecución de un job.
* Usar condiciones por rama, evento, ruta, variable y fallo.
* Escribir condiciones legibles y mantenibles.

### ❓ Problema real que resuelve

No todos los jobs deben correr siempre: el deploy solo en main, los tests de frontend solo si cambió frontend, la notificación solo si falló. Sin condiciones, el pipeline ejecuta de más (desperdicio) o de menos (deploys accidentales). Las condiciones deciden qué jobs corren en cada ejecución, adaptando el pipeline al evento.

### 💡 Analogía

Un semáforo inteligente que solo se activa cuando hay tráfico: no enciende las luces a las 3am si no pasa nadie. Las condiciones del pipeline son ese sensor: cada job evalúa su contexto (rama, evento, cambios, variables) y decide si tiene sentido ejecutarse.

### 📖 Explicación técnica

Tipos de condiciones:

* **Por rama**: solo en \`main\`, en \`release/*\`, en tags.
* **Por evento**: solo en PRs, en push, en schedules.
* **Por ruta**: solo si cambiaron ciertos archivos (\`paths\`/changes).
* **Por variable/contexto**: \`if: github.ref == 'refs/heads/main'\`, variables de entorno.
* **Por estado**: \`if: failure()\`, \`if: always()\`, \`if: cancelled()\`, \`if: success()\`.
* GitLab usa \`rules:\` (más expresivo) y \`only/except\` (legado); GitHub usa \`if:\` con expresiones \$\{{ \}\}.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job "deploy" con condición: solo main + tag
  │
  ├── ¿Evento = push a main?  → NO → job skipped
  │         └── Sí
  ├── ¿Es un tag v*?          → NO → job skipped
  │         └── Sí
  │
  ▼
Job ejecutado (deploy de la release)
\`\`\`

### 💻 Ejemplo básico

Condiciones en GitHub Actions:

\`\`\`yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - run: ./deploy.sh

  notify:
    runs-on: ubuntu-latest
    if: failure()
    steps:
      - run: ./notify.sh
\`\`\`

### 🏢 Caso de uso profesional

Un monorepo con frontend, backend y docs: el pipeline filtra por ruta — los cambios en \`frontend/\` solo disparan tests de frontend; los de \`docs/\` solo validan markdown. El deploy a producción solo corre en main con tag. Los recursos se usan solo donde se necesitan y los deploys accidentales desaparecen.

### ⚠️ Errores comunes

* Condiciones demasiado amplias: el job corre de más.
* Condiciones demasiado estrictas: el job nunca corre (y nadie lo nota hasta producción).
* Expresiones complejas ilegibles.
* Condiciones de ruta que omiten archivos compartidos.
* \`if: failure()\` mal colocado que nunca se dispara.

### 📋 Lo que debes recordar

* Condiciones: rama, evento, ruta, variable, estado.
* GitLab: rules/only; GitHub: \`if:\` con \$\{{ \}\}.
* Condiciona con intención: ni de más, ni de menos.
* Los jobs "skipped" son parte del resultado esperado, no un fallo.

### 🧪 Autoevaluación rápida

1. ¿Qué tipos de condiciones puede tener un job?
2. ¿Qué condición usarías para un job de notificación de fallo?
3. ¿Qué diferencia hay entre \`rules\` y \`if\` según la plataforma?

---

1. Por rama, por evento, por ruta de archivos, por variable/contexto y por estado de la ejecución.
2. \`if: failure()\` (GitHub) o una regla equivalente: el job corre solo cuando algo falló.
3. GitLab usa \`rules:\` (lista de condiciones con \`when\`) y \`only/except\` legado; GitHub usa \`if:\` con expresiones \$\{{ \}\}.
`
export default content
