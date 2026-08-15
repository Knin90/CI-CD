const content = `
## Módulo 9 — Runner permissions

### 🎯 Objetivos de aprendizaje

* Explicar los permisos que necesita un runner y los que NO debería tener.
* Aplicar el principio de mínimo privilegio a los runners.
* Entender la diferencia entre permisos del runner y del job.

### ❓ Problema real que resuelve

Un runner con permisos de administrador sobre toda la infraestructura convierte cualquier job (y cualquier PR malicioso) en un vector de compromiso total. Los runners necesitan permisos mínimos: ejecutar builds y deploys, sí; administrar el clúster completo o acceder a todos los secretos, no. Definir los permisos del runner es una decisión de seguridad central.

### 💡 Analogía

El runner es como un repartidor: necesita la llave del almacén donde recoge los paquetes (su trabajo), no las llaves maestras de todo el edificio, la caja fuerte del director ni el servidor de RRHH. Si el repartidor es atracado (runner comprometido), el daño se limita a lo que llevaba: mínimo privilegio.

### 📖 Explicación técnica

* **Permisos del runner** (qué puede hacer la máquina/identidad):
  * Necesita: acceso al repo (clonar), herramientas de build, acceso a los entornos/registries que despliega, y credenciales para publicar artefactos.
  * NO necesita: administración global del clúster, acceso a todos los secretos, permisos de escritura sobre infraestructura crítica no relacionada.
* **Permisos del job** (token de la ejecución): GitHub usa \`permissions:\` en el workflow para limitar el \`GITHUB_TOKEN\` (contents, pull-requests, packages...). Por defecto en repos nuevos es de solo lectura: el mínimo.
* **Mínimo privilegio en la práctica**:
  * Identidad dedicada para el runner (no root/administrador).
  * \`GITHUB_TOKEN\` con permisos mínimos por workflow.
  * Credenciales por entorno (solo las de producción en el runner de producción).
  * Sin acceso SSH global; solo a los hosts/registries necesarios.
  * Network policies: el runner solo alcanza lo que necesita.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Runner (identidad dedicada, mínimo privilegio)
  │
  ├── Lectura del repo (clone) ✓
  ├── Tools de build ✓
  ├── Push al registry del proyecto ✓
  ├── Deploy al entorno asignado ✓
  ├── Admin del clúster completo ✗ (NO)
  ├── Todos los secretos ✗ (NO)
  └── Acceso SSH global ✗ (NO)
  │
  ▼
Job comprometido → impacto limitado al mínimo
\`\`\`

### 💻 Ejemplo básico

Permisos mínimos del token en un workflow (GitHub):

\`\`\`yaml
permissions:
  contents: read            # solo lectura del repo
  packages: write           # para publicar imágenes
  pull-requests: read       # para comentar checks

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: docker push registry/... 
\`\`\`

### 🏢 Caso de uso profesional

Un equipo descubre en una auditoría que su runner de CI corre como root en una VM con acceso SSH por clave a todos los servidores de producción. Migran a: identidad dedicada sin sudo, token con permisos mínimos, credenciales de deploy por entorno y red restringida. Cuando meses después un job ejecuta código malicioso de una dependencia comprometida, el impacto se limita a un build fallido — no a la infraestructura.

### ⚠️ Errores comunes

* Runners corriendo como root/administrador.
* Credenciales de producción en el runner de desarrollo.
* \`GITHUB_TOKEN\` con permisos amplios "por si acaso".
* Runners con acceso SSH global "para facilitar los deploys".
* Compartir claves de deploy entre entornos.

### 📋 Lo que debes recordar

* Mínimo privilegio: el runner solo puede hacer su trabajo.
* Identidad dedicada, sin root, credenciales por entorno.
* Token del job con permisos mínimos.
* Un runner comprometido solo causa el daño que sus permisos permiten.

### 🧪 Autoevaluación rápida

1. ¿Qué permisos necesita realmente un runner?
2. ¿Qué es el principio de mínimo privilegio aplicado a runners?
3. ¿Qué controla \`permissions:\` en GitHub Actions?

---

1. Clonar el repo, ejecutar builds/tests, publicar artefactos en su registry y desplegar en los entornos asignados — nada más.
2. Dar al runner (y su identidad) solo los permisos necesarios para su trabajo, de modo que un compromiso tenga impacto mínimo.
3. Los permisos del \`GITHUB_TOKEN\` que usa la ejecución: limita qué puede hacer el job con la API (contents, packages, pull-requests, etc.).
`
export default content
