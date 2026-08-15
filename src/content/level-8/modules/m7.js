const content = `
## Módulo 7 — npm registry

### 🎯 Objetivos de aprendizaje

* Explicar el registro npm: público, privado y scopes.
* Publicar paquetes npm desde el pipeline con autenticación segura.
* Gestionar versiones y dist-tags.

### ❓ Problema real que resuelve

Los paquetes JavaScript se distribuyen vía el registry npm (público o privado). Publicar desde el pipeline — con la versión correcta, autenticación segura y control de tags — es lo que permite que los proyectos consuman las releases de una librería interna o pública de forma confiable.

### 💡 Analogía

El npm registry es el kiosco de revistas del ecosistema JS: los editores (pipeline) publican números (versiones) en el kiosco central (npmjs) o en quioscos privados (registry corporativo), y los lectores (proyectos) los compran con la edición exacta. El \`scope\` (@mi-org/paquete) es la editorial: agrupa publicaciones bajo una marca.

### 📖 Explicación técnica

Conceptos:

* **Registry**: fuente de paquetes (\`https://registry.npmjs.org\` público; privados en Nexus/Artifactory/GitHub Packages).
* **Scope** (\`@org/package\`): agrupación de paquetes de una organización; los scopes privados requieren autenticación.
* **dist-tags**: \`latest\`, \`next\`, \`beta\` — etiquetas de conveniencia.
* **Versionado**: semver estricto; el pipeline usa la versión del tag o calculada (semantic-release).

Publicación desde el pipeline:

* \`.npmrc\` con registry y \`//registry/:_authToken=\${NPM_TOKEN}\` (token como secreto).
* \`npm publish --access public|restricted\`.
* Publicar solo en releases (trigger por tag), nunca en PRs.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Tag v1.4.0 → pipeline de release
  │
  ▼
npm ci + build + tests (validación)
  │
  ▼
npm version (verifica/deriva la versión del tag)
  │
  ▼
npm publish (con token del .npmrc, secreto)
  │
  ├── Registry público: npmjs.org
  └── Registry privado: nexus.corp/npm-private/
  │
  ▼
Consumidores: npm install @org/paquete@1.4.0
\`\`\`

### 💻 Ejemplo básico

Publicar con token (GitHub Actions):

\`\`\`yaml
publish:
  runs-on: ubuntu-latest
  if: startsWith(github.ref, 'refs/tags/v')
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20
        registry-url: 'https://registry.npmjs.org'
    - run: npm ci
    - run: npm publish
      env:
        NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}
\`\`\`

### 🏢 Caso de uso profesional

Una empresa con 10 librerías internas publica en un registry privado (Nexus): cada tag \`v*\` dispara el publish con la versión del tag, y los proyectos consumen \`@corp/lib@1.4.0\`. Un error de publicación (paquete con bug) se resuelve publicando el fix como 1.4.1, nunca sobreescribiendo. Los consumidores actualizan con control total.

### ⚠️ Errores comunes

* Token en el repo o en el .npmrc versionado.
* Publicar en cada push (en vez de solo en tags/release).
* Sobreescribir versiones publicadas.
* Mezclar scopes públicos y privados con auth incorrecta.
* Publicar con build no verificado.

### 📋 Lo que debes recordar

* Registry público/privado + scopes + dist-tags + semver.
* Publicar solo en releases (trigger por tag).
* Token como secreto, nunca versionado.
* Las versiones publicadas son inmutables.

### 🧪 Autoevaluación rápida

1. ¿Qué es un scope en npm?
2. ¿Cuándo debe publicarse un paquete?
3. ¿Cómo se autentica el pipeline contra el registry?

---

1. Una agrupación de paquetes bajo una organización (\`@org/package\`), que puede ser pública o privada.
2. Solo en releases (trigger por tag \`v*\`), tras la validación completa — nunca en cada push ni en PRs.
3. Con un token de publicación inyectado como secreto en el \`.npmrc\` o en la variable \`NODE_AUTH_TOKEN\` del pipeline.
`
export default content
