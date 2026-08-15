const content = `
## Módulo 9 — Branching strategies

### 🎯 Objetivos de aprendizaje

* Comparar las estrategias de branching principales: Git Flow, GitHub Flow y Trunk-based.
* Elegir la estrategia adecuada según el equipo, el producto y la cadencia de releases.
* Entender cómo cada estrategia configura el pipeline.

### ❓ Problema real que resuelve

La estrategia de branching define cómo vive el código y cuándo se despliega. Una estrategia mal elegida genera: ramas eternas que nunca llegan a producción, releases que no se pueden reproducir o despliegues continuos bloqueados por procesos pesados. La estrategia correcta alinea el flujo de Git con la cadencia de entrega que el negocio necesita.

### 💡 Analogía

Las estrategias de branching son como modos de producción de una fábrica: producción por lotes (Git Flow: releases programadas, varias líneas en paralelo), producción continua (Trunk-based: todo fluye por una línea y se valida al instante) y producción híbrida (GitHub Flow: una línea principal y ramas cortas). Cada modo encaja con un tipo de negocio: lotes para entregas planificadas, flujo continuo para despliegue diario.

### 📖 Explicación técnica

* **Git Flow**: ramas \`main\` (producción), \`develop\` (integración), \`feature/*\` (desde develop), \`release/*\` (preparación) y \`hotfix/*\` (desde main). Robusto para releases versionadas y equipos grandes, pero pesado para despliegue continuo.
* **GitHub Flow**: una sola rama principal (\`main\`) + ramas cortas \`feature/*\` con PR. Todo cambio se despliega desde main. Simple e ideal para CI/CD continuo.
* **Trunk-based**: todos trabajan sobre \`main\` (trunk) con ramas de muy corta vida (horas/días) o commits directos con feature flags. Máxima velocidad de integración; exige CI fuerte y tests excelentes.
* La estrategia determina el pipeline: Git Flow suele desplegar por ramas \`release/*\`; GitHub Flow y Trunk despliegan con cada merge a main.
* Regla práctica: si quieres desplegar varias veces al día, usa Trunk o GitHub Flow; si tienes releases planificadas y soporte de versiones, Git Flow.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Git Flow:
  main ──●──────●──────● (producción, solo releases)
  develop ──●───●───●─── (integración)
  feature/* ──●───┘
  release/* ──●── (congelación)
  hotfix/* ──●── (urgencia desde main)

GitHub Flow:
  main ──●──●──●──● (cada merge = potencial deploy)
  feature/* ──●──┘

Trunk-based:
  main ──●──●──●──●──● (todos integran directo, flags)
\`\`\`

### 💻 Ejemplo básico

Decisión según el contexto:

\`\`\`text
¿Despliegas varias veces al día?
  ├── Sí → Trunk-based o GitHub Flow
  └── No → Git Flow con releases programadas

¿Necesitas soportar múltiples versiones en producción?
  ├── Sí → Git Flow (ramas release + hotfix por versión)
  └── No → GitHub Flow / Trunk
\`\`\`

### 🏢 Caso de uso profesional

Una plataforma SaaS adoptó Git Flow y sufría: las features vivían semanas en \`develop\`, las releases eran grandes y los despliegues estresantes. Migran a GitHub Flow con Trunk-based: ramas cortas de máximo 2 días, PR con CI completo, feature flags para trabajo en progreso. Los despliegues pasan de semanales a 10 por día, y el tiempo de commit a producción cae de 2 semanas a 40 minutos.

### ⚠️ Errores comunes

* Git Flow sin necesidad real: proceso pesado que frena CI/CD.
* Trunk-based sin CI fuerte: integrar directo sin validación rompe main.
* Mezclar estrategias sin criterio: ramas \`develop\` y \`main\` a la vez con deploys automáticos de ambas.
* Ramas largas en cualquier estrategia: el problema no es la estrategia, es no integrar.
* Proteger ramas equivocadas o no proteger la principal.

### 📋 Lo que debes recordar

* Git Flow = releases planificadas; GitHub Flow = simplicidad; Trunk = máxima integración.
* La estrategia define los triggers del pipeline.
* Despliegue frecuente → estrategias simples; releases versionadas → Git Flow.
* Cualquier estrategia falla con ramas largas y CI débil.

### 🧪 Autoevaluación rápida

1. ¿Qué ramas define Git Flow y para qué sirve cada una?
2. ¿Qué estrategia elegirías para desplegar varias veces al día?
3. ¿Qué requisito tiene Trunk-based para funcionar bien?

---

1. main (producción), develop (integración), feature/* (desarrollo desde develop), release/* (preparación de versiones) y hotfix/* (urgencias desde main).
2. GitHub Flow o Trunk-based: ambas integran rápido y despliegan con cada cambio a la rama principal.
3. CI fuerte y tests de alta calidad, porque todos integran sobre la misma línea constantemente; además feature flags para ocultar trabajo en progreso.
`
export default content
