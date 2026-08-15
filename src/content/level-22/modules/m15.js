const content = `
## Módulo 15 — Artifact failure

### 🎯 Objetivos de aprendizaje

* Diagnosticar fallos de artifacts entre jobs y niveles.
* Resolver problemas de upload, download y persistencia.
* Asegurar trazabilidad de los artefactos.

### ❓ Problema real que resuelve

El artifact no se sube, el job siguiente no lo encuentra, la descarga da un archivo corrupto o vacío, el artifact expiró antes de llegar a producción. Los artifacts son el puente entre build y deploy (nivel 8): si fallan, el CD se rompe aunque el build sea perfecto. Diagnosticar artifacts — paths, duración, formato — es clave para el flujo completo.

### 💡 Analogía

El artifact es la caja que se pasa entre las estaciones de la fábrica: la estación de montaje (build) la llena y la envía por la cinta (almacén de artifacts), y la estación de entrega (deploy) la recoge. Si la caja está vacía (path equivocado), se pierde en la cinta (expiración), o la etiqueta es ilegible (nombre/formato), la entrega falla — aunque el montaje haya sido perfecto.

### 📖 Explicación técnica

* Fallos típicos:
  * **Path incorrecto**: el upload apunta a un directorio que no existe o está vacío (el build generó el archivo en otro lugar).
  * **Upload fallido**: el archivo es demasiado grande, el formato no está permitido, permisos del almacén.
  * **Download fallido**: el job no tiene acceso, el artifact se eliminó, el path del download no coincide con el del upload.
  * **Expiración**: el artifact caduca antes de que el deploy lo use (políticas de retención — nivel 8).
  * **Corrupto/vacío**: se subió un archivo incompleto, o el job de build terminó sin generar el output.
* Método: verifica que el build GENERÓ el archivo (¿existe? ¿tamaño?) → revisa el path exacto del upload y del download (deben coincidir) → comprueba la política de retención y el scope del job → descarga y valida el artifact (checksum, contenido).
* Buenas prácticas: paths explícitos y consistentes, validar el artifact al subirlo (tamaño, checksum), retención adecuada al flujo (nivel 8), y trazar el artifact por commit (nombre/digest — nivel 8).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job de build termina
   ↓
¿Generó el archivo? (path, tamaño)
   ↓
Upload al almacén de artifacts
   ↓
¿Upload OK? tamaño/permisos/formato
   ↓
Job de deploy descarga
   ↓
¿Existe? ¿vigente? ¿path coincide?
   ↓
Valida (checksum) y despliega
\`\`\`

### 🧪 Ejercicios

1. Configura un upload con un path inexistente y observa el fallo.
2. Reduce la retención de artifacts y haz que el deploy no encuentre el archivo.
3. Valida un artifact descargado con su checksum.

### ⚠️ Errores comunes

* Subir el directorio equivocado (el build genera en \`dist/\` y subes \`build/\`).
* Retención demasiado corta (el deploy llega tarde y el artifact expiró — nivel 8).
* Download sin validar (archivo corrupto que pasa a producción).
* No distinguir "no existe" de "expiró" (cada uno tiene su fix).

### 🔗 Conexión DevOps

Los artifacts conectan con artifacts y package management (nivel 8), build once deploy many (nivel 23), registries (módulo 9) y la trazabilidad (nivel 8). Es el puente del CD: su diagnóstico garantiza que lo construido es exactamente lo desplegado.
`
export default content
