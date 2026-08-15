const content = `
## Módulo 2 — Branches

### 🎯 Objetivos de aprendizaje

* Explicar qué es una rama en Git y por qué son baratas.
* Describir las ramas típicas de un repositorio y su ciclo de vida.
* Entender cómo las ramas alimentan los triggers del pipeline.

### ❓ Problema real que resuelve

Sin ramas, todos los cambios se mezclan en una sola línea de historia: no hay forma de aislar un trabajo en curso, probarlo o descartarlo. Las ramas permiten que varios desarrolladores trabajen en paralelo sobre el mismo repositorio sin pisarse, y que cada línea de trabajo tenga su propio ciclo de validación (el pipeline corre sobre la rama antes de integrarla).

### 💡 Analogía

Las ramas son carriles de una autopista: todos llevan al mismo destino (main), pero cada conductor (desarrollador) avanza a su ritmo sin bloquear a los demás, y se incorpora al carril principal cuando está seguro de llegar. Sin carriles, un coche lento detendría a todo el tráfico.

### 📖 Explicación técnica

* Una **rama** es un puntero móvil a un commit; crear una cuesta casi nada (un puntero).
* \`main\` (o \`master\`) es la rama principal, el estado estable y desplegable.
* Ramas típicas:
  * **feature/**: nueva funcionalidad (\`feature/pago-tarjeta\`).
  * **fix/**: corrección de bugs (\`fix/login-timeout\`).
  * **chore/**: tareas de mantenimiento (\`chore/actualizar-deps\`).
  * **release/**: preparación de versiones (\`release/v1.4.0\`).
  * **hotfix/**: correcciones urgentes de producción.
* Las ramas son **efímeras**: viven lo que dura el trabajo y se borran al mergear.
* En CI/CD, cada rama puede tener triggers distintos: los PRs corren el pipeline completo; los push a \`release/*\` pueden disparar deploys específicos; los push a \`main\` disparan el despliegue.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
main ──●────●────●────────────●──── (estable, verde)
         \\          \\        /
feature/x └─●─●───┐   \\      /
                   └─●─┐    /    ← PR → CI → merge
                       └─●─┘
hotfix/main ──●── (urgencia, sale de main)

Triggers:
  push a feature/*  → CI en el PR
  push a main       → CI + CD (deploy)
  tag v*            → release
\`\`\`

### 💻 Ejemplo básico

Gestión básica de ramas:

\`\`\`bash
git branch                    # listar ramas
git checkout -b feature/nueva  # crear y cambiar
git push -u origin feature/nueva
git branch -d feature/nueva    # borrar tras mergear
\`\`\`

### 🏢 Caso de uso profesional

Un equipo define su convención de ramas: \`feature/*\` para desarrollo (CI de PR), \`release/*\` para congelar y preparar versiones (CI + deploy a staging), \`hotfix/*\` para urgencias (CI rápido + deploy directo a producción con aprobación). Los triggers del pipeline se configuran por patrón de rama, así cada tipo de trabajo recibe exactamente el nivel de validación que necesita.

### ⚠️ Errores comunes

* Ramas eternas que se alejan de main: integración dolorosa.
* Commits directos a main: se pierde la validación del PR.
* No borrar ramas mergeadas: el repo se llena de basura.
* Convenciones inconsistentes (una rama "fix", otra "hotfix" para lo mismo).
* Triggers mal configurados: el pipeline no corre en la rama equivocada o corre de más.

### 📋 Lo que debes recordar

* Las ramas son punteros baratos que aíslan el trabajo en curso.
* \`main\` siempre estable y desplegable; las demás ramas son efímeras.
* Los patrones de rama definen los triggers del pipeline.
* Convención de nombres consistente: feature/fix/chore/release/hotfix.

### 🧪 Autoevaluación rápida

1. ¿Por qué las ramas en Git son baratas?
2. ¿Qué patrón de rama usarías para una corrección urgente de producción?
3. ¿Cómo influye el patrón de rama en los triggers del pipeline?

---

1. Porque una rama es solo un puntero a un commit: crearla no copia el código ni ocupa espacio, es instantáneo.
2. \`hotfix/*\`: sale de main, contiene solo la corrección mínima y se mergea de vuelta con urgencia.
3. El pipeline se configura para dispararse según el patrón: PRs de feature/* corren CI; push a main dispara CI+CD; tags v* disparan releases; así cada tipo de trabajo recibe su nivel de validación.
`
export default content
