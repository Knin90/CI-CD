const content = `
## Módulo 1 — Pipeline as Code

### 🎯 Objetivos de aprendizaje

* Definir Pipeline as Code y sus ventajas.
* Versionar, revisar y probar el pipeline como código.
* Tratar el pipeline con la misma disciplina que la app.

### ❓ Problema real que resuelve

Cuando el pipeline se configura "a clic" en una UI, nadie sabe qué hay, quién lo cambió ni por qué — y los cambios no se pueden revisar ni probar. Pipeline as Code define el pipeline en archivos versionados (YAML, Jenkinsfile, código), igual que la aplicación: con revisiones, tests y trazabilidad. Resuelve el CI/CD invisible y no reproducido.

### 💡 Analogía

Pipeline as Code es la receta escrita del restaurante en vez de la cocina "de memoria": si la receta (pipeline) está en un cuaderno versionado (repo), cualquiera puede revisarla (PR), probarla (tests del pipeline) y saber qué cambió (git history). Un cocinero que prepara el plato "como siempre lo hizo" sin receta no se puede auditar ni mejorar.

### 📖 Explicación técnica

* **Pipeline as Code**: el pipeline vive en el repo como código (GitHub Actions \`.github/workflows/\`, GitLab \`.gitlab-ci.yml\`, Jenkinsfile, \`azure-pipelines.yml\`, Tekton/Argo — nivel 21).
* Ventajas:
  * **Versionado**: el pipeline cambia con el código; cada commit sabe qué pipeline usó (nivel 1).
  * **Revisión**: los cambios al pipeline pasan por PR con revisión (nivel 14 de este nivel).
  * **Tests**: el pipeline se puede validar (lint, syntax check — nivel 20), probar (nivel 20) y auditar.
  * **Trazabilidad**: git blame, historial, rollback del pipeline (nivel 1 y 18).
  * **Reproducibilidad**: el mismo archivo produce el mismo pipeline (nivel 19 de este nivel).
* Buenas prácticas: configuración explícita y declarativa (nivel 4 de este nivel), sin secretos en el archivo (nivel 11), pipelines pequeños y reutilizables (niveles 3-4 de este nivel), y el pipeline como "código de primera clase" (revisado, testeado, documentado — nivel 19 de este nivel).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline definido en el repo (archivo versionado)
   ↓
Cambio propuesto → PR con revisión
   ↓
Validación del pipeline (lint, syntax, tests)
   ↓
Merge → el pipeline del repo se activa
   ↓
Cada commit sabe qué pipeline usó
   ↓
Git history: quién, qué y por qué cambió
\`\`\`

### 🧪 Ejercicios

1. Convierte un pipeline configurado por UI a Pipeline as Code.
2. Revisa el historial de cambios de tu pipeline: ¿qué cambió y por qué?
3. Añade una validación de sintaxis del pipeline en el propio CI.

### ⚠️ Errores comunes

* Pipeline en la UI sin versionar (nadie sabe qué hay — nivel 20).
* Cambios al pipeline sin revisión (rompen el CI sin aviso).
* Secretos en el archivo del pipeline (nivel 11).
* Pipeline gigante que no se puede probar (niveles 4 y 20 de este nivel).

### 🔗 Conexión DevOps

Pipeline as Code es la base de las buenas prácticas: conecta Git (nivel 1), testing de pipelines (nivel 20), DRY y reutilización (módulos 2-3), y la revisión de código (módulo 14). Es el "tratamiento justo" del pipeline: código, no configuración misteriosa.
`
export default content
