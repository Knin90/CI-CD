const content = `
## Módulo 1 — Artifacts

### 🎯 Objetivos de aprendizaje

* Definir artefacto en el contexto de entrega de software.
* Clasificar los tipos de artefactos.
* Explicar por qué el artefacto es el objeto central del pipeline.

### ❓ Problema real que resuelve

El código fuente no se despliega: se despliegan sus productos (binarios, imágenes, paquetes). El artefacto es el objeto que viaja por el pipeline y llega a producción: lo que se construye, se prueba, se almacena y se promueve. Centralizar el artefacto — su identidad, su versión, su trazabilidad — es lo que hace reproducible y auditable la entrega.

### 💡 Analogía

El artefacto es la botella de vino terminada: el viñedo (código) produce el vino (build), se embotella y etiqueta (versión), se almacena en la bodega (registry) y se distribuye a las tiendas (entornos). Nadie distribuye uvas sueltas con instrucciones de vinificación: se distribuye el producto terminado, verificable y etiquetado.

### 📖 Explicación técnica

* **Artefacto**: resultado empaquetado del proceso de build, con identidad y metadatos, listo para almacenarse, distribuirse y desplegarse.
* Tipos:
  * **Binarios/ejecutables** (compilados).
  * **Paquetes** (npm, wheel, jar — unidades de distribución con dependencias).
  * **Imágenes de contenedor** (OCI: layers, tags, digests).
  * **Bundles/archivos de distribución** (tar.gz, zip, releases).
* El artefacto lleva: versión, commit, hash/digest, fecha, firma.
* En el pipeline: CI lo produce y verifica; CD lo consume y despliega. Es la frontera entre ambos (nivel 0: CI vs CD).
* Propiedades del artefacto profesional: inmutable, verificable, versionado, trazable al código.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Código fuente
  │
  ▼
Build (compilar, empaquetar)
  │
  ▼
ARTEFACTO (con identidad: versión + hash + commit)
  │
  ├── Verificación (smoke, firma)
  ├── Almacenamiento (registry)
  ├── Promoción (staging → producción)
  └── Trazabilidad (¿de qué código proviene?)
\`\`\`

### 💻 Ejemplo básico

Identidad de un artefacto:

\`\`\`text
Imagen:  registry.example.com/app:v1.4.0@sha256:9f86d081...
Paquete: app-1.4.0.tar.gz
Binario: app-linux-amd64-v1.4.0
  │
  ├── v1.4.0      → versión (tag de release)
  ├── sha256:...  → digest (integridad)
  └── (metadatos) → commit, fecha, firma
\`\`\`

### 🏢 Caso de uso profesional

Una plataforma centraliza sus artefactos en un registry corporativo: cada build publica la imagen con su digest y su firma; los despliegues referencian el digest exacto. En una auditoría, responden "¿qué artefacto se desplegó ayer en producción?" con la imagen exacta, su hash, su firma y el commit de origen — trazabilidad completa del objeto central.

### ⚠️ Errores comunes

* Tratar los artefactos como detalles (sin identidad ni metadatos).
* Artefactos mutables (sobrescribir la misma versión).
* Desplegar código reconstruido en vez del artefacto.
* Sin firma ni digest: no se puede verificar autenticidad.
* Artefactos sin relación con el commit (no trazables).

### 📋 Lo que debes recordar

* El artefacto es el objeto central del pipeline: lo que viaja hasta producción.
* Tipos: binarios, paquetes, imágenes, bundles.
* Propiedades: inmutable, versionado, verificable, trazable.
* CI produce; CD consume; la identidad lo conecta todo.

### 🧪 Autoevaluación rápida

1. ¿Qué es un artefacto en la entrega de software?
2. ¿Qué propiedades debe tener un artefacto profesional?
3. ¿Por qué el artefacto es la frontera entre CI y CD?

---

1. El resultado empaquetado del build con identidad y metadatos, listo para almacenar, distribuir y desplegar.
2. Inmutabilidad, versionado, verificabilidad (digest/firma) y trazabilidad al código.
3. Porque CI produce y valida el artefacto, y CD lo consume para desplegar: es el objeto que cruza de una fase a otra.
`
export default content
