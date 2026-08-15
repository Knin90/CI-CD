const content = `
## Módulo 5 — Package registries

### 🎯 Objetivos de aprendizaje

* Explicar qué es un registry de paquetes y sus tipos.
* Publicar y consumir paquetes desde el pipeline.
* Gestionar repositorios públicos, privados y proxies.

### ❓ Problema real que resuelve

Los paquetes (npm, Maven, PyPI, imágenes) necesitan un lugar central para publicarse y consumirse: el registry. El pipeline publica el paquete de cada release y los proyectos consumen versiones específicas. Un registry bien gestionado — público para lo abierto, privado para lo interno, con proxy y autenticación — es la infraestructura de distribución de software.

### 💡 Analogía

El registry es la librería central: los autores (pipelines) publican sus libros (paquetes) con ISBN (versión), y los lectores (proyectos) los toman prestados (descarga) con la edición exacta (versión). La librería tiene sección pública (open source), sección interna (paquetes privados) y pedidos de otras librerías (proxy).

### 📖 Explicación técnica

Tipos de registries:

* **Públicos**: npmjs.org, PyPI, Maven Central, Docker Hub, proxy.golang.org — el software abierto.
* **Privados**: Nexus, Artifactory, GitHub Packages, GitLab Package Registry, ECR/GCR/ACR — paquetes internos, imágenes corporativas.
* **Proxy/agregador**: Nexus/Artifactory como proxy de los públicos: caché, control y auditoría de dependencias.

Flujo en el pipeline:

1. **Publicar**: tras el build y la verificación, el pipeline sube el paquete con su versión.
2. **Consumir**: los proyectos instalan desde el registry (privado con autenticación; token como secreto).
3. **Auditar**: el registry central permite ver quién publicó qué, cuándo y qué se descarga.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline (release)
  │
  ▼
Publica paquete en el registry
  ├── Público: npm publish / twine upload (PyPI)
  └── Privado: nexus publish / docker push (registry corporativo)
  │
  ▼
Proyectos consumidores
  └── npm install / mvn dependency / docker pull
      (con la versión exacta del lockfile)
  │
  ▼
Proxy: caché de dependencias públicas + auditoría
\`\`\`

### 💻 Ejemplo básico

Publicar en un registry privado (npm):

\`\`\`bash
# .npmrc con la URL y token del registry privado
npm config set registry https://nexus.corp.example/repository/npm-private/
npm publish --access restricted
\`\`\`

El token se inyecta como secreto del pipeline, nunca en el repo.

### 🏢 Caso de uso profesional

Una empresa con microservicios internos usa Artifactory: paquetes Java privados, imágenes Docker corporativas y proxy de Maven Central (con caché y escaneo). El pipeline publica cada release en el registry; los servicios consumen versiones exactas. Cuando una dependencia pública desaparece de Maven Central, el proxy la conserva en caché: el build no se rompe por un "left-pad".

### ⚠️ Errores comunes

* Publicar paquetes internos en registries públicos por error.
* Tokens de registry en el código (secretos mal gestionados).
* Sin proxy: depender de la disponibilidad del registry público.
* Consumir \`latest\` en vez de versiones fijas.
* Sin auditoría: no saber qué se publicó ni quién.

### 📋 Lo que debes recordar

* Registry = lugar central de publicación y consumo de paquetes.
* Público, privado y proxy cumplen roles distintos.
* El pipeline publica tras verificar; los proyectos consumen versiones fijas.
* Tokens del registry como secretos.

### 🧪 Autoevaluación rápida

1. ¿Qué tipos de registries existen?
2. ¿Qué rol cumple el proxy (Nexus/Artifactory)?
3. ¿Cómo se publica un paquete desde el pipeline?

---

1. Públicos (npmjs, PyPI, Maven Central), privados (Nexus, Artifactory, GitHub Packages) y proxy/agregador.
2. Cachear y controlar las dependencias de los registries públicos: disponibilidad, auditoría y escaneo de la cadena de suministro.
3. Tras el build y la verificación, con credenciales del registry inyectadas como secretos (\`npm publish\`, \`twine upload\`, \`docker push\`).
`
export default content
