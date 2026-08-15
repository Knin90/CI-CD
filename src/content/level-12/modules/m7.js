const content = `
## Módulo 7 — Environment protection

### 🎯 Objetivos de aprendizaje

* Definir qué es la protección de entornos.
* Configurar reglas de protección en la plataforma de CI/CD.
* Entender por qué la protección es control de riesgo, no burocracia.

### ❓ Problema real que resuelve

Sin protección, cualquier cambio en el pipeline puede llegar a producción: un push directo, un PR aprobado por error, un secret mal configurado. La protección de entornos define quién y bajo qué condiciones puede desplegar a cada entorno — convirtiendo el riesgo en reglas explícitas y auditables.

### 💡 Analogía

La protección del entorno es como la puerta con tarjeta del laboratorio: no cualquiera entra, y cada entrada queda registrada. La puerta no impide el trabajo: impide el acceso no autorizado. Sin puerta, el laboratorio depende de la buena voluntad de todos.

### 📖 Explicación técnica

* **Protección de entorno**: conjunto de reglas que controlan los despliegues a un entorno.
* Reglas típicas (GitHub Environments, GitLab protected environments):
  * **Ramas permitidas**: solo main (o ramas de release) puede desplegar a producción.
  * **Required reviewers**: un deploy a producción requiere aprobación de revisores designados.
  * **Wait timer**: tiempo de espera antes de ejecutar el deploy (para abortar si algo huele mal).
  * **Restricción de jobs**: solo jobs específicos pueden usar ese entorno.
  * **Variables/secretos por entorno**: cada entorno tiene su propio set aislado.
* La protección se audita: quién aprobó, cuándo, desde qué pipeline.
* Diferencia con approval gates (módulo 8): la protección define *quién puede*; el approval gate es el *acto de aprobar*.
* Buenas prácticas: proteger al menos producción; dev sin protecciones (feedback rápido); documentar quién puede aprobar y por qué.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job pide deploy a PROD
   ↓
¿Rama permitida? → no → bloqueado
   ↓
¿Revisores requeridos? → no aprobados → espera
   ↓
¿Aprobación concedida?
   ↓
Deploy ejecutado (auditado)
\`\`\`

### 🧪 Ejercicios

1. Configura protección en tu entorno de producción: rama permitida + revisores requeridos.
2. Verifica que un push directo a main no puede desplegar a producción.
3. Audita el historial de aprobaciones de un entorno en tu plataforma.

### ⚠️ Errores comunes

* Proteger solo con "buena voluntad" (política no escrita).
* Aprobar sin revisar (la protección se convierte en trámite).
* Proteger demasiados entornos (dev protegido = feedback lento, fricción).
* Misma protección para todos los entornos, ignorando el riesgo distinto de cada uno.

### 🔗 Conexión DevOps

La protección de entornos es el control de acceso del pipeline: conecta seguridad (nivel 10), environments (nivel 12) y gobernanza. Un entorno sin protección es una superficie de ataque silenciosa.
`
export default content
