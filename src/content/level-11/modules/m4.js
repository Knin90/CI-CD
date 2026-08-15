const content = `
## Módulo 4 — Credentials

### 🎯 Objetivos de aprendizaje

* Distinguir credenciales de secretos y variables.
* Gestionar credenciales por entorno y por acción.
* Aplicar rotación y mínimo privilegio.

### ❓ Problema real que resuelve

Las credenciales autentican acciones concretas: push al registry, deploy a producción, acceso a la base de datos. Gestionadas bien (por entorno, mínimas, rotadas) son seguras; gestionadas mal (una credencial todopoderosa compartida) convierten cualquier compromiso en un desastre. La gestión de credenciales define quién puede hacer qué, con qué y durante cuánto tiempo.

### 💡 Analogía

Las credenciales son las llaves por función del edificio: llave del almacén, llave del servidor, llave del cuarto de máquinas. Lo profesional es que cada persona (job) tenga solo la llave de su función, que las llaves se cambien periódicamente (rotación) y que haya registro de quién usó cada llave. La llave maestra (credencial amplia) es lo que nunca debe existir.

### 📖 Explicación técnica

* **Credencial**: conjunto de datos que autentica una identidad para una acción (usuario+token, clave SSH, certificado, OIDC role).
* Tipos: tokens de API, claves SSH, credenciales de registry, credenciales cloud (access keys, roles), credenciales de bases de datos.
* Gestión:
  * **Por entorno**: credenciales distintas para staging y producción (una comprometida no expone la otra).
  * **Mínimo privilegio**: cada credencial solo hace lo que debe (deploy-prod ≠ deploy-staging).
  * **Cortas**: credenciales de corta vida (OIDC, STS) en vez de estáticas.
  * **Rotación**: cambiar periódicamente; revocar al instante si se sospecha.
  * **Auditoría**: registro de uso (quién, cuándo, qué acción).
* En el pipeline: las credenciales se inyectan como secretos del entorno correspondiente.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Credenciales por entorno:
  staging:  DEPLOY_TOKEN_STAGING (permiso: deploy staging)
  prod:     DEPLOY_TOKEN_PROD (permiso: deploy prod)
  │
  ▼
Job deploy-staging → inyecta DEPLOY_TOKEN_STAGING
Job deploy-prod → inyecta DEPLOY_TOKEN_PROD
  │
  ▼
Una credencial comprometida → solo afecta su entorno y alcance
  │
  ▼
Rotación periódica + auditoría de uso
\`\`\`

### 💻 Ejemplo básico

Credenciales por entorno (GitHub Actions):

\`\`\`yaml
deploy-staging:
  runs-on: ubuntu-latest
  environment: staging
  env:
    DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN_STAGING }}
    # ← solo existe en el entorno staging

deploy-prod:
  runs-on: ubuntu-latest
  environment: production
  env:
    DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN_PROD }}
\`\`\`

### 🏢 Caso de uso profesional

Una empresa detecta un token de deploy filtrado. Gracias a la gestión por entorno, el token solo podía desplegar a staging: revocan ese token, rotan los demás por precaución y el incidente queda contenido. La auditoría muestra qué jobs lo usaron. Las credenciales de producción nunca se tocaron porque eran otras.

### ⚠️ Errores comunes

* Una credencial para todo (llave maestra).
* Credenciales compartidas entre entornos y personas.
* Sin rotación (credenciales eternas).
* Credenciales estáticas cuando OIDC/cortas son posibles.
* Sin auditoría de uso (no se sabe qué pasó).

### 📋 Lo que debes recordar

* Credencial = identidad para una acción; mínima y por entorno.
* Corta vida > estática; rotación periódica.
* Una comprometida no debe exponer lo demás.
* Auditoría de uso siempre.

### 🧪 Autoevaluación rápida

1. ¿Qué diferencia hay entre secreto, variable y credencial?
2. ¿Por qué las credenciales deben ser por entorno?
3. ¿Qué ventaja tienen las credenciales de corta vida?

---

1. El secreto es el dato sensible; la variable es configuración; la credencial es la identidad que autentica una acción concreta.
2. Para aislar el impacto: una credencial de staging comprometida no da acceso a producción.
3. Reducen la ventana de exposición: si se filtran, expiran solas y el atacante tiene poco tiempo de uso.
`
export default content
