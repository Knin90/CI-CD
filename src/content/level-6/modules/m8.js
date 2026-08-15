const content = `
## Módulo 8 — Go modules

### 🎯 Objetivos de aprendizaje

* Usar Go modules en CI: go.mod, go.sum y descargas.
* Compilar binarios Go reproducibles y multi-plataforma.
* Publicar versiones y entender el proxy de módulos.

### ❓ Problema real que resuelve

Go compila a binarios estáticos: el build es simple y rápido. Pero necesita gestión de módulos: go.mod declara dependencias y go.sum fija sus hashes (integridad de la cadena). En CI, usar Go bien (con caché de módulos, compilación cruzada y builds reproducibles) produce binarios confiables para múltiples plataformas.

### 💡 Analogía

Go es como una fábrica que produce cajas idénticas (binarios estáticos) sin necesitar la cocina original: no dependes del entorno. Los módulos son el inventario de piezas (go.mod) con su sello de autenticidad (go.sum). El proxy de módulos es el almacén central de piezas: rápido y verificado.

### 📖 Explicación técnica

* **go.mod**: declara el módulo y sus dependencias (con versiones).
* **go.sum**: hashes de cada módulo descargado — verificación de integridad (nadie puede inyectar código en una dependencia sin detectarlo).
* **Proxy**: \`proxy.golang.org\` sirve módulos con caché; en CI se usa para descargas rápidas y verificación de sumas.
* **Vendoring**: \`go mod vendor\` copia las dependencias al repo (máxima determinismo, para entornos aislados).
* **Compilación**: \`go build\` produce binarios estáticos; \`GOOS\`/\`GOARCH\` para compilación cruzada (linux/amd64, windows/arm64...).
* **Build flags**: \`-ldflags "-X main.version=..."\` inyecta metadatos (versión, commit) en el binario.
* **Caché**: \`GOMODCACHE\` (módulos descargados) se cachea en CI.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
go.mod + go.sum (versionado)
  │
  ▼
go mod download (desde proxy, verificado por go.sum)
  │
  ▼
Caché GOMODCACHE
  │
  ▼
go build -ldflags (binario estático con metadatos)
  │
  ▼
Binario v1.4.0 (linux/amd64) + builds cruzados
  │
  ▼
Publicación: artifact + tag + (registry)
\`\`\`

### 💻 Ejemplo básico

Build Go multi-plataforma en CI:

\`\`\`yaml
build:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/setup-go@v5
      with: { go-version: '1.23', cache: true }
    - run: go mod download
    - run: |
        GOOS=linux GOARCH=amd64 go build -ldflags "-X main.version=\$(git describe --tags)" -o bin/app-linux-amd64 .
        GOOS=darwin GOARCH=arm64 go build -o bin/app-darwin-arm64 .
    - uses: actions/upload-artifact@v4
      with:
        name: binaries
        path: bin/
\`\`\`

### 🏢 Caso de uso profesional

Una CLI escrita en Go se distribuye para Linux, macOS y Windows: el pipeline compila los tres binarios en paralelo (jobs matrix por GOOS), inyecta versión y commit con ldflags, y publica los artefactos en el release. go.sum garantiza que ninguna dependencia cambió sin detectarse, y el binario es estático: corre en cualquier distro sin instalar nada.

### ⚠️ Errores comunes

* No commitear go.sum (rompe la verificación de integridad).
* Builds sin metadatos (no se sabe qué versión es el binario).
* No cachear GOMODCACHE: descargas repetidas.
* Depender del entorno (GOPATH viejo, módulos desactivados).
* Firmar/versionar después de compilar (mejor con ldflags en el build).

### 📋 Lo que debes recordar

* go.mod declara, go.sum verifica (integridad).
* Proxy de módulos + caché GOMODCACHE en CI.
* Compilación cruzada con GOOS/GOARCH.
* Inyecta versión/commit con ldflags en el binario.

### 🧪 Autoevaluación rápida

1. ¿Qué papel juega go.sum?
2. ¿Cómo se compila para otra plataforma?
3. ¿Qué se cachea en un job de Go?

---

1. Fija los hashes de cada módulo descargado, verificando que las dependencias son exactamente las declaradas (integridad de la cadena).
2. Con variables de entorno GOOS y GOARCH al compilar (\`GOOS=linux GOARCH=arm64 go build\`).
3. GOMODCACHE: los módulos ya descargados (y el cache del setup-go).
`
export default content
