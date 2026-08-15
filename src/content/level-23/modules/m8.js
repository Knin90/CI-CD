const content = `
## Módulo 8 — Immutable artifacts

### 🎯 Objetivos de aprendizaje

* Crear artefactos inmutables y trazables.
* Usar tags/digests que no cambian.
* Desplegar siempre el mismo artefacto verificado.

### ❓ Problema real que resuelve

"¿Qué versión está en producción?" es una pregunta que no debería existir: si los artefactos son mutables (el tag \`latest\` se sobreescribe, el artifact se reconstruye), nunca se sabe qué se está ejecutando — y el rollback es imposible (nivel 18 de 22). Los artefactos inmutables (nivel 8) identifican una versión única para siempre: el deploy despliega exactamente lo que se construyó y se verificó.

### 💡 Analogía

El artefacto inmutable es la botella de vino con añada: "Rioja 2019" identifica una cosecha única para siempre, y nadie la reetiqueta. El tag \`latest\` es la botella "vino de la casa" que se rellena cada día: hoy puede ser Rioja, mañana Albariño — no sabes qué bebes. El deploy con artefactos inmutables sabe exactamente qué botella abrió.

### 📖 Explicación técnica

* **Artefacto inmutable**: una vez creado y publicado, nunca cambia. Se identifica por:
  * **Tag único**: basado en el commit (\`app:sha-abc123\`) o semver (\`1.2.3\`) (nivel 8 y 14).
  * **Digest**: \`repo/app@sha256:...\` — identificación criptográfica del contenido (nivel 14): si el contenido cambia, el digest cambia.
* Reglas:
  * El tag de versión se crea UNA vez (build once — módulo 9) y se promociona entre entornos sin reconstruir (nivel 8).
  * \`latest\` es solo una etiqueta cómoda para dev, nunca para producción (nivel 14).
  * El artefacto verificado (tests, scan — nivel 10) es exactamente el que se despliega (build once, deploy many — módulo 9).
* Beneficios: trazabilidad (saber qué corre), rollback confiable (módulo 18 de 22), auditoría (nivel 23), y debug reproducible (nivel 22: "¿qué versión?" deja de ser misterio).
* Buenas prácticas: tag por commit o digest, promoción por tags de estado (nivel 8), y prohibir sobreescribir tags publicados (nivel 22 de 22).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Build → artefacto con tag único (sha/semver)
   ↓
Se publica UNA vez (inmutable)
   ↓
Tests y scan verifican ese artefacto exacto
   ↓
Promoción entre entornos (sin reconstruir)
   ↓
Producción despliega el mismo digest
   ↓
Rollback = volver a un artefacto que sigue existiendo
\`\`\`

### 🧪 Ejercicios

1. Publica una imagen con tag por commit y verifica su digest.
2. Intenta sobreescribir un tag publicado y observa la política.
3. Documenta qué versión exacta corre en cada entorno.

### ⚠️ Errores comunes

* \`latest\` en producción (no se sabe qué corre — nivel 14).
* Reconstruir por entorno (cada entorno una versión distinta del "mismo" build — módulo 9).
* Tags sobreescritos (el rollback apunta a algo que ya no es lo que era).
* Artefactos sin digest (no verificables criptográficamente).

### 🔗 Conexión DevOps

Los artefactos inmutables conectan con artifacts (nivel 8), build once deploy many (módulo 9), tags y registries (nivel 8 y 22), rollback (módulo 18 de 22) y trazabilidad (nivel 23). Son la base de un CD confiable: lo que se verificó es lo que se despliega.
`
export default content
