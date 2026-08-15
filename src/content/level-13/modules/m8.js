const content = `
## Módulo 8 — Progressive delivery

### 🎯 Objetivos de aprendizaje

* Definir progressive delivery como evolución del despliegue continuo.
* Combinar canary, feature flags y métricas en un flujo gradual.
* Automatizar la decisión de promoción con datos.

### ❓ Problema real que resuelve

"Todo o nada" ya no es aceptable: liberar una versión a todos los usuarios de golpe maximiza el riesgo. Progressive delivery es el enfoque que combina canary, feature flags y observabilidad para exponer una versión gradualmente, midiendo en cada paso y decidiendo con datos si seguir, pausar o revertir.

### 💡 Analogía

Progressive delivery es abrir una tienda nueva por fases: primero invitas a 10 amigos (canary), les preguntas su opinión (métricas), luego abres a los vecinos (más tráfico) y solo cuando todos están contentos pones el cartel de inauguración (100%). Cada fase te dice si vale la pena seguir.

### 📖 Explicación técnica

* **Progressive delivery**: estrategia integral que expone releases gradualmente usando:
  * **Canary**: porcentaje de tráfico incremental.
  * **Feature flags**: activación por segmento.
  * **Métricas y análisis**: criterios de promoción automáticos (error rate, latencia, SLOs).
  * **Automatización**: la plataforma decide seguir/pausar/revertir sin intervención humana.
* Herramientas: Argo Rollouts (Kubernetes), Flagger (service mesh), LaunchDarkly + observabilidad.
* Análisis automatizado: el rollout compara métricas del canary con la baseline; si se violan umbrales (SLO), hace rollback automático.
* Beneficio: riesgo controlado + velocidad: se libera más rápido porque el fallo cuesta poco.
* Madurez: pasar de "despliegue con suerte" a "despliegue medido".

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Nueva versión
   ↓
Canary 5% + feature flag para segmento
   ↓
Análisis de métricas vs SLO (automático)
   ↓
¿Cumple? → 25% → 50% → 100%
   ↓
¿Violó umbral? → rollback automático + alerta
   ↓
100% estable → limpiar flags/canary
\`\`\`

### 🧪 Ejercicios

1. Diseña un rollout progresivo para tu servicio (pasos, umbrales, duración).
2. Define los SLO que disparan la reversión automática.
3. Compara el flujo manual actual con un progressive delivery automatizado.

### ⚠️ Errores comunes

* Progressive delivery sin SLOs definidos (no hay criterio de decisión).
* Análisis manual lento: el rollout espera a un humano que no mira.
* Exponer progresivamente pero sin canary real (todo a todos, "por fases" en papel).
* Observabilidad insuficiente: los datos no permiten decidir.

### 🔗 Conexión DevOps

Progressive delivery es el punto de unión de este nivel: usa canary (módulo 5), feature flags (módulo 7), observabilidad (nivel 18) y automatización. Es el objetivo de madurez de cualquier equipo de despliegues.
`
export default content
