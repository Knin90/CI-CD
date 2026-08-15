const content = `
## Módulo 1 — Automated testing

### 🎯 Objetivos de aprendizaje

* Explicar por qué el testing automatizado es el pilar de CI/CD.
* Describir la pirámide de testing y su lógica de costos.
* Relacionar los tests con el pipeline como guardián de calidad.

### ❓ Problema real que resuelve

Sin tests automáticos, cada cambio corre el riesgo de romper algo existente sin que nadie lo note hasta producción. El testing automatizado convierte la validación en algo **ejecutable, repetible y continuo**: el pipeline corre los tests en cada cambio, detectando regresiones en minutos. Es la diferencia entre "espero que no se haya roto" y "sé que no se rompió".

### 💡 Analogía

El testing automatizado es como la inspección de calidad de una fábrica: cada pieza pasa por máquinas que la verifican automáticamente (dimensiones, material, funcionalidad) antes de salir. Sin las máquinas, la inspección sería visual y esporádica: piezas defectuosas saldrían al mercado. Los tests son esas máquinas de inspección del software.

### 📖 Explicación técnica

* **Test automatizado**: código que verifica el comportamiento del código, ejecutable sin intervención humana.
* **Pirámide de testing** (modelo de costos):
  * **Unit tests** (base, muchos, rápidos, baratos): verifican unidades aisladas.
  * **Integration tests** (medio): verifican interacción entre componentes.
  * **E2E tests** (cima, pocos, lentos, caros): verifican el flujo completo.
* La regla de la pirámide: muchos unit, algunos integration, pocos e2e — la confianza se construye con velocidad y cobertura en la base.
* En CI/CD, los tests son **compuertas**: si fallan, el pipeline se detiene y el código no avanza.
* El pipeline ejecuta la pirámide en orden: unit (rápidos, feedback inmediato) → integration → e2e (más lentos).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Code
  │
  ▼
Build
  │
  ▼
Unit Tests (cientos, segundos) → feedback rápido
  │
  ▼
Integration Tests (bases de datos, servicios)
  │
  ▼
E2E Tests (flujos completos, minutos)
  │
  ▼
Quality Gate (cobertura, tasa de éxito)
  │
  ▼
¿Verde? → continúa el pipeline → release
\`\`\`

### 💻 Ejemplo básico

Pipeline con la pirámide:

\`\`\`yaml
jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - run: npm ci
      - run: npm run test:unit
  integration:
    runs-on: ubuntu-latest
    needs: [unit]
    steps:
      - run: npm run test:integration
  e2e:
    runs-on: ubuntu-latest
    needs: [integration]
    steps:
      - run: npm run test:e2e
\`\`\`

### 🏢 Caso de uso profesional

Un equipo con una app de pagos construye su pirámide: 800 unit tests (1 min), 120 integration (3 min), 20 e2e (8 min). Cada PR corre todo el pipeline; una regresión se detecta en menos de 10 minutos. Los deploys a producción pasan de "2 veces al mes con miedo" a "5 veces al día con confianza" porque la pirámide valida en cada cambio.

### ⚠️ Errores comunes

* Pirámide invertida: muchos E2E lentos y frágiles, pocos unit.
* Tests que dependen del orden o de estado global (flaky).
* Cobertura sin calidad (tests que solo "corren").
* Tests que tardan demasiado: el feedback llega tarde.
* Ignorar tests rojos "porque es flaky": la confianza muere.

### 📋 Lo que debes recordar

* El testing automatizado es la compuerta de calidad del pipeline.
* Pirámide: muchos unit, algunos integration, pocos e2e.
* Los tests deben ser rápidos, fiables y ejecutarse en cada cambio.
* Un test rojo detiene el flujo: esa es su función.

### 🧪 Autoevaluación rápida

1. ¿Qué es la pirámide de testing y qué regla sigue?
2. ¿Qué papel juegan los tests en el pipeline?
3. ¿Qué riesgo tiene una pirámide invertida?

---

1. Modelo de testing: muchos unit tests (base), algunos integration (medio) y pocos E2E (cima), priorizando velocidad y cobertura en la base.
2. Son compuertas: si fallan, el pipeline se detiene y el código no avanza hacia la release.
3. Tests E2E lentos y frágiles como base: feedback lento, flakiness y confianza destruida — el pipeline se vuelve un obstáculo.
`
export default content
