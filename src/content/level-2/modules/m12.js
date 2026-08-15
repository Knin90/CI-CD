const content = `
## Módulo 12 — Pipeline logs

### 🎯 Objetivos de aprendizaje

* Explicar qué contienen los logs de un pipeline y dónde consultarlos.
* Usar los logs para diagnosticar fallos paso a paso.
* Aplicar buenas prácticas de logging dentro del pipeline.

### ❓ Problema real que resuelve

Cuando un pipeline falla, la primera pregunta es "¿qué pasó?". Los logs de cada job responden: muestran cada comando ejecutado, su salida y su exit code, en orden cronológico. Sin logs bien estructurados, diagnosticar un fallo es adivinar; con ellos, se identifica el paso exacto y la causa raíz.

### 💡 Analogía

Los logs del pipeline son la caja negra del avión: registran cada evento de la ejecución en orden. Cuando algo sale mal, los investigadores (desarrolladores) la abren y reconstruyen exactamente qué pasó en cada momento, en lugar de especular.

### 📖 Explicación técnica

* Cada job genera un **log con todos sus steps**: comando, salida (stdout/stderr), duración y exit code.
* Los logs se ven en tiempo real durante la ejecución y quedan disponibles al terminar.
* Se organizan por **job y por step**: el fallo se localiza al instante (el step en rojo).
* Buenas prácticas de logging en el pipeline:
  * Pasos con \`name:\` descriptivos.
  * No loguear **secretos** (la plataforma los enmascara; tú no los imprimas).
  * Salidas claras en cada script (\`echo "Etapa 1: instalar deps"\`).
  * Capturar y guardar logs de la aplicación dentro del job (\`artifacts\`) para diagnóstico.
  * En trabajos con muchas salidas, filtrar con \`grep\` sobre el log descargado.
* Los logs se pueden descargar (\`gh run view --log\`, \`curl\` de la API) para análisis local.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job "unit" falló
  │
  ▼
Logs del job (por step)
  ├── Checkout ......... OK (0s)
  ├── Setup Node ....... OK (3s)
  ├── npm ci ........... OK (12s)
  ├── npm test ......... FALLÓ (exit 1)
  │      └── > FAIL tests/checkout.test.js
  │          Error: expected 99 to equal 100
  ▼
Diagnóstico: el test de checkout falla → causa raíz en el código
\`\`\`

### 💻 Ejemplo básico

Descargar y buscar en los logs:

\`\`\`bash
gh run view <run-id> --log > run.log
grep -n "FAIL\|Error:" run.log
# Localizar el step exacto y el mensaje de error
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline de integración falla a las 3am. A la mañana, el equipo abre los logs del job fallido: el paso "E2E tests" falla al conectar con el entorno de staging — un timeout de red de 30 segundos. El log muestra el endpoint y el error exacto; el equipo abre un ticket de infraestructura, no de código. Los logs convirtieron un misterio en un diagnóstico de 5 minutos.

### ⚠️ Errores comunes

* Loguear secretos: credenciales visibles en los logs de la plataforma.
* Scripts sin salidas claras: logs ilegibles.
* Un solo step gigante: el log no indica dónde falló.
* No conservar logs de la aplicación: los errores de runtime quedan fuera del alcance.
* Diagnóstico a ciegas: cambiar código sin mirar los logs del job fallido.

### 📋 Lo que debes recordar

* Los logs muestran cada step con su salida y exit code.
* Localiza el step en rojo: ahí está el fallo.
* Pasos con nombre y salidas claras = logs legibles.
* Nunca imprimas secretos; descarga y filtra logs para analizar.

### 🧪 Autoevaluación rápida

1. ¿Qué información contiene el log de un job?
2. ¿Cómo se localiza rápidamente el fallo en un log?
3. ¿Qué precaución de seguridad debe respetar el logging del pipeline?

---

1. Cada comando ejecutado, su salida (stdout/stderr), su duración y su exit code, organizados por step en orden cronológico.
2. Los logs se agrupan por job y por step: el step fallido aparece en rojo (o con exit code ≠ 0); allí se lee el mensaje de error.
3. Nunca imprimir secretos ni credenciales: la plataforma enmascara los secretos conocidos, pero el código del pipeline no debe loguearlos.
`
export default content
