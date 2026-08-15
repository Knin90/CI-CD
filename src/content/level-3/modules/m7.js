const content = `
## Módulo 7 — Nested structures

### 🎯 Objetivos de aprendizaje

* Construir estructuras YAML anidadas: mapas dentro de listas, listas dentro de mapas.
* Leer la jerarquía de un pipeline YAML real.
* Mantener la legibilidad en configuraciones profundas.

### ❓ Problema real que resuelve

Los pipelines reales son estructuras profundamente anidadas: el archivo es un mapa; \`jobs\` es un mapa de mapas; cada job tiene \`steps\` (lista de mapas) con condiciones, envs y acciones. Sin habilidad para leer y escribir estructuras anidadas, no se puede entender ni modificar un pipeline real — es como leer un plano arquitectónico sin saber leer sus capas.

### 💡 Analogía

Una estructura anidada es como una mochila con compartimentos: dentro hay bolsas (mapas) y dentro de las bolsas hay listas de objetos. Para encontrar algo, sigues la jerarquía: mochila → bolsa → objeto → etiqueta. El YAML del pipeline es esa mochila: cada nivel de indentación es un compartimento.

### 📖 Explicación técnica

Combinaciones posibles:

* **Mapa de mapas**: \`jobs:\` con \`test:\` como clave, cuyo valor es otro mapa.
* **Lista de mapas**: \`steps:\` con items que son mapas (\`name:\`, \`run:\`).
* **Mapa con listas**: \`strategy.matrix:\` con listas de valores.
* **Lista de listas**: menos común (ej: líneas de un script).

Reglas de lectura:

* Cada **nivel de indentación** (2 espacios) es un nivel de jerarquía.
* Las claves se leen de arriba abajo: \`jobs.test.steps[0].run\` es la ruta al comando.
* El orden de los mapas dentro de una lista importa; el orden de las claves de un mapa, no.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
workflow:                     (mapa nivel 0)
  name: CI
  on: [push]                  (lista)
  jobs:                       (mapa nivel 1)
    test:                     (mapa nivel 2)
      runs-on: ubuntu-latest
      steps:                  (lista nivel 3)
        - name: Instalar      (mapa nivel 4)
          run: npm ci
        - run: npm test

Ruta: jobs.test.steps[1].run → "npm test"
\`\`\`

### 💻 Ejemplo básico

Estructura anidada típica:

\`\`\`yaml
deploy:
  stage: deploy
  environment:
    name: production
    url: https://example.com
  variables:
    KUBE_NAMESPACE: prod
  script:
    - kubectl apply -f k8s/
    - kubectl rollout status deployment/app
  rules:
    - if: '$CI_COMMIT_TAG'
      when: manual
\`\`\`

### 🏢 Caso de uso profesional

Al revisar el pipeline de un servicio nuevo, un ingeniero lee la jerarquía: el job \`deploy\` tiene un bloque \`environment\` (mapa con nombre y URL), un bloque \`variables\` (mapa), un \`script\` (lista) y \`rules\` (lista de mapas con condiciones). Entiende el flujo en un vistazo y detecta que falta la aprobación manual en producción: agrega la regla y el PR queda listo.

### ⚠️ Errores comunes

* Indentación incorrecta que cambia la jerarquía silenciosamente.
* Anidación excesiva (8+ niveles) que destruye la legibilidad.
* No diferenciar lista de mapa en un nivel: \`- name: x\` dentro de un mapa.
* Mover bloques sin ajustar la indentación.
* Confiar en la vista "chips" de la UI sin leer el YAML real.

### 📋 Lo que debes recordar

* La indentación define la jerarquía: 2 espacios por nivel.
* Combinaciones: mapas de mapas, listas de mapas, mapas con listas.
* Lee por rutas: \`jobs.test.steps[0].run\`.
* Legibilidad: no anides más de lo necesario.

### 🧪 Autoevaluación rápida

1. ¿Qué define la jerarquía de una estructura YAML anidada?
2. Da un ejemplo de lista de mapas en un pipeline.
3. ¿Qué riesgo tiene la anidación excesiva?

---

1. La indentación (2 espacios por nivel): cada nivel es un nivel de jerarquía.
2. Los \`steps\` de un job: cada item de la lista es un mapa con \`name\`, \`run\`, \`uses\`, etc.
3. La ilegibilidad y los errores de indentación: configuraciones profundas son difíciles de revisar y propensas a errores silenciosos.
`
export default content
