const content = `
## Módulo 11 — Lead time

### 🎯 Objetivos de aprendizaje

* Definir lead time for change.
* Medir el tiempo del commit a producción.
* Reducir el lead time mejorando el pipeline.

### ❓ Problema real que resuelve

¿Cuánto tarda una idea en llegar al usuario? El lead time mide el tiempo entre el commit y el despliegue en producción. Un lead time largo significa que el valor tarda en llegar — y que los cambios se acumulan en releases grandes y arriesgados. Reducirlo obliga a que el pipeline sea rápido, los tests confiables y los deploys seguros.

### 💡 Analogía

El lead time es el tiempo del pedido del restaurante: del momento en que el cliente pide (commit) al momento en que la comida llega a la mesa (producción). Si el restaurante tarda 45 minutos siempre, el cliente se va a otro lado — y si los platos se sirven de 10 en 10 (releases grandes), el cliente espera mucho por su plato concreto.

### 📖 Explicación técnica

* **Lead time for change** (DORA — módulo 9): tiempo desde el commit hasta que el cambio está en producción.
* Componentes: tiempo de CI (build+test), tiempo de revisión (PR), tiempo de espera (approvals, colas), tiempo de despliegue.
* Medición: timestamp del commit vs timestamp del deploy en producción (desde la plataforma CI/CD).
* Cómo se reduce:
  * Pipeline rápido: paralelismo, caching (niveles 19/23), tests no flaky (nivel 7).
  * Deploys frecuentes y pequeños (trunk-based — nivel 1): cambios pequeños llegan rápido.
  * Approvals eficientes: gates sin colas humanas largas (nivel 12).
  * Despliegue automatizado y verificado (niveles 13/18).
* Relación con la frecuencia de despliegue (módulo 10): lead time corto y deploys frecuentes se refuerzan mutuamente.
* Buenas prácticas: medir por equipo (no por persona), segmentar por tipo de cambio, revisar los cuellos de botella (¿dónde se pierde más tiempo?).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Commit ──→ CI ──→ Revisión ──→ Deploy ──→ Producción
   │        │         │          │
   └────────┴─────────┴──────────┘
            LEAD TIME (total)
   (cada segmento se mide por separado)
\`\`\`

### 🧪 Ejercicios

1. Mide tu lead time actual: promedio del último mes (commit → prod).
2. Desglósalo: ¿cuánto es CI, cuánto es revisión, cuánto es espera?
3. Identifica el mayor cuello de botella y propón una mejora concreta.

### ⚠️ Errores comunes

* Lead time medido "a mano" (datos imprecisos de la plataforma).
* Optimizar el CI ignorando las esperas humanas (revisión/approvals).
* Releases grandes que esconden el lead time real de cada cambio.
* Comparar lead time entre equipos con contextos distintos.

### 🔗 Conexión DevOps

El lead time es una de las cuatro DORA metrics (módulo 9): conecta el pipeline (todos los niveles), la revisión (nivel 1), los approvals (nivel 12) y la mejora del proceso (nivel 23).
`
export default content
