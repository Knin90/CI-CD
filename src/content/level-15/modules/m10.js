const content = `
## Módulo 10 — Infrastructure testing

### 🎯 Objetivos de aprendizaje

* Testear la infraestructura como se testea el código.
* Usar unit tests, integration tests y compliance tests para IaC.
* Validar la infraestructura antes y después del apply.

### ❓ Problema real que resuelve

El código Terraform "aplica" no significa que la infraestructura resultante sea correcta: el estado, los outputs, la seguridad o la red pueden estar mal configurados sin que Terraform proteste. El testing de infraestructura valida las propiedades del resultado — como los tests de la app validan su comportamiento.

### 💡 Analogía

El testing de infraestructura es la ITV del coche: que el coche arranque (apply OK) no basta; hay que comprobar frenos, luces y emisiones (estado, red, seguridad). Un coche que arranca pero no frena es exactamente el tipo de infraestructura que "funciona" hasta que mata a alguien.

### 📖 Explicación técnica

* Niveles de testing de IaC:
  * **Unit / static tests**: validar el código sin aplicar — conftest/OPA (políticas sobre el plan), tflint (linting), checkov (security — módulo 11), terratest (mock plan).
  * **Integration tests**: aplicar en un entorno aislado y verificar propiedades reales — Terratest, Kitchen-Terraform: crea infra, testea (¿el endpoint responde? ¿la BD acepta conexiones?), destruye.
  * **Compliance tests**: la infraestructura cumple políticas (encryption, tags, exposición pública).
* Dónde en el pipeline: static tests en CI (rápidos, cada PR); integration tests en dev (tras apply); compliance checks en todos los entornos.
* Buenas prácticas: testear los módulos compartidos, ejecutar tests de integración en entornos efímeros (create → test → destroy), medir cobertura de políticas.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
CI: static tests (tflint, checkov, OPA sobre el plan)
   ↓
Apply en entorno de pruebas
   ↓
Integration tests (Terratest): endpoints, conexiones, estado
   ↓
Compliance checks (policies)
   ↓
Destroy del entorno de pruebas
   ↓
¿Todo OK? → promoción al siguiente entorno
\`\`\`

### 🧪 Ejercicios

1. Añade checkov o tflint a tu pipeline de IaC (static gate).
2. Escribe un test de integración con Terratest para un recurso crítico.
3. Define 3 políticas de compliance y valida tu infraestructura contra ellas.

### ⚠️ Errores comunes

* Creer que apply OK = infraestructura correcta (no verifica propiedades).
* Tests solo estáticos (nunca se valida el resultado real).
* Entornos de prueba permanentes que nadie destruye (coste y drift).
* Políticas sin ejecutar: la compliance está en un documento, no en el pipeline.

### 🔗 Conexión DevOps

El testing de infraestructura es el equivalente IaC del nivel 7 (Testing Automation): conecta políticas/seguridad (módulo 11), plan (módulo 4) y quality gates (nivel 7). Infraestructura sin tests es código sin red de seguridad.
`
export default content
