const content = `
## Módulo 4 — Test failure

### 🎯 Objetivos de aprendizaje

* Distinguir fallos reales de tests de fallos flaky o de entorno.
* Diagnosticar tests que pasan en local y fallan en CI.
* Usar evidencia para decidir: arreglar, quarantine o ignorar.

### ❓ Problema real que resuelve

El test falla en CI pero pasa en local — o falla de forma intermitente. Si el equipo ignora el rojo, los fallos reales se pierden; si persigue todo, pierde tiempo. Diagnosticar test failures con rigor — separando el fallo real del flaky, y la causa del test de la causa del entorno — es la diferencia entre un CI confiable y un CI que nadie mira.

### 💡 Analogía

El test failure es el detector de humo que suena: a veces hay fuego de verdad (bug real) y a veces el detector está mal instalado (test mal escrito) o el edificio está lleno de humo de la cocina (entorno inestable). Arrancar la alarma (ignorar) es peligroso; apagar el detector (quitar el test) también. Hay que mirar: ¿dónde está el humo?

### 📖 Explicación técnica

* Tres causas distintas, tres tratamientos:
  * **Fallo real**: el código no cumple el contrato. Se arregla el código.
  * **Test mal escrito**: assertion frágil, dependencia de orden, timing, datos compartidos. Se arregla el test.
  * **Entorno**: recursos, red, servicios externos, timeouts, caché. Se estabiliza el entorno.
* Tests que pasan en local y fallan en CI: diferencias de entorno (variables, versión de runtime, sistema, orden de ejecución, paralelismo) y de estado (datos, servicios, caché).
* **Flaky tests** (nivel 7): intermitentes sin cambio de código. Nunca se arreglan con retry "porque sí": se investiga la causa raíz.
* Método: lee el assertion que falla (no solo el nombre del test) → reproduce en local (solo, con el orden, con las variables de CI) → mira timing y paralelismo → decide la categoría.
* Buenas prácticas: tests deterministas (sin depender de orden ni hora), isolates (cada test con sus datos), logs con contexto, y métricas de flakiness (nivel 20).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Test rojo en CI
   ↓
Lee la assertion exacta que falla
   ↓
¿Pasó en local? ¿Es intermitente?
   ↓
Categoriza: código / test / entorno
   ↓
Reproduce (solo, en orden, con env de CI)
   ↓
Arregla la causa (no el síntoma)
   ↓
Verifica con el pipeline verde
\`\`\`

### 🧪 Ejercicios

1. Escribe un test que falle por orden de ejecución y diagnostícalo.
2. Crea un flaky test (timing) y explica por qué es intermitente.
3. Toma un fallo real de tu proyecto y categorízalo con evidencia.

### ⚠️ Errores comunes

* Ignorar tests rojos "porque son flaky" (el rojo deja de significar algo).
* Retry automático para tests flaky (esconde la causa raíz — nivel 20).
* Arreglar el test en vez del código cuando el fallo es real.
* Tests que dependen del orden, la hora o el entorno compartido.

### 🔗 Conexión DevOps

El test failure conecta con testing automation (nivel 7), flaky tests (nivel 20), test environments (nivel 20) y la confiabilidad del pipeline (nivel 20). Es la capa más delicada del troubleshooting: aquí se decide si el rojo significa "código roto" o "sistema ruidoso".
`
export default content
