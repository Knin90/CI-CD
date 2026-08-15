const content = `
## Módulo 4 — Continuous Integration en profundidad

### 🎯 Objetivos de aprendizaje

* Describir los requisitos técnicos de una práctica de CI madura.
* Explicar la relación entre CI y la calidad del feedback.
* Identificar qué validaciones pertenecen típicamente al pipeline de CI.

### ❓ Problema real que resuelve

Integrar seguido sin validar automáticamente produce el peor de los mundos: conflictos pequeños pero errores que pasan a producción. La CI madura resuelve el problema de la **confianza**: el equipo confía en que si main está verde, el código está bien. Esa confianza exige que el pipeline sea completo, rápido y estable.

### 💡 Analogía

Un puente colgante con inspección: cada camión que cruza pasa por una báscula y un control de frenos automático; si algo falla, el semáforo se pone rojo y el camión no pasa. Si la báscula miente (tests flaky) o tarda dos horas (pipeline lento), los conductores empiezan a ignorar el semáforo y el sistema pierde sentido. La CI madura es una báscula **rápida, fiable y respetada**.

### 📖 Explicación técnica

Requisitos de una CI madura:

* **Rama principal protegida**: nadie empuja directo; todo entra por Pull Request con el pipeline en verde.
* **Pipeline completo**: lint, unit tests, integration tests, análisis de seguridad, build. Cuanto más abajo del flujo esté un problema, más caro es arreglarlo.
* **Pipeline rápido**: el feedback debe llegar en minutos; pipelines de 40 minutos se ignoran.
* **Builds reproducibles**: la misma versión del código produce el mismo resultado; se usan lockfiles (\`package-lock.json\`, \`go.sum\`, \`pom.xml\`) y versiones fijas de herramientas.
* **Entorno limpio por ejecución**: cada job corre en un runner limpio; nada queda "funcionaba en mi máquina".
* **Reportes visibles**: badges, notificaciones y status checks integrados con el PR.
* **No se puede romper main**: si el pipeline falla, la rama principal queda bloqueada hasta arreglarlo (branch protection).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pull Request creado
  │
  ▼
Trigger automático del pipeline
  │
  ├── Lint (estilo y calidad)
  ├── Unit tests (rápidos, aislados)
  ├── Integration tests (bases de datos, servicios)
  ├── Security scan (SAST, dependencias)
  └── Build / empaquetado
  │
  ▼
Status check en el PR
  ├── Verde → puede mergearse
  └── Rojo → se bloquea el merge
  │
  ▼
Merge a main (protegida)
  │
  ▼
CI en main: validar que la integración final sigue verde
\`\`\`

### 💻 Ejemplo básico

Status check como requisito de merge (protección de rama en la plataforma):

\`\`\`text
main (protegida)
  ├── Requiere 1 revisión aprobada
  ├── Requiere status check "validate" en verde
  └── Requiere que la rama esté actualizada
\`\`\`

Con esto, un PR con el pipeline rojo **no se puede mergear**, por más que un humano lo apruebe.

### 🏢 Caso de uso profesional

Un equipo de plataforma define el "contrato de CI": en menos de 10 minutos, todo PR debe pasar lint + unit + integration + SAST. Si algo falla, el autor recibe la notificación y el PR se bloquea. El resultado: main nunca está roto, las releases salen cuando se quiere, y el 90% de los bugs se detectan antes del merge.

### ⚠️ Errores comunes

* Pipeline lento: el feedback llega tarde y el equipo hace merge sin esperar.
* Tests flaky: generan ruido y desconfianza; se ignoran los rojos.
* CI que solo compila: sin tests ni seguridad, "verde" no significa nada.
* Sin protección de rama: alguien mergea con el pipeline rojo y main se rompe.

### 📋 Lo que debes recordar

* CI madura = rama principal siempre verde y desplegable.
* Pipeline completo, rápido, reproducible y en entorno limpio.
* El status check del PR es el guardián del merge.
* Tests flaky y pipelines lentos destruyen la confianza en CI.

### 🧪 Autoevaluación rápida

1. ¿Por qué la rapidez del pipeline es un requisito funcional de CI, no un lujo?
2. ¿Qué significa que un build sea reproducible?
3. ¿Qué papel juega la protección de rama en CI?

---

1. Porque si el feedback tarda demasiado, los desarrolladores dejan de esperarlo y la práctica de integrar en verde se abandona; el pipeline deja de ser guardián.
2. Que la misma versión del código, con las mismas dependencias y herramientas fijadas, produce el mismo resultado en cualquier máquina y en cualquier momento.
3. Impide mergear código con el pipeline en rojo y obliga a que todo cambio pase por revisión y validación antes de tocar main.
`
export default content
