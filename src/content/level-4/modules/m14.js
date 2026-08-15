const content = `
## Módulo 14 — Runner security

### 🎯 Objetivos de aprendizaje

* Identificar los vectores de ataque que pasan por los runners.
* Aplicar las prácticas de endurecimiento de runners.
* Decidir qué código ejecutar en qué runner.

### ❓ Problema real que resuelve

El runner ejecuta código de los jobs — incluido código de PRs de terceros y de dependencias comprometidas. Un runner mal asegurado es una puerta a tu infraestructura: credenciales robadas, escapes de contenedor, acceso a redes internas. Endurecer los runners convierte un posible compromiso en un incidente contenido.

### 💡 Analogía

El runner es como un vigilante que abre la puerta de la fábrica a los visitantes (jobs): si el vigilante tiene las llaves de todo (permisos amplios), un visitante malicioso se lleva todo. Endurecer es darle al vigilante solo la llave de la sala de espera (mínimo privilegio), revisar a los visitantes (aislamiento) y no dejar que los visitantes pasen la noche (efímero).

### 📖 Explicación técnica

Vectores de ataque:

* **PRs maliciosos**: código de terceros que ejecuta comandos en el runner.
* **Dependencias comprometidas**: un paquete con código malicioso en el build.
* **Secrets en el entorno**: credenciales accesibles al job (y al código malicioso).
* **Escapes de contenedor**: jobs con \`privileged\` que escapan del aislamiento.
* **Red interna**: runners con acceso amplio a la red corporativa.

Prácticas de endurecimiento:

1. **No ejecutar PRs no confiables en runners con acceso sensible** — usar hosted/efímeros para código de terceros; restringir \`pull_request_target\`.
2. **Mínimo privilegio**: identidad dedicada, sin root, permisos del token mínimos.
3. **Aislamiento**: VM/pod por job; sin \`privileged\`; red restringida.
4. **Secretos**: solo los del entorno; nunca en disco; masking; rotación.
5. **Ambiente limpio**: runners efímeros o limpieza forzada.
6. **Actualizaciones**: SO y runner parcheados.
7. **Auditoría**: logs de acceso, monitoreo del runner, alertas de comportamientos anómalos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Código no confiable (PR externo)
  │
  ▼
Runner hosted/efímero (aislado, sin credenciales sensibles)
  │
  ├── Sin acceso a redes internas
  ├── Token con permisos mínimos
  └── Máquina destruida al terminar
  │
  ▼
Impacto máximo de un compromiso: un build fallido
\`\`\`

### 💻 Ejemplo básico

Restricción de triggers para código no confiable (GitHub):

\`\`\`yaml
# PRs de terceros: solo validación en hosted, sin secretos
on:
  pull_request:            # código de forks (no confiable)

jobs:
  validate:
    runs-on: ubuntu-latest  # hosted, nunca self-hosted
    steps:
      - run: npm ci && npm test
# NUNCA: secrets de producción en este workflow
\`\`\`

### 🏢 Caso de uso profesional

Una auditoría de seguridad revela que el runner de CI tenía la clave SSH de producción "para los deploys". El equipo reestructura: los deploys usan credenciales de corta vida (OIDC) obtenidas solo en el job de deploy con aprobación; el runner de CI no tiene ninguna credencial persistente; los PRs de terceros corren en hosted. El perfil de riesgo de la infraestructura de CI cae drásticamente.

### ⚠️ Errores comunes

* PRs de terceros en runners self-hosted con acceso a secretos.
* \`privileged: true\` en contenedores de runners.
* Runners con credenciales de producción persistentes.
* Sin monitoreo ni auditoría de los runners.
* Tokens de registro/deploy guardados en el repo o en la máquina.

### 📋 Lo que debes recordar

* El runner ejecuta código no confiable: trátalo como superficie de ataque.
* Código de terceros → hosted/efímero sin credenciales sensibles.
* Mínimo privilegio + aislamiento + secretos por entorno + efímero.
* Actualiza, monitorea y audita tus runners.

### 🧪 Autoevaluación rápida

1. ¿Qué vectores de ataque pasan por los runners?
2. ¿Dónde debe ejecutarse el código de PRs de terceros?
3. Enumera tres prácticas de endurecimiento de runners.

---

1. PRs maliciosos, dependencias comprometidas, secretos accesibles al job, escapes de contenedor y acceso amplio a la red interna.
2. En runners hosted o efímeros aislados, sin credenciales sensibles ni acceso a redes internas.
3. Mínimo privilegio (identidad dedicada, token mínimo), aislamiento (VM/pod por job, sin privileged), y runners efímeros o con limpieza forzada.
`
export default content
