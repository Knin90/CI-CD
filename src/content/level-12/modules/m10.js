const content = `
## Módulo 10 — Environment secrets

### 🎯 Objetivos de aprendizaje

* Definir secretos por entorno y su aislamiento.
* Configurar secretos específicos por entorno en la plataforma.
* Entender por qué un secret de dev nunca debe servir en producción.

### ❓ Problema real que resuelve

Cada entorno tiene credenciales distintas (Bases de datos, APIs, certificados). Si todos comparten los mismos secretos, un leak de dev expone producción. Los secrets por entorno aíslan el daño: cada entorno tiene su propio conjunto de credenciales, con su propio ciclo de vida y rotación.

### 💡 Analogía

Los secrets por entorno son las tarjetas de acceso del edificio: la del personal de limpieza abre las oficinas, pero no la bóveda. Y cada zona tiene su propia tarjeta: robar una no abre todo. Si todas las puertas usaran la misma llave, bastaría una copia para entrar a todo.

### 📖 Explicación técnica

* **Secret por entorno**: credenciales definidas y almacenadas por entorno, no globales.
* Implementaciones: GitHub Environments (secrets por environment), GitLab (CI/CD variables por environment scope), Azure (variable groups por entorno), Kubernetes (Secret por namespace).
* Aislamiento: el secret de producción solo es visible para jobs que despliegan a producción; ni siquiera aparece en otros entornos.
* Ciclo de vida: creación, uso, rotación, revocación — por entorno.
* Combinado con: secret stores externos (Vault — nivel 11) que sirven secretos según el contexto del entorno.
* Buenas prácticas: nunca reutilizar credenciales entre entornos, rotar secretos de producción periódicamente, revisar qué jobs tienen acceso a cada secret.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job de deploy a PROD
   ↓
¿Tiene acceso al entorno PROD? → sí
   ↓
Recibe secretos SOLO de PROD
   ↓
Nunca ve secrets de dev/staging
   ↓
Credenciales inyectadas en runtime
\`\`\`

### 🧪 Ejercicios

1. Mueve tus secretos a secretos por entorno (dev/staging/prod separados).
2. Verifica que un job de dev no puede leer los secretos de producción.
3. Establece una política de rotación para los secretos de producción.

### ⚠️ Errores comunes

* Mismos secretos en todos los entornos (un leak afecta todo).
* Secretos globales "por simplicidad".
* Rotación manual de secretos de producción (nadie lo hace).
* Logs que imprimen secretos de entornos distintos.

### 🔗 Conexión DevOps

Los secrets por entorno aplican el aislamiento de entornos (módulo 12) a las credenciales: conecta seguridad (nivel 10), gestión de secrets (nivel 11) y environments (nivel 12).
`
export default content
