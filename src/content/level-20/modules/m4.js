const content = `
## Módulo 4 — Pipeline linting

### 🎯 Objetivos de aprendizaje

* Aplicar linting a la definición de pipelines.
* Detectar malas prácticas y problemas de mantenibilidad.
* Configurar linters por plataforma.

### ❓ Problema real que resuelve

El pipeline puede ser válido (sintaxis OK) y funcionar, pero estar mal escrito: steps sin nombre, permisos excesivos, condiciones confusas, YAML no canónico. El linting aplica reglas de mejores prácticas a la definición del pipeline — detectando lo que la validación de sintaxis no ve y manteniendo los pipelines limpios y mantenibles.

### 💡 Analogía

El pipeline linting es la revisión de estilo del artículo periodístico: el artículo puede ser gramaticalmente correcto (sintaxis válida) pero estar mal estructurado — títulos sin sentido, párrafos kilométricos, clickbait. El corrector de estilo (lint) aplica las reglas de redacción para que el artículo sea claro y mantenible, no solo correcto.

### 📖 Explicación técnica

* **Pipeline linting**: análisis estático de la definición del pipeline con reglas de mejores prácticas.
* Qué detecta (según plataforma): steps/jobs sin nombre descriptivo, permisos con \`write-all\` (GitHub — nivel 10), shell scripts sin verificación (\`shellcheck\` en steps), condiciones redundantes, YAML no canónico, secretos en la definición.
* Herramientas: actionlint (GitHub — valida esquema + reglas), gitlab-ci-lint + reglas custom, shellcheck (scripts de los steps), yamllint (nivel 2), linters de HCL/JSON (para pipelines generados).
* En el flujo: el lint corre en el PR de cambios al pipeline — junto con la validación (módulo 1) y la validación YAML (módulo 2).
* Beneficios: pipelines consistentes (nivel 23 — mantenibilidad), menos bugs sutiles, revisiones más rápidas, seguridad básica (permisos — nivel 10).
* Buenas prácticas: reglas por defecto + pocas custom, excepciones justificadas (no \`# disable\` masivo), lint en PR y pre-commit (nivel 1).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Definición del pipeline en el PR
   ↓
actionlint / gitlab-ci-lint / shellcheck
   ↓
Reglas: esquema + estilo + seguridad básica
   ↓
¿Hallazgos? → PR falla con sugerencias
   ↓
¿Limpio? → merge con confianza
\`\`\`

### 🧪 Ejercicios

1. Instala actionlint (o el linter de tu plataforma) y ejecútalo sobre tus pipelines.
2. Corrige 3 hallazgos (permisos, steps sin nombre, shellcheck).
3. Configura el lint como gate del PR de configuración.

### ⚠️ Errores comunes

* Lint sin gate (se ejecuta pero no bloquea).
* Suprimir reglas de seguridad (permisos write-all "porque funciona").
* Lint solo de sintaxis (sin reglas de mejores prácticas).
* No lintar los scripts de los steps (shellcheck omitido).

### 🔗 Conexión DevOps

El linting de pipelines conecta la validación (módulos 1-2), la seguridad (nivel 10 — permisos) y la mantenibilidad (nivel 23). Un pipeline lint-clean es un pipeline que un equipo puede mantener.
`
export default content
