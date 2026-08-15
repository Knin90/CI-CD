const content = `
## Módulo 1 — ¿Qué es DevOps?

### 🎯 Objetivos de aprendizaje

* Definir **DevOps** como cultura, práctica y conjunto de herramientas, no como un cargo.
* Explicar el problema que DevOps resuelve: el conflicto histórico entre desarrollo y operaciones.
* Comprender por qué CI/CD es la expresión técnica más concreta de la cultura DevOps.

### ❓ Problema real que resuelve

Durante décadas, desarrollo y operaciones trabajaron en silos con objetivos opuestos: el equipo de desarrollo quería **cambiar** el sistema constantemente (nuevas features, correcciones), mientras que operaciones quería **estabilidad** (nada se rompe en producción). El resultado era un "muro" entre ambos: entregas cada varios meses, deploys manuales arriesgados, conocimiento acumulado solo en cabezas de personas, y producción convertida en una zona de conflicto. **DevOps** nace para derribar ese muro: unir a ambos equipos alrededor de un objetivo común — entregar software de forma rápida, segura y confiable.

### 💡 Analogía

Imagina una cadena de montaje de automóviles donde el equipo de diseño crea planos nuevos cada semana, pero el taller que ensambla el auto se entera de los cambios recién el día de la producción y debe rehacer todo a mano. El resultado sería lento, caro y lleno de errores. DevOps es rediseñar la fábrica completa: diseñadores y ensambladores comparten el mismo plano digital, cada cambio se valida automáticamente y el ensamblaje se ejecuta con máquinas programadas (los pipelines) en lugar de instrucciones orales.

### 📖 Explicación técnica

* **DevOps** (Development + Operations) es una **filosofía y un conjunto de prácticas** que acorta el ciclo de vida del desarrollo de software combinando: cultura de colaboración, automatización de procesos, medición continua y compartición de responsabilidad sobre el producto en producción.
* Sus tres pilares prácticos son: **personas** (colaboración y propiedad compartida), **procesos** (flujos de trabajo definidos: integración, entrega, despliegue, monitoreo) y **herramientas** (versionado, CI/CD, contenedores, observabilidad, IaC).
* En la práctica, DevOps se materializa en **pipelines**: secuencias automatizadas que llevan el código desde el commit hasta producción, validando cada paso.
* No es un cargo: un "DevOps Engineer" es alguien que **aplica** estas prácticas; el término "devops" como puesto es un coloquialismo de la industria.

### ⚙️ ¿Qué ocurre internamente?

El ciclo de vida DevOps (la base de todo pipeline):

\`\`\`text
PLAN — definir qué construir
  │
  ▼
CODE — escribir el cambio
  │
  ▼
BUILD — compilar y empaquetar
  │
  ▼
TEST — validar automáticamente
  │
  ▼
PACKAGE — generar el artefacto final
  │
  ▼
RELEASE — preparar la versión
  │
  ▼
DEPLOY — publicar en el entorno
  │
  ▼
OPERATE — ejecutar en producción
  │
  ▼
MONITOR — observar el comportamiento
  │
  ▼
FEEDBACK — aprender y volver a PLAN
\`\`\`

Cada paso puede y debe automatizarse. Cuanto más corto y automático sea el ciclo, más rápido llega valor al usuario y antes se detectan problemas.

### 💻 Ejemplo básico

La idea fundamental que sostiene todo el curso:

\`\`\`text
Código
  ↓
Automatización
  ↓
Validación
  ↓
Entrega
  ↓
Producción
\`\`\`

En la práctica, ese flujo se convierte en una plataforma de CI/CD donde el desarrollador solo hace \`git push\` y el resto lo ejecuta la automatización con validaciones en cada etapa.

### 🏢 Caso de uso profesional

Una empresa con una app web que antes liberaba versiones cada 3 meses con un checklist manual de 40 pasos adopta DevOps: define un pipeline que ejecuta tests, análisis de seguridad y despliegue a staging automáticamente. El deploy a producción pasa a ser un botón con aprobación. El tiempo de entrega baja de meses a horas, y los errores de despliegue (causados antes por pasos olvidados) desaparecen porque la automatización no se olvida.

### ⚠️ Errores comunes

* Creer que DevOps es "instalar Jenkins": sin cultura ni procesos, la herramienta no cambia nada.
* Confundir DevOps con un puesto de trabajo único sin equipo.
* Automatizar solo el build y dejar el deploy manual: la mitad del beneficio se pierde.
* No medir: sin métricas (tiempo de entrega, tasa de fallos) no se puede mejorar.

### 📋 Lo que debes recordar

* DevOps es **cultura + procesos + herramientas** para entregar software rápido y confiable.
* Resuelve el conflicto entre la velocidad de desarrollo y la estabilidad de operaciones.
* CI/CD es la materialización técnica de DevOps.
* El ciclo PLAN → CODE → BUILD → TEST → PACKAGE → RELEASE → DEPLOY → OPERATE → MONITOR → FEEDBACK es el modelo mental de todo el curso.

### 🧪 Autoevaluación rápida

1. ¿Por qué DevOps no es simplemente "usar Jenkins u otra herramienta"?
2. ¿Cuál es el conflicto histórico entre desarrollo y operaciones que DevOps resuelve?
3. Nombra los tres pilares prácticos de DevOps.

---

1. Porque DevOps es una cultura y un conjunto de procesos; las herramientas solo automatizan esos procesos, y sin cultura colaborativa ni flujos definidos no producen resultados.
2. Desarrollo quería cambios rápidos y frecuentes; operaciones quería estabilidad y cero riesgo. Ese choque de objetivos producía entregas lentas, manuales y frágiles.
3. Personas (colaboración y propiedad compartida), procesos (flujos de trabajo definidos) y herramientas (CI/CD, contenedores, observabilidad, IaC).
`
export default content
