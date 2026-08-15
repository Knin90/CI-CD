const content = `
## Módulo 10 — Test coverage

### 🎯 Objetivos de aprendizaje

* Explicar qué mide la cobertura y sus limitaciones.
* Generar y publicar cobertura en el pipeline.
* Usar umbrales de cobertura como quality gate.

### ❓ Problema real que resuelve

"¿Cuánto del código está probado?" — la cobertura responde con un número (líneas, ramas, funciones ejecutadas por los tests). Permite detectar zonas sin probar (código muerto de riesgo) y establecer umbrales mínimos. PERO la cobertura es un proxy: un 100% de cobertura con tests triviales no garantiza calidad. Se usa bien como guardarraíl, no como meta.

### 💡 Analogía

La cobertura es como saber qué porcentaje de la casa tiene cámaras de seguridad: 100% significa que no hay rincones sin vigilar, pero no dice si las cámaras graban bien (tests con buena aserción) o si miran a la pared. La cobertura indica DÓNDE hay vigilancia; la calidad de los tests indica CÓMO vigila.

### 📖 Explicación técnica

Tipos de cobertura:

* **Líneas**: % de líneas ejecutadas.
* **Ramificaciones (branches)**: % de caminos if/else ejecutados.
* **Funciones**: % de funciones llamadas.
* La cobertura de **ramas** es más significativa que la de líneas.

Herramientas: c8/Istanbul (JS), coverage.py (Python), JaCoCo (Java), Go cover.

En el pipeline:

* Generar el reporte (LCOV, Cobertura XML, JaCoCo XML).
* Publicarlo (artifacts, badges, PR comments).
* **Umbral** (quality gate): fallar si la cobertura baja del mínimo (ej: < 80% de líneas).
* Umbrales por área: código crítico (pagos) con umbral alto; utilidades con umbral bajo.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Tests + instrumentación de cobertura
  │
  ▼
Reporte: líneas 82%, ramas 71%, funciones 90%
  │
  ▼
Comparación con el umbral
  ├── ¿82% >= 80%? → pasa el gate
  └── ¿74% < 80%? → FAIL → el pipeline se detiene
  │
  ▼
Publicación: badge + reporte por archivo
\`\`\`

### 💻 Ejemplo básico

Umbral de cobertura en CI (Jest):

\`\`\`json
{
  "jest": {
    "collectCoverage": true,
    "coverageThreshold": {
      "global": { "lines": 80, "branches": 70 }
    }
  }
}
\`\`\`

\`\`\`bash
npx jest --coverage --coverageReporters=lcov,text
\`\`\`

### 🏢 Caso de uso profesional

Un equipo de pagos fija umbrales por módulo: la lógica de transacciones exige 90% de ramas; las utilidades 60%. El pipeline falla el PR si la cobertura baja. Con el tiempo, la cobertura de ramas del módulo crítico sube de 55% a 88% porque los PRs nuevos deben mantener el umbral — la cobertura como guardarraíl empujó la calidad sin convertirse en una meta vacía.

### ⚠️ Errores comunes

* Optimizar el porcentaje en vez de la calidad (tests triviales).
* Umbrales por debajo del estado actual (gate sin función).
* Cobertura sin ramas (el número miente).
* Ignorar zonas críticas sin cubrir aunque el global pase.
* Cobertura como meta final en vez de señal.

### 📋 Lo que debes recordar

* La cobertura mide QUÉ se ejecuta, no cómo de bien se verifica.
* Ramas > líneas en significado.
* Umbrales como guardarraíl: falla si baja.
* El 100% con tests triviales es falsa seguridad.

### 🧪 Autoevaluación rápida

1. ¿Qué tipos de cobertura existen y cuál es más significativa?
2. ¿Cómo se usa la cobertura como quality gate?
3. ¿Por qué la cobertura no garantiza calidad?

---

1. Líneas, ramas y funciones; la de ramas es más significativa porque cubre caminos de decisión.
2. Definiendo umbrales mínimos: el pipeline falla si la cobertura baja del umbral.
3. Porque mide cuánto código se ejecuta, no si las verificaciones son correctas: un test sin aserciones útiles suma cobertura y no detecta nada.
`
export default content
