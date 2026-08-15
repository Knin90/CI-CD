const content = `
## Módulo 9 — Rollback

### 🎯 Objetivos de aprendizaje

* Definir rollback y por qué debe estar siempre preparado.
* Ejecutar rollback de forma rápida y segura.
* Conocer las limitaciones (migraciones, datos) y alternativas.

### ❓ Problema real que resuelve

Todo despliegue puede fallar. El rollback es el plan B que debe funcionar **antes** de necesitarlo: volver a la versión anterior de forma rápida, verificable y sin sorpresas. Sin rollback preparado, el primer fallo en producción se convierte en un incidente largo mientras alguien reconstruye la versión anterior "a mano".

### 💡 Analogía

El rollback es la marcha atrás del coche: no la usas en cada viaje, pero no conduces un coche sin ella. Y no es "apretar un botón mágico": requiere saber cuándo usarla, cómo y qué pasa si la carretera (los datos) ya no es la misma que al venir.

### 📖 Explicación técnica

* **Rollback**: revertir a una versión anterior del software tras un despliegue problemático.
* Velocidad según estrategia: blue/green = conmutación instantánea; rolling = nuevo rollout inverso; recreate = nuevo ciclo con downtime.
* Preparación: versiones anteriores desplegables (artifact inmutable retenido), runbook de rollback probado, health checks para decidir cuándo.
* **Limitaciones**: si la versión nueva ejecutó migraciones de base de datos destructivas, "volver al código viejo" no revierte los datos. Las migraciones deben ser reversibles (forward/backward) o el rollback incluye restaurar la BD.
* Decisiones: rollback vs roll-forward (módulo 10) — a veces avanzar con un fix es más rápido y seguro que revertir.
* Buenas prácticas: probar el rollback en staging periódicamente, medir el tiempo de rollback (MTTR, nivel 18), decidir umbrales de cuándo revertir antes del incidente.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Deploy v2 → health check FAIL (o alerta)
   ↓
Decisión: rollback
   ↓
Revertir a v1 (según estrategia: switch / rollout inverso)
   ↓
Verificar que v1 está sana
   ↓
Post-mortem: ¿por qué falló v2?
\`\`\`

### 🧪 Ejercicios

1. Escribe el runbook de rollback de tu servicio y pruébalo en staging.
2. Mide el tiempo de rollback (de la detección al servicio restaurado).
3. Analiza si tus migraciones de BD son reversibles; si no, planifícalo.

### ⚠️ Errores comunes

* Rollback "inventado" en el momento del incidente (no probado).
* Revertir el código pero no los datos (inconsistencia).
* Esperar demasiado antes de revertir (el incidente crece).
* No documentar el post-mortem: el mismo error se repite.

### 🔗 Conexión DevOps

El rollback es la red de seguridad que permite desplegar con confianza: conecta las deployment strategies (nivel 13), la verificación (módulo 12) y las DORA metrics como MTTR (nivel 18).
`
export default content
