const content = `
## Módulo 5 — Mock deployments

### 🎯 Objetivos de aprendizaje

* Probar el pipeline con despliegues simulados.
* Usar entornos de prueba sin infraestructura real.
* Verificar la lógica del deploy sin riesgo.

### ❓ Problema real que resuelve

Probar el pipeline de despliegue contra infraestructura real es caro y arriesgado: el primer "deploy de prueba" ya toca algo real. Los mock deployments simulan el despliegue — la lógica del pipeline corre completa, pero el destino es un mock (dry-run, entorno falso, servicio simulado) — validando el flujo sin tocar producción.

### 💡 Analogía

El mock deployment es el simulador de vuelo del piloto: el piloto ejecuta el procedimiento completo — despegue, checklist, aterrizaje — pero el avión es un simulador (mock). Si el procedimiento falla, no hay accidente: hay aprendizaje. El primer vuelo real (deploy real) se hace con el procedimiento ya probado.

### 📖 Explicación técnica

* **Mock deployment**: ejecutar el pipeline de despliegue contra un destino simulado.
* Técnicas:
  * **Dry-run de las herramientas**: \`kubectl apply --dry-run=server\` (nivel 14), \`terraform plan\` (nivel 15), \`ansible --check\` (nivel 16) — la lógica corre, nada cambia.
  * **Entornos mock**: un "cluster de mentira" (kind/k3s local), un registry falso, un cloud emulado (localstack, minikube).
  * **Mocks de servicios externos**: API simulada, proveedor de cloud falso.
  * **Stubs de pasos**: reemplazar el paso real (deploy a prod) por un stub que simula el resultado (éxito/fallo).
* Qué se valida: la secuencia del pipeline (¿los stages avanzan?), los artifacts fluyen, las condiciones se evalúan, las verificaciones funcionan.
* Limitaciones: el mock no valida el comportamiento real del destino (eso lo hace el entorno real de staging — módulo 6) — el mock valida el pipeline, no la infraestructura.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline completo
   ↓
Build real → artifacts reales
   ↓
Deploy: ---> destino MOCK (dry-run / entorno simulado)
   ↓
Verificación simulada (health mock)
   ↓
¿Pipeline correcto? → validado sin riesgo
   ↓
(El deploy real se prueba en staging — módulo 6)
\`\`\`

### 🧪 Ejercicios

1. Ejecuta tu pipeline de deploy en modo dry-run (kubectl/terraform/ansible según tu stack).
2. Simula el destino con un entorno mock (kind, localstack) y corre el pipeline completo.
3. Compara: qué valida el mock y qué solo puede validar el entorno real.

### ⚠️ Errores comunes

* Confiar en el mock como validación final (el destino real puede fallar distinto).
* Mocks que no fallan: el pipeline "pasa" porque el mock nunca falla (no valida manejo de errores).
* Sustituir el deploy real por el mock en staging (nivel 6 se necesita igual).
* Mocks demasiado complejos de mantener (el mock cuesta más que el real).

### 🔗 Conexión DevOps

Los mock deployments conectan el testing de pipelines (nivel 20), las tools de dry-run (niveles 14-16) y los test environments (módulo 6). Son la forma de probar el pipeline sin riesgo.
`
export default content
