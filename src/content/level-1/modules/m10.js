const content = `
## Módulo 10 — Trunk-based development

### 🎯 Objetivos de aprendizaje

* Definir **trunk-based development** y sus reglas.
* Explicar el papel de los feature flags en esta estrategia.
* Relacionar trunk-based con CI/CD de alto rendimiento.

### ❓ Problema real que resuelve

Las ramas de larga duración retrasan la integración: el código se junta tarde, los conflictos son grandes y el pipeline valida código que lleva semanas sin integrarse. Trunk-based development elimina el problema de raíz: **todos integran sobre la rama principal constantemente**, en ramas que viven horas o días. La integración es continua de verdad, y el pipeline valida siempre el estado más reciente del código.

### 💡 Analogía

Es como el tráfico de una ciudad bien diseñada: todos los vehículos circulan por la misma red (trunk) en lugar de por autopistas paralelas que se juntan al final. Los atascos (conflictos) se detectan al instante y se resuelven en minutos, porque nadie se desvía durante semanas.

### 📖 Explicación técnica

Reglas del trunk-based development:

* **Una sola rama de integración** (\`main\`/trunk) donde todos los desarrolladores integran al menos una vez al día.
* **Ramas de corta vida**: horas o máximo 2-3 días; cada rama es una feature o fix pequeña.
* **Commits pequeños y frecuentes** directos al trunk, o PRs muy rápidos.
* **Feature flags**: el trabajo incompleto se integra oculto tras un flag en lugar de vivir en una rama. El flag se activa cuando la feature está lista.
* **CI obligatorio y de alta calidad**: sin tests excelentes, integrar tan seguido rompe main constantemente.
* **Despliegue continuo habilitado**: como main siempre está verde, cada cambio puede ir a producción.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
main ──●──●──●──●──●──●──● (siempre verde)
       ▲  ▲  ▲     ▲  ▲
       │  │  │     │  │
      d1 d2  d3   f1 f2   ← commits directos de varios devs
              │
              └── feature oculta tras flag hasta activarla
              │
              ▼
       CI en cada commit (minutos)
              │
              ▼
       main verde → listo para desplegar
\`\`\`

### 💻 Ejemplo básico

Integración diaria con rama corta:

\`\`\`bash
git checkout main && git pull
git checkout -b fix/login-timeout
# ... fix pequeño + tests ...
git push origin fix/login-timeout
# PR → CI (5 min) → aprobación → merge (mismo día)
git branch -d fix/login-timeout
\`\`\`

En trunk-based, ese ciclo completo dura horas, no semanas.

### 🏢 Caso de uso profesional

Un equipo de plataforma de una fintech usa trunk-based: 40 desarrolladores integran sobre main con ramas de máximo 1 día, CI de 7 minutos con 2.000 tests, y feature flags para las features grandes. Despliegan 60 veces al día con canary. El tiempo de commit a producción es de 25 minutos, y los incidentes se revierten en segundos porque el último cambio es pequeño y conocido.

### ⚠️ Errores comunes

* Ramas de semanas "porque la feature es grande": contradice el modelo (usar flags).
* Integrar directo sin CI: main se rompe constantemente.
* Feature flags que nunca se limpian: deuda técnica acumulada.
* Tests insuficientes: la integración constante expone la falta de validación.
* Trunk-based sin pipeline de despliegue: integrar rápido y desplegar lento no tiene sentido.

### 📋 Lo que debes recordar

* Trunk = todos integran sobre main, ramas de horas/días.
* Feature flags ocultan trabajo incompleto en vez de ramas largas.
* Exige CI rápido y tests de calidad.
* Habilita el despliegue continuo real.

### 🧪 Autoevaluación rápida

1. ¿Qué papel juegan los feature flags en trunk-based?
2. ¿Por qué trunk-based exige CI de alta calidad?
3. ¿Qué longitud máxima deberían tener las ramas?

---

1. Ocultar trabajo en progreso en producción sin necesidad de ramas largas: la feature se integra incompleta tras un flag y se activa cuando está lista.
2. Porque todos integran sobre la misma línea constantemente; sin validación automática rápida y fiable, main se rompería a todas horas.
3. Horas o un par de días como máximo; si una rama necesita más tiempo, el trabajo debe partirse o protegerse con flags.
`
export default content
