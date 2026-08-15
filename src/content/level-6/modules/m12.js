const content = `
## Módulo 12 — Build metadata

### 🎯 Objetivos de aprendizaje

* Definir qué metadatos debe llevar un artefacto.
* Inyectar versión, commit y build number en el artefacto.
* Usar los metadatos para trazabilidad y debug.

### ❓ Problema real que resuelve

"¿Qué versión está corriendo en producción?" es imposible de responder si el artefacto no lleva su identidad. Los metadatos del build (versión, commit, fecha, build number, branch) se inyectan en el artefacto y en la aplicación: cada ejecución puede decir exactamente de qué código proviene. Sin metadatos, el debug de producción es adivinar.

### 💡 Analogía

Los metadatos del build son como la matrícula del coche: identifica el vehículo (versión), su fabricación (build date), su origen (commit) y su historial (build number). Sin matrícula, cuando un coche se avería (bug en producción) no sabes qué modelo es ni de qué lote salió.

### 📖 Explicación técnica

Metadatos típicos:

* **Versión**: v1.4.0 (tag de la release).
* **Commit SHA**: el commit exacto del build.
* **Build number**: número de ejecución (incremento).
* **Branch/ref**: de dónde se construyó.
* **Fecha y trigger**: cuándo y por qué se construyó.
* **Identidad del artefacto**: hash de la imagen/binario.

Inyección:

* **Go**: \`-ldflags "-X main.version=..."\`.
* **Node**: \`__APP_VERSION__\` en el bundle, \`import.meta.env\`.
* **Java**: manifest del jar, \`Implementation-Version\`.
* **Imágenes**: LABEL en el Dockerfile, tags con versión.
* **Generales**: archivo \`version.json\` generado por el pipeline y empaquetado.

Uso:

* Endpoint \`/health\` o \`/version\` de la app expone los metadatos.
* Los logs de la app incluyen la versión.
* La trazabilidad vincula: incidente → versión → commit → PR → changelog.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline calcula los metadatos:
  version=v1.4.0, commit=abc123, build=4521
  │
  ▼
Inyección en el artefacto (ldflags, env, manifest)
  │
  ▼
App expone: GET /version → { "version": "v1.4.0", "commit": "abc123" }
  │
  ▼
Incidente en prod → se consulta /version → se traza al commit y PR
\`\`\`

### 💻 Ejemplo básico

Metadatos con Go:

\`\`\`bash
go build -ldflags \\
  "-X main.version=\$(git describe --tags) \\
   -X main.commit=\$(git rev-parse --short HEAD) \\
   -X main.buildTime=\$(date -u +%Y%m%d%H%M%S)" \\
  -o app .
\`\`\`

### 🏢 Caso de uso profesional

Un incidente en producción: los usuarios ven errores de pago. El equipo consulta \`/version\` del servicio afectado: v1.4.2, commit \`9f3a2c1\`. Con el commit, localizan el PR mergeado, revisan el changelog y despliegan la v1.4.3 con el fix. Sin metadatos, el diagnóstico habría tomado horas rastreando qué se desplegó y cuándo.

### ⚠️ Errores comunes

* Artefactos sin versión ni commit (imposibles de trazar).
* Metadatos a mano (olvidos e inconsistencias).
* Versión hardcodeada que no cambia con el tag.
* No exponer los metadatos en la app (health/version).
* Metadatos sin relación con el tag del git (versión que no existe).

### 📋 Lo que debes recordar

* Todo artefacto lleva identidad: versión, commit, build number.
* Inyéctala en el build (ldflags, env, manifest).
* Exponla en la app (/version, /health, logs).
* La trazabilidad incidente → versión → commit es la clave del debug.

### 🧪 Autoevaluación rápida

1. ¿Qué metadatos debe llevar un artefacto?
2. ¿Cómo se inyectan en un binario Go?
3. ¿Por qué la app debe exponer su versión?

---

1. Versión (tag), commit SHA, build number, branch/ref y fecha de construcción.
2. Con \`-ldflags "-X main.version=... -X main.commit=..."\` al compilar.
3. Para que en un incidente se identifique al instante qué código corre en producción y se trace al commit y PR responsable.
`
export default content
