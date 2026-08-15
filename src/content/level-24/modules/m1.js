const content = `
## Módulo 1 — Escenario, objetivos y arquitectura del proyecto

### 🎯 Objetivos de aprendizaje

* Entender el escenario del proyecto final.
* Definir los objetivos y los entregables.
* Diseñar la arquitectura general de la plataforma CI/CD.

### ❓ Problema real que resuelve

Has aprendido CI/CD módulo a módulo; ahora hay que integrarlo todo en un proyecto real. Este proyecto final te lleva de un commit a producción con linting, tests, seguridad, Docker, Terraform, Ansible, Kubernetes y monitoreo — la plataforma completa del nivel 24. El módulo 1 define el escenario, los objetivos y la arquitectura: el plano antes de construir.

### 💡 Analogía

Este proyecto es el examen final de la escuela de cocina: ya sabes preparar cada plato (módulos), y ahora toca montar el menú completo de un restaurante real (plataforma CI/CD). El módulo 1 es la carta y el plano de la cocina: qué se sirve (objetivos), a quién (usuarios) y cómo está organizada la cocina (arquitectura) — antes de encender los fogones.

### 📖 Explicación técnica

* **Escenario**: una aplicación (elige una: API, web, microservicio) que debe ir de Git a producción de forma automática y segura, con todos los controles del curso.
* **Objetivos** (entregables):
  1. Repositorio con estrategia de branches y PR (Fase 1 — módulo 2).
  2. Pipeline de CI: lint, tests, seguridad y build (Fase 2 — módulo 3).
  3. Docker, escaneo de imagen y registry (Fase 3 — módulo 4).
  4. Terraform y Ansible para infraestructura y configuración (Fase 4 — módulo 5).
  5. Kubernetes y pipeline de despliegue (Fase 5 — módulo 6).
  6. Entornos, approvals, secrets, rollback y monitoreo (Fase 6 — módulo 7).
  7. Documentación, verificación y demo (módulo 8).
* **Arquitectura general**: Git (nivel 1) → CI (lint, test, security — niveles 7, 10, 20) → build (nivel 6) → Docker + registry (niveles 9, 8) → Terraform infra (nivel 15) → Ansible config (nivel 16) → Kubernetes deploy (nivel 14) → monitoreo (nivel 18), con entornos (nivel 12) y secrets (nivel 11) en cada paso.
* Buenas prácticas: define el alcance antes de empezar (módulo 1 del nivel 23), elige una app pequeña y conocida (no inventes la app mientras montas el pipeline — nivel 4 de 23), y documenta las decisiones (nivel 23).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Escenario: app real de Git a producción
   ↓
Objetivos: 7 fases con entregables
   ↓
Arquitectura: Git → CI → Docker → Infra → K8s → Deploy → Mono
   ↓
Entornos + secrets + gates en cada paso
   ↓
Fases 1-7 (módulos 2-8)
   ↓
Entrega: documentación, verificación y demo
\`\`\`

### 🧪 Ejercicios

1. Elige la aplicación del proyecto y justifica por qué es adecuada.
2. Dibuja la arquitectura completa del pipeline (diagrama de flujo).
3. Define los 7 entregables con criterios de "hecho".

### ⚠️ Errores comunes

* Empezar a construir sin definir el alcance (el proyecto crece sin control — nivel 23).
* Elegir una app gigante (el foco debe estar en el pipeline, no en la app).
* Saltarse la arquitectura (cada fase se decide sobre la marcha — nivel 23).
* No definir qué es "hecho" por fase (no se sabe cuándo avanzar).

### 🔗 Conexión DevOps

Este proyecto integra todo el curso: Git (nivel 1), testing (nivel 7), seguridad (nivel 10), Docker (nivel 9), Terraform (nivel 15), Ansible (nivel 16), Kubernetes (nivel 14), entornos (nivel 12) y monitoreo (nivel 18). Es la prueba real: una plataforma CI/CD completa, no una demo.
`
export default content
