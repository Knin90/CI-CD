const content = `
## Módulo 13 — Code review

### 🎯 Objetivos de aprendizaje

* Explicar por qué la revisión de código complementa al pipeline, no lo reemplaza.
* Describir buenas prácticas de revisión y cómo integrarla con CI.
* Entender la revisión como transferencia de conocimiento del equipo.

### ❓ Problema real que resuelve

El CI valida que el código **funciona** (tests, build); la revisión humana valida que el código **es el correcto**: diseño, legibilidad, seguridad de negocio, edge cases que ningún test cubre. Además, la revisión distribuye el conocimiento: cada PR revisado es una lección que varios miembros del equipo absorben. Sin revisión, el conocimiento se concentra en autores individuales y los errores de diseño pasan desapercibidos.

### 💡 Analogía

El CI es el inspector de calidad de la fábrica (¿las piezas cumplen especificaciones?); el code review es el comité de diseño (¿el producto tiene sentido? ¿se puede mantener?). Ambos son necesarios: un producto puede cumplir todas las especificaciones y aun así estar mal diseñado, o estar bien diseñado y fallar las especificaciones.

### 📖 Explicación técnica

Buenas prácticas de code review:

* **PRs pequeños**: diffs de pocas líneas se revisan a fondo; los gigantes se escanean.
* **Revisar con intención**: buscar bugs lógicos, edge cases, problemas de seguridad y mantenibilidad, no solo estilo.
* **Comentarios accionables**: señalar el problema y sugerir solución; evitar "esto está mal" sin contexto.
* **CI primero**: el revisor se concentra en la lógica porque los checks ya validaron build/tests/estilo.
* **Aprobaciones explícitas**: el merge requiere N aprobaciones (configurable en la rama protegida).
* **Colaboración, no aprobación**: la revisión es diálogo; el autor responde, ajusta y aprende.
* **Métricas**: tiempo hasta la primera revisión, tamaño de los PRs, tiempo de merge.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
PR abierto
  │
  ▼
CI corre (checks): build ✓ tests ✓ security ✓
  │
  ▼
Revisores leen el diff con contexto
  ├── Comentarios en líneas específicas
  ├── Discusión y ajustes del autor
  │     └── Nuevo push → CI re-corre
  │
  ▼
Aprobación(es) + checks verdes
  │
  ▼
Merge habilitado → merge → CD
\`\`\`

### 💻 Ejemplo básico

Checklist mental del revisor:

\`\`\`text
☐ ¿El cambio resuelve exactamente el problema del ticket?
☐ ¿Hay edge cases sin cubrir?
☐ ¿Puede romper algo existente (regresiones)?
☐ ¿Los nombres y la estructura son claros?
☐ ¿Se manejan errores y fallos correctamente?
☐ ¿Hay secretos o datos sensibles?
☐ ¿Los tests cubren el comportamiento nuevo?
\`\`\`

### 🏢 Caso de uso profesional

Un equipo adopta la regla "1 aprobación obligatoria + CI verde" y mide el tiempo hasta la primera revisión: si supera 4 horas, un bot lo recuerda. Los PRs de más de 400 líneas se dividen automáticamente. Seis meses después, la tasa de bugs en producción cae un 40% y los juniors reportan que aprenden más con la revisión que con la documentación.

### ⚠️ Errores comunes

* Revisar solo estilo (linters ya lo hacen): la revisión pierde su valor.
* Aprobar sin leer: "LGTM" instantáneo.
* PRs enormes: nadie puede revisarlos de verdad.
* Revisiones que duran días: el feedback llega cuando el contexto ya no está.
* Comentarios ofensivos o vagos: la revisión se vuelve un trámite temido.

### 📋 Lo que debes recordar

* CI valida que funciona; la revisión valida que es correcto y mantenible.
* PRs pequeños + comentarios accionables + aprobación explícita.
* La revisión transfiere conocimiento al equipo.
* La revisión debe ser rápida: feedback en horas, no días.

### 🧪 Autoevaluación rápida

1. ¿Qué valida el code review que el CI no valida?
2. ¿Por qué los PRs pequeños mejoran la revisión?
3. ¿Qué métricas ayudan a medir la salud de la revisión?

---

1. La corrección del diseño, la lógica de negocio, los edge cases y la mantenibilidad — el "código correcto" más allá de "código que funciona".
2. Porque un diff pequeño se puede leer a fondo, revisar en minutos y discutir con precisión; los diffs grandes se escanean superficialmente.
3. Tiempo hasta la primera revisión, tamaño de los PRs, tiempo hasta el merge y cantidad de comentarios por línea.
`
export default content
