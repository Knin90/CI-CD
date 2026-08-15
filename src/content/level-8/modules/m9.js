const content = `
## Módulo 9 — Python packages

### 🎯 Objetivos de aprendizaje

* Explicar el modelo de distribución de paquetes Python (sdist, wheel, PyPI).
* Construir y publicar paquetes desde el pipeline.
* Usar registries privados (devpi, Artifactory, GitLab PyPI).

### ❓ Problema real que resuelve

Los paquetes Python se distribuyen como sdist (código fuente) y wheel (compilado) en PyPI o registries privados. El pipeline construye ambos formatos, los verifica y los publica con autenticación segura. Sin ese flujo, "compartir la librería" es copiar carpetas o git URLs — frágil e imposible de versionar bien.

### 💡 Analogía

El sdist es el plano de la receta; el wheel es el plato preparado y listo. PyPI es el restaurante central que los sirve; los registries privados (devpi, Artifactory) son los restaurantes de la empresa. El pipeline es el chef que cocina el plato, lo empaqueta y lo entrega al restaurante correcto.

### 📖 Explicación técnica

Formatos:

* **sdist**: tar.gz con el código fuente y la metadata (\`setup.py\`/pyproject).
* **wheel**: paquete instalable ya preparado (más rápido de instalar, estándar moderno).
* **PyPI**: registro público oficial; alternativas privadas: devpi, Artifactory, GitLab PyPI, AWS CodeArtifact.

Construcción (con build):

\`\`\`bash
python -m build   # genera dist/*.tar.gz (sdist) + dist/*.whl (wheel)
\`\`\`

Publicación:

\`\`\`bash
twine upload dist/*   # con token (__token__) como secreto
\`\`\`

En el pipeline:

* Construir en la release (tag).
* Verificar: instalar el wheel en un entorno limpio y probar.
* Publicar con token de PyPI/privado como secreto.
* Los consumidores instalan \`pip install mi-paquete==1.4.0\`.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Tag v1.4.0 → release
  │
  ▼
python -m build → sdist + wheel
  │
  ▼
Verificación: pip install dist/*.whl en entorno limpio + smoke
  │
  ▼
twine upload (token secreto)
  ├── PyPI público
  └── Registry privado (Artifactory/CodeArtifact)
  │
  ▼
Consumidores: pip install paquete==1.4.0
\`\`\`

### 💻 Ejemplo básico

Publicar a PyPI con token (GitHub Actions):

\`\`\`yaml
publish:
  runs-on: ubuntu-latest
  if: startsWith(github.ref, 'refs/tags/v')
  environment: release
  permissions:
    id-token: write   # OIDC en lugar de token estático
  steps:
    - uses: actions/setup-python@v5
      with: { python-version: '3.12' }
    - run: pip install build twine
    - run: python -m build
    - run: twine upload dist/*
      env:
        TWINE_USERNAME: __token__
        TWINE_PASSWORD: \${{ secrets.PYPI_TOKEN }}
\`\`\`

### 🏢 Caso de uso profesional

Un equipo de data science publica sus librerías internas en CodeArtifact: el pipeline construye sdist+wheel, verifica el wheel en un entorno limpio y lo publica con credenciales de corta vida (OIDC). Los 30 equipos internos instalan las versiones exactas. Las versiones publicadas son inmutables y la trazabilidad (qué commit publicó cada versión) queda en el registro del registry.

### ⚠️ Errores comunes

* Publicar solo sdist (sin wheel): instalaciones lentas.
* Token de PyPI en el repo.
* Publicar sin verificar el wheel (el sdist funciona pero el wheel no).
* Versiones que se sobreescriben.
* Publicar desde la máquina local en vez del pipeline.

### 📋 Lo que debes recordar

* sdist + wheel = formatos de distribución Python.
* Construir con \`python -m build\`; publicar con \`twine upload\`.
* Token como secreto (o OIDC).
* Verificar el wheel en entorno limpio antes de publicar.

### 🧪 Autoevaluación rápida

1. ¿Qué diferencia hay entre sdist y wheel?
2. ¿Qué comando publica el paquete?
3. ¿Qué alternativa a PyPI permite registries privados?

---

1. El sdist contiene el código fuente; el wheel es el paquete ya preparado para instalar (más rápido).
2. \`twine upload dist/*\` con el token de autenticación.
3. devpi, Artifactory, GitLab Package Registry o AWS CodeArtifact.
`
export default content
