const content = `
## Módulo 7 — Tags

### 🎯 Objetivos de aprendizaje

* Explicar qué es un tag en Git y la diferencia entre tag ligero y anotado.
* Usar tags para versionar releases y disparar pipelines específicos.
* Entender el tag como marcador inmutable de una versión.

### ❓ Problema real que resuelve

"¿Qué versión está corriendo en producción?" es la pregunta más difícil de responder sin versionado. Los tags marcan puntos concretos del historial (v1.2.0, v2.0.0) que representan versiones entregables. Sin tags, no hay forma de identificar, reproducir o revertir una versión específica; cada release es un misterio.

### 💡 Analogía

Un tag es como el marcador de página de un libro: señala un lugar exacto para volver a él. Los tags de Git señalan commits específicos que representan versiones publicadas; con un tag se puede volver a ese estado exacto del código en cualquier momento, incluso años después.

### 📖 Explicación técnica

* Un **tag** es una referencia inmutable a un commit específico (a diferencia de las ramas, que se mueven).
* **Tag ligero**: solo un puntero al commit (\`git tag v1.2.0\`).
* **Tag anotado**: un objeto completo con mensaje, autor y fecha (\`git tag -a v1.2.0 -m "Release v1.2.0"\`). Recomendado para releases.
* Convención: \`v\` + versionado semántico (\`v1.2.0\`, \`v1.2.0-rc.1\`).
* En CI/CD, los tags son triggers poderosos: \`push tag v*\` puede disparar el pipeline de release (build final, publicar artefacto, generar changelog, desplegar).
* El tag del commit debe corresponder al tag del artefacto: la imagen \`app:v1.2.0\` se construye desde el commit \`v1.2.0\`.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Commits de la feature → merge a main
  │
  ▼
git tag -a v1.2.0 -m "Release v1.2.0"
  │
  ▼
git push origin v1.2.0
  │
  ▼
Pipeline de release se dispara (trigger: tags)
  ├── Construir desde el commit exacto
  ├── Publicar artefacto app:v1.2.0
  ├── Generar changelog
  └── Desplegar v1.2.0
\`\`\`

### 💻 Ejemplo básico

Crear y usar tags:

\`\`\`bash
git tag -a v1.2.0 -m "Release v1.2.0"     # tag anotado
git push origin v1.2.0                     # publicar el tag
git tag -l                                 # listar
git checkout v1.2.0                        # volver a esa versión
\`\`\`

Trigger por tag en el pipeline (GitHub Actions):

\`\`\`yaml
on:
  push:
    tags: ['v*']
\`\`\`

### 🏢 Caso de uso profesional

El proceso de release de un equipo: al llegar al commit de release, crean \`git tag vX.Y.Z\` y lo pushean. El pipeline de release se dispara automáticamente, construye la imagen desde ese commit exacto, la publica como \`app:vX.Y.Z\` y despliega. En un incidente, el equipo responde "¿qué versión está en producción?" consultando el tag del despliegue, y puede revertir a cualquier versión anterior porque el tag sigue apuntando al commit exacto.

### ⚠️ Errores comunes

* Tags sin versión semántica: "release-final", "nuevo", "v2".
* Tags ligeros sin mensaje: sin contexto de qué contiene la versión.
* Mover tags ya publicados (\`git tag -f\`): rompe la inmutabilidad y a los consumidores.
* Taggear sin publicar (\`git push origin --tags\` olvidado): el CI no dispara.
* Desplegar sin tag: sin marcador, no hay rollback a una versión conocida.

### 📋 Lo que debes recordar

* El tag es un marcador inmutable de una versión publicada.
* Tags anotados (\`-a\`) para releases, con mensaje descriptivo.
* Los tags disparan pipelines de release en CI/CD.
* El tag de Git debe alinearse con el tag del artefacto desplegado.

### 🧪 Autoevaluación rápida

1. ¿Qué diferencia hay entre un tag ligero y uno anotado?
2. ¿Qué trigger de pipeline suele asociarse a los tags?
3. ¿Por qué los tags no deben moverse una vez publicados?

---

1. El ligero es solo un puntero al commit; el anotado es un objeto completo con mensaje, autor y fecha, recomendado para releases.
2. El push de tags con patrón \`v*\` dispara el pipeline de release: build desde el commit exacto, publicación del artefacto y despliegue.
3. Porque otros sistemas y personas dependen de que el tag identifique siempre el mismo commit; moverlo rompe la trazabilidad de versiones desplegadas y descargadas.
`
export default content
