const content = `
## Módulo 19 — Pipeline documentation

### 🎯 Objetivos de aprendizaje

* Documentar el pipeline para el equipo.
* Explicar estructura, entradas, gates y salidas.
* Mantener la documentación viva junto al código.

### ❓ Problema real que resuelve

El pipeline "funciona" pero nadie sabe por qué está así: qué hace cada job, por qué hay un gate, cómo se despliega a prod, a quién preguntar. Cuando algo cambia o falla (nivel 22), el conocimiento está en la cabeza de una persona. La documentación del pipeline (nivel 23) explica la estructura y las decisiones — y se mantiene junto al código, como parte del Pipeline as Code (módulo 1).

### 💡 Analogía

La documentación del pipeline es el manual de instrucciones del electrodoméstico: sin él, cada persona lo usa "como puede", lo fuerza, y cuando algo falla no sabe ni qué botón apretar. El manual (documentación) dice qué hace cada parte, qué NO debe hacerse y cómo se repara — y como los buenos manuales, se actualiza cuando el electrodoméstico cambia.

### 📖 Explicación técnica

* **Qué documentar**:
  * **Estructura**: etapas y jobs, qué hace cada uno (módulo 4), flujo general del commit al deploy.
  * **Entradas/salidas**: triggers, inputs de workflows reutilizables (módulo 3), artifacts y outputs.
  * **Gates**: quality/security gates (módulos 15-16) y por qué existen sus umbrales.
  * **Entornos y despliegue**: cómo se despliega a cada entorno, approvals, rollback (módulos 10 y 18).
  * **Decisiones**: por qué se eligió cada cosa (ADR del pipeline — nivel 23); "por qué" es más valioso que "qué".
  * **Runbooks**: qué hacer cuando algo falla (nivel 19 y 20 de 22).
* **Dónde**: junto al código (README del repo de pipelines, docs en el repo — nivel 1), no en un wiki aparte que se desactualiza (módulo 1).
* **Cómo mantenerla viva**: la documentación se revisa en cada cambio del pipeline (módulo 1 y 14), se verifica (¿lo que dice sigue siendo cierto? — nivel 20), y los runbooks se prueban (módulo 18).
* Buenas prácticas: corta y orientada a decisiones (nadie lee 50 páginas — módulo 4), con ejemplos concretos, y con dueño (alguien responsable de que esté al día).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
README/ADR del pipeline junto al código
   ↓
Estructura: etapas, jobs, flujo
   ↓
Entradas/salidas + gates + umbrales
   ↓
Despliegue por entorno + rollback
   ↓
Decisiones ("por qué") + runbooks
   ↓
Se revisa en cada cambio del pipeline
   ↓
El equipo sabe qué hay y por qué
\`\`\`

### 🧪 Ejercicios

1. Escribe un README del pipeline: estructura, gates y despliegue.
2. Documenta 3 decisiones del pipeline con su "por qué" (ADR).
3. Revisa si la documentación existente sigue siendo cierta.

### ⚠️ Errores comunes

* Documentación en un wiki aparte que se desactualiza (módulo 1).
* Solo el "qué" sin el "por qué" (nadie sabe por qué existe un gate).
* Documentación gigante que nadie lee (módulo 4).
* Sin runbooks (el conocimiento se pierde en el incidente — nivel 22).

### 🔗 Conexión DevOps

La documentación conecta con Pipeline as Code (módulo 1), code review (módulo 14), observabilidad (módulo 17), runbooks (nivel 22) y la mejora continua (nivel 23). Es lo que hace el pipeline comprensible y gestionable por el equipo, no por una persona.
`
export default content
