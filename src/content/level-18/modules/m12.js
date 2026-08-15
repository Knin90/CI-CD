const content = `
## Módulo 12 — Change failure rate

### 🎯 Objetivos de aprendizaje

* Definir change failure rate (CFR).
* Medir qué proporción de cambios falla en producción.
* Reducir el CFR con testing, despliegues seguros y verificación.

### ❓ Problema real que resuelve

¿Cuántos de tus despliegues salen mal? El CFR mide la proporción de cambios que causan fallos en producción (incidentes, rollbacks, degradaciones). Sin esta métrica, un equipo puede desplegar mucho (frecuencia alta) con una calidad pésima — y nadie lo nota hasta que los incidentes se acumulan. El CFR pone la calidad en números.

### 💡 Analogía

El CFR es el porcentaje de vuelos con aterrizajes forzosos de la aerolínea: no importa solo cuántos vuelos hace (frecuencia), sino cuántos acaban mal. Una aerolínea que vuela mucho pero aterriza mal el 30% de las veces no es ágil: es un peligro. La frecuencia impresiona; el CFR revela.

### 📖 Explicación técnica

* **Change failure rate** (DORA — módulo 9): % de despliegues que requieren corrección (rollback, hotfix, parche) o causan degradación/incidente.
* Fórmula: (cambios que fallaron en producción / cambios totales) × 100.
* Niveles DORA: Elite (0-15%), High (16-30%), Medium (31-45%), Low (>45%).
* Qué cuenta como fallo: rollback, hotfix, degradación de SLO, incidente post-deploy (no solo "pipeline rojo" — el fallo es en producción).
* Cómo reducirlo:
  * Testing fuerte en CI (nivel 7) y verificación post-deploy (módulo 1).
  * Despliegues progresivos: canary (nivel 13) — el fallo se detecta con impacto mínimo.
  * Feature flags (nivel 13): apagar funciones rotas sin rollback completo.
  * Preproducción fiel (staging — nivel 12).
* El CFR se mejora junto con la frecuencia (módulo 10): la madurez es desplegar seguido Y con pocos fallos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Deploy a producción
   ↓
¿Causó fallo? (incidente / rollback / hotfix / degradación)
   ↓
Sí → cuenta como failure
   ↓
CFR = fallos / total deploys
   ↓
Análisis de causas → mejora (testing, canary, flags)
\`\`\`

### 🧪 Ejercicios

1. Calcula tu CFR del último trimestre (usa incidentes y rollbacks reales).
2. Clasifica tus últimos fallos de producción: ¿qué los habría evitado?
3. Propón 3 medidas para bajar el CFR (canary, tests E2E, flags).

### ⚠️ Errores comunes

* No contar los rollbacks silenciosos (el CFR queda maquillado).
* Contar "pipeline rojo" como fallo de producción (es fallo de CI, distinto).
* Ignorar los fallos sin incidente formal (degradación que nadie reportó).
* Buscar CFR = 0 a toda costa (puede significar que no se despliega nada).

### 🔗 Conexión DevOps

El CFR es la tercera DORA metric: conecta testing (nivel 7), verificación (módulo 1), despliegues progresivos (nivel 13) y la cultura de no-blame (nivel 23) que permite medir fallos sin miedo.
`
export default content
