const content = `
## Módulo 10 — Configuration pipelines

### 🎯 Objetivos de aprendizaje

* Definir pipelines de configuración y su diferencia con los de despliegue.
* Automatizar la aplicación de configuración en lotes.
* Verificar la convergencia de la configuración.

### ❓ Problema real que resuelve

La configuración cambia (parches de seguridad, ajustes, nuevas herramientas) y aplicarla a 50 servidores a mano es inviable. El pipeline de configuración ejecuta los playbooks de forma periódica o bajo demanda sobre los inventarios — manteniendo los hosts en el estado deseado sin intervención manual por máquina.

### 💡 Analogía

El pipeline de configuración es el mantenimiento preventivo de la flota: en vez de que un mecánico revise cada camión a mano, hay un plan (pipeline) que revisa todos los camiones con el mismo procedimiento, en lotes, y reporta cuáles quedaron fuera de especificación. La flota se mantiene uniforme sin depender de la memoria de nadie.

### 📖 Explicación técnica

* **Pipeline de configuración**: ejecución automatizada de playbooks sobre inventarios — bajo demanda (trigger manual), por evento (cambio en el repo) o programada (cron — parches, compliance).
* Flujo: trigger → lint/check (módulos 2-4) → run contra inventario del entorno → reportes de resultados por host.
* **Convergencia**: después de la ejecución, los hosts están en el estado deseado; la verificación (módulo 5) confirma que no queda nada por cambiar.
* Control de alcance: \`--limit\` (subconjunto de hosts), lotes (rolling — módulo 9), ventanas de mantenimiento para hosts críticos.
* Reportes: estado por host (ok/changed/failed), diffs de configuración, artefactos de resultados (nivel 8).
* Buenas prácticas: pipelines programados con alertas, ventanas de mantenimiento, idempotencia estricta, seguimiento de la convergencia (¿cuántos hosts quedaron fuera de estado?).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Trigger (cron / evento / manual)
   ↓
Lint + check (CI)
   ↓
Run contra inventario (lotes, --limit)
   ↓
Reporte por host (ok / changed / failed)
   ↓
Alertas si hay fallos
   ↓
Verificación de convergencia
\`\`\`

### 🧪 Ejercicios

1. Programa un pipeline de configuración (cron semanal) para parches de seguridad.
2. Usa \`--limit\` para aplicar a un subconjunto de hosts primero (canary de configuración).
3. Configura alertas cuando un host queda fuera del estado deseado.

### ⚠️ Errores comunes

* Configuración aplicada solo "cuando alguien se acuerda" (drift generalizado).
* Runs masivos sin lotes: un playbook roto toca 50 hosts a la vez.
* Sin reportes ni alertas: los fallos se ignoran silenciosamente.
* Mezclar el pipeline de configuración con el de despliegue (objetivos distintos).

### 🔗 Conexión DevOps

Los configuration pipelines son la automatización continua de la capa de configuración: conectan Ansible (nivel 16), schedules (nivel 2), observabilidad (nivel 18) y la convergencia que GitOps lleva al extremo (nivel 17).
`
export default content
