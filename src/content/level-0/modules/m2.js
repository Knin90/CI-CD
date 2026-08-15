const content = `
## Módulo 2 — ¿Qué es CI? Integración Continua

### 🎯 Objetivos de aprendizaje

* Definir **Integración Continua (CI)** con precisión: integrar cambios pequeños y frecuentes contra la rama principal.
* Explicar por qué "integrar temprano" reduce drásticamente el costo de los conflictos.
* Entender el papel del pipeline de CI como validador automático de cada integración.

### ❓ Problema real que resuelve

Cuando varios desarrolladores trabajan en ramas separadas durante semanas y luego intentan unir todo, la integración se convierte en un infierno: conflictos masivos, código que no compila, tests rotos y días perdidos. **CI** propone lo contrario: integrar continuamente (varias veces al día) contra la rama principal, de modo que los conflictos sean pequeños, frecuentes y fáciles de resolver. Cada integración se valida automáticamente con un pipeline; si algo falla, se detecta en minutos, no en semanas.

### 💡 Analogía

Es como mantener un documento compartido en Google Docs en lugar de que cada persona trabaje en su copia local durante un mes para luego fusionarlas. Con el documento compartido, los conflictos de edición se detectan de inmediato, se resuelven en segundos y el documento siempre refleja el estado real. CI es eso, pero para código: todos integran sobre la misma base, constantemente.

### 📖 Explicación técnica

* **Integración Continua**: práctica de desarrollo donde cada desarrollador integra sus cambios en la rama principal (o trunk) al menos una vez al día, idealmente varias veces.
* Cada integración dispara automáticamente un **pipeline de CI**: clona el código, instala dependencias, compila, ejecuta tests unitarios e integración, análisis estático y genera reportes.
* El objetivo: que la rama principal esté **siempre en estado desplegable** ("green").
* Se basa en **commits pequeños y frecuentes**: un commit que cambia 20 archivos es difícil de revisar y de integrar; diez commits pequeños son triviales.
* El pipeline de CI actúa como **guardián**: el código solo se acepta si todas las validaciones pasan.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Developer
  │
  ▼
git commit + git push
  │
  ▼
CI detecta el evento (trigger)
  │
  ▼
Clone del repositorio
  │
  ▼
Instalar dependencias
  │
  ▼
Compilar / build
  │
  ▼
Ejecutar tests
  │
  ▼
Analizar calidad y seguridad
  │
  ▼
¿Todo OK? → verde → listo para continuar
  │
  ▼ (si algo falla)
Rojo → el desarrollador recibe feedback inmediato
\`\`\`

### 💻 Ejemplo básico

Un pipeline mínimo de CI en YAML (GitHub Actions) que valida cada push a la rama principal:

\`\`\`yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
\`\`\`

Con esto, cada integración queda validada por lint, tests y build sin intervención humana.

### 🏢 Caso de uso profesional

Un equipo de 8 desarrolladores en un monorepo: antes de CI, las ramas vivían 2 semanas y la fusión a main requería un día completo de arreglos. Con CI, cada PR dispara el pipeline completo en ~6 minutos; el código solo entra a main en verde, y los conflictos se resuelven en minutos porque las ramas rara vez duran más de un día.

### ⚠️ Errores comunes

* Integrar sin pipeline: "integramos seguido" pero nadie valida automáticamente.
* Commits gigantes que hacen inútil el feedback del CI.
* Ignorar el pipeline en rojo: el CI deja de ser guardián y pasa a ser ruido.
* Tests flaky (inestables) que rompen el pipeline por azar y erosionan la confianza del equipo.

### 📋 Lo que debes recordar

* CI = integrar cambios **pequeños y frecuentes** contra la rama principal.
* Cada integración se valida automáticamente con un pipeline.
* La rama principal debe estar siempre en verde (desplegable).
* CI detecta problemas en **minutos**, no en semanas.

### 🧪 Autoevaluación rápida

1. ¿Qué significa exactamente "integrar continuamente"?
2. ¿Qué papel juega el pipeline en la práctica de CI?
3. ¿Por qué los commits pequeños mejoran la integración continua?

---

1. Integrar los cambios de cada desarrollador contra la rama principal de forma frecuente (al menos una vez al día), en lugar de fusionar ramas largas al final.
2. El pipeline valida automáticamente cada integración (build, tests, análisis) y actúa como guardián que solo deja pasar código en verde.
3. Porque los conflictos se detectan temprano, son pequeños y fáciles de resolver, y el feedback del pipeline es inmediato y accionable.
`
export default content
