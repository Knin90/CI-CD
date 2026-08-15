const content = `
## Módulo 16 — Security gates

### 🎯 Objetivos de aprendizaje

* Integrar la seguridad como gate del pipeline.
* Aplicar escaneo de dependencias, imágenes y código.
* Bloquear por riesgo real, no por ruido.

### ❓ Problema real que resuelve

La seguridad se revisa "al final" (o nunca): dependencias vulnerables, imágenes con fallos conocidos, secretos en el código — todo llega a producción porque el pipeline no lo bloquea. Los security gates (nivel 10 y 23) escanean en cada cambio: dependencias (SCA), imágenes (escaneo de contenedores), código (SAST) y secretos — y bloquean si el riesgo supera el umbral.

### 💡 Analogía

El security gate es el detector de metales del aeropuerto: cada pasajero (cambio) pasa por el escáner (SAST/SCA/escaneo) antes de subir al avión (producción). Si suena (vulnerabilidad crítica), no pasa — no se discute en la puerta de embarque. Y el detector se calibra para no sonar por todo (ruido) y volverse ignorado.

### 📖 Explicación técnica

* **Security gates** (nivel 10) en el pipeline:
  * **SCA** (software composition analysis): dependencias con vulnerabilidades conocidas (nivel 10 y 22 de 22) — se bloquea por CVSS: críticas/altas en cero, el resto se gestiona.
  * **Escaneo de imágenes**: la imagen Docker contra bases de vulnerabilidades (nivel 10) antes de publicarla al registry (módulo 9).
  * **SAST**: análisis estático del código propio (nivel 10) — errores de seguridad en el código, no solo en dependencias.
  * **Secrets scanning**: detectores de secretos en el repo y en el pipeline (nivel 11-12) — un secret commiteado bloquea el merge.
  * **SBOM** (bill of materials): inventario de componentes para auditoría (nivel 10 y 23).
* El gate bloquea por **riesgo real**: umbrales por severidad (crítico/alto = bloquea; medio/bajo = ticket), no por cualquier aviso (el ruido destruye el gate — módulo 15).
* Política: "no mergear con vulnerabilidad crítica", "no publicar imagen con fallo conocido", "no desplegar sin firma/verificación" (nivel 10).
* Buenas prácticas: escanear pronto (cada PR, no "antes de prod"), umbrales calibrados, y responder: la vulnerabilidad se actualiza, se mitiga o se acepta con riesgo documentado (nivel 10 y 23).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Cambio → PR
   ↓
SCA: dependencias (CVEs) → umbral por severidad
   ↓
SAST: código propio → hallazgos
   ↓
Secrets scan: ¿algo filtrado?
   ↓
Imagen escaneada antes de publicar
   ↓
¿Crítico/alto? → BLOQUEA → se gestiona
   ↓
Verde → merge y despliegue seguros
\`\`\`

### 🧪 Ejercicios

1. Añade un escáner SCA a tu pipeline y revisa sus hallazgos.
2. Configura un gate que bloquee por vulnerabilidad crítica.
3. Añade secrets scanning y verifica que detecta un secret de prueba.

### ⚠️ Errores comunes

* Escanear solo antes de producción (el riesgo viaja todo el flujo — nivel 10).
* Gates que bloquean por todo (ruido → el gate se ignora — módulo 15).
* Ignorar hallazgos sin documentar la aceptación del riesgo (nivel 23).
* Escanear dependencias pero no imágenes ni código (cada capa tiene su scanner — nivel 10).

### 🔗 Conexión DevOps

Los security gates conectan con security en CI/CD (nivel 10), supply chain (nivel 10), imágenes (nivel 9-10), secretos (nivel 11-12) y quality gates (módulo 15). Son la seguridad como parte del flujo, no como apéndice: el pipeline impide que el riesgo llegue a producción.
`
export default content
