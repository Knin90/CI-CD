const content = `
## Módulo 3 — Recreate deployment

### 🎯 Objetivos de aprendizaje

* Definir recreate deployment y su modelo de downtime.
* Entender cuándo es aceptable (y cuándo no).
* Configurarlo y gestionar su ventana de indisponibilidad.

### ❓ Problema real que resuelve

A veces la simplicidad vale más que el zero downtime: entornos de desarrollo, aplicaciones internas o servicios sin estado pueden permitirse "apagar todo y encender lo nuevo". Recreate deployment es la estrategia más simple y predecible: elimina todas las instancias viejas y crea las nuevas. El coste es una ventana de indisponibilidad total.

### 💡 Analogía

Recreate es el cambio de cartel del cine: se apaga el proyector, se cambia la película y se vuelve a encender. Nadie ve la película durante el cambio, pero el proceso es simple y no hay riesgo de "mezcla de películas".

### 📖 Explicación técnica

* **Recreate deployment**: terminar todas las instancias de la versión actual y crear todas las de la nueva.
* Flujo: scale down a 0 → deploy nuevo → scale up → health checks.
* Ventajas: simple, sin coexistencia de versiones, sin problemas de compatibilidad entre versiones, ideal para datos de estado que no soportan dos versiones (migraciones destructivas).
* Desventajas: downtime total (segundos o minutos), sin degradación gradual, rollback también implica downtime.
* Cuándo usarlo: dev/test, aplicaciones por lotes, servicios internos tolerantes a downtime, migraciones incompatibles.
* En Kubernetes: estrategia \`Recreate\` en el Deployment; en cloud: detener/arrancar grupos completos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Eliminar TODAS las instancias viejas
   ↓
Ventana de downtime (app no disponible)
   ↓
Crear TODAS las instancias nuevas
   ↓
Health checks
   ↓
Listo (versión nueva al 100%)
\`\`\`

### 🧪 Ejercicios

1. Configura un Deployment con estrategia \`Recreate\` y observa el downtime.
2. Compara el tiempo total con un rolling deployment.
3. Decide en qué entorno de tu proyecto usarías recreate y justifícalo.

### ⚠️ Errores comunes

* Usar recreate en producción con tráfico real (downtime inaceptable).
* Asumir que el downtime es "un momento" sin medirlo.
* Rollback con recreate: doble downtime.
* No avisar a los usuarios/consumidores de la ventana de indisponibilidad.

### 🔗 Conexión DevOps

Recreate es la estrategia base contra la que se comparan las demás. Entenderla aclara por qué existen rolling, blue/green y canary — todas nacen para eliminar la ventana de downtime que recreate acepta.
`
export default content
