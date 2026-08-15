const content = `
## Módulo 2 — Unit tests

### 🎯 Objetivos de aprendizaje

* Definir qué es un test unitario y qué NO es.
* Escribir unit tests efectivos: aislados, deterministas, rápidos.
* Ejecutarlos como la primera compuerta del pipeline.

### ❓ Problema real que resuelve

Los bugs más baratos de arreglar son los que se detectan en el momento y en el lugar donde se introdujeron. Los unit tests validan **unidades aisladas** (funciones, clases, módulos) sin depender del sistema: detectan errores de lógica al instante, en segundos, y señalan exactamente dónde. Son la primera línea del pipeline porque dan el feedback más rápido con el costo más bajo.

### 💡 Analogía

Los unit tests son como probar cada pieza del motor antes de armarlo: pruebas que el pistón sube y baja solo (sin el motor completo). Si una pieza falla, la encuentras al instante y la arreglas barato. Probar solo el motor armado (e2e) sin probar las piezas hace que un fallo de pieza sea un misterio.

### 📖 Explicación técnica

* **Test unitario**: verifica una unidad aislada de código (función, clase, método) con entradas controladas y verificando salidas/efectos.
* Características:
  * **Aislado**: sin red, sin base de datos, sin servicios externos (se usan mocks/fakes).
  * **Determinista**: mismo resultado siempre (sin fechas aleatorias, sin dependencia del orden).
  * **Rápido**: miles en segundos.
* Herramientas: Jest/Vitest (JS), pytest (Python), JUnit (Java), Go testing.
* En el pipeline: se ejecutan primero (feedback inmediato), con alta paralelización y cobertura reportada.
* Cuándo fallan: lógica rota, edge cases, refactorizaciones con comportamiento cambiado.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Unidad: calculateTotal(cart, coupon)
  │
  ├── Entrada: cart [100, 50], coupon 10%
  ├── Aislada: sin DB ni red (lógica pura)
  ├── Verificación: total == 135
  └── ¿Pasa? → verde (0.4 ms)
  │
  ▼
800 unit tests → ~1 min → primera compuerta del pipeline
\`\`\`

### 💻 Ejemplo básico

Unit test con Jest:

\`\`\`js
// calculateTotal.test.js
import { calculateTotal } from './cart'

test('aplica el cupón al total', () => {
  expect(calculateTotal([100, 50], 0.1)).toBe(135)
})

test('sin cupón devuelve la suma', () => {
  expect(calculateTotal([100, 50])).toBe(150)
})
\`\`\`

### 🏢 Caso de uso profesional

Un equipo de checkout escribe unit tests para toda la lógica de precios (impuestos, cupones, envíos). Una regresión en el cálculo de impuestos se detecta en el PR, en 30 segundos, con el test señalando la función exacta. El equipo despliega 6 veces al día porque la lógica crítica está cubierta por 300 unit tests rápidos y fiables.

### ⚠️ Errores comunes

* Unit tests que tocan la red o la DB (son integration tests mal etiquetados).
* Tests acoplados a la implementación (rompen en cada refactor).
* Tests que dependen del orden o del estado compartido.
* Cobertura alta con tests triviales (falsa seguridad).
* Unit tests lentos: señal de diseño pobre.

### 📋 Lo que debes recordar

* Unit test = unidad aislada, determinista y rápida.
* Sin red, sin DB, sin servicios: mocks para lo externo.
* Primera compuerta del pipeline: feedback en segundos.
* Miden lógica, no implementación.

### 🧪 Autoevaluación rápida

1. ¿Qué características debe tener un unit test?
2. ¿Por qué un unit test que toca la red no es un unit test?
3. ¿Qué papel juegan en el orden del pipeline?

---

1. Aislamiento (sin externos), determinismo (mismo resultado siempre) y velocidad (miles en segundos).
2. Porque su resultado depende de un sistema externo: es un test de integración, más lento y menos fiable.
3. Se ejecutan primero, como compuerta de feedback inmediato antes de las validaciones más caras.
`
export default content
