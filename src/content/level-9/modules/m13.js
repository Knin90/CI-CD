const content = `
## Módulo 13 — Docker Compose in CI

### 🎯 Objetivos de aprendizaje

* Usar Docker Compose para levantar entornos multi-contenedor en CI.
* Ejecutar tests contra stacks completos (app + DB + servicios).
* Aplicar buenas prácticas: perfiles, overrides y limpieza.

### ❓ Problema real que resuelve

Los tests de integración y E2E necesitan un stack completo: la app, la base de datos, Redis, colas. Levantarlos a mano en CI es frágil; Docker Compose define el stack en YAML y lo levanta/destruye con un comando. Es la herramienta natural para entornos de test multi-contenedor dentro del pipeline.

### 💡 Analogía

Docker Compose es como el guion de montaje del escenario para el ensayo general: el director (pipeline) dice "levanten el escenario" (docker compose up) y aparecen actores, luces y utilería (servicios). Al terminar, "desmonten" (docker compose down) y el escenario queda vacío. Un guion claro hace el montaje repetible.

### 📖 Explicación técnica

Conceptos:

* **compose.yaml**: define servicios, redes, volúmenes y dependencias (\`depends_on\`).
* **Servicios**: cada contenedor del stack (db, redis, app, tests).
* **Redes**: comunicación interna entre servicios.
* **Overrides**: \`docker-compose.test.yml\` para config de test (puertos, variables).
* **Profiles**: activar servicios por contexto.

En CI:

\`\`\`bash
docker compose -f compose.yaml -f compose.test.yml up -d --wait
docker compose run --rm tests        # job de tests contra el stack
docker compose down -v               # destruir (volúmenes incluidos)
\`\`\`

Buenas prácticas:

* \`--wait\`: esperar a que los servicios estén sanos.
* Datos aislados por ejecución (volúmenes efímeros, DB con seed).
* No exponer puertos innecesarios (redes internas).
* Limpieza garantizada (\`down -v\`, \`rm -f\`).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
docker compose up -d --wait
  ├── postgres:16 (sano)
  ├── redis:7 (sano)
  └── app:build (sano, espera postgres/redis)
  │
  ▼
docker compose run --rm tests
  └── integration/E2E contra el stack real
  │
  ▼
Reportes publicados
  │
  ▼
docker compose down -v (destrucción total)
\`\`\`

### 💻 Ejemplo básico

compose.test.yml mínimo:

\`\`\`yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: test
  redis:
    image: redis:7
  app:
    image: app:build
    environment:
      DATABASE_URL: postgres://postgres:test@postgres:5432/app
      REDIS_URL: redis://redis:6379
    depends_on:
      postgres: { condition: service_healthy }
      redis: { condition: service_healthy }
  tests:
    image: app:build
    command: npm run test:integration
    depends_on: [app]
\`\`\`

### 🏢 Caso de uso profesional

Un equipo de microservicios corre sus tests de integración con Compose en CI: cada PR levanta el stack completo (app + PostgreSQL + Redis + cola), ejecuta los tests contra los servicios reales y destruye todo. Los bugs de integración entre servicios se detectan en el PR, y los entornos de test ya no compiten por un staging compartido.

### ⚠️ Errores comunes

* \`up\` sin \`--wait\`: tests contra servicios aún no sanos.
* Volúmenes persistentes entre ejecuciones (estado sucio).
* Exponer puertos al host innecesariamente (colisiones en CI).
* No destruir el stack (leak de recursos en el runner).
* compose duplicado entre local y CI (drift).

### 📋 Lo que debes recordar

* Compose define el stack multi-contenedor para tests.
* up --wait → tests → down -v: ciclo completo.
* Redes internas, datos aislados, limpieza garantizada.
* El stack de CI debe reflejar el de producción.

### 🧪 Autoevaluación rápida

1. ¿Para qué se usa Docker Compose en CI?
2. ¿Qué comando espera a que los servicios estén sanos?
3. ¿Por qué limpiar los volúmenes al destruir?

---

1. Para levantar entornos multi-contenedor (app + DB + servicios) y ejecutar tests de integración/E2E contra el stack real.
2. \`docker compose up -d --wait\`: espera a que los servicios reporten salud.
3. Para que la siguiente ejecución arranque limpia: los datos de una prueba no deben contaminar la siguiente (aislamiento).
`
export default content
