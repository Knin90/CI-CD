const content = `
## Módulo 5 — Environment variables

### 🎯 Objetivos de aprendizaje

* Definir variables de entorno y su papel en la configuración por entorno.
* Configurar env vars en el pipeline y por entorno.
* Distinguir variables de configuración de secretos.

### ❓ Problema real que resuelve

La aplicación necesita configuración que varía por entorno (URL de API, log level, puerto) sin reconstruir el artefacto. Las variables de entorno separan configuración de código: la misma imagen se comporta distinto en dev, staging y producción según el entorno que la ejecuta.

### 💡 Analogía

Las variables de entorno son los ajustes del termostato del edificio: la caldera (app) es la misma, pero la temperatura de cada piso (entorno) se configura aparte. Si la temperatura estuviera fundida en el metal (hardcodeada), cada piso necesitaría su propia caldera.

### 📖 Explicación técnica

* **Variable de entorno**: par clave-valor disponible en el proceso (\`DATABASE_URL=postgres://...\`).
* Se definen en distintos niveles: pipeline (job/step), entorno (UI de la plataforma), plataforma de orquestación (Kubernetes ConfigMap/Secret), archivo local (\`.env\`).
* Precedencia típica: step > job > entorno > defaults.
* Acceso en pipelines: \`$VAR\` (shell), \`\${{\ vars.NAME }}\` (GitHub Actions), \`$VAR\` (GitLab), \`$(var)\` (Azure DevOps).
* **No son secretos**: las variables son visibles (logs, UI) y no deben contener claves ni tokens.
* Buenas prácticas: nombres estandarizados (\`APP_ENV\`, \`LOG_LEVEL\`, \`API_URL\`), defaults seguros, documentar el significado de cada variable, 12-factor app.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline define variable por entorno
   ↓
Runner inyecta la variable en el proceso
   ↓
La app lee $VAR en runtime
   ↓
Misma imagen + distinta config = distinto comportamiento
\`\`\`

### 🧪 Ejercicios

1. Crea una variable por entorno (dev/staging/prod) y verifica que la app la lee.
2. Documenta las variables de tu aplicación y su precedencia.
3. Identifica qué valores de tu código están hardcodeados y deberían ser variables.

### ⚠️ Errores comunes

* Poner secretos en variables de entorno normales (quedan visibles).
* Hardcodear configuración en el código (obliga a reconstruir para cambiar).
* Nombres de variables distintos entre entornos (rompe la paridad).
* No documentar variables: nadie sabe qué se puede cambiar.

### 🔗 Conexión DevOps

Las variables de entorno son la interfaz entre el pipeline y la aplicación. Combinadas con secrets (nivel 11) y configuración específica por entorno (módulo 6), permiten el principio "build once, deploy many" — el corazón de CI/CD.
`
export default content
