const content = `
## Módulo 4 — Maps

### 🎯 Objetivos de aprendizaje

* Escribir mapas (diccionarios) en YAML.
* Usar mapas anidados en la configuración de pipelines.
* Distinguir cuándo usar un mapa y cuándo una lista.

### ❓ Problema real que resuelve

Los pipelines se estructuran como mapas: \`jobs\` es un mapa de jobs, cada job es un mapa de propiedades, cada entorno es un mapa con sus variables. Entender los mapas (pares clave-valor, anidación, orden) es entender la anatomía de cualquier configuración YAML de CI/CD.

### 💡 Analogía

Un mapa es una ficha de inventario: "nombre: servidor-web, IP: 10.0.0.5, puerto: 8080". Cada ficha describe una entidad con atributos. En el pipeline, cada job es una ficha (su runner, sus steps, sus condiciones) y el archivo completo es el archivador de fichas.

### 📖 Explicación técnica

* Un **mapa** (también diccionario/objeto) es un conjunto de pares \`clave: valor\`.
* Las claves son únicas dentro de su nivel; el orden en YAML se conserva.
* **Anidación**: los valores pueden ser otros mapas o listas, definiendo la estructura jerárquica.

\`\`\`yaml
jobs:                          # mapa
  test:                        # clave: valor (valor = mapa)
    runs-on: ubuntu-latest     # clave: valor
    timeout-minutes: 15
    env:                       # mapa anidado
      NODE_ENV: test
    steps:                     # lista (ver módulo de listas)
      - run: npm test
\`\`\`

* Cuándo usar mapa vs lista: si necesitas **identificar** elementos por nombre (jobs, entornos, servicios), usa mapa; si solo necesitas **orden** (steps, argumentos), usa lista.
* En GitHub Actions, un job que es un mapa (por nombre); en GitLab, cada job también es un mapa bajo la raíz.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
jobs:
  test:
    runs-on: ubuntu-latest

Parser:
  { "jobs": { "test": { "runs-on": "ubuntu-latest" } } }

→ La plataforma busca el job "test" y lee sus propiedades
\`\`\`

### 💻 Ejemplo básico

Mapas en configuración de entorno:

\`\`\`yaml
environments:
  staging:
    url: https://staging.example.com
    variables:
      LOG_LEVEL: debug
      API_URL: https://api.staging.example.com
  production:
    url: https://example.com
    variables:
      LOG_LEVEL: warn
      API_URL: https://api.example.com
\`\`\`

### 🏢 Caso de uso profesional

Un equipo define sus entornos como un mapa en un template YAML: cada entorno (staging, production) tiene su URL, sus variables y su política de aprobación. Los pipelines referencian el entorno por nombre (\`environment: production\`); la plataforma resuelve el mapa y aplica la configuración correcta en cada despliegue.

### ⚠️ Errores comunes

* Claves duplicadas en el mismo nivel (la última gana, silenciosamente).
* Confundir mapa con lista: \`jobs\` con items de lista en vez de claves.
* Anidación excesiva: pipelines ilegibles de 8 niveles.
* Mezclar indentación: los mapas anidados se rompen.
* Claves con caracteres especiales sin comillas.

### 📋 Lo que debes recordar

* Mapa = pares clave: valor; la estructura base de YAML.
* Los valores pueden ser mapas o listas (anidación).
* Mapa para identificar por nombre; lista para orden.
* Claves únicas por nivel; indentación consistente.

### 🧪 Autoevaluación rápida

1. ¿Qué es un mapa en YAML?
2. ¿Cuándo usar un mapa y cuándo una lista?
3. ¿Qué problema tienen las claves duplicadas?

---

1. Un conjunto de pares clave-valor que describen una entidad; los valores pueden ser escalares, mapas o listas.
2. Mapa cuando los elementos se identifican por nombre (jobs, entornos); lista cuando importa el orden (steps, argumentos).
3. La última clave duplicada gana silenciosamente: errores difíciles de detectar porque el parser no avisa.
`
export default content
