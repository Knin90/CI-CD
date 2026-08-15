const content = `
## Módulo 5 — Sequential jobs

### 🎯 Objetivos de aprendizaje

* Explicar cuándo los jobs deben ejecutarse en secuencia.
* Configurar jobs secuenciales con dependencias.
* Entender el costo de la secuencialidad (tiempo) y su necesidad (orden).

### ❓ Problema real que resuelve

Algunos trabajos dependen del resultado de otros: no se publica sin construir, no se despliega sin probar. Los jobs secuenciales expresan ese orden: cada job espera al anterior y consume su resultado. La secuencia es necesaria cuando hay dependencia real de datos o de orden; el resto debe paralelizarse.

### 💡 Analogía

Una línea de ensamblaje es intrínsecamente secuencial: el chasis va antes que el motor, el motor antes que la pintura. No puedes pintar un auto sin chasis. Pero entre autos (jobs independientes) sí puedes tener varias líneas. La secuencia es la esencia de la cadena; el paralelismo, la optimización.

### 📖 Explicación técnica

* **Secuencia por stage**: los jobs de la stage N esperan a toda la stage N-1 (comportamiento por defecto).
* **Secuencia con \`needs\`**: un job espera solo a sus dependencias listadas — la forma más precisa de secuenciar.
* Cuándo secuenciar:
  * Dependencia de **datos**: el siguiente job consume el artefacto del anterior.
  * Dependencia de **orden**: el siguiente job necesita que el estado del sistema cambió (migraciones, infra).
  * **Gates**: aprobaciones, releases.
* Cuándo paralelizar: jobs independientes (tests de servicios distintos, lint y sast).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Secuencial (dependencia real):
  build ──► test ──► package ──► deploy
  (cada uno espera al anterior)

Paralelo (independientes):
  lint ──►────┐
  unit ──►────┼──► package (espera los tres)
  sast ──►────┘
\`\`\`

### 💻 Ejemplo básico

Secuencia con needs:

\`\`\`yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm ci && npm run build
      - uses: actions/upload-artifact@v4
        with: { name: app, path: dist }
  test:
    needs: [build]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with: { name: app }
      - run: npm test
  deploy:
    needs: [test]
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh
\`\`\`

### 🏢 Caso de uso profesional

Un pipeline de despliegue de base de datos es estrictamente secuencial: migrar (con backup) → verificar → actualizar la app → verificar. Cada job consume el estado del anterior. El equipo documenta por qué la secuencia es obligatoria (una migración antes del deploy de la app), y paraleliza todo lo demás (tests, lint) para no pagar la secuencia donde no hace falta.

### ⚠️ Errores comunes

* Secuenciar jobs independientes (pipeline lento sin beneficio).
* Depender del orden por defecto de la stage sin \`needs\` (secuencia de más).
* Jobs secuenciales sin pasar datos (¿qué espera el siguiente?).
* No documentar por qué la secuencia es necesaria.
* Mezclar secuencia con paralelismo sin grafo claro.

### 📋 Lo que debes recordar

* Secuencia cuando hay dependencia real (datos, orden, gates).
* \`needs\` es la forma precisa de secuenciar.
* La secuencia cuesta tiempo: paraleliza lo independiente.
* Documenta por qué un orden es obligatorio.

### 🧪 Autoevaluación rápida

1. ¿Cuándo deben ejecutarse jobs en secuencia?
2. ¿Cómo se configura una secuencia precisa?
3. ¿Qué costo tiene la secuencialidad?

---

1. Cuando hay dependencia real: el siguiente consume el artefacto/estado del anterior, o existe un gate de aprobación.
2. Con \`needs\`: el job declara exactamente qué jobs deben completarse antes.
3. Tiempo: cada job secuencial espera al anterior; por eso se paraleliza todo lo independiente.
`
export default content
