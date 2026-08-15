# Curso de CI/CD

> De cero a pipelines profesionales — curso abierto y gratuito de CI/CD y DevOps en español.

![Versión](https://img.shields.io/badge/versión-0.1.0-00DF82?style=flat-square)
![Licencia](https://img.shields.io/badge/licencia-CC--BY--SA%204.0%20%2B%20MIT-03624C?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square)

Un curso gratuito que te lleva desde los fundamentos de Git y los pipelines hasta construir, proteger y desplegar software de forma automatizada: una ruta progresiva, orientada a la práctica, con ejercicios reales de integración continua, entrega continua, contenedores, infraestructura como código y GitOps. Sin cuentas ni costo: solo tu terminal y ganas de aprender.

## Tabla de contenidos

- [Características](#características)
- [Contenido del curso](#contenido-del-curso)
- [Stack tecnológico](#stack-tecnológico)
- [Requisitos previos](#requisitos-previos)
- [Puesta en marcha](#puesta-en-marcha)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Añadir o editar contenido](#añadir-o-editar-contenido)
- [Diseño](#diseño)
- [Estado del proyecto](#estado-del-proyecto)
- [Licencia](#licencia)

## Características

- **26 niveles** (0–25) con contenido secuencial: cada nivel se apoya en el anterior.
- **351 módulos guiados** con markdown, ejemplos de terminal y bloques de código resaltados.
- **7 etapas** que recorren el ciclo completo: fundamentos, integración continua, calidad y seguridad, despliegue, infraestructura y GitOps, pipelines avanzados y proyecto profesional.
- **Proyecto profesional integrador** (nivel 24) y **evaluación profesional** con rúbrica (nivel 25).
- **Autoevaluación interactiva** por módulo con respuestas desplegables.
- **Mapa del curso** navegable con filtro por etapa y seguimiento de progreso local (guardado en `localStorage`).
- **Tema claro/oscuro** con estética de terminal profesional (`>_`, JetBrains Mono, acentos verde/cian).
- **Seguimiento de lectura** automático por módulo (IntersectionObserver) y memoria de posición de scroll.
- SPA en **React + Vite**, con code-splitting por nivel y respeto de `prefers-reduced-motion`.

## Contenido del curso

| Etapa | Tema | Niveles | Módulos |
|-------|------|---------|---------|
| 1 | Fundamentos de CI/CD (DevOps, Git, pipelines, YAML) | 0–3 | 56 |
| 2 | Integración Continua (runners, jobs, build, testing, artifacts) | 4–8 | 69 |
| 3 | Calidad y Seguridad (Docker, security, variables y secretos) | 9–11 | 43 |
| 4 | Entrega y Despliegue (environments, estrategias, Kubernetes) | 12–14 | 38 |
| 5 | Infraestructura y GitOps (Terraform, Ansible, GitOps, observabilidad) | 15–18 | 52 |
| 6 | Pipelines Avanzados (avanzados, testing de pipelines, cloud, troubleshooting) | 19–22 | 60 |
| 7 | Proyecto Profesional (buenas prácticas, proyecto integrador, evaluación) | 23–25 | 33 |

Todos los niveles están disponibles y completos, desde el nivel 0 (Fundamentos de CI/CD y DevOps) hasta la evaluación profesional del nivel 25.

## Stack tecnológico

- **React 18** + **React Router 6**
- **Vite 5** (build y dev server)
- **Tailwind CSS 3** + **PostCSS** + **Autoprefixer**
- **pnpm** como gestor de paquetes
- **Parser de markdown propio** (`src/components/level/LevelContent.jsx`) con resaltado de sintaxis propio (`src/components/level/CodeBlock.jsx`) — el contenido se renderiza sin dependencias de terceros

## Requisitos previos

- **Node.js** ≥ 18
- **pnpm** (recomendado; el proyecto incluye `pnpm-lock.yaml` y `pnpm-workspace.yaml`)

## Puesta en marcha

```bash
# 1. Instalar dependencias
pnpm install

# 2. Servidor de desarrollo (puerto 5174, o el siguiente libre)
pnpm dev

# 3. Build de producción
pnpm build

# 4. Previsualizar el build
pnpm preview
```

Para servir el build en producción con el servidor Node incluido:

```bash
node server.js   # sirve dist/ en el puerto 4173
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor de desarrollo de Vite (puerto 5174) |
| `pnpm build` | Build de producción en `dist/` |
| `pnpm preview` | Previsualiza el build localmente |
| `pnpm audit:exports` | Audita exportaciones del contenido (`scripts/audit-exports.mjs`) |
| `pnpm gen:registry` | Regenera `contentRegistry.js` y `metaRegistry.js` desde los archivos reales (`scripts/gen-registry.mjs`) |

## Estructura del proyecto

```
├── index.html              # HTML de entrada (fuentes, estilos de highlight.js)
├── server.js               # Servidor estático de producción (puerto 4173)
├── vite.config.js          # Configuración de Vite
├── tailwind.config.js      # Configuración de Tailwind
├── public/
│   └── cicd.svg            # Favicon
├── scripts/
│   ├── audit-exports.mjs   # Script de auditoría de exportaciones
│   └── gen-registry.mjs    # Generador de registros de contenido
└── src/
    ├── main.jsx            # Punto de entrada
    ├── App.jsx             # Rutas (/, /nivel/:levelId, /nivel/:levelId/modulo/:moduleId)
    ├── registry.js         # Etapas y niveles (id, stage, título, estado, moduleCount)
    ├── pages/              # Home (landing), LevelPage, ModulePage
    ├── components/         # ReadingProgress, ThemeToggle, CountUp, level/*, hooks/*
    ├── hooks/              # useCourseProgress, useRevealOnScroll, etc.
    ├── content/
    │   ├── metaRegistry.js # Metadatos ligeros por nivel (landing)
    │   ├── contentRegistry.js
    │   └── level-N/        # Contenido por nivel (index.js + modules/)
    ├── index.css
    └── ...
```

## Añadir o editar contenido

El contenido vive en `src/content/level-N/`:

1. Cada nivel exporta `meta` (información del nivel) y `modules` (lista de módulos con su markdown).
2. Los niveles con muchos módulos los dividen en `src/content/level-N/modules/mN.js`.
3. Declara el nivel en `src/registry.js` (id, etapa, título, `moduleCount`).
4. Regenera los registros con `pnpm gen:registry` (no edites `metaRegistry.js` ni `contentRegistry.js` a mano: se generan desde los archivos reales).
5. Valida con `pnpm audit:exports` y comprueba con `pnpm build`.

## Diseño

El sistema de diseño (colores, tipografía, componentes, reglas) está documentado en [`DESIGN.md`](./DESIGN.md). La visión de producto y la audiencia objetivo están en [`PRODUCT.md`](./PRODUCT.md).

## Estado del proyecto

- [x] 26 niveles definidos y completos (351 módulos).
- [x] Landing, mapa del curso, navegación por niveles y módulos, tema claro/oscuro.
- [x] Autoevaluación interactiva por módulo.
- [x] Proyecto profesional integrador y evaluación profesional (niveles 24 y 25).
- [ ] Pendiente: persistencia de progreso en backend.

## Licencia

- **Contenido educativo** (niveles, módulos y documentación): [Creative Commons Attribution-ShareAlike 4.0](./LICENSE-CONTENT.md) (CC BY-SA 4.0).
- **Código fuente**: [MIT](./LICENSE.md).

El curso es gratuito, abierto y sin cuentas: puedes estudiarlo, adaptarlo y compartirlo citando la fuente.

---

Hecho con 💚 para la comunidad hispanohablante.
