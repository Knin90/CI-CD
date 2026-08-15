const content = `
## Módulo 15 — Quality gates

### 🎯 Objetivos de aprendizaje

* Definir quality gates con criterios explícitos.
* Hacer que los gates bloqueen o dejen pasar según umbrales.
* Evitar gates que no significan nada.

### ❓ Problema real que resuelve

El pipeline pasa pero la calidad no se mide: cobertura baja, tests rotos que se ignoran, deuda acumulada. Los quality gates (nivel 23 y 20) definen umbrales explícitos — cobertura mínima, tests pasando, vulnerabilidades críticas en cero — y el pipeline los aplica: si no se cumple el umbral, el flujo se detiene. Resuelve el "pasa pero está mal".

### 💡 Analogía

El quality gate es el control de calidad de la fábrica: cada lote (build) pasa por la báscula (umbral) — peso mínimo, piezas completas, sin defectos visibles. Si el lote no cumple, no sale al mercado (no se despliega). Un control que deja pasar todo (gate "que siempre pasa") es un control de mentira: da seguridad falsa y el lote malo llega igual al cliente.

### 📖 Explicación técnica

* **Quality gate**: criterio explícito y medible que el pipeline aplica antes de avanzar (nivel 7 y 20):
  * **Cobertura mínima** de tests (con tendencia: no bajar de X%, no empeorar).
  * **Vulnerabilidades críticas/altas en cero** (nivel 10).
  * **Tests verdes** (todos, sin excepciones silenciosas — módulo 4 de 22).
  * **Lint/estilo sin errores** (nivel 20).
  * **Builds de artefactos válidos** (módulo 8).
  * **Deuda/código duplicado** bajo umbral (nivel 20 de este nivel).
* El gate debe:
  * Tener un **umbral real**: "cobertura ≥ 80%" se aplica y bloquea; "no empeorar" requiere historia (nivel 18).
  * **Fracasar de forma visible**: el job rojo dice QUÉ gate no se cumplió y por cuánto.
  * **Ser revisable**: el umbral se ajusta con datos, no por gusto (nivel 18 y 20).
* Gates por etapa: lint/test en CI, scan en seguridad (nivel 10), approval en deploy (nivel 12) — cada etapa su gate (módulo 4 de este nivel).
* Buenas prácticas: pocos gates con umbrales claros (no 30 métricas que nadie entiende), gates que reflejan el riesgo real, y revisar periódicamente si los umbrales siguen siendo útiles.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline avanza por etapas
   ↓
Cada etapa aplica su gate
   ↓
¿Cobertura ≥ 80%? ¿Vulns críticas = 0? ¿Tests verdes?
   ↓
NO → job rojo con el umbral fallado
   ↓
SÍ → avanza a la siguiente etapa
   ↓
El deploy solo ve código que pasó todos los gates
\`\`\`

### 🧪 Ejercicios

1. Define 3 quality gates con umbrales explícitos para tu pipeline.
2. Configura uno que falle de verdad y observa el bloqueo.
3. Revisa si algún gate tuyo "siempre pasa" y corrígelo.

### ⚠️ Errores comunes

* Gates que siempre pasan (no protegen — módulo 13).
* Umbrales sin contexto (cobertura "global" que esconde módulos sin tests).
* Demasiados gates (el pipeline se bloquea por cualquier cosa — módulo 4).
* Excepciones silenciosas (un test que "no cuenta" — módulo 4 de 22).

### 🔗 Conexión DevOps

Los quality gates conectan con testing (nivel 7), cobertura (nivel 7 y 20), security (nivel 10), branch protection (módulo 13) y observabilidad de la calidad (nivel 18). Son la traducción de "calidad" a umbrales que el pipeline puede aplicar — y que el equipo entiende.
`
export default content
