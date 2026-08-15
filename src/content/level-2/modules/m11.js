const content = `
## Módulo 11 — Pipeline artifacts

### 🎯 Objetivos de aprendizaje

* Definir qué son los **artefactos** de un pipeline.
* Publicar y consumir artefactos entre jobs y desde fuera.
* Explicar la diferencia entre artefactos efímeros y artefactos versionados.

### ❓ Problema real que resuelve

Un job produce resultados (binarios, reportes, imágenes) que otros jobs necesitan: el build produce el binario que los tests consumen; los tests producen reportes que se publican. Los artefactos permiten **pasar datos entre jobs** (que corren en máquinas distintas y efímeras) y **conservar resultados** para diagnóstico y consumo externo.

### 💡 Analogía

Los artefactos son como los paquetes que una estación de la cadena entrega a la siguiente: el resultado físico del trabajo (caja, pieza, informe) que la siguiente estación necesita para continuar. Si la estación no empaquetara su salida, la siguiente tendría que rehacer el trabajo.

### 📖 Explicación técnica

* **Artefacto**: resultado producido por un job que se conserva y puede consumirse: binarios compilados, reportes de tests, cobertura, imágenes (vía registry), paquetes, logs.
* **Publicar**: \`actions/upload-artifact\` (GitHub), \`artifacts: paths\` (GitLab), \`PublishBuildArtifacts\` (Azure).
* **Consumir entre jobs**: \`actions/download-artifact\`, \`dependencies: [build]\` + \`artifacts\`.
* El flujo clásico: el job de **build** publica el binario; los jobs de **test** y **deploy** lo descargan — el binario es el mismo en todas partes (build once).
* Artefactos **efímeros** (del pipeline): se usan dentro de la ejecución y se limpian tras X días.
* Artefactos **versionados** (registry/paquete): son el entregable de la release, inmutables y con retención larga.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job build
  ├── npm run build → dist/
  └── Publicar artefacto: dist/ (app.zip)
        │
        ▼
Job test
  ├── Descargar artefacto: app.zip
  └── Ejecutar tests contra el binario real
        │
        ▼
Job deploy
  ├── Descargar artefacto
  └── Desplegar la MISMA versión validada
\`\`\`

### 💻 Ejemplo básico

Publicar y consumir artefactos (GitHub Actions):

\`\`\`yaml
build:
  runs-on: ubuntu-latest
  steps:
    - run: npm ci && npm run build
    - uses: actions/upload-artifact@v4
      with:
        name: app
        path: dist/

test:
  runs-on: ubuntu-latest
  needs: [build]
  steps:
    - uses: actions/download-artifact@v4
      with:
        name: app
    - run: npm test -- --artifacts ./app
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline de una app móvil: el job de build compila el APK/IPA y lo publica como artefacto; el job de tests instrumentados lo descarga y lo instala en dispositivos; el job de firma toma el mismo binario, lo firma y lo publica en la tienda. Nadie reconstruye: el artefacto viaja por todo el pipeline, garantizando que lo que se prueba es exactamente lo que se publica.

### ⚠️ Errores comunes

* Reconstruir en cada job en vez de pasar el artefacto (rompe "build once").
* Artefactos gigantes que saturan el almacenamiento.
* No limpiar artefactos (retención infinita).
* Consumir artefactos sin declarar la dependencia (\`needs\`).
* Publicar secretos dentro de artefactos (reportes con credenciales).

### 📋 Lo que debes recordar

* Artefacto = resultado de un job que se conserva y se consume.
* Permiten pasar el mismo binario entre jobs y máquinas.
* Build once, deploy many: el artefacto se construye una vez.
* Configura retención y nunca publiques secretos en artefactos.

### 🧪 Autoevaluación rápida

1. ¿Para qué sirven los artefactos en un pipeline?
2. ¿Cuál es la diferencia entre artefacto efímero y versionado?
3. ¿Qué garantiza pasar el artefacto del build a todos los jobs?

---

1. Para pasar resultados entre jobs (que corren en máquinas distintas) y conservar binarios, reportes y logs para consumo y diagnóstico.
2. El efímero se usa dentro de la ejecución y se limpia a los días; el versionado es el entregable de la release, inmutable y de retención larga (registry, paquete).
3. Que lo que se testea, se firma y se despliega es exactamente el mismo binario que se construyó: build once, deploy many.
`
export default content
