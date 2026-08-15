# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Personas hispanohablantes que empiezan de cero en CI/CD y DevOps y quieren llegar a un perfil profesional (DevOps / Cloud / Platform Engineering). Estudiantes individuales y autodidactas; no hay requisito previo de experiencia.

## Product Purpose

Un curso abierto y gratuito de CI/CD en español que lleva al alumno de cero a pipelines profesionales mediante un recorrido estructurado, con ejemplos reales, ejercicios y un proyecto profesional integrador. El éxito se mide por la capacidad del alumno de construir, proteger y desplegar software de forma automatizada.

## Positioning

Recorrido completo y progresivo de 26 niveles (0–25) organizados en 7 etapas —Fundamentos de CI/CD, Integración Continua, Calidad y Seguridad, Entrega y Despliegue, Infraestructura y GitOps, Pipelines Avanzados y Proyecto Profesional— con 351 módulos guiados y una evaluación final con rúbrica. La novedad clave del proyecto final es integrar todo lo aprendido en un pipeline real de extremo a extremo.

## Operating Context

- Los niveles se estudian de forma secuencial; cada nivel tiene módulos guiados con contenido markdown, ejemplos de terminal y ejercicios.
- Evaluación continua: autoevaluación por módulo (respuestas desplegables) y evaluación profesional integral al final (nivel 25).
- El alumno trabaja con Git, pipelines (GitLab/Azure/GitHub), YAML, contenedores (Docker), orquestación (Kubernetes), infraestructura como código (Terraform, Ansible) y GitOps.
- La app es una SPA con tema oscuro tipo terminal, navegación por niveles y módulos, y un mapa del curso por etapas.

## Capabilities and Constraints

- 26 niveles (0–25) definidos, todos con contenido completo en `src/registry.js` y `src/content/level-N/`.
- 7 etapas con título y color asociado.
- Funcionalidades actuales: landing con estadísticas y mapa del curso, stepper de módulos con auto-marcado de lectura (IntersectionObserver), tema claro/oscuro con toggle, renderizado del contenido de los módulos (parser propio en `src/components/level/LevelContent.jsx`, con bloques de código resaltados y diagramas de flujo).
- Idioma del contenido: español. Copy de la app en español.
- No hay backend, cuentas de usuario ni sistema de progreso persistido en servidor; el progreso se guarda en `localStorage`.
- Evaluación: el quiz de autoevaluación por módulo está implementado como funcionalidad interactiva (secciones `Autoevaluación` con respuestas desplegables en `src/components/level/LevelContent.jsx`); la evaluación profesional del nivel 25 usa la misma mecánica de quiz.

## Brand Commitments

- Nombre oficial: **Curso de CI/CD** (decisión confirmada y aplicada: `package.json`, `package-lock.json`, `<title>` y el UI usan «Curso de CI/CD»).
- Tono del copy: motivacional y profesional, en español.
- Marca visual tipo terminal: prompt `>_`, tipografía monoespaciada (JetBrains Mono) sobre Archivo, acentos verde/cian.

## Evidence on Hand

- Contenido real de 26 niveles con 351 módulos completos en `src/content/level-0/` … `src/content/level-25/`.
- Landing completa con estadísticas, mapa del curso y etapas descritas en `src/pages/Home.jsx`.
- No hay testimonios, casos de estudio, precios ni datos de usuarios reales; no fabricar estas ausencias.

## Product Principles

1. **De cero a profesional, sin atajos**: el recorrido es completo y progresivo; cada nivel se apoya en el anterior.
2. **Práctica real sobre teoría**: ejemplos, ejercicios y un proyecto profesional integrador que converge en un pipeline real de extremo a extremo.
3. **Valor comercial demostrable**: cada etapa prepara para el trabajo real en CI/CD y DevOps.
4. **Gratuito y abierto**: el curso es un recurso educativo abierto, sin cuenta ni monetización.
5. **Español primero**: todo el contenido y la interfaz están en español, para la audiencia hispanohablante.
