const content = `
## Módulo 7 — pip

### 🎯 Objetivos de aprendizaje

* Gestionar dependencias Python en CI: virtualenv, lockfiles y caché.
* Usar herramientas modernas: poetry/uv/pipenv.
* Publicar paquetes Python desde el pipeline.

### ❓ Problema real que resuelve

Python tiene una gestión de dependencias notoriamente laxa: \`pip install\` sin pinning produce builds no reproducibles ("funciona en mi máquina"), y la ausencia de lockfiles nativos complica la congelación. Las herramientas modernas (poetry, uv, pipenv) y las buenas prácticas (requirements congeladas, virtualenv) llevan Python al mismo nivel de reproducibilidad que otros ecosistemas en CI.

### 💡 Analogía

Python sin lockfile es como una receta que dice "echa harina": el resultado depende de qué harina haya en la despensa (versión instalada). Con \`requirements.txt\` congelado (o poetry.lock) la receta dice "echa exactamente 250g de la marca X": el plato (entorno) sale igual en cualquier cocina (máquina).

### 📖 Explicación técnica

Herramientas:

* **pip + requirements.txt**: \`requirements.txt\` con versiones fijas (\`requests==2.32.0\`); \`pip freeze\` genera el congelado.
* **poetry**: \`pyproject.toml\` + \`poetry.lock\`; \`poetry install\` reproducible; gestiona virtualenvs.
* **uv**: gestor moderno y rapidísimo (Rust), compatible con pyproject/lock.
* **pipenv**: \`Pipfile\` + \`Pipfile.lock\`.

En CI:

* Crear **virtualenv** aislado (o dejar que poetry/uv lo haga).
* Instalar con lockfile congelado.
* Cachear la caché de pip (\`~/.cache/pip\`) o el virtualenv.
* Publicar: \`python -m build\` (sdist+wheel) + \`twine upload\` al PyPI/registry privado.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
pyproject.toml + poetry.lock
  │
  ▼
poetry install (entorno congelado)
  │
  ├── Virtualenv creado/aislado
  ├── Versiones exactas del lock
  └── Caché de descargas
  │
  ▼
pytest + build (sdist, wheel)
  │
  ▼
twine upload → PyPI / registry privado
\`\`\`

### 💻 Ejemplo básico

Job Python con caché:

\`\`\`yaml
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/setup-python@v5
      with:
        python-version: '3.12'
        cache: pip
    - run: pip install -r requirements-dev.txt
    - run: pytest
\`\`\`

Con poetry:

\`\`\`yaml
    - run: poetry install
    - run: poetry run pytest
\`\`\`

### 🏢 Caso de uso profesional

Un equipo de data science sufría "en mi máquina funciona" con pandas y numpy en versiones distintas. Migran a poetry con lockfile: el pipeline instala el entorno exacto, corre los tests y construye el wheel; la publicación al registry interno con twine dispara desde el tag de release. Los entornos de producción ahora coinciden bit a bit con el CI.

### ⚠️ Errores comunes

* requirements.txt sin versiones fijas.
* Instalar en el Python del sistema (contaminación global).
* No cachear: cada build descarga todos los wheels.
* Mezclar poetry y pip en el mismo proyecto.
* Publicar con token de PyPI en el repo (usar secretos).

### 📋 Lo que debes recordar

* Congela dependencias: requirements con versiones o poetry.lock.
* Aisla con virtualenv (poetry/uv lo hacen solo).
* Caché de pip/virtualenv en CI.
* Publicación con build + twine y token como secreto.

### 🧪 Autoevaluación rápida

1. ¿Cómo se congela el entorno Python para CI?
2. ¿Qué hace poetry que pip solo no hace?
3. ¿Cómo se publica un paquete Python desde CI?

---

1. Con requirements.txt de versiones fijas (\`pip freeze\`) o con lockfile de poetry/uv, instalado congelado en CI.
2. Gestiona dependencias + virtualenv + lockfile en una sola herramienta, con instalación reproducible (\`poetry install\`).
3. Construyendo sdist/wheel (\`python -m build\`) y subiendo con \`twine upload\` al PyPI o registry privado, con el token como secreto.
`
export default content
