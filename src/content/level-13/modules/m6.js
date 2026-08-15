const content = `
## Módulo 6 — A/B deployment

### 🎯 Objetivos de aprendizaje

* Definir A/B deployment y su diferencia con canary.
* Distribuir tráfico por segmentos de usuarios, no solo porcentajes.
* Usar A/B para experimentos y decisiones de producto.

### ❓ Problema real que resuelve

A veces la pregunta no es "¿funciona sin errores?" sino "¿qué versión es mejor para el negocio?". A/B deployment sirve dos versiones a **segmentos distintos de usuarios** (por usuario, región, plan, cookie) y mide el comportamiento de cada grupo. No decide por estabilidad técnica, sino por resultados de negocio.

### 💡 Analogía

A/B es la cata a ciegas del restaurante: la mitad de los comensales recibe la receta nueva y la otra mitad la clásica, sin saberlo. Al final, se comparan las reacciones. El objetivo no es "que no se derrame la sopa" (estabilidad) sino "qué receta gusta más" (resultado).

### 📖 Explicación técnica

* **A/B deployment**: dos (o más) versiones sirviéndose simultáneamente a grupos definidos de usuarios.
* Diferencia con canary: canary sube porcentaje buscando estabilidad; A/B mantiene los grupos fijos para comparar resultados medibles (conversión, engagement, revenue).
* Distribución: por atributos del usuario (ID hash, país, plan), no solo aleatorio — el mismo usuario debe ver siempre la misma versión (consistencia de la sesión).
* Implementación: feature flags con targeting, service mesh (header/cookie routing), balanceadores con sticky sessions.
* Medición: métricas de negocio por grupo + significancia estadística; el experimento tiene duración definida.
* Resultado: ganador se promueve al 100% (o se descarta la variante).
* Buenas prácticas: un solo cambio por experimento, definir métrica primaria antes de empezar, tamaño de muestra suficiente, duración fija.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Usuario llega
   ↓
¿Segmento A o B? (hash de user_id, cookie...)
   ↓
A → versión A     B → versión B
   ↓
Métricas por grupo (conversión, latencia, errores)
   ↓
Análisis → ¿promover A, B o descartar?
\`\`\`

### 🧪 Ejercicios

1. Diseña un experimento A/B con feature flags segmentadas por usuario.
2. Define métrica primaria, tamaño de muestra y duración del experimento.
3. Compara A/B con canary: ¿qué pregunta responde cada uno?

### ⚠️ Errores comunes

* Confundir A/B con canary (objetivos distintos: negocio vs estabilidad).
* Segmentación inestable: el usuario cambia de versión a mitad de sesión (resultados inválidos).
* Múltiples cambios a la vez: no se sabe qué causó la diferencia.
* Terminar el experimento "cuando se quiera" sin significancia estadística.

### 🔗 Conexión DevOps

A/B conecta el despliegue con el producto: usa feature flags (módulo 7) para servir variantes y observabilidad (nivel 18) para medir. Es la estrategia donde el pipeline sirve a los experimentos de negocio.
`
export default content
