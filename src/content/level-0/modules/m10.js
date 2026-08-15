const content = `
## Módulo 10 — Feedback loops

### 🎯 Objetivos de aprendizaje

* Definir un **bucle de feedback** y su importancia en CI/CD.
* Enumerar los bucles de feedback clave: desde el commit hasta el usuario final.
* Explicar cómo el feedback rápido reduce el costo de los errores.

### ❓ Problema real que resuelve

Un error de código detectado en 5 minutos cuesta centavos; detectado en producción cuesta horas de trabajo, incidentes y reputación. Los bucles de feedback acercan la detección del error al momento en que se introdujo: cuanto más rápido vuelve la información al autor del cambio, más barato es corregirlo y más rápido aprende el equipo.

### 💡 Analogía

Un termostato: mide la temperatura y ajusta la calefacción continuamente. Si el termostato tardara 3 horas en reaccionar, la casa pasaría frío o calor extremos. Los bucles de feedback en CI/CD son termostatos: miden (tests, métricas) y devuelven el resultado al sistema (desarrollador, pipeline) lo antes posible para corregir el rumbo.

### 📖 Explicación técnica

Bucles de feedback clave en CI/CD:

* **Commit → CI**: el pipeline valida cada push; feedback en minutos (build, tests, lint).
* **PR → Review**: el status check informa al revisor si el código está sano.
* **Merge → Main**: la rama principal se mantiene verde; los problemas se detectan al instante.
* **Deploy → Verificación**: health checks y smoke tests confirman que el despliegue salió bien.
* **Producción → Monitoreo**: métricas y alertas detectan problemas reales de los usuarios.
* **Incidente → Mejora**: las post-mortems convierten el incidente en cambios de proceso.

La regla de oro: **acortar el bucle**. Cada reducción de minutos en el feedback multiplica la velocidad de aprendizaje del equipo.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Commit → pipeline CI → resultados (minutos)
  │
  ▼
PR → status check → decisión de merge (horas)
  │
  ▼
Merge → main verde → confianza (días)
  │
  ▼
Deploy → verificación → confirmación (minutos)
  │
  ▼
Producción → métricas y alertas → detección (minutos/horas)
  │
  ▼
Incidente → post-mortem → mejora de proceso (semanas)
  │
  └──────────► vuelve a empezar
\`\`\`

### 💻 Ejemplo básico

Comparación del costo de un error según el bucle de feedback:

\`\`\`text
Detectado en el commit (unit test local)   → costo: minutos
Detectado en CI (pipeline, 5 min)          → costo: minutos
Detectado en staging (e2e, 1 día después)  → costo: horas
Detectado en producción (usuarios)         → costo: incidente, SRE, reputación
\`\`\`

### 🏢 Caso de uso profesional

Un equipo reduce su pipeline de 45 a 12 minutos (paralelizando tests y cacheando dependencias). El efecto colateral no esperado: los desarrolladores dejan de abrir "PRs a ciegas" y esperan el resultado antes de seguir; los errores se corrigen el mismo día en que se introducen, y la tasa de bugs en staging cae a la mitad.

### ⚠️ Errores comunes

* Bucles largos (pipelines de 1 hora): el feedback llega cuando el desarrollador ya cambió de contexto.
* Tests flaky: el bucle devuelve información falsa y se ignora.
* Monitorear sin alertar: los datos existen pero nadie se entera a tiempo.
* Ignorar el feedback del post-mortem: el mismo incidente se repite.

### 📋 Lo que debes recordar

* Los bucles de feedback devuelven el resultado de cada fase al sistema.
* Cuanto más corto el bucle, más barato el error y más rápido el aprendizaje.
* Pipeline rápido + tests fiables + alertas = bucles de feedback sanos.
* El feedback solo sirve si alguien (o algo) actúa sobre él.

### 🧪 Autoevaluación rápida

1. ¿Por qué un pipeline rápido mejora la calidad, no solo la velocidad?
2. Enumera tres bucles de feedback de un pipeline profesional.
3. ¿Qué hace que un bucle de feedback sea "sano"?

---

1. Porque el feedback rápido acerca la detección del error a su origen: se corrige en minutos cuando el contexto aún está fresco, y el equipo aprende más rápido.
2. Commit→CI (validación inmediata), PR→status check (decisión de merge), deploy→verificación (confirmación), producción→monitoreo (detección) e incidente→post-mortem (mejora).
3. Que sea corto (feedback en minutos), fiable (tests estables, sin flaky) y accionable (alguien o algo actúa sobre el resultado).
`
export default content
