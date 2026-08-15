const content = `
## Módulo 12 — Job outputs

### 🎯 Objetivos de aprendizaje

* Definir y publicar outputs de un job.
* Consumir outputs en jobs dependientes y en la UI.
* Usar outputs para decisiones del pipeline.

### ❓ Problema real que resuelve

Los jobs producen valores útiles para otros: la versión calculada, la URL del deploy, el nombre del artefacto, el resultado de un análisis. Los **outputs** son el canal para pasar esos valores a los jobs dependientes, a las notificaciones y al contexto del pipeline — sin archivos intermedios.

### 💡 Analogía

Los outputs son las notas que un operario deja al siguiente: "pieza lista, medida 42cm, siguiente paso en el horno 2". El siguiente operario (job) lee la nota (output) y actúa en consecuencia. Sin notas, cada operario tendría que medir de nuevo.

### 📖 Explicación técnica

* **Outputs de job**: valores publicados por un job y accesibles a los que lo necesitan.
* GitHub Actions: \`outputs:\` en la definición del job + \`echo "key=value" >> "$GITHUB_OUTPUT"\` en el step; consumo: \`\${{ needs.build.outputs.version }}\`.
* GitLab: variables de salida con \`dotenv\` (\`artifacts: reports: dotenv:\`) o \`ci_job_token\`.
* Azure: \`setVariable\` con \`isOutput=true\`; consumo \`\$[ dependencies.job.outputs['key'] ]\`.
* Uso: versiones calculadas, hashes, URLs de despliegue, resultados de análisis, decisiones (¿desplegar? ¿publicar?).
* Límites: los outputs son strings; para datos grandes, artefactos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job "semver"
  ├── Calcula la versión (1.4.0)
  └── Publica output: version=1.4.0
        │
        ▼
Job "release" (needs: semver)
  ├── Lee \${{ needs.semver.outputs.version }}
  └── Taggea v1.4.0 + publica app:v1.4.0
\`\`\`

### 💻 Ejemplo básico

Outputs en GitHub Actions:

\`\`\`yaml
semver:
  runs-on: ubuntu-latest
  outputs:
    version: \${{ steps.v.outputs.val }}
  steps:
    - id: v
      run: echo "val=v1.4.0" >> "\$GITHUB_OUTPUT"

release:
  runs-on: ubuntu-latest
  needs: [semver]
  steps:
    - run: echo "Publicando \${{\\ needs.semver.outputs.version }}"
    - run: ./publish.sh --version \${{\\ needs.semver.outputs.version }}
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline de release calcula la versión en un job (según Conventional Commits), publica el output, y los jobs de changelog, taggeo y despliegue consumen el mismo valor. La versión se calcula **una vez** y viaja por todo el pipeline: imposible que changelog, tag e imagen discrepen.

### ⚠️ Errores comunes

* Olvidar declarar el output en la definición del job (\`outputs:\`).
* Consumir outputs de jobs no listados en \`needs\`.
* Outputs gigantes o con formato raro (usar JSON solo si la plataforma lo soporta).
* Confundir outputs de step con outputs de job.
* Depender de outputs en lugar de artefactos para datos grandes.

### 📋 Lo que debes recordar

* Output = valor publicado por un job para sus dependientes.
* Declarar en el job + escribir en el step + leer con \`needs.<job>.outputs.<key>\`.
* Calcula una vez, reutiliza en todo el pipeline.
* Para datos grandes usa artefactos, no outputs.

### 🧪 Autoevaluación rápida

1. ¿Cómo se publica un output en GitHub Actions?
2. ¿Cómo se consume en un job dependiente?
3. ¿Cuándo usar outputs y cuándo artefactos?

---

1. Declarando \`outputs:\` en el job y escribiendo el valor con \`echo "key=value" >> "$GITHUB_OUTPUT"\` en un step con \`id\`.
2. Con \`needs.<job>.outputs.<key>\` dentro de las expresiones del workflow.
3. Outputs para valores pequeños (versiones, URLs, decisiones); artefactos para archivos y datos grandes.
`
export default content
