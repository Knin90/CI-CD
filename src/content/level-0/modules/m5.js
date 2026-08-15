const content = `
## Módulo 5 — Continuous Delivery en profundidad

### 🎯 Objetivos de aprendizaje

* Definir los pilares de la entrega continua: artefactos, entornos, despliegue reproducible y verificación.
* Explicar por qué "listo para producción" es una propiedad del pipeline, no del código.
* Entender el flujo de promoción entre entornos.

### ❓ Problema real que resuelve

Muchos equipos tienen CI excelente pero producen "por sorpresa": el despliegue depende de un especialista, de una VM que solo él conoce, de variables de entorno que nadie documentó. El primer despliegue del mes falla siempre. **Continuous Delivery** convierte el despliegue en un proceso **repetible, probado y automático**: lo que se hace en staging es exactamente lo que se hará en producción, con el mismo artefacto y el mismo procedimiento.

### 💡 Analogía

Un avión: el simulador (staging) usa los mismos controles y procedimientos que el avión real (producción). Los pilotos no estrenan procedimientos en un vuelo comercial; ensayan exactamente el mismo despegue cientos de veces. CD es eso: ensayar el despliegue completo en staging tantas veces que a producción llegue un procedimiento probado al 100%.

### 📖 Explicación técnica

Pilares de Continuous Delivery:

* **Artefacto único e inmutable**: el mismo binario/imagen validado por CI viaja por todos los entornos. Nunca se reconstruye para desplegar.
* **Pipeline de entrega por entorno**: cada entorno (staging, producción) tiene su etapa en el pipeline con sus propias validaciones y aprobaciones.
* **Configuración separada del artefacto**: variables de entorno, secretos y config específica se inyectan en el momento del despliegue, no se compilan dentro del binario (excepto lo estrictamente necesario).
* **Despliegue idempotente**: ejecutar el despliegue dos veces produce el mismo resultado; se puede re-ejecutar sin miedo.
* **Verificación post-despliegue**: health checks, smoke tests y métricas que confirman que la versión nueva está sana.
* **Aprobaciones explícitas**: en entornos protegidos, un humano con permisos aprueba el paso; la plataforma registra quién, cuándo y qué se desplegó.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Artefacto validado (imagen v1.2.3)
  │
  ▼
Despliegue a staging
  │
  ▼
Smoke tests + health checks en staging
  │
  ▼
¿OK? → Disponible para promoción
  │
  ▼
Aprobación humana (environment: production)
  │
  ▼
Despliegue a producción (mismo artefacto)
  │
  ▼
Verificación: health checks, métricas, logs
  │
  ▼
Registro auditable del despliegue
\`\`\`

### 💻 Ejemplo básico

Flujo de promoción con el mismo artefacto:

\`\`\`text
Registry (imagen inmutable)
  │
  ├── deploy-staging    → automático tras CI
  ├── deploy-production → requiere aprobación
  └── rollback          → desplegar versión anterior del registry
\`\`\`

El tag de la imagen (\`v1.2.3\`) es el mismo en staging y producción; solo cambia la configuración inyectada.

### 🏢 Caso de uso profesional

Una plataforma SaaS que maneja datos de clientes: cada cambio pasa por CI, se despliega a staging automáticamente, se ejecutan tests end-to-end contra staging, y un release manager aprueba el despliegue a producción. Como staging y producción usan el mismo pipeline y el mismo artefacto, el despliegue a producción es un evento aburrido — exactamente lo que se busca.

### ⚠️ Errores comunes

* Reconstruir el artefacto por entorno: rompe la inmutabilidad y la confianza.
* No separar configuración del artefacto: secretos compilados que caducan o filtran.
* Despliegues manuales en paralelo al pipeline: nadie sabe qué versión está en producción.
* Saltarse la verificación post-despliegue: el pipeline dice "ok" pero la app está caída.

### 📋 Lo que debes recordar

* Delivery = el artefacto siempre listo para producción con un botón de aprobación.
* Artefacto inmutable + configuración externa + despliegue idempotente + verificación.
* El procedimiento de producción debe ser idéntico al de staging.
* Todo despliegue debe quedar auditado (quién, cuándo, qué versión).

### 🧪 Autoevaluación rápida

1. ¿Por qué el artefacto debe ser el mismo en todos los entornos?
2. ¿Qué significa que un despliegue sea idempotente?
3. ¿Qué diferencia a un despliegue "exitoso" de uno "verificado"?

---

1. Porque si el artefacto cambia entre entornos, la validación hecha en staging ya no garantiza el comportamiento en producción; la confianza del pipeline se rompe.
2. Que ejecutarlo varias veces produce el mismo resultado final, por lo que se puede repetir sin efectos secundarios.
3. El despliegue exitoso termina el comando; el verificado confirma además que la nueva versión responde correctamente (health checks, smoke tests, métricas).
`
export default content
