const content = `
## Módulo 12 — Secret management

### 🎯 Objetivos de aprendizaje

* Gestionar secretos con un gestor centralizado.
* Referenciar secretos, nunca copiarlos.
* Rotar y auditar secretos de forma sistemática.

### ❓ Problema real que resuelve

Los secretos están en el repo, en variables visibles, en scripts con el valor inline, o pegados en chats: cuando uno se filtra, nadie sabe cuáles están expuestos ni cómo rotarlos. El secret management (nivel 11) centraliza los secretos en un gestor, los referencia por nombre, los rota y los audita — reduciendo la superficie de fuga y haciendo posible responder a un incidente.

### 💡 Analogía

El secret management es la caja fuerte central del edificio con un llavero controlado: nadie lleva las llaves pegadas en la frente (secrets en el repo) ni las deja copiadas en la puerta (variables visibles). La caja fuerte (gestor) guarda todas las llaves, cada persona (job) pide la suya por nombre cuando la necesita, y hay un registro de quién abrió qué y cuándo (auditoría).

### 📖 Explicación técnica

* **Gestor de secretos** (nivel 11): HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager, Azure Key Vault, o el gestor nativo de la plataforma de CI/CD.
* Reglas:
  * **Referenciar, no copiar**: el pipeline referencia el secret por nombre (\`secrets:\` o \`\${{ secrets.X }}\`); el valor nunca se escribe en el archivo ni en variables visibles (nivel 11).
  * **Alcance**: secretos por entorno (nivel 12) — el secret de prod no es visible desde dev (módulo 10).
  * **Rotación**: los secretos expiran y se rotan; la rotación es automática donde se pueda (nivel 11 y 21).
  * **Auditoría**: el gestor registra accesos (quién, qué, cuándo) para responder a incidentes (nivel 10).
* Fugas: si un secret se filtra (log, repo, chat): rotarlo YA (nivel 10), revisar los logs donde apareció, y añadir el patrón a los detectores (nivel 10 y 20 de 22).
* Buenas prácticas: masking de secretos en logs (nivel 11), no imprimir valores en el debugging (nivel 7 de 22), y un inventario: qué secrets existen, dónde se usan, cuándo expiran.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Gestor central de secretos (Vault/SM/KV)
   ↓
El pipeline referencia por nombre (nunca el valor)
   ↓
El job pide el secret con su identidad (scopes)
   ↓
El gestor entrega el valor al proceso (sin logs)
   ↓
Rotación automática + auditoría de accesos
   ↓
Fuga → rotar YA + detectores nuevos
\`\`\`

### 🧪 Ejercicios

1. Mueve un secret de una variable visible al gestor de secretos.
2. Configura masking y verifica que no aparece en los logs.
3. Inventaría tus secretos: uso, entorno y fecha de expiración.

### ⚠️ Errores comunes

* Secrets en el repo o en variables visibles (nivel 11).
* Valores copiados en scripts (la referencia desaparece — módulo 7 de 22).
* Sin rotación (el secret comprometido sigue vivo años).
* Debugging que imprime el valor del secret (nivel 7 de 22).

### 🔗 Conexión DevOps

El secret management conecta con variables y secrets (nivel 11), environments (nivel 12), mínimo privilegio (módulo 11), security (nivel 10) y secret failure (nivel 22). Es la gestión del "qué no debe verse": centralizado, referenciado, rotado y auditado.
`
export default content
