const content = `
## Módulo 7 — Caching

### 🎯 Objetivos de aprendizaje

* Diseñar cachés eficientes en el pipeline.
* Configurar keys, restore y invalidación.
* Evitar los problemas de caché (stale, corrupción).

### ❓ Problema real que resuelve

Cada ejecución del pipeline descarga las mismas dependencias y reconstruye lo mismo: minutos y minutos de trabajo repetido (nivel 19). El caching guarda dependencias, builds parciales y herramientas entre ejecuciones para acelerar el pipeline — pero mal configurado, una caché vieja (stale) provoca fallos misteriosos (nivel 22). Diseñar cachés correctas es acelerar sin sacrificar la corrección.

### 💡 Analogía

La caché es la despensa del restaurante: en vez de ir al mercado (registry) cada vez que cocinas, guardas los ingredientes habituales (dependencias) en la despensa (caché) y solo compras lo nuevo. Pero si la despensa guarda harina vieja (caché stale) y la usas en una receta nueva, el plato sale mal — y culpar al cocinero (código) no arregla la harina.

### 📖 Explicación técnica

* **Caché**: datos reutilizables entre ejecuciones (nivel 19): dependencias (\`node_modules\`, \`~/.m2\`, \`vendor/\`), capas de Docker (nivel 9), builds parciales, herramientas.
* **Keys**: la caché se identifica por una key basada en lo que cambia: lockfile (nivel 22), versión de runtime, rama. Si la key cambia, la caché se invalida y se regenera (nivel 19).
* **Restore**: \`restore-keys\` permite caer a una caché anterior (parcial) si la exacta no existe (nivel 19).
* Problemas típicos:
  * **Stale**: la key no refleja los cambios (se reutiliza lo viejo) → fallos que desaparecen al limpiar la caché (nivel 22).
  * **Corrupción**: caché dañada (descarga a medias) → builds raros.
  * **Caché enorme**: más tiempo de guardar/restaurar que de regenerar.
  * **Contaminación**: caché compartida entre ramas/entornos que mezcla estados (nivel 17 de 22).
* Buenas prácticas: keys precisas (lockfile + runtime), tamaño razonable, limpiar/reconstruir cuando sospeches, y en el debugging, "borra la caché" como primer experimento controlado (nivel 22).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job inicia → calcula key (lockfile + runtime)
   ↓
¿Caché con esa key? → restore (o fallback restore-key)
   ↓
Ejecuta usando la caché (sin redescargar)
   ↓
Termina → guarda la caché actualizada
   ↓
Cambió el lockfile → key nueva → caché regenerada
   ↓
Sospecha de stale → limpia y reconstruye
\`\`\`

### 🧪 Ejercicios

1. Configura caché de dependencias con key basada en el lockfile.
2. Cambia una dependencia y observa la invalidación de la caché.
3. Diagnostica un fallo "que se arregla limpiando la caché".

### ⚠️ Errores comunes

* Keys imprecisas (la caché no se invalida cuando debería — stale).
* Caché compartida entre ramas sin aislar (estados mezclados — nivel 22).
* Cachés gigantes que tardan más en guardarse que en regenerarse.
* "Limpia la caché" como solución mágica sin entender la key (nivel 22).

### 🔗 Conexión DevOps

El caching conecta con cachés (nivel 19), dependencias (nivel 22), build (nivel 6), fast feedback (módulo 5) y el debugging de fallos por caché (nivel 22). Es acelerar el pipeline con disciplina: la caché correcta ahorra minutos, la incorrecta esconde bugs.
`
export default content
