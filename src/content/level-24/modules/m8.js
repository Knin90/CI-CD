const content = `
## Módulo 8 — Entrega final: documentación, verificación y demo del pipeline

### 🎯 Objetivos de aprendizaje

* Documentar la plataforma completa.
* Verificar cada fase contra los objetivos.
* Preparar la demo y la defensa del proyecto.

### ❓ Problema real que resuelve

La plataforma funciona, pero un proyecto profesional se entrega: documentación que explique la arquitectura y las decisiones (nivel 19 de 23), verificación de que cada fase cumple su objetivo (módulo 1), y una demo que muestre el flujo completo. La entrega final convierte el trabajo en un entregable: algo que otro equipo puede entender, operar y extender.

### 💡 Analogía

La entrega final es la inauguración del edificio: el arquitecto entrega los planos y el manual de mantenimiento (documentación), verifica que cada sistema cumple el contrato (verificación) y hace el recorrido mostrando cómo funciona todo (demo). Un edificio sin planos ni manual no es entregable: es un misterio que nadie puede operar.

### 📖 Explicación técnica

* **Documentación** (nivel 19 de 23): README con la arquitectura (módulo 1), diagrama del flujo, cómo se despliega a cada entorno, los gates y sus umbrales, los runbooks (nivel 22), y las decisiones con su "por qué" (ADR — nivel 23).
* **Verificación** (nivel 20): cada fase contra su criterio de "hecho" (módulo 1):
  1. Repo + branches + PR (módulo 2).
  2. CI: lint, tests, security, build (módulo 3).
  3. Docker + scan + registry (módulo 4).
  4. Terraform + Ansible (módulo 5).
  5. Kubernetes + deploy verificado (módulo 6).
  6. Entornos, approvals, secrets, rollback, monitoreo (módulo 7).
* **Demo** (módulo 20 de 22): el flujo completo en vivo — commit → CI → build → scan → registry → infra → deploy → verificación → monitoreo. Con un fallo intencional para mostrar el gate y el rollback (nivel 20 de 22).
* Buenas prácticas: la demo usa el flujo REAL (no un script preparado que no pasa por el pipeline — nivel 23), y la documentación vive en el repo, verificada contra la realidad (nivel 19 de 23).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Documentación: arquitectura + flujo + gates + runbooks
   ↓
Verificación: cada fase vs su criterio de "hecho"
   ↓
Demo en vivo: commit → CI → build → scan → registry
   ↓
Infra → deploy → verificación → monitoreo
   ↓
Fallo intencional → gate bloquea → rollback
   ↓
Entrega: plataforma completa, documentada y demostrada
\`\`\`

### 🧪 Ejercicios

1. Escribe el README completo: arquitectura, flujo, gates, entornos y runbooks.
2. Verifica cada fase contra su objetivo (checklist del módulo 1).
3. Prepara y practica la demo de 10 minutos con el flujo real.

### ⚠️ Errores comunes

* Documentación que describe lo que "debería" ser, no lo que es (nivel 19 de 23).
* Demo con pasos manuales que no pasan por el pipeline (nivel 23).
* Verificación a ojo ("funciona") sin evidencias (nivel 20).
* Entrega sin runbooks (el equipo no puede operar la plataforma — nivel 22).

### 🔗 Conexión DevOps

La entrega final conecta con documentación (nivel 19 de 23), verificación (nivel 20), runbooks (nivel 22), producción (nivel 22) y la mejora continua (nivel 23). Es el cierre del proyecto: la plataforma completa, entregable y defendible — tu trabajo profesional de CI/CD.
`
export default content
