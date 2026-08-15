const content = `
## Módulo 6 — ConfigMaps

### 🎯 Objetivos de aprendizaje

* Definir ConfigMap y su diferencia con Secrets.
* Montar configuración en los pods sin reconstruir la imagen.
* Gestionar ConfigMaps por entorno.

### ❓ Problema real que resuelve

La configuración no sensible (URLs, log levels, flags) no debe estar quemada en la imagen: cambiarla obligaría a reconstruir. Los ConfigMaps guardan configuración como datos y la inyectan en los pods (variables de entorno o archivos montados), separando configuración de imagen — el mismo artefacto se configura distinto por entorno.

### 💡 Analogía

El ConfigMap es el tablón de anuncios de la oficina: los empleados (pods) leen las normas del día (configuración) cada mañana, sin que nadie reimprima sus contratos (imagen). Cuando cambia una norma, solo se actualiza el tablón — los empleados siguen siendo los mismos.

### 📖 Explicación técnica

* **ConfigMap**: objeto que guarda pares clave-valor o archivos de configuración (no sensibles).
* Uso en pods:
  * Como **variables de entorno**: \`envFrom: configMapRef\`.
  * Como **archivo montado**: volumen en un path del contenedor (\`/etc/app/config.yaml\`).
* Diferencia con Secret (módulo 7): ConfigMap = datos no sensibles; Secret = datos sensibles (cifrados/restrictivos). Nunca pongas contraseñas en un ConfigMap.
* Por entorno: un ConfigMap por namespace (dev/staging/prod), referenciado por el mismo Deployment — solo cambia el namespace.
* En CI/CD: el pipeline aplica el ConfigMap del entorno antes del Deployment; o el manifiesto referencia el ConfigMap por nombre.
* Buenas prácticas: nombres claros (\`app-config\`), versionar los ConfigMaps, inmutabilidad opcional (\`immutable: true\`) para evitar cambios accidentales.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
ConfigMap (app-config) en el namespace
   ↓
Deployment lo referencia (envFrom / volumen)
   ↓
Pod arranca → lee configuración del ConfigMap
   ↓
ConfigMap cambia → nueva plantilla o reinicio para aplicarla
   ↓
Misma imagen, distinta config por entorno
\`\`\`

### 🧪 Ejercicios

1. Crea un ConfigMap y móntalo como variables de entorno en un Deployment.
2. Crea ConfigMaps distintos por namespace y verifica que cada entorno lee el suyo.
3. Identifica configuración en tu app que debería estar en un ConfigMap (y no en la imagen).

### ⚠️ Errores comunes

* Guardar secretos en ConfigMaps (visible en claro, sin restricciones).
* Configuración quemada en la imagen (reconstruir para cambiar un valor).
* Deployment que no se actualiza al cambiar el ConfigMap (los pods viejos siguen con la config vieja).
* Un ConfigMap gigante con todo mezclado (difícil de revisar).

### 🔗 Conexión DevOps

Los ConfigMaps materializan "configuración como código" en Kubernetes: conectan environment-specific configuration (nivel 12), manifests (módulo 3) y Secrets (módulo 7). Son la pieza no sensible de la configuración por entorno.
`
export default content
