const content = `
## Módulo 3 — Área 3: DevSecOps

### 🎯 Objetivos de aprendizaje

* Evaluar la seguridad integrada en el pipeline.
* Repasar supply chain, secrets, permisos y gates.
* Demostrar el pipeline seguro por diseño.

### ❓ Problema real que resuelve

El Área 3 verifica DevSecOps: la seguridad integrada en cada etapa, no al final (nivel 10). Supply chain (dependencias e imágenes), secretos (nivel 11), permisos mínimos (nivel 10 y módulo 11 de 23) y security gates (módulo 16 de 23) protegen el pipeline y lo que entrega. Sin esta área, el pipeline puede ser rápido pero inseguro.

### 💡 Analogía

El Área 3 es el examen de seguridad del edificio: se evalúan los detectores (scan de dependencias e imágenes), las llaves (secrets), los pases de acceso (permisos) y las puertas con control (security gates). Un edificio con buena estructura pero sin seguridad no está certificado — igual que un pipeline sin DevSecOps.

### 📖 Explicación técnica

* **Supply chain** (nivel 10): dependencias (SCA), imágenes (escaneo de contenedores), SBOM, actions/tools pinneadas por SHA (nivel 10 y 19).
* **Secrets** (nivel 11-12): gestor centralizado, referencia por nombre, rotación, masking, secrets por entorno (módulo 12 de 23).
* **Permisos** (nivel 10 y módulo 11 de 23): mínimo privilegio, \`permissions:\` explícito (GitHub), roles IAM con OIDC (nivel 21).
* **Security gates** (módulo 16 de 23): escaneo que bloquea por severidad real (críticas/altas), no por ruido; los gates con umbrales que significan algo (módulo 15 de 23).
* **Respuesta**: una vulnerabilidad se actualiza, mitiga o acepta con riesgo documentado (nivel 10); un secret filtrado se rota YA (nivel 11).
* Preguntas de evaluación típicas: ¿cómo aseguras la supply chain? ¿dónde viven los secretos y cómo se rotan? ¿por qué mínimo privilegio? ¿qué hace que un security gate sea efectivo? ¿qué haces ante una vulnerabilidad crítica?

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Cada cambio → escaneo (SCA, SAST, secrets)
   ↓
Imagen escaneada antes de publicar (SBOM)
   ↓
Secrets: gestor + rotación + masking
   ↓
Permisos mínimos por job (OIDC/IAM)
   ↓
Security gates: bloquean por severidad real
   ↓
Vulnerabilidad → actualizar/mitigar/aceptar documentado
   ↓
Pipeline seguro por diseño
\`\`\`

### 🧪 Ejercicios

1. Explica cómo asegurarías la supply chain de tu proyecto.
2. Diseña la política de secretos: gestor, rotación y respuesta a fugas.
3. Autoevalúate: ¿qué hace efectivo a un security gate y por qué mínimo privilegio?

### ⚠️ Errores comunes

* Seguridad al final del flujo (nivel 10).
* Secretos en el repo o variables visibles (nivel 11).
* Permisos write-all "por comodidad" (módulo 11 de 23).
* Gates que bloquean por todo o por nada (módulo 15-16 de 23).

### 🔗 Conexión DevOps

El Área 3 conecta con security en CI/CD (nivel 10), secrets (nivel 11), permisos (módulo 11 de 23), OIDC (nivel 21) y security gates (módulo 16 de 23). Es el examen del pipeline seguro: protección en cada etapa, no después.
`
export default content
