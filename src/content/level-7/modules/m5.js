const content = `
## Módulo 5 — End-to-end tests

### 🎯 Objetivos de aprendizaje

* Explicar qué son los tests E2E y cuándo valen su costo.
* Configurar E2E en el pipeline contra entornos completos.
* Reducir la flakiness de los E2E.

### ❓ Problema real que resuelve

Los tests por capa (unit, integration) no garantizan que el FLUJO COMPLETO funcione: usuario → UI → API → base de datos → terceros. Los tests E2E recorren el sistema de punta a punta como lo haría un usuario real, detectando los problemas que solo aparecen con todo integrado. Son la verificación más cercana a la experiencia real.

### 💡 Analogía

Los tests E2E son el ensayo general del teatro: actores (UI), luces (backend), sonido (DB) y público (usuario) juntos, con toda la obra completa. Los ensayos por escena (unit) no revelan si la obra entera funciona: el cambio de escenario, los tiempos, la interacción entre actos. El ensayo general es lo que garantiza que la función salga bien.

### 📖 Explicación técnica

* **Test E2E**: verifica un flujo completo de usuario a través de todo el sistema, típicamente desde la UI.
* Pirámide: pocos, lentos y caros — solo los flujos críticos (compra, login, pago).
* Requisitos en el pipeline:
  * **Entorno completo**: staging con datos de prueba.
  * **Browser automatizado**: Playwright, Cypress, Selenium.
  * **Seed de datos**: estado inicial controlado.
  * **Retries limitados** para flakiness de red/UI.
* Ejecución: job separado tras el deploy a staging; reportes con video/screenshots de fallos.
* Reducir flakiness: selectores estables (data-testid), esperas explícitas (no sleeps), datos aislados por test, retry controlado.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Deploy a staging
  │
  ▼
E2E: flujo de compra completo
  ├── Usuario abre la app (browser real)
  ├── Busca producto, agrega al carrito
  ├── Paga con tarjeta de prueba
  └── Verifica la confirmación del pedido
  │
  ▼
¿Pasa? → el flujo crítico funciona de punta a punta
  │
  ▼
Screenshots/video en caso de fallo (diagnóstico)
\`\`\`

### 💻 Ejemplo básico

E2E con Playwright:

\`\`\`bash
npx playwright install --with-deps
npx playwright test
\`\`\`

\`\`\`ts
test('el usuario completa una compra', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('product-card').first().click()
  await page.getByTestId('add-to-cart').click()
  await page.getByTestId('checkout').click()
  await expect(page.getByTestId('order-confirmed')).toBeVisible()
})
\`\`\`

### 🏢 Caso de uso profesional

Un e-commerce identifica sus 5 flujos críticos (compra, login, búsqueda, cupones, devoluciones) y los cubre con E2E. El pipeline ejecuta los E2E contra staging tras cada deploy; un fallo de la pasarela de pago se detecta antes de producción. Los 5 flujos tardan 8 minutos: caros, pero evitan incidentes de pago que costarían mucho más.

### ⚠️ Errores comunes

* E2E para todo (pirámide invertida): lentos y frágiles.
* Selectores inestables (classes CSS, textos que cambian).
* \`sleep\` fijos en vez de esperas explícitas.
* E2E contra producción (riesgo de datos reales).
* Flakiness normalizada: "falla 1 de 5, re-ejecuta".

### 📋 Lo que debes recordar

* E2E = flujo completo de usuario por todo el sistema.
* Pocos, críticos, lentos: solo lo que vale la pena.
* Entorno completo en staging + datos controlados.
* Esperas explícitas y selectores estables contra la flakiness.

### 🧪 Autoevaluación rápida

1. ¿Qué verifica un test E2E que los demás no?
2. ¿Contra qué entorno se ejecutan típicamente?
3. ¿Cómo se reduce la flakiness de los E2E?

---

1. El flujo completo de usuario a través de todo el sistema integrado (UI → API → DB → terceros), como lo viviría el usuario real.
2. Contra un entorno completo desplegado (staging) con datos de prueba controlados.
3. Con esperas explícitas (no sleeps), selectores estables (data-testid), datos aislados por test y retries limitados.
`
export default content
