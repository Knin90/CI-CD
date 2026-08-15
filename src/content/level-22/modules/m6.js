const content = `
## Módulo 6 — Authentication failure

### 🎯 Objetivos de aprendizaje

* Diagnosticar fallos de autenticación en el pipeline.
* Distinguir auth de permisos (authorization).
* Usar OIDC y secretos para credenciales seguras.

### ❓ Problema real que resuelve

"401 Unauthorized", "403 Forbidden", "permission denied", "invalid credentials": el pipeline no puede autenticarse contra el registry, el cloud, el cluster o Git. Sin método, se cambian tokens "a ver si pasa". Diagnosticar autenticación — separando credenciales incorrectas, expiradas y permisos insuficientes — es clave para que el pipeline pueda hacer su trabajo.

### 💡 Analogía

La autenticación es la llave de la puerta del edificio: el 401 es "llave equivocada" (credencial mala), el token expirado es "la llave caducó", y el 403 es "la llave abre la puerta pero no esa oficina" (permisos). Cambiar la cerradura (rotar todo) no arregla nada si el problema es que la persona no tiene acceso a esa sala.

### 📖 Explicación técnica

* **Autenticación** (¿quién eres?) vs **authorization** (¿qué puedes hacer?): el 401 es auth, el 403 es permisos. Diagnosticarlos distinto.
* Fallos típicos:
  * Credencial incorrecta o revocada (token rotado, contraseña cambiada).
  * Token expirado (los tokens cortos expiran; los pipelines usan OIDC — nivel 11).
  * Token con permisos insuficientes (scope, role, policy — nivel 11 y 16).
  * Secret no disponible en el entorno (nivel 7 y 12).
  * Clock skew (reloj del runner desincronizado rompe JWT/STS).
* Método: lee el código exacto (401 vs 403) → verifica la identidad (¿qué credencial usó el job?) → comprueba expiración y scope → prueba manual con la misma credencial → corrige el origen (secret, OIDC, policy), no el síntoma.
* Buenas prácticas: OIDC en vez de credenciales de larga duración (nivel 11), permisos mínimos (nivel 10 y 23), rotación, y que el error diga qué falló (mensajes claros).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job intenta autenticarse (registry, cloud, cluster)
   ↓
¿401 o 403?
   ↓
401 → credencial: ¿correcta? ¿expirada? ¿clock skew?
   ↓
403 → permisos: ¿scope? ¿role? ¿policy?
   ↓
Verifica la credencial que usó el job (secret, OIDC)
   ↓
Corrige el origen (rotar, ampliar scope, fijar reloj)
   ↓
Verifica con el pipeline
\`\`\`

### 🧪 Ejercicios

1. Genera un token expirado y observa el error exacto en el pipeline.
2. Distingue en logs un 401 de un 403 y explica la diferencia.
3. Sustituye una credencial de larga duración por OIDC (nivel 11).

### ⚠️ Errores comunes

* Cambiar credenciales al azar sin leer si es 401 o 403.
* Tokens de larga duración "para no tocar nada" (riesgo de seguridad — nivel 11).
* Guardar credenciales en variables visibles (nivel 11).
* Ignorar el clock skew en runners self-hosted.

### 🔗 Conexión DevOps

La autenticación conecta con secrets (nivel 11), OIDC (nivel 11), permisos (nivel 10 y 16), cloud credentials (nivel 21) y secret failure (módulo 7). Es la frontera entre "el pipeline no puede" y "el pipeline no debe": diagnosticarla bien evita ambos.
`
export default content
