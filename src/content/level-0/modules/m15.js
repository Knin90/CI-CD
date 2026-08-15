const content = `
## Módulo 15 — CI/CD en equipos profesionales

### 🎯 Objetivos de aprendizaje

* Describir cómo se organiza un equipo alrededor del pipeline (ownership, SLAs, on-call).
* Explicar el pipeline como "contrato" del equipo: todos lo respetan o lo mejoran.
* Entender el pipeline como producto, no como infraestructura accesoria.

### ❓ Problema real que resuelve

Un pipeline abandonado es peor que no tener pipeline: corre roto durante semanas, nadie sabe quién lo arregla, los equipos lo esquivan con deploys manuales y la confianza muere. En equipos profesionales, el pipeline tiene **dueño, requisitos y métricas** como cualquier producto: alguien responde cuando falla, hay acuerdos sobre tiempos de feedback y el equipo invierte en mejorarlo continuamente.

### 💡 Analogía

El pipeline es como la red eléctrica de una ciudad: todo el mundo depende de ella, pero nadie la "posee" espontáneamente. Una ciudad profesional tiene una empresa que la opera, indicadores de disponibilidad (99,9%), planes de mantenimiento y un número de emergencia. El pipeline profesional necesita lo mismo: un equipo operador, métricas de salud y respuesta ante incidentes.

### 📖 Explicación técnica

Prácticas de equipos profesionales con CI/CD:

* **Ownership claro**: un equipo (plataforma/infra) es dueño del pipeline; define la infraestructura, las plantillas y los estándares. Los equipos de producto consumen el pipeline y contribuyen con feedback.
* **SLA de feedback**: acuerdos como "el pipeline de CI devuelve resultado en < 10 minutos"; si se viola, es un incidente.
* **Pipeline como producto**: backlog propio, mejoras planificadas, métricas de uso y salud (tasa de éxito, tiempo de ejecución, cola de runners).
* **Estándares y plantillas**: templates de pipeline para cada tipo de proyecto (web, servicio, librería); los equipos nuevos arrancan con un pipeline correcto por defecto.
* **On-call del pipeline**: si el pipeline cae, hay una persona de guardia; los equipos de producto no se quedan bloqueados sin respuesta.
* **Cultura de mejora continua**: el pipeline se revisa en retrospectivas; los cuellos de botella se atacan con datos.
* **Documentación viva**: guías de "cómo desplegar", runbooks de fallos comunes y políticas de entornos accesibles.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Equipo de plataforma (dueño)
  │
  ├── Mantiene runners e infraestructura
  ├── Define plantillas y estándares
  ├── Mide salud del pipeline (SLA, tasa de éxito)
  └── Responde incidentes (on-call)
  │
  ▼
Equipos de producto (consumidores)
  │
  ├── Usan las plantillas
  ├── Cumplen los estándares
  └── Reportan mejoras y bloqueos
  │
  ▼
Retrospectiva → backlog del pipeline → mejora continua
\`\`\`

### 💻 Ejemplo básico

Definición de SLA para el pipeline de CI:

\`\`\`text
SLA del pipeline de CI
  ├── Feedback de PR:  < 10 minutos (p95)
  ├── Disponibilidad:  99,5% mensual
  ├── Tasa de éxito:   > 95% de ejecuciones sin fallo de infraestructura
  └── Respuesta ante pipeline caído: 30 minutos (on-call)
\`\`\`

Si el p95 supera los 10 minutos durante una semana, se abre un incidente y el equipo de plataforma prioriza el problema.

### 🏢 Caso de uso profesional

Una plataforma con 30 microservicios centraliza su CI/CD: un equipo de 4 personas de plataforma mantiene plantillas de pipeline para todos los servicios, runners autoescalados y un SLA de feedback de 8 minutos. Los equipos de producto solo escriben la configuración de su servicio (tests, build, deploys); el resto lo da la plantilla. Cuando algo falla, la persona de guardia de plataforma responde en minutos. El resultado: 30 servicios con el mismo pipeline de calidad, sin 30 equipos reinventando CI/CD.

### ⚠️ Errores comunes

* Pipeline sin dueño: nadie responde cuando se rompe.
* Sin SLA: el feedback se degrada sin que nadie lo note.
* Plantillas inexistentes: cada equipo construye su propio pipeline con estándares distintos.
* Tratar el pipeline como accesorio: sin inversión, se pudre.
* Cambios de plataforma sin comunicación: romper a todos los equipos de golpe.

### 📋 Lo que debes recordar

* El pipeline es un **producto**: tiene dueño, backlog y métricas.
* SLA de feedback y disponibilidad son acuerdos explícitos del equipo.
* Las plantillas escalan la calidad: un estándar, muchos proyectos.
* On-call del pipeline: cuando cae, alguien responde ya.

### 🧪 Autoevaluación rápida

1. ¿Qué significa tratar el pipeline como un producto?
2. ¿Por qué un pipeline necesita un SLA de feedback?
3. ¿Qué rol juegan las plantillas de pipeline en equipos grandes?

---

1. Que tiene dueño, backlog propio, métricas de salud, mejoras planificadas e inversión continua, en lugar de ser una infraestructura abandonada que nadie mantiene.
2. Porque el feedback rápido es el valor central del pipeline; sin un acuerdo medible, se degrada silenciosamente y el equipo pierde la confianza en él.
3. Estandarizan la calidad (un pipeline correcto por defecto), reducen el trabajo de cada equipo y garantizan consistencia de prácticas en toda la organización.
`
export default content
