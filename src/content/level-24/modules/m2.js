const content = `
## Módulo 2 — Fase 1: Repositorio, estrategia de branches y Pull Requests

### 🎯 Objetivos de aprendizaje

* Crear el repositorio con estructura limpia.
* Definir la estrategia de branches y protección.
* Establecer el flujo de PR con revisión.

### ❓ Problema real que resuelve

Toda la plataforma CI/CD se apoya en Git: sin un repositorio bien organizado, una estrategia de branches clara y PR protegidos (niveles 1 y 23), el pipeline construye sobre arena. La Fase 1 prepara el terreno: el repo, las ramas, las reglas y el flujo de trabajo que todo lo demás usa.

### 💡 Analogía

La Fase 1 es la cimentación del edificio: el terreno nivelado (repo limpio), los ejes marcados (estrategia de branches) y las vallas de seguridad (protección de ramas). Nadie construye los pisos (pipeline, despliegues) antes de la cimentación — si la base está torcida, todo el edificio lo está.

### 📖 Explicación técnica

* **Repositorio** (nivel 1): estructura clara: código, tests, \`Dockerfile\`, IaC (\`terraform/\`), config (\`ansible/\`), manifests (\`k8s/\`), \`.github/workflows/\`, documentación (\`README.md\`, \`docs/\` — nivel 23).
* **Estrategia de branches** (nivel 1): \`main\` protegida como rama de producción; ramas de feature por tarea; integración frecuente (nivel 13 de 23).
* **Protección de ramas** (nivel 13 de 23): push directo a main bloqueado, PR requerido, revisión obligatoria, checks requeridos (los del pipeline que construirás en la Fase 2).
* **Flujo de PR** (nivel 14 de 23): feature branch → PR → CI corre los checks → revisión → merge → main desencadena el deploy.
* Buenas prácticas: \`.gitignore\` correcto (sin \`node_modules\`, sin \`.env\` — nivel 11), convenciones de nombres, y un README que explique cómo correr el proyecto (nivel 19 de 23).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Repo creado con estructura limpia
   ↓
main protegida + ramas de feature
   ↓
PR: feature → main
   ↓
CI corre los checks (Fase 2)
   ↓
Revisión aprobada
   ↓
Merge → main estable
   ↓
main desencadena el despliegue
\`\`\`

### 🧪 Ejercicios

1. Crea el repositorio con la estructura del proyecto (carpetas y archivos base).
2. Activa la protección de main: push bloqueado, PR + revisión + checks.
3. Haz un PR real de una primera mejora (README, estructura) y mézclalo.

### ⚠️ Errores comunes

* Push directo a main (sin protección — nivel 13 de 23).
* Repo desordenado (todo en la raíz — nivel 23).
* \`.env\` o secretos commiteados (nivel 11).
* Estrategia de branches improvisada (cada quien mergea como quiere — nivel 1).

### 🔗 Conexión DevOps

La Fase 1 conecta con Git (nivel 1), branch protection (nivel 13 de 23), code review (nivel 14 de 23) y Pipeline as Code (nivel 23). Es la base: el flujo de trabajo que el pipeline va a proteger y acelerar.
`
export default content
