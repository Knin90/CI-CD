const content = `
## Módulo 7 — Smoke tests

### 🎯 Objetivos de aprendizaje

* Definir los smoke tests y su papel como verificación rápida post-deploy.
* Escribir smoke tests: pocos, rápidos, críticos.
* Ejecutarlos tras cada despliegue.

### ❓ Problema real que resuelve

Un deploy puede "terminar bien" y la aplicación estar rota: el proceso arrancó, pero la app no responde, la DB no conecta, el endpoint principal devuelve 500. Los smoke tests verifican en segundos que el sistema desplegado **respira**: los caminos críticos funcionan. Son la primera verificación post-deploy, antes de las pruebas profundas.

### 💡 Analogía

El smoke test es como encender el auto después de un service: arranca, las luces funcionan, los frenos responden — no pruebas el rendimiento en pista (eso son los e2e), solo verificas que no está muerto. Si no arranca, no tiene sentido hacer más pruebas.

### 📖 Explicación técnica

* **Smoke test**: conjunto mínimo de verificaciones rápidas de que el sistema desplegado funciona.
* Características:
  * **Pocos**: 5-20 checks.
  * **Rápidos**: segundos a pocos minutos.
  * **Críticos**: lo esencial (health check, login, endpoint principal, DB conecta).
  * **No profundos**: detectan "muerto", no bugs de lógica fina.
* Cuándo: tras cada deploy (staging y producción), dentro del job de deploy.
* Tipos: HTTP health checks, \`GET /\` con status esperado, \`/health\` + DB, login con usuario de prueba, endpoint crítico.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Deploy completado
  │
  ▼
Smoke tests (segundos):
  ├── GET / → 200
  ├── GET /health → 200 + "db: ok"
  ├── POST /login (usuario de prueba) → 200
  └── GET /api/v1/products → 200
  │
  ├── Todo OK → deploy VERIFICADO → continuar (e2e, tráfico)
  └── Algo falla → deploy FALLIDO → rollback/alerta
\`\`\`

### 💻 Ejemplo básico

Smoke tests con curl en el job de deploy:

\`\`\`bash
set -e
curl -fsS https://staging.example.com/health
curl -fsS -X POST https://staging.example.com/login \\
  -H 'Content-Type: application/json' \\
  -d '{"user":"smoke-test","pass":"test"}'
curl -fsS https://staging.example.com/api/v1/products | head -c 100
echo "SMOKE OK"
\`\`\`

### 🏢 Caso de uso profesional

Un equipo despliega 10 veces al día: cada deploy ejecuta smoke tests en 30 segundos. En una ocasión, la DB de staging perdió la conexión justo tras el deploy; el smoke test de \`/health\` falló, el pipeline marcó el deploy como fallido y activó el rollback automático antes de que cualquier usuario viera el error. El smoke test convirtió un incidente potencial en 30 segundos de automatización.

### ⚠️ Errores comunes

* Smoke tests que solo verifican "el proceso arrancó" (sin funcionalidad).
* Demasiados checks (se convierten en e2e lentos).
* Ignorar el fallo del smoke test ("ya se arreglará").
* Smoke tests contra staging sin verificar producción.
* Sin rollback/alerta cuando el smoke falla.

### 📋 Lo que debes recordar

* Smoke = verificación rápida de que el sistema desplegado respira.
* Pocos, rápidos, críticos: health, login, endpoint principal.
* Se ejecutan tras CADA deploy (staging y producción).
* El fallo del smoke debe disparar rollback o alerta.

### 🧪 Autoevaluación rápida

1. ¿Qué verifican los smoke tests?
2. ¿Cuándo se ejecutan?
3. ¿Qué debe pasar si un smoke test falla?

---

1. Que el sistema desplegado funciona en lo esencial: responde, la DB conecta, los caminos críticos operan — sin profundizar.
2. Inmediatamente después de cada despliegue (staging y producción).
3. El deploy se marca como fallido y se activa el rollback o la alerta al equipo.
`
export default content
