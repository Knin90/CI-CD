const content = `
## Módulo 2 — Rolling deployment

### 🎯 Objetivos de aprendizaje

* Definir rolling deployment y cómo funciona.
* Configurar rolling updates con salud y control de velocidad.
* Conocer ventajas, limitaciones y cuándo usarlo.

### ❓ Problema real que resuelve

Cambiar todas las instancias de golpe significa downtime o riesgo total. El rolling deployment reemplaza las instancias de la aplicación de forma gradual: algunas nuevas, algunas viejas, hasta completar el cambio. Así, si la nueva versión falla, el impacto se limita a una fracción de los usuarios y se puede frenar.

### 💡 Analogía

El rolling deployment es el relevo de la carrera de postas: los corredores no cambian todos a la vez en la meta; se van pasando el testigo de forma escalonada mientras la carrera continúa. En cualquier momento hay corredores nuevos y viejos en pista.

### 📖 Explicación técnica

* **Rolling deployment**: reemplazo gradual de instancias/version, una (o N) a la vez, hasta completar la actualización.
* Controladores típicos: Kubernetes Deployments (RollingUpdate), Elastic Beanstalk, grupos de autoescalado en cloud.
* Parámetros clave: \`maxUnavailable\` (cuántas instancias pueden estar caídas durante el update), \`maxSurge\` (cuántas instancias extra se pueden crear), tamaño de lote, intervalo entre lotes.
* Flujo: instancia nueva se crea → health check → si pasa, se sigue; si falla, se pausa el rollout (el nuevo Deployment queda en estado degradado).
* Durante el rollout conviven versiones: la app debe tolerar versiones mezcladas (compatibilidad de APIs, migraciones).
* Ventajas: sin downtime, sin duplicar infraestructura completa. Limitaciones: la versión vieja y la nueva coexisten, difícil de controlar el porcentaje exacto de tráfico.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Deploy nueva versión (ReplicaSet nuevo)
   ↓
Instancia a instancia: crear nueva → health OK → eliminar vieja
   ↓
maxUnavailable = 0 → nunca baja la capacidad mínima
   ↓
Health check falla → rollout se pausa
   ↓
Completado → todas las instancias nuevas
\`\`\`

### 🧪 Ejercicios

1. Configura un rollout con \`maxUnavailable: 0\` y \`maxSurge: 1\` en Kubernetes.
2. Rompe la nueva versión (health check que falla) y observa cómo se pausa el rollout.
3. Mide el tiempo total de un rollout completo.

### ⚠️ Errores comunes

* \`maxUnavailable\` alto: se cae más capacidad de la tolerable durante el update.
* Sin health checks: el rollout "pasa" con instancias rotas.
* Aplicaciones que no toleran versión mezclada (migraciones incompatibles).
* Asumir que el rollout es instantáneo: durante minutos conviven dos versiones.

### 🔗 Conexión DevOps

Rolling es la estrategia por defecto de muchos orquestadores (Kubernetes). Se combina con health checks (nivel 14), zero downtime (módulo 11 de este nivel) y observabilidad (nivel 18) para detectar problemas durante la transición.
`
export default content
