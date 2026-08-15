const content = `
## Módulo 6 — Secret masking

### 🎯 Objetivos de learning

* Explicar qué es el masking de secretos en los logs.
* Configurar el masking en la plataforma.
* Evitar imprimir secretos por error.

### ❓ Problema real que resuelve

Los logs del pipeline son visibles para el equipo (y a veces más): si un script imprime un token, el secreto queda expuesto en un lugar persistente. El masking reemplaza el valor del secreto por \*\*\*\* en los logs de la plataforma — una red de seguridad que convierte una impresión accidental en un asterisco.

### 💡 Analogía

El masking es como la máquina que tacha con marcador negro los datos sensibles de un documento antes de publicarlo: aunque alguien escriba el número de tarjeta en el documento, la máquina lo borra. No reemplaza la disciplina de no escribirlo, pero garantiza que si ocurre, el documento publicado no lo muestra.

### 📖 Explicación técnica

* **Masking**: la plataforma detecta el valor del secreto en la salida de los jobs y lo reemplaza por \*\*\*\* en los logs.
* Configuración:
  * GitHub: automático para los \`secrets\` (se enmascaran en los logs).
  * GitLab: variables marcadas como **masked** (valor enmascarado en logs).
  * Azure: variables secretas se enmascaran.
* Límites: el masking funciona con valores exactos; si el script transforma el secreto (base64, recorta), puede escapar.
* No depende de la memoria: configurar + confiar en el mecanismo.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`bash
# El script imprime la variable por error
echo "Token: \$NPM_TOKEN"
# → Los logs muestran: Token: *** (enmascarado)
\`\`\`

### 💻 Ejemplo básico

Masking en GitLab:

\`\`\`yaml
variables:
  DEPLOY_TOKEN:
    value: ""
    description: "Token de deploy"
    masked: true          # se oculta en los logs
  NPM_TOKEN:
    value: ""
    masked: true
\`\`\`

### 🏢 Caso de uso profesional

Un script de deploy imprime todas las variables de entorno "para debug" y queda en el log un token de registry. El masking de la plataforma lo convierte en \*\*\*\*: la fuga queda en cero. La política del equipo pasa a "nunca imprimir variables completas", y el masking es la red de seguridad que lo garantiza.

### ⚠️ Errores comunes

* Confiar en el masking para secretos no configurados (solo cubre los declarados).
* Imprimir secretos transformados (base64, substring) que escapan del masking.
* Logs de herramientas que vuelcan el entorno completo.
* No marcar las variables sensibles como masked.
* Poner secretos en artefactos (el masking no cubre archivos).

### 📋 Lo que debes recordar

* El masking reemplaza el secreto por \*\*\*\* en los logs.
* Configura los secretos como masked/protected.
* No imprimas variables completas (el masking es la red, no la disciplina).
* Los artefactos y archivos NO se enmascaran.

### 🧪 Autoevaluación rápida

1. ¿Qué hace el masking de secretos?
2. ¿Qué limitaciones tiene?
3. ¿Cómo se configura en GitLab?

---

1. Reemplaza el valor del secreto por \*\*\*\* en los logs del pipeline cuando el script lo imprime.
2. Solo cubre valores exactos configurados: secretos transformados (base64, recortes) y archivos/artefactos no se enmascaran.
3. Marcando la variable como \`masked: true\` (y opcionalmente \`protected\`) en la configuración de CI/CD variables.
`
export default content
