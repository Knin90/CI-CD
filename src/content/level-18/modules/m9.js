const content = `
## Módulo 9 — DORA metrics

### 🎯 Objetivos de aprendizaje

* Conocer las cuatro métricas DORA.
* Medir el desempeño de la entrega de software.
* Usar DORA para mejorar el proceso CI/CD.

### ❓ Problema real que resuelve

¿Tu equipo entrega software rápido y de forma fiable? Sin métricas es una opinión. Las métricas DORA (State of DevOps) miden el desempeño de la entrega con cuatro números comparables: frecuencia de despliegue, lead time, tasa de fallos y tiempo de recuperación — el panel de control del proceso de entrega.

### 💡 Analogía

Las DORA metrics son las estadísticas del equipo de fútbol: goles (frecuencia), rapidez de la jugada (lead time), goles en contra (fallos) y tiempo de reacción tras un gol en contra (recuperación). Un equipo puede sentirse bien jugando; las estadísticas dicen si realmente está ganando de forma sostenible.

### 📖 Explicación técnica

* Las cuatro métricas:
  1. **Deployment frequency** (módulo 10): ¿cada cuánto se despliega a producción? (diario/semanal/mensual).
  2. **Lead time for change** (módulo 11): tiempo del commit a producción.
  3. **Change failure rate** (módulo 12): % de despliegues que causan fallos (incidentes, rollbacks).
  4. **MTTR — Mean Time To Recovery** (módulo 13): tiempo en recuperar el servicio tras un incidente.
* Niveles DORA: Elite (deploy on-demand, lead < 1 día, CFR < 15%, MTTR < 1h), High, Medium, Low.
* Cómo se miden: desde la plataforma CI/CD (deploys, lead time), incidentes (CFR), y post-incidentes (MTTR).
* La relación importa: alta frecuencia sin estabilidad (CFR alto) es falsa velocidad; baja frecuencia con CFR bajo es demasiada cautela.
* Las métricas DORA se mejoran con lo aprendido en todo el curso: pipelines sólidos, despliegues seguros, rollbacks rápidos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
CI/CD genera datos: deploys, commits, lead times
   ↓
Incidentes: cuántos fallos por deploy (CFR)
   ↓
Post-incidentes: tiempo de recuperación (MTTR)
   ↓
Panel DORA del equipo
   ↓
Decisiones de mejora (pipelines, testing, rollback)
\`\`\`

### 🧪 Ejercicios

1. Mide tus cuatro métricas DORA del último trimestre (datos de tu plataforma CI/CD).
2. Clasifica tu equipo en un nivel DORA y justifícalo.
3. Elige una métrica y propón 3 acciones concretas para mejorarla.

### ⚠️ Errores comunes

* Medir DORA "de memoria" (sin datos reales de la plataforma).
* Optimizar una métrica aislada (subir frecuencia ignorando el CFR).
* Usar DORA para evaluar personas (mide el proceso/sistema, no individuos).
* Medir sin actuar: las métricas sin plan de mejora son decoración.

### 🔗 Conexión DevOps

DORA es la métrica del proceso completo: resume todo el curso (pipelines, testing, despliegues, rollback, observabilidad) en cuatro números accionables. Conecta el feedback loop (módulo 14) y la mejora continua (nivel 23).
`
export default content
