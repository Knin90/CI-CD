const content = `
## Módulo 14 — Pipeline lifecycle

### 🎯 Objetivos de aprendizaje

* Recorrer el ciclo de vida completo de un pipeline: creación, ejecución, mantenimiento y retiro.
* Tratar el pipeline como un producto que evoluciona.
* Entender las fases de madurez de un pipeline en un equipo.

### ❓ Problema real que resuelve

Un pipeline no es estático: nace, se usa, se rompe, se mejora y a veces se retira. Sin gestión de su ciclo de vida, los pipelines se acumulan, se quedan obsoletos ("¿este workflow todavía sirve?"), nadie sabe quién los mantiene y corren de más o de menos. Tratar el pipeline como un producto con ciclo de vida evita esa degradación.

### 💡 Analogía

Un pipeline es como una herramienta de taller: se compra (crea), se usa a diario, se afila (mejora), se repara cuando se rompe (mantenimiento) y, cuando deja de servir, se retira en lugar de ocupar espacio (limpieza). Las herramientas sin mantenimiento se oxidan y estorban.

### 📖 Explicación técnica

Fases del ciclo de vida:

1. **Creación**: se define el pipeline como código (YAML), se revisa con PR y se prueba en ramas de desarrollo.
2. **Adopción**: los equipos lo usan; se miden métricas (tiempo, tasa de éxito, uso).
3. **Operación**: se ejecuta continuamente; se vigilan fallos, colas y consumo de runners.
4. **Mantenimiento**: mejoras iterativas — más rápido, más seguro, más claro — con su propio flujo de PR y pruebas.
5. **Madurez**: se estandariza (templates), se integra con otras herramientas, se documenta.
6. **Retiro**: cuando un pipeline queda obsoleto (servicio deprecado, plataforma migrada), se elimina con su documentación; nunca se deja "por si acaso".

Reglas de higiene:

* Toda modificación del pipeline pasa por PR y CI (el pipeline se valida a sí mismo).
* Métricas de salud: tasa de éxito, tiempo de ejecución, frecuencia de cambios.
* Documentación viva: quién lo usa, qué hace, cómo se ejecuta manualmente.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Crear (PR del YAML)
  │
  ▼
Probar (ramas de desarrollo)
  │
  ▼
Adoptar (corre en main, se mide)
  │
  ▼
Operar (vigilar fallos y colas)
  │
  ▼
Mejorar (PRs de optimización)
  │
  ▼
Estandarizar (template reutilizable)
  │
  ▼
Retirar (eliminar con documentación)
\`\`\`

### 💻 Ejemplo básico

Auditoría de pipelines existentes:

\`\`\`text
Workflow          ¿Se usa?   ¿Tiene dueño?   Acción
ci.yml            sí         equipo plataforma   mantener
nightly-report.yml sí         equipo datos        mantener
legacy-deploy.yml no          nadie               retirar
prueba-jenkins.yml no         ?                   retirar
\`\`\`

### 🏢 Caso de uso profesional

Un equipo migra de Jenkins a GitHub Actions. En lugar de portar los 40 jobs "por si acaso", auditan el ciclo de vida: 12 jobs están obsoletos (servicios retirados) y se eliminan; 20 se portan a workflows con templates; 8 se reemplazan por pipelines nuevos más simples. El resultado: menos pipelines, todos con dueño, todos documentados.

### ⚠️ Errores comunes

* Pipelines huérfanos sin dueño ni métricas.
* Modificar el pipeline directo en la plataforma sin PR (sin revisión ni pruebas).
* Pipelines obsoletos que corren por costumbre y consumen recursos.
* No documentar: nadie sabe qué hace cada pipeline ni cómo ejecutarlo a mano.
* Borrar pipelines sin verificar que nadie los consume (templates, triggers externos).

### 📋 Lo que debes recordar

* El pipeline tiene ciclo de vida: crear, adoptar, operar, mejorar, retirar.
* Toda modificación pasa por PR y CI.
* Métricas de salud y dueño claro por pipeline.
* Lo obsoleto se retira, no se conserva "por si acaso".

### 🧪 Autoevaluación rápida

1. ¿Qué fases tiene el ciclo de vida de un pipeline?
2. ¿Por qué las modificaciones del pipeline deben pasar por PR y CI?
3. ¿Qué debe hacerse con un pipeline obsoleto?

---

1. Creación, adopción, operación, mantenimiento/mejora, estandarización y retiro.
2. Porque el pipeline es código que afecta a todos: un cambio mal hecho rompe la entrega; revisarlo y probarlo con CI previene regresiones.
3. Retirarlo (eliminarlo junto con su documentación) tras verificar que nadie lo consume; nunca dejarlo corriendo por costumbre.
`
export default content
