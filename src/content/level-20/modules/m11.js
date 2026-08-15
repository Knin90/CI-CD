const content = `
## Módulo 11 — Deployment verification

### 🎯 Objetivos de aprendizaje

* Verificar el despliegue como parte del testing del pipeline.
* Comprobar que el entorno desplegado funciona de verdad.
* Convertir la verificación en un stage obligatorio.

### ❓ Problema real que resuelve

El pipeline "terminó" — pero ¿la app desplegada funciona? La verificación de despliegue es el stage final del testing del pipeline: comprobar que el artefacto desplegado responde, que los health checks pasan, que los flujos críticos funcionan — el punto donde el testing del pipeline se encuentra con la realidad del entorno.

### 💡 Analogía

La verificación del despliegue es la prueba de conducción tras la reparación del coche: el mecánico no entrega el coche solo porque "terminó la reparación" (pipeline verde); hace una prueba de conducción (verificación) — arranca, frena, gira — antes de devolverlo al cliente. El taller (pipeline) solo da el visto bueno con la prueba hecha.

### 📖 Explicación técnica

* **Deployment verification**: comprobación de que el despliegue produjo un entorno funcional.
* Capas de verificación (nivel 13 — deployment verification):
  * Health checks (nivel 18): el servicio responde y está listo.
  * Smoke tests (nivel 7): los flujos críticos de negocio funcionan (login, checkout, API principal).
  * Verificación de config: la app arrancó con la configuración correcta del entorno.
  * Métricas post-deploy (nivel 18): error rate y latencia dentro de umbrales.
* En el pipeline: un stage de verificación que falla → rollback automático (nivel 13) o alerta; el deploy no se considera exitoso sin verificación.
* La verificación conecta el testing del pipeline (este nivel) con la operación real (nivel 18): es la prueba final que valida la cadena completa build→deploy.
* Buenas prácticas: verificación en cada entorno (dev también), flujos críticos definidos con el negocio, verificación automatizada (no "alguien mira la web").

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Deploy ejecutado
   ↓
Health checks (readiness)
   ↓
Smoke tests (flujos críticos)
   ↓
Métricas post-deploy (error rate, latencia)
   ↓
¿Todo OK? → deploy verificado
   ↓
¿Fallo? → rollback + alerta
\`\`\`

### 🧪 Ejercicios

1. Añade un stage de verificación post-deploy a tu pipeline (smoke + health).
2. Define 3 flujos críticos de negocio y sus smoke tests.
3. Automatiza: verificación fallida → rollback.

### ⚠️ Errores comunes

* Pipeline verde sin verificación (el deploy "terminó" pero nada funciona).
* Smoke tests superficiales (solo "el servidor responde 200" en la home).
* Verificación solo en producción (los problemas se descubren tarde).
* Verificación manual (depende de que alguien mire la app).

### 🔗 Conexión DevOps

La verificación de despliegue es el puente entre el testing de pipelines (nivel 20) y la observabilidad (nivel 18): conecta smoke tests (nivel 7), rollbacks (nivel 13) y health checks (nivel 18). Es la prueba final de toda la cadena CI/CD.
`
export default content
