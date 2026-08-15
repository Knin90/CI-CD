const content = `
## Módulo 9 — Build once, deploy many

### 🎯 Objetivos de aprendizaje

* Construir un único artefacto para todos los entornos.
* Configurar por entorno, no reconstruir por entorno.
* Evitar "build por entorno" y sus riesgos.

### ❓ Problema real que resuelve

El anti-patrón clásico: un build para dev, otro para staging y otro para prod (con variables inline). Cada entorno ejecuta una versión distinta del "mismo" código — lo que se testeó en staging no es lo que corre en prod, y los bugs aparecen solo en producción. "Build once, deploy many" (nivel 8 y 23) construye UN artefacto y lo configura por entorno en el deploy: el mismo binario, distinta configuración.

### 💡 Analogía

"Build once, deploy many" es el mismo coche con distinta gasolina según el país: el coche (artefacto) es idéntico donde sea; solo cambia el ajuste (config: idioma del tablero, octanaje, reglas locales). Construir por entorno es fabricar un coche distinto para cada país — y luego descubrir que el de Francia no funciona en España.

### 📖 Explicación técnica

* **Build once**: el pipeline construye el artefacto UNA vez (tag inmutable — módulo 8) y lo publica al registry/almacén.
* **Deploy many**: cada entorno descarga ESE artefacto y lo configura en el deploy (nivel 11-12):
  * Variables de entorno por entorno (URLs, log level, feature flags — nivel 11).
  * Secrets del gestor de cada entorno (nivel 11-12).
  * Manifiestos/values por entorno (nivel 14, 21).
* Beneficios: lo testeado es lo desplegado, el rollback apunta a un artefacto conocido (módulo 18 de 22), y el CD es coherente entre entornos (nivel 17 de 22).
* Anti-patrón: inyectar la configuración en el build (\`--build-arg ENV=prod\` para cambiar comportamiento) — eso crea artefactos distintos por entorno (nivel 8).
* Excepción razonable: parámetros de compilación que SÍ deben variar (arquitectura, plataforma — matrix — nivel 19) — pero no la configuración de entorno.
* Buenas prácticas: el build genera el artefacto neutral; el deploy inyecta la configuración; verificación por entorno (nivel 20 de 22).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Build UNA vez → artefacto inmutable
   ↓
Publica al registry/almacén
   ↓
Dev: descarga el artefacto + config dev
   ↓
Staging: mismo artefacto + config staging
   ↓
Prod: mismo artefacto + config prod
   ↓
Lo verificado = lo desplegado (mismo digest)
\`\`\`

### 🧪 Ejercicios

1. Identifica si tu pipeline reconstruye por entorno y corrígelo.
2. Mueve la configuración del build al deploy (variables/values).
3. Verifica que dev, staging y prod usan el mismo digest.

### ⚠️ Errores comunes

* \`--build-arg ENV=\` para cambiar comportamiento (artefactos distintos — módulo 8).
* Variables hardcodeadas en el build (no configurables en el deploy — nivel 11).
* "Es que prod necesita otra compilación" (suele ser configuración, no build).
* Verificar un build en staging y desplegar otro en prod.

### 🔗 Conexión DevOps

"Build once, deploy many" conecta con artefactos inmutables (módulo 8), variables y entornos (nivel 11-12), Docker (nivel 9), registries (nivel 8) y CD (nivel 12-13). Es el principio que garantiza que el pipeline entrega lo mismo que verificó.
`
export default content
