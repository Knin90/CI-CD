const content = `
## Módulo 7 — Secret failure

### 🎯 Objetivos de aprendizaje

* Diagnosticar fallos de secretos en el pipeline.
* Distinguir secret mal definido, no disponible y con formato incorrecto.
* Proteger secretos durante el debugging.

### ❓ Problema real que resuelve

El pipeline falla porque un secreto no llega, llega vacío, expiró, o el formato es incorrecto — y en el intento de arreglarlo alguien acaba exponiendo el secreto en los logs. Los fallos de secretos son delicados: además de romper el pipeline, un mal manejo puede filtrar credenciales. Diagnosticarlos con método — y sin imprimir valores — es crítico.

### 💡 Analogía

El secreto es la llave del cajón del dinero: si la llave no está en el llavero (no definido), la llave es de otro cajón (entorno equivocado), o el cerrajero la cambió (rotación), no puedes abrir — y mientras buscas, no debes dejar la llave a la vista (logs). El diagnóstico respeta el valor: se verifica la existencia, el entorno y el formato, nunca el contenido.

### 📖 Explicación técnica

* Fallos típicos de secretos:
  * **No definido**: el secret no existe en la plataforma o en el entorno correcto (dev vs prod — nivel 12).
  * **No disponible en el job**: el job no tiene acceso al secret (scope, environment, permissions).
  * **Vacío o con formato incorrecto**: el valor se guardó mal (espacios, saltos de línea, base64), o se leyó de una variable en vez del gestor.
  * **Expirado/rotado**: la credencial cambió en el proveedor pero el secret no.
  * **Escapado incorrecto**: el valor con caracteres especiales rompe el YAML o el shell.
* Método: verifica que el secret existe y en qué entorno → comprueba que el job puede accederlo → valida el formato sin imprimir el valor (longitud, presencia, checksum) → prueba el acceso manual con una herramienta de secretos (no con el pipeline).
* Buenas prácticas: gestor de secretos centralizado (nivel 11), referencia por nombre, entornos separados (nivel 12), rotación automática, y nunca \`echo\` del valor en logs (masking — nivel 11).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job necesita un secreto
   ↓
¿Existe en el gestor y en el entorno correcto?
   ↓
¿El job tiene acceso (scope/permissions)?
   ↓
¿Formato correcto (no vacío, sin caracteres rotos)?
   ↓
El secreto se inyecta al proceso
   ↓
Fallo → verifica cada paso sin imprimir el valor
   ↓
Corrige: definir, dar acceso o arreglar formato
\`\`\`

### 🧪 Ejercicios

1. Crea un secret en dev y úsalo en un job de prod: observa el fallo.
2. Guarda un secret con un salto de línea y diagnostica el error de formato.
3. Documenta cómo verificarías un secret sin exponerlo en logs.

### ⚠️ Errores comunes

* Imprimir el valor del secret en logs "para ver qué pasa" (fuga — nivel 11).
* Secret definido en el entorno equivocado (dev vs prod).
* Confundir "no existe" con "formato incorrecto" (leer el error completo).
* Copiar secretos a variables visibles para debugging (los expones en la UI).

### 🔗 Conexión DevOps

Los secretos conectan con secret management (nivel 11), variables (nivel 11), entornos (nivel 12), authentication (módulo 6) y la seguridad del pipeline (nivel 10). Es el módulo donde el debugging se cruza con la seguridad: diagnosticar sin exponer.
`
export default content
