const content = `
## Módulo 1 — Development

### 🎯 Objetivos de aprendizaje

* Definir el entorno de desarrollo y su propósito en CI/CD.
* Configurar despliegues automáticos a desarrollo.
* Usar el entorno dev para feedback rápido y validación temprana.

### ❓ Problema real que resuelve

Cada cambio necesita un lugar donde ejecutarse y validarse sin riesgo. El entorno de desarrollo es el primer destino del pipeline: barato, automático y sin aprobaciones. Sin él, los desarrolladores probarían en local o —peor— directamente en staging, retrasando la detección de problemas de integración.

### 💡 Analogía

Development es el taller del mecánico: ahí se prueba cada pieza antes de montarla en el coche. Nadie lleva una pieza sin probar directo al circuito de carreras (producción). El taller está siempre abierto y equivocarse ahí no cuesta caro.

### 📖 Explicación técnica

* **Entorno de desarrollo**: instancia donde el último commit de la rama principal (o cada PR) se despliega automáticamente.
* Características: sin approvals, datos sintéticos, recursos mínimos, logs verbosos, recarga rápida.
* En CI/CD: job de deploy a dev tras pasar tests; puede usar la misma imagen que producción (build once).
* Variantes: preview environments por PR (GitHub Codespaces, GitLab Review Apps, Vercel).
* El objetivo no es "parecerse a producción" sino **detectar rápido**: por eso se prioriza velocidad y feedback.
* Buenas prácticas: auto-deploy de main, teardown de previews, datos anonimizados, monitoring básico.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Commit en main
   ↓
CI (lint + tests) OK
   ↓
Build imagen
   ↓
Deploy automático a DEV
   ↓
Health check
   ↓
Feedback al equipo
\`\`\`

### 🧪 Ejercicios

1. Configura un pipeline que despliegue automáticamente a dev tras el merge a main.
2. Crea un preview environment que se levante en cada pull request y se destruya al cerrarla.
3. Documenta qué datos usa dev (sintéticos) y cómo se regeneran.

### ⚠️ Errores comunes

* Usar producción como entorno de pruebas "porque no hay más".
* Dejar previews corriendo para siempre (costo y confusión).
* Hardcodear URLs de dev en el código en lugar de usar variables.
* Desplegar a dev manualmente en vez de automáticamente.

### 🔗 Conexión DevOps

Development es el primer eslabón del flujo de entornos y el que más feedback genera por despliegue. Dominarlo hace que el resto del pipeline (staging, producción) reciba solo código ya validado en un entorno real.
`
export default content
