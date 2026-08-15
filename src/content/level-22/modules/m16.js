const content = `
## Módulo 16 — Permission errors

### 🎯 Objetivos de aprendizaje

* Diagnosticar errores de permisos en el pipeline.
* Distinguir permisos de archivos, usuarios y cloud/IAM.
* Aplicar el principio de mínimo privilegio al depurar.

### ❓ Problema real que resuelve

"Permission denied", "EACCES", "403", "not authorized to perform": el pipeline no puede leer un archivo, escribir en un directorio, ejecutar un binario o asumir un rol. Los errores de permisos son a la vez frustrantes y delicados: la tentación es dar permisos amplios "para que funcione", y eso crea problemas de seguridad (nivel 10 y 23). Diagnosticarlos con precisión es clave.

### 💡 Analogía

Los permisos son las credenciales del edificio: cada puerta tiene su llave. "Permission denied" en un archivo es la llave equivocada para esa sala (permisos Unix); "not authorized" en cloud es que tu pase no incluye ese edificio (IAM). La solución correcta no es dar la llave maestra a todos (write-all), sino encontrar exactamente qué puerta y qué llave falta.

### 📖 Explicación técnica

* Capas de permisos, distintas causas:
  * **Sistema de archivos**: owner/grupo/otros, \`chmod\`, \`chown\`, ACLs — el usuario del runner no puede leer/escribir.
  * **Usuarios/ejecución**: el binario no es ejecutable, \`sudo\`/become sin permisos, \`nobody\` en contenedores (nivel 9).
  * **Sistema operativo**: capabilities, SELinux/AppArmor bloqueando (nivel 16), \`seccomp\`.
  * **Cloud/IAM**: roles, policies, scopes insuficientes (nivel 11 y 21), OIDC sin permisos.
  * **Plataforma CI/CD**: \`permissions:\` de GitHub (write-all por defecto — nivel 10), roles de GitLab, service principals de Azure.
* Método: lee el recurso exacto (¿qué archivo, qué API, qué acción?) → identifica el usuario/identidad que falla → comprueba los permisos efectivos de esa identidad → concede lo mínimo necesario para esa acción concreta → verifica.
* Buenas prácticas: mínimo privilegio (nivel 10 y 23), permisos por entorno (nivel 12), OIDC con scopes (nivel 11), y nunca \`chmod 777\` ni \`write-all\` "temporalmente".

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job intenta una acción (archivo, API, recurso cloud)
   ↓
¿Quién es? (usuario del runner, rol, identidad)
   ↓
¿Qué acción y sobre qué recurso?
   ↓
Permisos efectivos de esa identidad
   ↓
¿Falta? → concede el mínimo para esa acción
   ↓
Verifica sin ampliar de más
   ↓
Documenta el cambio
\`\`\`

### 🧪 Ejercicios

1. Ejecuta un paso como usuario sin permisos de escritura y diagnostica EACCES.
2. Crea un rol IAM con un scope insuficiente y observa el 403.
3. Reduce los permisos de un job de GitHub a los mínimos y verifica que sigue funcionando.

### ⚠️ Errores comunes

* Conceder permisos amplios "temporalmente" (write-all, chmod 777) — nunca se revierten.
* Confundir el usuario que falla (runner vs app vs cloud role).
* Ignorar SELinux/AppArmor cuando el permiso parece de archivos.
* Probar permisos en producción (usa un entorno de prueba — nivel 12).

### 🔗 Conexión DevOps

Los permisos conectan con least privilege (nivel 10 y 23), IAM y OIDC (nivel 11), entornos (nivel 12), cloud credentials (nivel 21) y security (nivel 10). Es el módulo donde el debugging se encuentra con la seguridad: el arreglo correcto es el permiso mínimo, no la llave maestra.
`
export default content
