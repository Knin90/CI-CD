const content = `
## Módulo 8 — Docker failure

### 🎯 Objetivos de aprendizaje

* Diagnosticar fallos de build y ejecución de contenedores.
* Resolver errores de capas, contexto, red y recursos.
* Depurar contenedores sin romper el pipeline.

### ❓ Problema real que resuelve

El build de Docker falla: la capa no encuentra el archivo, el contexto es enorme, el contenedor muere al arrancar, no hay memoria o la imagen no se puede ejecutar. En CI/CD, Docker es omnipresente (nivel 9) y sus fallos detienen builds y despliegues. Diagnosticar contenedores — capas, contexto, entrypoint, recursos — es una habilidad esencial del troubleshooting.

### 💡 Analogía

La imagen Docker es la receta de la comida congelada: cada capa es un paso de la receta, y el Dockerfile es la receta escrita. Si la receta dice "añade el archivo" pero no lo copiaste al tupper (contexto), o el horno (daemon) no tiene espacio, la comida no sale. Y si el plato final (entrypoint) está mal, se descongela pero no se puede comer.

### 📖 Explicación técnica

* Fallos típicos de build:
  * **Archivo no encontrado**: \`COPY\` referencia un archivo que no está en el contexto (build context ≠ directorio actual).
  * **Contexto enorme**: el build sube todo el directorio (sin \`.dockerignore\`) — lento y a veces falla por tamaño.
  * **Capa corrupta o caché**: fallos intermitentes por caché de capas (nivel 9).
  * **Red**: no descarga la base image o los paquetes (proxy, DNS, auth al registry).
  * **Recursos**: memoria/CPU del daemon agotados, disco lleno.
* Fallos de ejecución: entrypoint que no arranca, puerto equivocado, comando inexistente, app que muere al instante (logs).
* Método: build local con el mismo contexto → mira la capa exacta que falla → verifica COPY/contexto → recursos del daemon → ejecuta el contenedor en local con los mismos args/env → lee los logs de la app.
* Buenas prácticas: \`.dockerignore\`, contextos mínimos, multi-stage (nivel 9), versiones de imagen inmutables, y healthchecks.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
docker build inicia
   ↓
Envía el contexto (¿qué archivos? .dockerignore)
   ↓
Ejecuta las capas del Dockerfile
   ↓
¿Falla una capa? → lee el mensaje de esa capa
   ↓
¿COPY? contexto / ¿red? daemon / ¿recursos? límites
   ↓
Reproduce el contenedor en local
   ↓
Arregla: contexto, Dockerfile, o recursos
\`\`\`

### 🧪 Ejercicios

1. Crea un \`COPY\` de un archivo que no está en el contexto y diagnostícalo.
2. Añade un \`.dockerignore\` y mide la diferencia de tamaño del contexto.
3. Ejecuta un contenedor que muere al instante y encuentra el error en los logs.

### ⚠️ Errores comunes

* Build local OK vs CI falla (diferencias de contexto, daemon, red o arquitectura).
* Sin \`.dockerignore\` (contextos gigantes que lentan o rompen el build).
* \`latest\` en base images (cambios impredecibles — nivel 9).
* Confundir error de build (imagen) con error de runtime (entrypoint).

### 🔗 Conexión DevOps

Docker conecta con Docker en CI/CD (nivel 9), registries (módulo 9), Kubernetes (nivel 14) y container security (nivel 10). Es el troubleshooting del contenedor: la misma imagen debe construirse y ejecutarse igual en local, CI y producción.
`
export default content
