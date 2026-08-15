const content = `
## Módulo 15 — Least privilege

### 🎯 Objetivos de aprendizaje

* Aplicar el principio de mínimo privilegio al pipeline.
* Limitar tokens, identidades y accesos por job.
* Reducir el impacto de un compromiso.

### ❓ Problema real que resuelve

Cada credencial y permiso del pipeline es una puerta: un token con permisos amplios convierte cualquier compromiso (dependencia maliciosa, PR malo, runner roto) en acceso total. El mínimo privilegio reduce cada puerta a lo imprescindible: el impacto máximo de un compromiso es mínimo, no catastrófico.

### 💡 Analogía

En un edificio, cada empleado lleva solo las llaves de su zona: el recepcionista (job de build) no tiene la llave del tesoro (producción). Si le roban las llaves al recepcionista, el daño se limita a la recepción. El mínimo privilegio es la política de llaves del pipeline: cada job con exactamente las que necesita.

### 📖 Explicación técnica

Aplicaciones en el pipeline:

* **Token del workflow** (\`GITHUB_TOKEN\`): permisos mínimos por workflow (\`permissions:\`): solo lo que cada job usa (contents: read, packages: write...). Nunca el token por defecto amplio.
* **Credenciales por entorno**: el job de producción solo tiene las credenciales de producción.
* **Roles IAM mínimos**: OIDC con roles específicos (\`ci-push\`, \`deploy-prod\`), no administrador.
* **Runners**: identidad dedicada, sin root, sin acceso global.
* **Red**: network policies que solo permitan lo necesario.
* **Secretos**: solo los del entorno/job que los necesita; sin secretos "globales".

Regla: si un job puede hacer algo que no necesita, es una puerta de más. Cada permiso se justifica.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job build (mínimo):
  ├── contents: read (clonar)
  ├── packages: write (publicar imagen)
  └── Sin acceso a prod ✗
  │
Job deploy-prod (mínimo):
  ├── OIDC role deploy-prod (solo este entorno)
  ├── Secretos de producción (solo aquí)
  └── Sin acceso al repo ✗ (ya validado)
  │
  ▼
Un compromiso en build → máximo impacto: una imagen mala
Un compromiso en deploy → máximo impacto: ese entorno
\`\`\`

### 💻 Ejemplo básico

Permisos mínimos del token (GitHub Actions):

\`\`\`yaml
permissions:
  contents: read
  packages: write
  issues: none
  pull-requests: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: docker push registry/app:v1.4.0
\`\`\`

### 🏢 Caso de uso profesional

Una auditoría descubre que todos los workflows usaban el token por defecto (amplio) y que el runner de CI tenía acceso SSH a producción "por comodidad". El equipo aplica mínimo privilegio: tokens con permisos explícitos por workflow, OIDC con roles por entorno, runners sin root y red restringida. Cuando meses después una dependencia comprometida ejecuta código en el build, el daño se limita a un job fallido.

### ⚠️ Errores comunes

* Token por defecto (amplio) en todos los workflows.
* Credenciales de producción en jobs de desarrollo.
* Roles de administrador para "simplificar".
* Runners con acceso global.
* Permisos sin revisión ("siempre se hizo así").

### 📋 Lo que debes recordar

* Mínimo privilegio: cada permiso se justifica.
* Token con permisos explícitos por workflow.
* Credenciales y roles por entorno.
* Un compromiso solo causa el daño de sus permisos.

### 🧪 Autoevaluación rápida

1. ¿Qué es el principio de mínimo privilegio en CI/CD?
2. ¿Qué permisos necesita un job de build típico?
3. ¿Cómo limita el impacto de un compromiso?

---

1. Dar a cada job, token y runner solo los permisos imprescindibles para su función.
2. Clonar el repo (contents: read), instalar dependencias y publicar su artefacto (packages: write) — nada más.
3. Porque el daño máximo de un compromiso queda acotado a los permisos del job comprometido: mínimo privilegio = impacto mínimo.
`
export default content
