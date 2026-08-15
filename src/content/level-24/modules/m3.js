const content = `
## Módulo 3 — Fase 2: Pipeline de CI — lint, tests, seguridad y build

### 🎯 Objetivos de aprendizaje

* Construir el pipeline de CI completo.
* Aplicar lint, tests, seguridad y build como gates.
* Lograr feedback rápido y verde consistente.

### ❓ Problema real que resuelve

La Fase 2 es el corazón de la Integración Continua: cada PR pasa por lint, tests, seguridad y build antes del merge (niveles 7, 10, 20). Sin este pipeline, el código entra a main sin garantías. Con él, el PR dice "este cambio es seguro de mergear" — y los fallos se detectan en minutos, no en producción.

### 💡 Analogía

La Fase 2 es el control de calidad de la fábrica antes de que el producto salga: cada pieza (cambio) pasa por la inspección de estilo (lint), la prueba de funcionamiento (tests), el detector de metales (seguridad) y el ensamblaje final (build). Si alguna inspección falla, la pieza vuelve a la línea — no sale del taller.

### 📖 Explicación técnica

* **Pipeline de CI** (niveles 5, 19, 23) con etapas:
  * **Lint**: formato y estilo (nivel 20) — rápido y bloquea lo mecánico.
  * **Tests**: unit + integración (nivel 7) — el comportamiento del código.
  * **Seguridad**: SCA (dependencias), SAST (código), secrets scan (nivel 10 y 16 de 23) — los gates de seguridad (módulo 16 de 23).
  * **Build**: compila y genera el artefacto (nivel 6) — lo que se desplegará (módulo 8 de 23).
* Diseño: etapas pequeñas con propósito único (módulo 4 de 23), feedback rápido (módulo 5 de 23), cachés (módulo 7 de 23) y paralelismo donde aplique (módulo 6 de 23).
* Los checks del CI se registran como requeridos en la rama protegida (módulo 13 de 23): sin verde, no hay merge.
* Buenas prácticas: el pipeline se versiona con el código (módulo 1 de 23), se revisa en el PR (módulo 14 de 23) y sus gates tienen umbrales reales (módulo 15 de 23).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
PR abierto
   ↓
CI corre: lint → tests → security → build
   ↓
¿Fallo? → job rojo con el error claro
   ↓
¿Todo verde? → checks requeridos cumplidos
   ↓
Revisión aprueba
   ↓
Merge a main
   ↓
Artefacto listo para la Fase 3
\`\`\`

### 🧪 Ejercicios

1. Construye el pipeline de CI de tu app: lint, tests, security y build.
2. Regístralos como checks requeridos en la rama protegida.
3. Rompe un lint a propósito y observa el bloqueo del PR.

### ⚠️ Errores comunes

* CI sin gates reales (checks que siempre pasan — módulo 15 de 23).
* Tests que no corren en el CI (solo en local — nivel 7).
* Seguridad al final o ausente (nivel 10).
* Pipeline lento que el equipo ignora (módulo 5 de 23).

### 🔗 Conexión DevOps

La Fase 2 conecta con jobs y stages (nivel 5), testing (nivel 7), seguridad (nivel 10), quality gates (módulo 15 de 23) y branch protection (módulo 13 de 23). Es el contrato de calidad de cada cambio: sin verde, no avanza.
`
export default content
