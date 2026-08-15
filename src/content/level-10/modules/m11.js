const content = `
## Módulo 11 — Vulnerability management

### 🎯 Objetivos de aprendizaje

* Definir el ciclo de gestión de vulnerabilidades.
* Triar, priorizar y remediar hallazgos.
* Integrar el ciclo con el pipeline y las métricas.

### ❓ Problema real que resuelve

Los escaneos producen hallazgos continuamente; sin gestión, se acumulan sin prioridad ni dueño, y las críticas se ahogan en el ruido. La gestión de vulnerabilidades define el ciclo: detectar → triar → priorizar → remediar → verificar → medir. Es el proceso que convierte los hallazgos del pipeline en seguridad real.

### 💡 Analogía

La gestión de vulnerabilidades es como el triaje del hospital: llegan pacientes (hallazgos) constantemente; no todos son urgencias. El triaje clasifica por gravedad (crítico, alto, medio, bajo), asigna recursos a los urgentes y registra cada caso hasta su alta (remediación). Sin triaje, la sala de espera se llena y los graves mueren esperando.

### 📖 Explicación técnica

Ciclo:

1. **Detectar**: escaneos automáticos (SAST, SCA, imagen, IaC) en el pipeline y continuos.
2. **Triar**: validar el hallazgo (¿falso positivo? ¿exploitable en nuestro contexto?).
3. **Priorizar**: severidad + exposibilidad + valor del activo (no todo crítico es igual de urgente).
4. **Remediar**: actualizar, parchear, mitigar (config), o aceptar con excepción documentada.
5. **Verificar**: el pipeline confirma la remediación (nuevo escaneo en verde).
6. **Medir**: métricas (MTTR, vulnerabilidades abiertas por severidad, tendencias).

Integración con el pipeline:

* Los hallazgos de los gates crean tickets/alertas.
* Los bots (Dependabot) abren PRs de remediación.
* El gate impide que lo crítico avance; el ciclo gestiona lo demás.
* SLA por severidad: críticas en horas, altas en días, medias en semanas.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Escaneo → hallazgos (crítica: 2, alta: 5, media: 30)
  │
  ▼
Triaje: ¿falsos positivos? ¿explotable? → validación
  │
  ▼
Priorización por severidad + exposición
  │
  ▼
Remediación: Dependabot PR / fix manual / excepción
  │
  ▼
Verificación: pipeline en verde
  │
  ▼
Métricas: abiertas por severidad, MTTR, tendencia
\`\`\`

### 💻 Ejemplo básico

SLAs de remediación:

\`\`\`text
Críticas:  remediar en < 24 h (o parche temporal)
Altas:     remediar en < 7 días
Medias:    remediar en < 30 días
Bajas:     planificar (backlog)
Excepciones: aprobadas con fecha límite y responsable
\`\`\`

### 🏢 Caso de uso profesional

Un equipo con 200 hallazgos acumulados aplica el ciclo: triaje elimina 60 falsos positivos, priorización ordena el resto, y las 8 críticas se remedian en la semana con PRs del bot. El dashboard muestra la tendencia: hallazgos abiertos bajando mes a mes. La gestión convirtió el ruido en un proceso con dueño y ritmo.

### ⚠️ Errores comunes

* Sin triaje: el ruido ahoga las críticas reales.
* Priorizar solo por severidad (ignorar exposibilidad).
* Hallazgos sin dueño (nadie los remedia).
* Excepciones eternas sin fecha límite.
* Sin métricas: no se sabe si se está mejorando.

### 📋 Lo que debes recordar

* Ciclo: detectar → triar → priorizar → remediar → verificar → medir.
* Prioriza por severidad + exposición.
* SLA por severidad con remediación verificada por el pipeline.
* Las métricas muestran la tendencia de mejora.

### 🧪 Autoevaluación rápida

1. ¿Qué fases tiene el ciclo de gestión de vulnerabilidades?
2. ¿Por qué no basta con priorizar por severidad?
3. ¿Cómo se verifica la remediación?

---

1. Detectar, triar, priorizar, remediar, verificar y medir.
2. Porque la severidad indica el impacto potencial, pero la exposibilidad y el valor del activo determinan la urgencia real (un crítico no expuesto puede esperar más que un alto expuesto).
3. Con un nuevo escaneo del pipeline en verde: la remediación solo se confirma cuando el gate deja de fallar.
`
export default content
