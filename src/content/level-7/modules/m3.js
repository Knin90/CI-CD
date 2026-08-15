const content = `
## Módulo 3 — Integration tests

### 🎯 Objetivos de aprendizaje

* Definir los tests de integración y qué verifican.
* Configurar entornos de integración en el pipeline.
* Manejar dependencias externas (DBs, servicios, contratos).

### ❓ Problema real que resuelve

Los unit tests verifican piezas aisladas, pero las piezas deben funcionar JUNTAS: el módulo A con la base de datos, el servicio con la API externa, el frontend con el backend. Los tests de integración validan esas interacciones — donde aparecen los bugs clásicos: contratos rotos, tipos incompatibles, estados inesperados.

### 💡 Analogía

Los unit tests prueban cada pieza del motor por separado; los de integración montan el motor y verifican que las piezas encajan y funcionan juntas: el pistón con la biela, la biela con el cigüeñal. Un motor cuyas piezas funcionan solas pero no juntas es un motor roto — y solo se detecta integrando.

### 📖 Explicación técnica

* **Test de integración**: verifica la interacción entre dos o más componentes reales (módulos, DB, servicios, colas).
* Niveles: integración entre módulos, con base de datos, con servicios externos (reales o contratos).
* Entorno: el pipeline levanta los servicios necesarios (Docker Compose, Testcontainers, servicios efímeros).
* Estrategias:
  * **Reales**: levantar la DB real en el pipeline (Testcontainers, servicios de la plataforma).
  * **Contractos**: verificar el contrato de la API externa sin llamarla (consumer-driven contracts, Pact).
  * **Mocks de red**: para externos no controlables (pero entonces son menos "integración").
* Los tests de integración son más lentos que los unit: se ejecutan en una etapa separada, tras los unit.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Unit tests verdes
  │
  ▼
Pipeline levanta servicios:
  ├── PostgreSQL (Testcontainers)
  ├── Redis
  └── API de pagos (contrato/mock)
  │
  ▼
Integration tests:
  ├── El repo guarda y lee correctamente
  ├── El servicio responde con el formato esperado
  └── La cola procesa los eventos
  │
  ▼
¿Verde? → siguiente etapa (e2e / security)
\`\`\`

### 💻 Ejemplo básico

Integration test con Testcontainers (Java):

\`\`\`java
@Testcontainers
class UserRepositoryIT {
  @Container
  static PostgreSQLContainer<?> db = new PostgreSQLContainer<>("postgres:16");

  @Test
  void guarda_y_recupera_usuario() {
    // se conecta al PostgreSQL real del contenedor
  }
}
\`\`\`

### 🏢 Caso de uso profesional

Un equipo con microservicios detecta bugs clásicos de integración (la API devuelve \`null\` donde el frontend espera \`[]\`). Implementan tests de integración en el pipeline: la API real con su base de datos en Testcontainers y contratos de consumidores (Pact) para las APIs externas. Los bugs de integración pasan de "incidente en producción" a "PR en rojo en 5 minutos".

### ⚠️ Errores comunes

* Tests de integración que usan mocks de todo (no prueban la integración real).
* Dependencias flaky (servicios externos inestables).
* Configuración del entorno replicada a mano (drift entre local y CI).
* Tests de integración lentos que bloquean el feedback.
* Olvidar limpiar datos entre ejecuciones (estado sucio).

### 📋 Lo que debes recordar

* Integration = interacción real entre componentes.
* Levanta los servicios en el pipeline (Testcontainers, Compose).
* Contratos (Pact) para APIs externas.
* Entorno aislado y limpio por ejecución.

### 🧪 Autoevaluación rápida

1. ¿Qué verifican los tests de integración?
2. ¿Cómo se levantan los servicios en el pipeline?
3. ¿Qué son los tests de contrato?

---

1. La interacción entre componentes reales: módulos, bases de datos, servicios y colas trabajando juntos.
2. Con contenedores efímeros (Testcontainers, Docker Compose) levantados dentro del job de CI.
3. Verifican que el contrato entre consumidor y proveedor de una API se cumple, sin ejecutar la API completa (consumer-driven contracts, Pact).
`
export default content
