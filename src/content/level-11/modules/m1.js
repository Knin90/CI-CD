const content = `
## Módulo 1 — Environment variables

### 🎯 Objetivos de aprendizaje

* Definir variables de entorno y su papel en la configuración.
* Configurar env vars en el pipeline y por entorno.
* Distinguir variables de configuración de secretos.

### ❓ Problema real que resuelve

La aplicación necesita configuración que varía por entorno (URL de la API, log level, puerto) y que no debe estar hardcodeada en el código. Las variables de entorno separan la configuración del código: el mismo artefacto se configura distinto en dev, staging y producción — sin reconstruir.

### 💡 Analogía

Las variables de entorno son como los ajustes del termostato del edificio: la caldera (app) es la misma, pero la temperatura de cada piso (entorno) se configura aparte. Si la temperatura estuviera fundida en el metal de la caldera (hardcodeada), cada piso necesitaría una caldera distinta.

### 📖 Explicación técnica

* **Variable de entorno**: par clave-valor disponible en el proceso (\`DATABASE_URL=postgres://...\`).
* Se definen: en el pipeline (a nivel de job o step), en el entorno (UI, Kubernetes ConfigMap/Secret), en el archivo \`.env\` local.
* Precedencia: step > job > entorno > defaults.
* Acceso en el pipeline: \`$VAR\` (shell), \`\${{\\ vars.NAME }}\` (GitHub), \`\$(var)\` (Azure), \`\$VAR\` (GitLab).
* **No son secretos**: las variables son visibles (logs, UI); los datos sensibles van en el gestor de secretos.
* Buenas prácticas: \`NODE_ENV\`, \`LOG_LEVEL\`, URLs — configuración no sensible por variables; claves/tokens por secretos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline define:
  LOG_LEVEL=debug (staging) / warn (prod)
  API_URL=https://api.staging... / https://api...
  │
  ▼
Job inyecta las variables al proceso de la app
  │
  ▼
La app lee: process.env.LOG_LEVEL / os.environ["API_URL"]
  │
  ▼
Mismo artefacto, configuración distinta por entorno
\`\`\`

### 💻 Ejemplo básico

Variables en el pipeline (GitHub Actions):

\`\`\`yaml
jobs:
  test:
    runs-on: ubuntu-latest
    env:
      NODE_ENV: test
      API_URL: https://staging.example.com
    steps:
      - run: npm test
      - run: echo "Entorno: \$NODE_ENV"
\`\`\`

### 🏢 Caso de uso profesional

Un equipo despliega la misma imagen en staging y producción: la única diferencia son las variables de entorno (URLs, log level, feature flags). Cambiar la configuración de un entorno NO requiere rebuild: se actualiza la variable y se re-despliega. La separación config/código hace los despliegues triviales.

### ⚠️ Errores comunes

* Hardcodear config en el código (reconstruir para cambiar config).
* Guardar secretos en variables (visibles en logs).
* Variables sin nombre consistente entre entornos.
* Precedencia ignorada (una variable pisada por otra).
* Archivos .env commiteados (¡nunca!).

### 📋 Lo que debes recordar

* Env vars = configuración externa al artefacto.
* Mismo artefacto, config distinta por entorno.
* Variables ≠ secretos: lo sensible va al gestor.
* Nunca commitees .env.

### 🧪 Autoevaluación rápida

1. ¿Qué problema resuelven las variables de entorno?
2. ¿Cómo se accede a una variable en el pipeline?
3. ¿Por qué los secretos no deben ir en variables normales?

---

1. Separar la configuración del código: el mismo artefacto se configura distinto en cada entorno sin reconstruir.
2. Con \`$VAR\` en shell, \`\${{\\ vars.NAME }}\` en GitHub o \`\$(var)\` en Azure, según la plataforma.
3. Porque las variables son visibles (logs, UI) y no están cifradas; los secretos requieren almacenamiento protegido y masking.
`
export default content
