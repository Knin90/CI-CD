const content = `
## Módulo 14 — Build artifacts

### 🎯 Objetivos de aprendizaje

* Definir el artefacto del build y sus tipos.
* Verificar, firmar y publicar artefactos.
* Gestionar el ciclo de vida del artefacto (promoción, retención).

### ❓ Problema real que resuelve

El build produce el artefacto: el objeto que viaja por el pipeline y llega a producción. Un artefacto mal gestionado (no verificado, sin firma, sin versión clara) rompe la confianza de toda la cadena. La gestión del artefacto — verificar, firmar, versionar, publicar, promover — es la frontera entre CI y CD.

### 💡 Analogía

El artefacto es la caja sellada que sale de la fábrica: se inspecciona (verificación), se sella (firma), se etiqueta (versión) y se distribuye a las tiendas (registry). Si la caja se abriera o se etiquetara mal en el camino, nadie sabría qué hay dentro — por eso se sella y se registra cada movimiento.

### 📖 Explicación técnica

Tipos de artefactos:

* **Binarios/paquetes**: jar, wheel, npm package, binario.
* **Imágenes de contenedor**: docker image (OCI).
* **Bundles/archivos**: dist/, release bundles.
* **Reportes**: tests, cobertura, SBOM (relacionados, se publican aparte).

Ciclo de vida:

1. **Producir** (build): el artefacto nace con metadatos (versión, commit).
2. **Verificar**: smoke test del artefacto real (no solo del código).
3. **Firmar**: firma criptográfica (cosign, GPG) para autenticidad.
4. **Publicar**: subir al registry (inmutable, versionado).
5. **Promover**: la misma versión viaja por entornos (build once, deploy many).
6. **Retener/limpiar**: políticas de retención.

El artefacto es **inmutable**: nunca se modifica tras publicarse; si hay que cambiar algo, nueva versión.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Build → artefacto con metadatos
  │
  ▼
Verificación (smoke test del binario/imagen)
  │
  ▼
Firma (cosign/GPG)
  │
  ▼
Publicación en registry (inmutable, tag con versión)
  │
  ▼
Promoción: staging → producción (mismo artefacto)
  │
  ▼
Retención + auditoría (qué se publicó, cuándo, por quién)
\`\`\`

### 💻 Ejemplo básico

Pipeline de artefacto (GitHub Actions):

\`\`\`yaml
build:
  runs-on: ubuntu-latest
  steps:
    - run: npm ci && npm run build
    - name: Smoke test del artefacto
      run: node dist/index.js --version
    - uses: actions/upload-artifact@v4
      with:
        name: app-v\${{ github.ref_name }}
        path: dist/
        retention-days: 30
\`\`\`

### 🏢 Caso de uso profesional

Una empresa con compliance estricto: cada artefacto se verifica (smoke), se firma (cosign) y se publica en el registry con su SBOM y su hash. La promoción a producción usa exactamente esa versión firmada. En una auditoría, pueden demostrar qué artefacto se desplegó, de qué código proviene y quién lo firmó.

### ⚠️ Errores comunes

* Publicar artefactos sin verificar.
* Artefactos mutables (se re-escriben, se "parchean").
* Sin firma: cualquiera podría publicar en el registry.
* Retención infinita: almacenamiento descontrolado.
* Promover reconstruyendo (romper "build once, deploy many").

### 📋 Lo que debes recordar

* El artefacto es el objeto de valor del build: verificar, firmar, versionar.
* Inmutable tras publicar: los cambios son versiones nuevas.
* Mismo artefacto en todos los entornos (build once, deploy many).
* Firma + metadatos = autenticidad y trazabilidad.

### 🧪 Autoevaluación rápida

1. ¿Qué ciclo de vida sigue un artefacto?
2. ¿Qué significa que un artefacto sea inmutable?
3. ¿Para qué se firma un artefacto?

---

1. Producir → verificar (smoke) → firmar → publicar → promover por entornos → retener/limpiar.
2. Que una vez publicado no se modifica: cualquier cambio genera una versión nueva.
3. Para garantizar autenticidad e integridad: demostrar que el artefacto viene del pipeline legítimo y no fue alterado.
`
export default content
