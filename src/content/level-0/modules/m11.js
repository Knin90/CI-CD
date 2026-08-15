const content = `
## Módulo 11 — Shift Left

### 🎯 Objetivos de aprendizaje

* Definir **Shift Left**: mover las validaciones lo antes posible en el ciclo de vida.
* Enumerar validaciones que "se desplazan a la izquierda" (testing, seguridad, calidad).
* Explicar la relación entre Shift Left y el costo de los defectos.

### ❓ Problema real que resuelve

Tradicionalmente, la calidad y la seguridad se evaluaban al final del proceso (a la derecha del ciclo): los tests de aceptación, el pentest y la revisión de performance ocurrían cuando el código ya estaba listo. Descubrir un problema ahí cuesta carísimo. Shift Left propone mover esas validaciones hacia la izquierda — al momento del desarrollo — donde el costo de corregir es mínimo.

### 💡 Analogía

Inspeccionar un edificio: encontrar un error en los cimientos cuando ya se construyeron 20 pisos (derecha) cuesta millones; revisar el plano y los materiales antes de verter el hormigón (izquierda) cuesta nada. Shift Left es inspeccionar cada etapa del edificio a medida que se construye, no al final.

### 📖 Explicación técnica

* **Shift Left**: estrategia que adelanta las actividades de validación (testing, seguridad, performance, calidad) hacia las primeras fases del ciclo de desarrollo.
* Aplicaciones concretas en CI/CD:
  * **Testing**: unit tests en el commit, integration en CI, e2e en PR, no solo al final.
  * **Seguridad (DevSecOps)**: SAST al escribir código, SCA al instalar dependencias, escaneo de imágenes en el build, en lugar de un pentest anual.
  * **Performance**: benchmarks básicos en CI para detectar regresiones tempranas.
  * **UX/Requisitos**: feedback de usuarios en prototipos, no después del release.
* La regla del costo: el costo de corregir un defecto crece exponencialmente cuanto más se aleja de su origen.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
IZQUIERDA (temprano)              DERECHA (tarde)
  │                                  │
  ▼                                  ▼
Editor → Commit → CI → PR → Staging → Producción
  │        │        │     │           │
  └─ lint   └─ unit   └─ e2e └─ smoke   └─ pentest (¡demasiado tarde!)
  └─ SAST   └─ SCA     └─ perf         └─ QA manual final

Costo de corregir:  $1   $5    $50   $500    $5000+
\`\`\`

### 💻 Ejemplo básico

Mover la seguridad "a la izquierda" en un pipeline:

\`\`\`yaml
jobs:
  security-left:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: SAST en cada PR (no solo al release)
        run: npm run sast
      - name: SCA de dependencias al instalar
        run: npm audit --audit-level=high
      - name: Escaneo de la imagen en el build
        run: trivy image app:\${{ github.sha }}
\`\`\`

### 🏢 Caso de uso profesional

Un banco pasaba por un pentest anual que encontraba 15 vulnerabilidades cada vez. Adoptan DevSecOps con Shift Left: SAST en cada commit, SCA en cada PR, escaneo de contenedores en el build. Un año después, el pentest anual encuentra 1 vulnerabilidad menor. La seguridad dejó de ser un evento anual y se volvió una propiedad del proceso.

### ⚠️ Errores comunes

* Confundir Shift Left con "hacer todo en el pipeline": también implica involucrar a los equipos temprano.
* Herramientas sin acción: escanear y no corregir no es Shift Left, es ruido.
* Solo testing a la izquierda y seguridad a la derecha: Shift Left debe cubrir todas las dimensiones.
* Ignorar el costo: cada validación a la izquierda cuesta tiempo de CI; hay que balancear.

### 📋 Lo que debes recordar

* Shift Left = adelantar las validaciones al origen del cambio.
* El costo de un defecto crece cuanto más se aleja de su origen.
* DevSecOps es Shift Left aplicado a la seguridad.
* Validar a la izquierda es más barato y más rápido que validar a la derecha.

### 🧪 Autoevaluación rápida

1. ¿Qué significa "shift left" y por qué reduce costos?
2. Da dos ejemplos de validaciones que se pueden mover a la izquierda.
3. ¿Por qué escanear sin corregir no es Shift Left?

---

1. Mover las validaciones (testing, seguridad, calidad) hacia las primeras fases del ciclo; reduce costos porque corregir un defecto en su origen es exponencialmente más barato que descubrirlo tarde.
2. SAST y análisis de dependencias en cada commit/PR (en lugar de un pentest al final), y unit tests en el editor/commit (en lugar de solo tests de aceptación al final).
3. Porque la validación solo tiene valor si genera acción: encontrar vulnerabilidades y no corregirlas a tiempo es lo mismo que no escanear.
`
export default content
