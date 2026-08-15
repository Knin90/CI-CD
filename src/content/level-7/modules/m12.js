const content = `
## Módulo 12 — Test environments

### 🎯 Objetivos de aprendizaje

* Explicar qué entornos necesitan los tests y su ciclo de vida.
* Crear entornos efímeros por ejecución.
* Evitar el problema del "entorno compartido".

### ❓ Problema real que resuelve

Los tests (sobre todo integration y E2E) necesitan un entorno: base de datos, servicios, la app desplegada. Si todos comparten UN entorno, los tests chocan: un test borra datos que otro necesita, un deploy rompe a otro, los resultados son no reproducibles. Los entornos de prueba efímeros (por ejecución) aíslan cada pipeline: cada PR tiene su entorno limpio.

### 💡 Analogía

Los entornos compartidos son como un baño público con mucha gente: no sabes en qué estado lo vas a encontrar y lo que haces afecta a los demás. Los entornos efímeros son baños individuales por usuario: cada uno tiene el suyo limpio y lo deja como lo encontró (o lo destruye).

### 📖 Explicación técnica

Tipos de entornos de test:

* **Por ejecución (efímero)**: el pipeline crea el entorno (contenedores, namespace K8s, preview env), corre los tests y lo destruye. Aislamiento total, reproducible.
* **Compartido estable**: un entorno de staging fijo. Barato, pero con estado y colisiones entre equipos.
* **Preview environments**: por PR (Vercel/Netlify/K8s): cada PR tiene su URL con la app desplegada.

Componentes del entorno:

* Base de datos (con migraciones y seed).
* Servicios dependientes (colas, cachés, externos mockeados).
* La aplicación desplegada (si es E2E).
* Configuración (variables, secretos de test).

Ciclo de vida: crear → migrar/seed → ejecutar tests → verificar → destruir.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job de tests inicia
  │
  ▼
Crear entorno efímero:
  ├── Contenedores (Postgres, Redis, app)
  ├── Migraciones + seed de datos
  └── Variables de entorno inyectadas
  │
  ▼
Ejecutar tests (aislados)
  │
  ▼
Publicar reportes
  │
  ▼
Destruir el entorno (no queda estado)
\`\`\`

### 💻 Ejemplo básico

Entorno con Docker Compose en CI:

\`\`\`yaml
test:
  services:
    postgres:
      image: postgres:16
      env:
        POSTGRES_PASSWORD: test
    redis:
      image: redis:7
  steps:
    - run: npm ci
    - run: npx prisma migrate deploy
    - run: npm run test:integration
\`\`\`

### 🏢 Caso de uso profesional

Un equipo de 10 desarrolladores con un staging compartido sufría tests que "dependían de quién los corrió antes". Migran a entornos efímeros por PR (preview en Kubernetes): cada PR crea su namespace con la app y su base de datos, corre E2E, y destruye todo al mergear. Los tests vuelven a ser reproducibles y los conflictos de entorno desaparecen.

### ⚠️ Errores comunes

* Entorno compartido con estado acumulado.
* Entornos efímeros sin destruir (leak de recursos).
* Configuración del entorno duplicada entre local y CI (drift).
* Seed de datos insuficiente o no determinista.
* Entornos de test con secretos de producción.

### 📋 Lo que debes recordar

* Entornos efímeros por ejecución = aislamiento y reproducibilidad.
* Ciclo: crear → migrar/seed → tests → verificar → destruir.
* Preview environments por PR para validar cambios reales.
* El entorno compartido es la fuente de flakiness y colisiones.

### 🧪 Autoevaluación rápida

1. ¿Qué problema resuelven los entornos efímeros?
2. ¿Qué componentes tiene un entorno de test?
3. ¿Qué son los preview environments?

---

1. El aislamiento: cada ejecución tiene su entorno limpio, sin colisiones con otros tests ni estado acumulado.
2. Base de datos (con migraciones y seed), servicios dependientes, la aplicación desplegada y su configuración.
3. Entornos desplegados por cada Pull Request (una URL por PR) para validar el cambio real antes del merge.
`
export default content
