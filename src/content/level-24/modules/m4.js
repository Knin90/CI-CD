const content = `
## Módulo 4 — Fase 3: Docker, escaneo de imagen y container registry

### 🎯 Objetivos de aprendizaje

* Containerizar la aplicación con buenas prácticas.
* Escanear la imagen antes de publicarla.
* Publicar con tags inmutables al registry.

### ❓ Problema real que resuelve

La app necesita viajar como imagen: reproducible, ligera y segura (nivel 9). La Fase 3 la containeriza (Dockerfile multi-stage), la escanea (vulnerabilidades — nivel 10) y la publica al registry con tags inmutables (nivel 8) — el artefacto que las fases siguientes desplegarán. Sin esta fase, no hay imagen verificada que desplegar.

### 💡 Analogía

La Fase 3 es el envasado del producto en la fábrica: el producto (app) se mete en su envase estándar (imagen Docker), pasa por el control de calidad del envase (escaneo) y se etiqueta con un lote único (tag inmutable) antes de ir al almacén (registry). El envase debe ser igual donde sea — y el lote, trazable.

### 📖 Explicación técnica

* **Dockerfile** (nivel 9): multi-stage (build → runtime), imagen base correcta y pinneada (no \`latest\`), \`.dockerignore\` (nivel 22 de 22), usuario no-root, capas eficientes.
* **Escaneo de imagen** (nivel 10): la imagen se escanea contra vulnerabilidades conocidas (Trivy, Grype, etc.) antes de publicar — las críticas/altas bloquean (módulo 16 de 23).
* **Registry** (nivel 8 y 22 de 22): publicar con tag inmutable (commit/semver) y digest (módulo 8 de 23) — nunca \`latest\` para producción (nivel 14).
* Flujo: build de imagen → scan → push con tag inmutable → la imagen queda lista para Terraform/Ansible/Kubernetes.
* Buenas prácticas: build once (módulo 9 de 23), la imagen se construye una vez y se promociona (nivel 8), SBOM para auditoría (nivel 10), y el registry con retención y políticas (nivel 22 de 22).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Dockerfile multi-stage (build → runtime)
   ↓
docker build (con .dockerignore, base pinneada)
   ↓
Escaneo de imagen (vulnerabilidades)
   ↓
¿Críticas/altas? → bloquea
   ↓
Push con tag inmutable (sha/semver)
   ↓
Imagen en el registry con digest
   ↓
Lista para las fases 4-6
\`\`\`

### 🧪 Ejercicios

1. Escribe un Dockerfile multi-stage para tu app con base pinneada.
2. Añade el escaneo de imagen al pipeline y bloquea por críticas.
3. Publica con tag inmutable y verifica el digest.

### ⚠️ Errores comunes

* \`latest\` en imágenes (no trazable — nivel 14).
* Imágenes con usuario root y dependencias de build en runtime (nivel 9).
* Escaneo ausente o solo "informativo" (nivel 10).
* Sin \`.dockerignore\` (imágenes gigantes y lentas — nivel 22 de 22).

### 🔗 Conexión DevOps

La Fase 3 conecta con Docker (nivel 9), seguridad de imágenes (nivel 10), artifacts y registries (nivel 8), build once (módulo 9 de 23) y artefactos inmutables (módulo 8 de 23). Produce el artefacto único y verificado que el resto del flujo despliega.
`
export default content
