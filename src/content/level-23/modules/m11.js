const content = `
## Módulo 11 — Least privilege

### 🎯 Objetivos de aprendizaje

* Aplicar el principio de mínimo privilegio al pipeline.
* Otorgar solo los permisos necesarios a cada job.
* Auditar y reducir permisos con regularidad.

### ❓ Problema real que resuelve

El pipeline corre con permisos write-all: cada job puede tocar el repo, el registry, el cluster y el cloud con permisos amplios. Un job comprometido (una dependencia maliciosa — nivel 10) hereda todos esos permisos y el atacante escala. El principio de mínimo privilegio (nivel 10 y 23) da a cada job solo lo que necesita para su tarea: el job de lint no toca el cluster.

### 💡 Analogía

El mínimo privilegio es el pase de acceso del edificio: el repartidor tiene pase solo a la puerta de carga, el técnico solo a la sala de máquinas, y solo el gerente abre la caja fuerte. Un pase maestro para todos (write-all) significa que cualquiera — o cualquier paquete comprometido — puede abrir la caja fuerte. El pase mínimo limita el daño posible.

### 📖 Explicación técnica

* **Principio de mínimo privilegio**: cada identidad (job, runner, usuario, rol) tiene exactamente los permisos necesarios para su función, ni uno más.
* Aplicación al pipeline:
  * **GitHub**: \`permissions:\` explícito por job (contents: read, issues: none…) — el default write-all es un riesgo (nivel 10 y 16 de 22).
  * **GitLab/Azure/Jenkins**: roles y scopes por job/etapa; el job de build no despliega (nivel 5 y 19).
  * **Cloud/IAM**: roles por entorno y por acción (OIDC con scopes — nivel 11 y 21); el job de test no crea infra (nivel 15).
  * **Secrets**: cada job accede solo a los secrets que usa (nivel 11); el job de lint no ve la clave de prod (nivel 12).
* Beneficios: superficie de ataque reducida (nivel 10), daño contenido en un compromiso, y auditoría clara (qué hizo cada identidad).
* Buenas prácticas: empezar con read-only y ampliar solo cuando un job lo justifique, revisar permisos en cada cambio del pipeline (nivel 1), auditar con regularidad (nivel 10 y 23), y documentar por qué cada job tiene cada permiso.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Cada job declara sus permisos explícitos
   ↓
lint: solo lectura del repo
   ↓
test: lectura + artifacts de test
   ↓
build: escritura solo al registry de build
   ↓
deploy: solo el entorno/role de prod (OIDC)
   ↓
Un job comprometido → daño limitado a su scope
\`\`\`

### 🧪 Ejercicios

1. Revisa los \`permissions:\` de tus jobs de GitHub: ¿hay write-all?
2. Reduce cada job a lo mínimo y verifica que el pipeline sigue funcionando.
3. Audita los roles IAM de tus pipelines: ¿algún job tiene más de lo necesario?

### ⚠️ Errores comunes

* Write-all "por comodidad" (nivel 10 y 16 de 22).
* Secrets accesibles a todos los jobs (nivel 11).
* Roles IAM amplios compartidos (el job de build crea infra — nivel 15).
* Permisos que crecen sin revisión (la auditoría periódica es obligatoria — nivel 10).

### 🔗 Conexión DevOps

El mínimo privilegio conecta con security en CI/CD (nivel 10), permissions (nivel 16 de 22), secrets (nivel 11), OIDC (nivel 11 y 21) y environment isolation (módulo 10). Es el principio de seguridad más rentable del pipeline: menos permisos, menos daño posible.
`
export default content
