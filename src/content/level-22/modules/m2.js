const content = `
## Módulo 2 — Build failure

### 🎯 Objetivos de aprendizaje

* Diagnosticar fallos de compilación y empaquetado.
* Distinguir fallos de build de fallos de test o de entorno.
* Usar logs y reproducción local para encontrar la causa.

### ❓ Problema real que resuelve

El build falla: un error de compilación, una dependencia que no resuelve, un empaquetado que produce un artefacto vacío. Sin método, cada fallo de build es una búsqueda desordenada en el log. Aprender a diagnosticar builds — separando el error real del ruido, y reproduciendo fuera del pipeline — hace que los fallos de build sean rápidos de resolver.

### 💡 Analogía

El build failure es la cadena de montaje que se detiene: la pieza (módulo) no encaja con la anterior (dependencia) o la máquina (toolchain) está desconfigurada. El operario no desmonta toda la fábrica: mira la estación donde se detuvo la cadena (primer error), comprueba si la pieza encaja en el banco de pruebas (reproduce en local) y revisa la calibración (versiones, flags).

### 📖 Explicación técnica

* El build falla por 3 causas típicas:
  * **Código**: error de sintaxis o tipo, import que no existe, API rota.
  * **Dependencias**: versión que no resuelve, lockfile desactualizado, registry inaccesible (módulo 3 y 9).
  * **Entorno de build**: versión del runtime (Node, JDK, Go), flags, memoria, herramientas ausentes.
* Método: lee el primer error del compilador → busca el archivo y la línea → reproduce en local con las mismas versiones → verifica si el entorno del pipeline difiere (runtime, cache, variables).
* Preguntas clave: ¿falla siempre o solo en el pipeline? ¿Desde qué commit? ¿Cambió la versión del runtime o una dependencia?
* Buenas prácticas: mensajes de error legibles (el compilador dice qué falta), build reproducible (versionar toolchains — nivel 6), caché limpia para descartar estados corruptos, y separar "build local OK" de "build en CI OK" (las diferencias de entorno son la causa #1).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job de build inicia
   ↓
Descarga dependencias (cache o registry)
   ↓
Compila / empaqueta
   ↓
PRIMER error en el log
   ↓
¿Código, dependencia o entorno?
   ↓
Reproduce en local con las mismas versiones
   ↓
Arregla y vuelve a ejecutar
\`\`\`

### 🧪 Ejercicios

1. Provoca un fallo de build (error de sintaxis) y encuentra el primer error en el log.
2. Cambia una dependencia a una versión inexistente y observa el fallo de resolución.
3. Compara build local vs build en CI: documenta 3 diferencias de entorno posibles.

### ⚠️ Errores comunes

* Leer el final del stack trace (el error real está en el primer frame del código tuyo).
* Rebuild con caché corrupta sin limpiarla (fallo fantasma que persiste).
* Ignorar las versiones del runtime: "en mi máquina compila" suele ser otra versión.
* Cambiar código "a ciegas" en vez de reproducir el fallo primero.

### 🔗 Conexión DevOps

El build failure conecta con build automation (nivel 6), dependencias y lockfiles (módulo 3), cachés (nivel 19) y runners (nivel 4). Es el primer eslabón del troubleshooting: si el build no pasa, nada más del pipeline corre.
`
export default content
