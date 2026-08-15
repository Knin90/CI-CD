const content = `
## Módulo 4 — Pull Requests

### 🎯 Objetivos de aprendizaje

* Explicar qué es un Pull Request y por qué es el punto de control central de CI/CD.
* Describir la información que debe contener un PR de calidad.
* Entender cómo el PR integra revisión humana y validación automática.

### ❓ Problema real que resuelve

Integrar código sin un punto de control produce dos problemas: errores que llegan a main (nadie revisó) y conocimiento que no circula (nadie más vio el cambio). El Pull Request crea un **punto único de decisión**: el código propuesto se valida automáticamente (CI) y humanamente (code review) antes de entrar a la rama principal. Además, queda documentado para siempre: qué se cambió, por qué y quién lo aprobó.

### 💡 Analogía

Un PR es como presentar un proyecto ante un comité de aprobación: el proponente presenta su trabajo (diff), un inspector técnico lo valida (CI), un grupo de colegas lo revisa (code review) y, solo si todos aprueban, se firma y se incorpora (merge). Sin el comité, cualquiera podría modificar el edificio a su antojo.

### 📖 Explicación técnica

* Un **PR (Merge Request en GitLab)** es una propuesta para integrar los cambios de una rama en otra, típicamente hacia \`main\`.
* El PR agrupa: el **diff** de cambios, la **conversación** (comentarios en líneas), los **checks** del pipeline (status checks) y el **merge** (con su estrategia).
* Un PR de calidad incluye: título descriptivo, descripción del problema y solución, enlace a la issue/ticket, pruebas realizadas y cómo verificar el cambio.
* **Status checks**: los checks de CI (build, tests, security) aparecen dentro del PR; con branch protection, el merge se bloquea si están rojos.
* El PR es también la **unidad de trazabilidad**: cada release se puede mapear a los PRs mergeados desde la última versión.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Rama feature/x → PR hacia main
  │
  ├── CI corre sobre el diff (checks)
  │     ├── build ✓
  │     ├── tests ✓
  │     └── security ✓
  ├── Revisores comentan líneas específicas
  ├── El autor responde y actualiza la rama
  │     └── CI re-corre con cada push
  │
  ▼
Checks verdes + aprobaciones → Merge habilitado
  │
  ▼
Merge a main → se dispara CD
\`\`\`

### 💻 Ejemplo básico

Plantilla de descripción de PR:

\`\`\`text
## Problema
El checkout no calcula el total cuando hay cupones.

## Solución
- Corrige la suma del subtotal con descuento.
- Agrega tests para cupones combinados.

## Verificación
- [x] npm test (42 tests, todos verdes)
- [x] Lint sin errores
- [ ] Revisión manual en staging

Closes #123
\`\`\`

### 🏢 Caso de uso profesional

En un repositorio compartido, cada PR debe pasar CI completo y al menos una aprobación. Los PRs pequeños (< 300 líneas) se revisan en minutos y se mergean el mismo día; los PRs gigantes se detectan con un check de tamaño y se desalientan. La consecuencia: main siempre estable, y el historial de PRs sirve como documentación viva de todas las decisiones del proyecto.

### ⚠️ Errores comunes

* PRs gigantes: nadie los revisa de verdad.
* PRs sin descripción: el revisor no sabe qué está revisando.
* Mergear con checks rojos (si no hay protección de rama).
* PRs que viven semanas: se alejan de main y generan conflictos.
* Revisar solo el estilo, no la lógica: la revisión pierde valor.

### 📋 Lo que debes recordar

* El PR es el punto de control: validación automática + revisión humana.
* Un PR de calidad documenta el qué, el porqué y cómo verificar.
* Los status checks bloquean el merge cuando están rojos (con protección).
* PRs pequeños y frecuentes = revisión real y main estable.

### 🧪 Autoevaluación rápida

1. ¿Qué información debe incluir un PR de calidad?
2. ¿Cómo se relacionan los status checks con el merge?
3. ¿Por qué los PRs pequeños mejoran la calidad de la revisión?

---

1. Título descriptivo, descripción del problema y la solución, enlace al ticket, pruebas realizadas y pasos de verificación.
2. Los status checks (resultados de CI) aparecen en el PR; con protección de rama, el merge queda bloqueado hasta que todos estén en verde.
3. Porque un diff pequeño se puede revisar a fondo y en minutos; los diffs enormes se escanean superficialmente o directamente no se revisan.
`
export default content
