const content = `
## Módulo 13 — Failed tests

### 🎯 Objetivos de aprendizaje

* Diagnosticar tests fallidos: leer el reporte y la traza.
* Clasificar fallos: código, test roto, flaky, entorno.
* Responder correctamente: arreglar el código, el test o la infra.

### ❓ Problema real que resuelve

Un test falla: ¿el código está roto, el test está mal escrito, o el entorno es inestable? Responder mal pierde tiempo: arreglar el código cuando el test estaba mal (o viceversa), o ignorar un fallo real "porque es flaky". La clasificación correcta del fallo es la habilidad central del testing en CI.

### 💡 Analogía

Un termómetro marca fiebre: ¿el paciente está enfermo (código roto), el termómetro está mal calibrado (test mal escrito) o el termómetro es intermitente (flaky)? El médico no receta antibióticos antes de verificar el termómetro — y no descarta la fiebre solo porque "a veces el termómetro falla". Diagnóstico antes de tratamiento.

### 📖 Explicación técnica

Clasificación de fallos:

* **Fallo real de código**: el comportamiento cambió y el test lo detecta. Respuesta: arreglar el código (o aceptar el cambio y actualizar el test con intención).
* **Test mal escrito**: el test asume algo incorrecto, es frágil o verifica lo que no debe. Respuesta: corregir el test.
* **Flaky**: falla intermitente sin cambio de código. Respuesta: investigar la causa raíz (orden, estado, timing, red); nunca normalizar.
* **Entorno/infra**: el entorno de tests falló (servicio caído, DB sin migrar). Respuesta: arreglar infra, reintentar si es transitorio.

Método:

1. Leer el reporte: qué test, qué aserción, qué traza.
2. Reproducir localmente (si es posible).
3. ¿Falla siempre? → determinista → código/test. ¿Intermitente? → flaky → investigar.
4. Verificar si el mismo test falla en main (sin el cambio del PR): si falla en main también, el PR no lo causó.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Test fallido: checkout.test.js > "total con cupón"
  │
  ▼
Traza: expected 135, received 130
  │
  ▼
¿El código cambió el cálculo? → Sí → bug real en el PR
  │
  ▼
Reproducir localmente → falla igual → confirmado
  │
  ▼
Corregir el código → push → CI verde
\`\`\`

### 💻 Ejemplo básico

Verificar si el fallo es del PR o del main:

\`\`\`bash
git stash        # quitar los cambios del PR
npm test checkout  # ¿falla igual?
git stash pop
# Si falla sin los cambios → el test ya estaba roto (no es tu PR)
\`\`\`

### 🏢 Caso de uso profesional

Un equipo con un test flaky recurrente lo investiga de verdad (en vez de re-ejecutar): el test de integración fallaba cuando la DB compartida tenía datos de otro shard. La solución: aislamiento de datos por shard. El test dejó de ser flaky y la suite recuperó confiabilidad. La disciplina de "los flaky se investigan" eliminó el 90% de los re-runs.

### ⚠️ Errores comunes

* Ignorar fallos flaky ("re-ejecuta y listo") — esconden bugs.
* Arreglar el test para que pase sin entender el fallo.
* Actualizar el test sin intención (borrar la aserción que falla).
* Echarle la culpa al entorno sin evidencia.
* No reproducir localmente antes de cambiar código.

### 📋 Lo que debes recordar

* Lee el reporte y la traza antes de tocar nada.
* Clasifica: código / test mal escrito / flaky / entorno.
* Los flaky se investigan, no se normalizan.
* Verifica si el fallo existe en main (¿lo causó tu cambio?).

### 🧪 Autoevaluación rápida

1. ¿Qué clasificaciones tiene un test fallido?
2. ¿Qué método se sigue ante un fallo?
3. ¿Por qué no se debe "arreglar" un test quitando la aserción que falla?

---

1. Fallo real de código, test mal escrito, test flaky (intermitente) o fallo del entorno/infraestructura.
2. Leer el reporte/traza → reproducir → clasificar (determinista vs intermitente) → verificar si falla también en main → corregir lo que corresponde.
3. Porque la aserción fallida es la señal del problema: borrarla elimina la protección, esconde el bug y deja el test como decoración falsa.
`
export default content
