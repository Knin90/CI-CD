const content = `
## Módulo 9 — Registry failure

### 🎯 Objetivos de aprendizaje

* Diagnosticar fallos de container registries.
* Resolver errores de push, pull y autenticación.
* Gestionar tags, digests y limpieza.

### ❓ Problema real que resuelve

El push falla con "denied", "unauthorized" o "no space"; el pull no encuentra la imagen o baja una versión equivocada; el registry se llena y el pipeline no puede publicar. Los registries son el punto de entrega del pipeline (nivel 8): si fallan, el CD se detiene. Diagnosticar registries — auth, tags, espacio, red — es esencial.

### 💡 Analogía

El registry es el almacén central del supermercado: el pipeline lleva los productos nuevos (push) y los entornos los recogen (pull). Si el almacén cierra (registry caído), no admite al proveedor (auth denegada), o las cajas están mal etiquetadas (tags), el supermercado (producción) se queda sin stock — aunque los productos estén perfectos.

### 📖 Explicación técnica

* Fallos de **push**:
  * \`denied\` / \`unauthorized\`: credenciales, permiso de escritura en el repo/namespace (módulo 6).
  * \`no space left\`: cuota del registry o del plan alcanzada — limpieza o retención.
  * \`manifest invalid\`: formato de la imagen, plataforma o digest.
  * Tag existente inmutable: políticas de retención rechazan sobreescribir.
* Fallos de **pull**:
  * \`not found\`: la imagen o el tag no existen (¿se promocionó? ¿se borró? — nivel 8).
  * Tag móvil (\`latest\`): no se sabe qué versión baja (nivel 8 y 14).
  * Auth en pull: los entornos necesitan credenciales de lectura (pull secrets — nivel 14).
* Método: verifica la imagen con \`docker manifest inspect\` o la API del registry → comprueba tag/digest → auth y permisos → cuota y retención → red/errores de transporte.
* Buenas prácticas: tags inmutables por commit (nivel 8), digests para trazabilidad (nivel 14), políticas de retención, y escaneo de imágenes (nivel 10).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline publica la imagen (push)
   ↓
Auth al registry → permisos de escritura
   ↓
¿Cuota? ¿tag inmutable? ¿formato?
   ↓
Imagen publicada
   ↓
Entornos descargan (pull) → auth de lectura
   ↓
¿Not found? tag / digest / promoción
   ↓
Diagnóstico: auth, tags, cuota, red
\`\`\`

### 🧪 Ejercicios

1. Provoca un push con credenciales sin permisos de escritura y lee el error.
2. Borra un tag y observa el fallo de pull en el entorno.
3. Revisa las políticas de retención de tu registry y propón una mejora.

### ⚠️ Errores comunes

* Usar \`latest\` (imagen impredecible — nivel 8).
* Confundir error de auth (401) con error de permisos (403) — módulo 6.
* Push que "funcionaba" y ahora falla: revisar rotación de credenciales y cuota.
* No distinguir pull de push en el diagnóstico (cada uno tiene su propio camino).

### 🔗 Conexión DevOps

Los registries conectan con artifacts (nivel 8), Docker (módulo 8), Kubernetes pull secrets (nivel 14), cloud registries (nivel 21) y la seguridad de imágenes (nivel 10). Es el almacén central: su diagnóstico ordenado mantiene el flujo build → registry → deploy.
`
export default content
