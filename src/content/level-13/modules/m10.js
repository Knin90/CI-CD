const content = `
## Módulo 10 — Roll-forward

### 🎯 Objetivos de aprendizaje

* Definir roll-forward como alternativa al rollback.
* Decidir cuándo avanzar con un fix en lugar de revertir.
* Conocer los riesgos de cada enfoque.

### ❓ Problema real que resuelve

Revertir no siempre es lo mejor: si la versión nueva ya cambió datos o el fix es pequeño, volver atrás puede ser más lento y arriesgado que avanzar con una corrección. Roll-forward consiste en desplegar una nueva versión que corrige el problema — avanzando en lugar de retroceder.

### 💡 Analogía

Roll-forward es el piloto que corrige el rumbo en lugar de volver al aeropuerto: si el desvío es pequeño y la tormenta quedó atrás, seguir avanzando ajustado es más rápido que dar la vuelta completa. Pero si el problema es grave, la vuelta (rollback) sigue siendo la opción.

### 📖 Explicación técnica

* **Roll-forward**: desplegar una nueva versión (v3) que corrige el defecto introducido en v2, en lugar de revertir a v1.
* Cuándo preferirlo:
  * Migraciones de BD ya aplicadas: revertir el código deja datos a medias.
  * Fix pequeño y conocido: corregir es más rápido que revertir todo.
  * El rollback es complejo o arriesgado (estado externo ya modificado).
* Cuándo preferir rollback: fallo catastrófico, no se conoce la causa, v1 sigue siendo válida, seguridad comprometida.
* Práctica común: "forward fix" con feature flags (apagar la función rota, corregir, reactivar).
* Riesgo: acumular deuda — si el roll-forward se usa siempre, nunca se investiga la causa raíz.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Deploy v2 → fallo detectado
   ↓
¿Rollback (v1) o roll-forward (v3)?
   ↓
Decisión: fix rápido → v3
   ↓
Deploy v3 (corrige el problema)
   ↓
Verificar v3
   ↓
Post-mortem
\`\`\`

### 🧪 Ejercicios

1. Define criterios explícitos para elegir rollback vs roll-forward en tu equipo.
2. Practica un roll-forward con feature flag: apaga la función rota, despliega el fix, reactiva.
3. Analiza un incidente real: ¿qué enfoque usaste y fue el correcto?

### ⚠️ Errores comunes

* Roll-forward automático sin entender la causa (el fix "tapa" sin corregir).
* Nunca revertir "porque avanzar suena mejor" (acumular fallos).
* Roll-forward tardío: se pierde tiempo mientras los usuarios sufren.
* No tener criterio: cada incidente se decide improvisando.

### 🔗 Conexión DevOps

Roll-forward y rollback (módulo 9) son las dos caras de la recuperación. La elección correcta depende de despliegues, datos y contexto — y debe estar decidida y practicada antes del incidente.
`
export default content
