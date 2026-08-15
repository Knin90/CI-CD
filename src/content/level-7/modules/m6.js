const content = `
## Módulo 6 — API tests

### 🎯 Objetivos de aprendizaje

* Definir qué se prueba en una API: contratos, contratos de datos, errores, auth.
* Escribir tests de API automatizados.
* Ejecutarlos en el pipeline contra la API desplegada.

### ❓ Problema real que resuelve

Las APIs son el contrato entre servicios (backend ↔ frontend, microservicios entre sí). Un cambio de formato rompe a todos los consumidores. Los tests de API verifican el comportamiento observable del endpoint: status codes, estructura de respuesta, errores, autenticación — la superficie que los consumidores realmente usan.

### 💡 Analogía

La API es el menú del restaurante y su cocina: los tests de API prueban que cada plato del menú (endpoint) se sirve como se describe: llega lo que se pidió (formato), en el tiempo esperado (latencia) y con el manejo correcto cuando algo falla (errores 4xx/5xx). Probar la cocina internamente (unit) no garantiza que el menú funcione.

### 📖 Explicación técnica

Qué se prueba:

* **Status codes**: 200, 201, 400, 401, 404, 500 según el caso.
* **Contrato de datos**: schema de la respuesta (campos, tipos, estructura).
* **Validación de entrada**: payloads inválidos → 400 con mensajes claros.
* **Autenticación/autorización**: sin token → 401; sin permisos → 403.
* **Flujos**: CRUD, paginación, filtros, idempotencia.
* **Rendimiento básico**: latencia razonable (límites).

Herramientas: Supertest/axios (JS), pytest+requests (Python), RestAssured (Java), Postman/Newman, herramientas de contrato (Pact, schemathesis).

En el pipeline: job de tests de API contra staging (desplegado) o contra la app levantada en el job (integración).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
API desplegada en staging
  │
  ▼
Tests de API:
  ├── POST /login con credenciales válidas → 200 + token
  ├── POST /login sin credenciales → 401
  ├── GET /users sin token → 401
  ├── POST /users con payload inválido → 400 + errores
  └── GET /users → 200 + schema esperado
  │
  ▼
¿Todo verde? → el contrato de la API está intacto
\`\`\`

### 💻 Ejemplo básico

Tests de API con Supertest (Node):

\`\`\`js
const request = require('supertest')
const app = require('./app')

test('login exitoso devuelve token', async () => {
  const res = await request(app)
    .post('/login')
    .send({ user: 'ana', pass: 'secret' })
  expect(res.status).toBe(200)
  expect(res.body).toHaveProperty('token')
})

test('payload inválido devuelve 400', async () => {
  const res = await request(app).post('/users').send({})
  expect(res.status).toBe(400)
})
\`\`\`

### 🏢 Caso de uso profesional

Una API pública con 40 endpoints y clientes externos: el pipeline ejecuta 300 tests de API en cada PR (contra la API desplegada en staging) más tests de contrato con Pact. Un cambio que rompe el formato de \`GET /orders\` se detecta en el PR con el test señalando el campo faltante — antes de que los clientes externos se quejen.

### ⚠️ Errores comunes

* Probar solo el camino feliz (sin errores ni auth).
* Tests acoplados al estado de la DB (datos no aislados).
* No validar el schema (solo que el status sea 200).
* Tests contra producción (datos reales, riesgo).
* Contratos que cambian sin versionar (breaking silencioso).

### 📋 Lo que debes recordar

* API tests = contrato observable: status, schema, errores, auth.
* Cobertura de errores y edge cases, no solo el camino feliz.
* Se ejecutan contra la API desplegada (staging).
* Contratos versionados para cambios controlados.

### 🧪 Autoevaluación rápida

1. ¿Qué aspectos se prueban en una API?
2. ¿Por qué la estructura de la respuesta importa tanto?
3. ¿Contra qué entorno se ejecutan en el pipeline?

---

1. Status codes, schema de respuesta, validación de entrada, autenticación/autorización, flujos CRUD y latencia básica.
2. Porque los consumidores dependen del contrato de datos: un campo que desaparece rompe a todos los clientes aunque el status sea 200.
3. Contra la API desplegada en staging (o levantada en el job), nunca contra producción con datos reales.
`
export default content
