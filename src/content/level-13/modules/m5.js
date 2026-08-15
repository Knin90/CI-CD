const content = `
## Módulo 5 — Canary

### 🎯 Objetivos de aprendizaje

* Definir canary deployment y la exposición gradual.
* Configurar porcentajes de tráfico y criterios de promoción.
* Automatizar la decisión de continuar o revertir.

### ❓ Problema real que resuelve

¿Cómo saber si una versión funciona en producción sin arriesgar a todos los usuarios? Canary envía la nueva versión a un pequeño porcentaje de tráfico real, la observa con métricas y, si se comporta bien, aumenta gradualmente el porcentaje hasta el 100%. Si algo falla, se revierte con impacto mínimo — el canario muere en la mina antes que los mineros.

### 💡 Analogía

El canario del minero: los mineros llevaban un canario a la mina; si el gas era tóxico, el canario moría antes que ellos. Canary deployment usa un pequeño grupo de usuarios/tráfico como "canario": si la nueva versión los daña, el daño queda contenido y se revierte.

### 📖 Explicación técnica

* **Canary deployment**: exponer la nueva versión a un subconjunto (10%, 5%, un grupo de usuarios) y promocionarla gradualmente según observación.
* Implementaciones: service mesh (Istio/Linkerd) con weight de rutas, load balancers con weighted targets, feature flags (nivel 7), Argo Rollouts en Kubernetes.
* Flujo: deploy canary (5%) → métricas (error rate, latencia, saturation) durante un periodo → si OK, subir a 25% → 50% → 100%; si mal, revertir a 0%.
* Criterios de promoción: comparar métricas del canary contra la baseline (versión estable) — si el error rate o latencia superan umbrales, abortar.
* Diferencias con blue/green: canary no conmuta todo de golpe; expone progresivamente y usa datos reales para decidir.
* Requiere: observabilidad sólida (nivel 18), métricas de negocio, automatización de la decisión.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Versión estable (100% tráfico)
   ↓
Deploy CANARY (5% de tráfico)
   ↓
Observar métricas (error, latencia) vs baseline
   ↓
OK → 25% → 50% → 100% (promoción)
   ↓
Falló → revertir a 0% (canary apagado)
\`\`\`

### 🧪 Ejercicios

1. Configura un canary al 10% con weighted routing (service mesh o load balancer).
2. Define umbrales de error rate/latencia que disparen la reversión automática.
3. Simula una versión con errores y observa cómo se aborta el canary.

### ⚠️ Errores comunes

* Canary sin observabilidad: se sube el porcentaje "a ciegas".
* Umbrales demasiado laxos (el canary "pasa" con errores altos).
* Promoción manual lenta: el canary queda semanas al 5%.
* Canary en servicios sin métricas fiables (la decisión no tiene base).

### 🔗 Conexión DevOps

Canary es la estrategia que más depende de observabilidad (nivel 18) y automatización. Representa la madurez máxima del despliegue: decidir con datos reales de producción. Conecta con progressive delivery (módulo 8) y feature flags (módulo 7).
`
export default content
