const content = `
## Módulo 4 — Functional tests

### 🎯 Objetivos de aprendizaje

* Definir los tests funcionales y su diferencia con unit/integration.
* Escribir tests basados en comportamiento del usuario.
* Ejecutarlos contra entornos desplegados.

### ❓ Problema real que resuelve

Los tests técnicos (unit/integration) verifican que el código funciona internamente; los funcionales verifican que el SISTEMA cumple su función desde la perspectiva del usuario/negocio: "el usuario puede registrarse", "el carrito calcula bien el total". Sin tests funcionales, un sistema técnicamente correcto puede ser funcionalmente inútil.

### 💡 Analogía

Un coche cuyos componentes pasan todas las pruebas de taller (unit/integration) puede no ser funcional: el usuario no puede entrar, el volante no gira como espera. Los tests funcionales son la prueba de manejo desde el asiento del conductor: ¿el coche hace lo que el usuario espera que haga?

### 📖 Explicación técnica

* **Test funcional**: verifica que el sistema cumple un requisito funcional de negocio, descrito en términos de comportamiento observable.
* Formato típico: "Dado [estado] → Cuando [acción] → Entonces [resultado]" (Given-When-Then).
* Se ejecutan contra un **sistema desplegado** (staging) o un entorno completo, no contra piezas aisladas.
* Nivel: entre integration y E2E; pueden usar la UI, la API o ambos.
* Herramientas: Cucumber (BDD), SpecFlow, Playwright/Cypress (si van por UI), tests de API (Supertest, RestAssured).
* En el pipeline: se ejecutan tras desplegar a staging, como validación del entorno real.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Deploy a staging
  │
  ▼
Tests funcionales (Given-When-Then):
  ├── Dado un usuario nuevo
  ├── Cuando se registra con email válido
  └── Entonces recibe confirmación y puede iniciar sesión
  │
  ▼
¿Pasa? → el requisito de negocio está cumplido
  │
  ▼
Siguiente: e2e / security / release
\`\`\`

### 💻 Ejemplo básico

Test funcional (Cucumber/BDD):

\`\`\`gherkin
Feature: Registro de usuarios

  Scenario: Registro exitoso
    Given el usuario está en la página de registro
    When completa el formulario con datos válidos
    Then ve la confirmación de registro
    And puede iniciar sesión con sus credenciales
\`\`\`

### 🏢 Caso de uso profesional

Un banco digital define sus requisitos funcionales críticos en BDD: transferencias, límites, bloqueos. El pipeline despliega a staging y ejecuta los tests funcionales contra el entorno real; si un requisito se rompe, el deploy a producción se detiene. Los requisitos de negocio están verificados automáticamente, no "a ojo" en una demo.

### ⚠️ Errores comunes

* Confundir tests funcionales con unit (los funcionales requieren sistema desplegado).
* Tests funcionales frágiles por selectores de UI inestables.
* Solo cubrir el "camino feliz" (sin errores y edge cases).
* Tests funcionales lentos que bloquean el feedback (balancear).
* BDD sin automatización (gherkin solo como documentación).

### 📋 Lo que debes recordar

* Funcional = el sistema cumple el requisito de negocio observable.
* Given-When-Then: estado, acción, resultado.
* Se ejecutan contra el sistema desplegado (staging).
* Complementan a unit/integration: verifican el "qué" del negocio.

### 🧪 Autoevaluación rápida

1. ¿Qué diferencia a un test funcional de uno de integración?
2. ¿Contra qué se ejecutan los tests funcionales?
3. ¿Qué formato de descripción usan típicamente?

---

1. El funcional verifica el cumplimiento de un requisito de negocio observable (comportamiento); el de integración verifica la interacción técnica entre componentes.
2. Contra un sistema completo desplegado (staging), no contra piezas aisladas.
3. Given-When-Then (BDD): dado un estado, cuando ocurre una acción, entonces se observa un resultado.
`
export default content
