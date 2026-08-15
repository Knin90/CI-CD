const content = `
## Módulo 7 — Secret rotation

### 🎯 Objetivos de aprendizaje

* Explicar por qué los secretos deben rotarse.
* Aplicar rotación programada y por incidente.
* Automatizar la rotación sin romper el pipeline.

### ❓ Problema real que resuelve

Un secreto eterno es una ventana de exposición permanente: si se filtra, sirve para siempre. La rotación cambia el secreto periódicamente (o al detectar una fuga), reduciendo la ventana: un secreto filtrado caduca solo. Sin rotación, la filtración de un token viejo sigue dando acceso años después.

### 💡 Analogía

La rotación de secretos es como cambiar las cerraduras: no solo cuando hay un robo (incidente), sino periódicamente (mantenimiento). Si nunca cambias las cerraduras, una llave perdida hace años sigue abriendo la puerta. Con rotación, la llave perdida deja de servir en cuanto se cambia la cerradura.

### 📖 Explicación técnica

Cuándo rotar:

* **Programado**: periodicidad según sensibilidad (trimestral, mensual).
* **Por incidente**: sospecha o confirmación de fuga → rotación inmediata.
* **Por ciclo de vida**: personal que se va, proveedor que expira.

Cómo rotar sin romper:

1. **Generar** el nuevo secreto (con el proveedor: plataforma, Vault, cloud).
2. **Actualizar** el secret store (los pipelines lo toman de ahí).
3. **Verificar** que el pipeline sigue funcionando con el nuevo.
4. **Revocar** el anterior (tras confirmar).
* Automatización: Vault con rotación dinámica (genera credenciales por job); proveedores con rotación automática (Secrets Manager, GitHub PAT rotation).
* Coordinación: si el secreto lo consume un tercero (registry, DB), el cambio debe ser consistente en ambos lados.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Rotación programada (Vault / Secrets Manager)
  │
  ▼
Nuevo secreto generado y almacenado (nueva versión)
  │
  ▼
Pipeline inyecta la versión nueva (sin cambio de código)
  │
  ▼
Verificación: push/deploy OK con el nuevo valor
  │
  ▼
Secreto anterior revocado (ventana de exposición cerrada)
\`\`\`

### 💻 Ejemplo básico

Rotación por incidente (runbook):

\`\`\`text
1. Se detecta un token en un repo público
2. REVOCAR el token YA (en el proveedor)
3. Generar uno nuevo → actualizar el secret store
4. Verificar el pipeline (release de prueba)
5. Auditar el uso del token filtrado
6. Revisar por qué se filtró → prevenir
\`\`\`

### 🏢 Caso de uso profesional

Un equipo con Vault usa rotación dinámica: cada job de deploy obtiene una credencial temporal de base de datos que expira en 15 minutos. Los secretos estáticos (tokens de registry) se rotan automáticamente cada 30 días con el sistema de rotación de Vault. Cuando un token se filtra en un incidente, ya no importa: caduca solo, y la rotación por incidente se hace en minutos.

### ⚠️ Errores comunes

* Secretos eternos sin rotación.
* Rotar sin verificar (el pipeline se rompe con el nuevo).
* Rotar el secreto en un lado y no en el otro (tercero desincronizado).
* No revocar el anterior (dos llaves sirviendo).
* Rotación manual dependiente de memoria.

### 📋 Lo que debes recordar

* Rota programado y por incidente: la ventana de exposición se cierra.
* Automatiza con Vault/secrets managers.
* Verifica el pipeline con el nuevo antes de revocar el viejo.
* Un secreto sin rotar es una puerta abierta indefinida.

### 🧪 Autoevaluación rápida

1. ¿Por qué la rotación reduce el riesgo?
2. ¿Qué pasos siguen a la generación del nuevo secreto?
3. ¿Qué es la rotación dinámica?

---

1. Porque limita la ventana de exposición: un secreto filtrado caduca solo en lugar de servir indefinidamente.
2. Actualizar el secret store, verificar que el pipeline funciona con el nuevo valor y revocar el anterior.
3. La generación automática de credenciales temporales por job (Vault): cada acceso usa una credencial que expira sola.
`
export default content
