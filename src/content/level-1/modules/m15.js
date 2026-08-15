const content = `
## Módulo 15 — Git hooks

### 🎯 Objetivos de aprendizaje

* Explicar qué son los hooks de Git y en qué momentos se ejecutan.
* Usar hooks para mover validaciones a la izquierda (pre-commit, pre-push).
* Entender los límites de los hooks locales frente al CI.

### ❓ Problema real que resuelve

El CI valida en el servidor, pero su feedback llega después del push. Muchos errores básicos (sintaxis, estilo, secretos) se pueden detectar **antes** de pushear, en la máquina del desarrollador: eso es Shift Left aplicado a Git. Los hooks locales capturan errores en el momento en que son más baratos, ahorrando ejecuciones de CI y commits "de prueba".

### 💡 Analogía

Un hook es como el espejo y el cinturón antes de salir de casa: el espejo (pre-commit) te deja arreglar el aspecto antes de salir; el cinturón (pre-push) te retiene si no lo llevas. Puedes salir despeinado (push sin validar) y que te lo digan en la calle (CI), pero es mucho más cómodo arreglarlo en casa.

### 📖 Explicación técnica

* Los **hooks** son scripts que Git ejecuta automáticamente en momentos del ciclo de vida: \`pre-commit\`, \`pre-push\`, \`commit-msg\`, \`post-merge\`, etc.
* Hook \`pre-commit\`: antes de crear el commit. Ideal para lint, format, verificación de secretos y tests rápidos. Si el script sale con código ≠ 0, el commit se aborta.
* Hook \`commit-msg\`: valida el formato del mensaje (Conventional Commits).
* Hook \`pre-push\`: antes de subir. Ideal para tests más pesados o validaciones que no quieres romper en CI.
* **Límites**: los hooks viven en \`.git/hooks/\` (local, por desarrollador); no se comparten con \`git clone\`. Para compartirlos se usan herramientas como **Husky** (npm), \`pre-commit\` (Python) o carpetas versionadas con scripts de instalación.
* El CI sigue siendo la **autoridad**: los hooks locales se pueden saltar (\`--no-verify\`); el CI no.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
git commit
  │
  ▼
pre-commit (lint, format, secretos, tests rápidos)
  ├── falla → commit abortado (arreglar antes)
  └── ok → commit creado
  │
  ▼
commit-msg (valida el formato del mensaje)
  │
  ▼
git push
  │
  ▼
pre-push (tests más pesados)
  ├── falla → push abortado
  └── ok → push
  │
  ▼
CI en el servidor (autoridad final)
\`\`\`

### 💻 Ejemplo básico

Hook pre-commit con Husky (Node):

\`\`\`json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm run format:check",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
\`\`\`

O un hook directo en \`.git/hooks/pre-commit\`:

\`\`\`bash
#!/bin/sh
# Aborta el commit si hay secretos o archivos generados
if git diff --cached --name-only | grep -E "(\.env|node_modules/)"; then
  echo "No se pueden commitear archivos sensibles"
  exit 1
fi
\`\`\`

### 🏢 Caso de uso profesional

Un equipo sufre porque los desarrolladores commitean \`.env\` con secretos y los pushes rompen CI por errores de formato. Configuran Husky: pre-commit corre lint + formato + detección de secretos, y commit-msg valida Conventional Commits. En dos semanas, los commits "sucios" desaparecen y las ejecuciones de CI fallidas por estilo caen a cero.

### ⚠️ Errores comunes

* Confiar en los hooks como única validación (se pueden saltar con \`--no-verify\`).
* Hooks lentos que el equipo termina saltándose.
* Hooks sin compartir: cada desarrollador tiene los suyos.
* Hooks que modifican archivos sin avisar (format automático sorpresa).
* Depender de hooks que exigen herramientas no instaladas en todos.

### 📋 Lo que debes recordar

* Los hooks ejecutan scripts en momentos del ciclo de Git.
* pre-commit y pre-push mueven validaciones a la izquierda.
* Los hooks locales se pueden saltar; el CI es la autoridad final.
* Compartir hooks con Husky/pre-commit para que todo el equipo los use.

### 🧪 Autoevaluación rápida

1. ¿Qué hace el hook pre-commit y qué sucede si falla?
2. ¿Por qué los hooks locales no reemplazan al CI?
3. ¿Cómo se comparten los hooks entre el equipo?

---

1. Se ejecuta antes de crear el commit: corre lint, formato y validaciones rápidas; si el script sale con código de error, el commit se aborta.
2. Porque viven en la máquina de cada desarrollador y se pueden saltar con \`--no-verify\`; el CI se ejecuta en el servidor y no se puede eludir.
3. Versionando los scripts y usando herramientas como Husky (npm) o pre-commit (Python) que los instalan automáticamente en cada clon.
`
export default content
