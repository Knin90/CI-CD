const content = `
## Módulo 3 — Secrets

### 🎯 Objetivos de aprendizaje

* Definir qué es un secreto en CI/CD.
* Gestionar secretos: almacenamiento, acceso y masking.
* Aplicar la regla de oro: nunca secretos en el repositorio.

### ❓ Problema real que resuelve

Los pipelines necesitan credenciales (tokens, claves, contraseñas) para publicar, desplegar y acceder a servicios. Gestionadas mal — en el repo, en variables, en los logs — se filtran y comprometen todo. La gestión de secretos los almacena cifrados, los inyecta solo donde se necesitan y los oculta de los logs.

### 💡 Analogía

Los secretos son las llaves del edificio: no se cuelgan en la recepción pública (repo), no se copian en la pizarra (variables) ni se dejan en el mostrador (logs). Se guardan en la caja fuerte (gestor de secretos) y se entregan solo a quien los necesita, con registro de entrega. Una llave expuesta es una llave que hay que cambiar.

### 📖 Explicación técnica

* **Secreto**: dato sensible que autentica o autoriza (API key, token, contraseña, clave SSH, certificado).
* **Gestión**:
  * Almacenamiento **cifrado** en el gestor de la plataforma (GitHub secrets, GitLab CI/CD variables masked, Azure Key Vault, Vault, AWS Secrets Manager).
  * Inyección solo en el job/entorno que lo necesita.
  * **Masking**: la plataforma oculta el valor en los logs (\*\*\*\*).
  * **Rotación**: cambios periódicos o ante sospecha.
* Regla de oro: **nunca** secretos en el repositorio (código, .env, configs) — el historial los conserva.
* Acceso: por entorno y job; mínimo privilegio.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Gestor de secretos (cifrado)
  │
  ▼
El job solicita el secreto (por nombre)
  │
  ▼
Se inyecta como variable de entorno SOLO en ese job
  │
  ▼
La app/script lo usa (no lo imprime)
  │
  ▼
Logs: el valor aparece como *** (masking)
\`\`\`

### 💻 Ejemplo básico

Uso de secretos (GitHub Actions):

\`\`\`yaml
jobs:
  publish:
    runs-on: ubuntu-latest
    env:
      NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
    steps:
      - run: npm publish
# El valor nunca aparece en el YAML ni en los logs
\`\`\`

### 🏢 Caso de uso profesional

Un equipo centraliza sus credenciales en el gestor de secretos de la plataforma: tokens de registry, claves de deploy y API keys viven cifrados, se inyectan por entorno (producción solo en el job de producción) y se rotan trimestralmente. Una auditoría confirma: cero secretos en repos e imágenes.

### ⚠️ Errores comunes

* Secretos en el código, .env o configs commiteados.
* Secretos en variables normales (visibles).
* Imprimir secretos en logs ("para debug").
* Secretos sin rotación ni revocación.
* Acceso amplio (todos los jobs ven todos los secretos).

### 📋 Lo que debes recordar

* Secreto = credencial sensible: cifrado, mínimo acceso, masking.
* Nunca en el repositorio ni en los logs.
* Rotación periódica y ante sospecha.
* El gestor de secretos es la única fuente.

### 🧪 Autoevaluación rápida

1. ¿Qué es un secreto en CI/CD?
2. ¿Qué hace el masking?
3. ¿Por qué "nunca en el repositorio" es una regla absoluta?

---

1. Un dato sensible que autentica o autoriza (token, clave, contraseña) usado por el pipeline.
2. Oculta el valor del secreto en los logs de la plataforma (se muestra como \*\*\*\*).
3. Porque el historial de git conserva el valor para siempre: cualquier clon o acceso posterior lo expone, y el secreto debe considerarse comprometido.
`
export default content
