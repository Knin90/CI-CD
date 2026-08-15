const content = `
## Módulo 4 — Small pipelines

### 🎯 Objetivos de aprendizaje

* Diseñar pipelines pequeños y enfocados.
* Dividir el flujo en etapas con propósito único.
* Evitar el pipeline monstruo.

### ❓ Problema real que resuelve

El pipeline gigante: 40 jobs, 3 horas, todo conectado, donde un cambio rompe todo y nadie sabe qué hace cada parte. Los pipelines pequeños — con etapas de propósito único (lint, test, build, deploy) y jobs enfocados — son más fáciles de entender, depurar, testear y escalar. Resuelven la fragilidad y la ilegibilidad del CI/CD grande.

### 💡 Analogía

El pipeline pequeño es la orquesta con partituras claras: cada sección (cuerdas, vientos, percusión — etapas) toca su parte, y el director (pipeline) coordina el orden. La sinfonía larga no es un solo músico tocando todo: si un violín se rompe (job falla), se arregla ese violín sin parar la orquesta. Un pipeline monstruo es un solo músico con todos los instrumentos — imposible de tocar y de arreglar.

### 📖 Explicación técnica

* **Pipelines pequeños**: cada etapa hace UNA cosa y la hace bien; cada job es comprensible de un vistazo.
* Beneficios:
  * **Feedback rápido**: lo que falla se detecta pronto y se aísla (nivel 5 de este nivel).
  * **Depuración**: un job pequeño con un nombre claro es fácil de diagnosticar (nivel 22).
  * **Tests**: los pipelines pequeños se pueden probar y validar (nivel 20).
  * **Paralelismo**: las etapas independientes corren en paralelo (nivel 6 de este nivel).
  * **Reutilización**: los jobs pequeños son candidatos a templates (módulo 3).
* Diseño: divide por propósito (lint → test → build → security → deploy), no por "todo en un job". Cada job debe poder fallar solo, con un mensaje claro.
* Buenas prácticas: jobs con nombres que digan qué hacen, stages explícitas (nivel 5), dependencias mínimas (solo lo necesario — nivel 19), y dividir los jobs que mezclan responsabilidades.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline = etapas pequeñas de propósito único
   ↓
lint → test → build → security → deploy
   ↓
Cada job falla solo, con mensaje claro
   ↓
Fallo aislado → fix rápido sin tocar el resto
   ↓
Etapas independientes corren en paralelo
   ↓
Pipeline legible, depurable y testable
\`\`\`

### 🧪 Ejercicios

1. Divide un job gigante en 3 jobs de propósito único.
2. Renombra tus jobs para que el nombre diga qué hacen.
3. Identifica dependencias innecesarias entre jobs y elimínalas.

### ⚠️ Errores comunes

* El job "hace de todo" (build + test + deploy + notify en uno).
* Dependencias en cadena innecesarias (todo espera a todo — nivel 19).
* Nombres crípticos (job-1, step-2) que no dicen nada.
* Pipelines que crecen sin límite hasta ser inmantenibles (nivel 20).

### 🔗 Conexión DevOps

Los pipelines pequeños conectan con jobs y stages (nivel 5), fast feedback (módulo 5), paralelización (módulo 6), reutilización (módulo 3) y mantenibilidad (módulo 20). Son la arquitectura de fondo del pipeline profesional: pequeñas piezas que juntas hacen el flujo completo.
`
export default content
