const content = `
## Módulo 14 — Application Delivery

### 🎯 Objetivos de aprendizaje

* Definir **Application Delivery**: el proceso completo de llevar la aplicación al usuario.
* Relacionar la entrega de aplicaciones con los componentes del pipeline (build, test, artifact, deploy).
* Entender la diferencia entre entregar la infraestructura y entregar la aplicación.

### ❓ Problema real que resuelve

IaC y CM resuelven "tener servidores configurados"; pero el objetivo del negocio es **la aplicación funcionando para el usuario**. Application Delivery es el proceso que une todo: tomar el código fuente, validarlo, empaquetarlo y publicarlo en los entornos donde el usuario lo consume. Es el marco que da sentido a todas las piezas del pipeline — sin él, se automatiza infraestructura pero no se entrega software.

### 💡 Analogía

Un aeropuerto: la infraestructura (IaC) son las pistas, torres y terminales; la configuración (CM) es el equipamiento de cada terminal; y Application Delivery son los vuelos — el proceso que lleva al pasajero (usuario) a su destino (la app). Se pueden tener pistas perfectas y terminales vacías sin vuelos; la entrega de la aplicación es el vuelo en sí: desde la puerta de embarque (código) hasta la llegada (producción).

### 📖 Explicación técnica

* **Application Delivery**: conjunto de prácticas, procesos y herramientas para publicar y mantener aplicaciones de forma segura y confiable, del código al usuario final.
* Componentes típicos del flujo de entrega:
  * **Código fuente** (Git) → **validación** (CI) → **artefacto** (build/package) → **publicación** (registry) → **promoción** (entornos) → **despliegue** (deploy) → **verificación** (monitoreo).
* Incluye capas técnicas: balanceadores y CDN (entrega del tráfico), contenedores/orquestación (runtime), estrategias de despliegue (cómo se publica sin romper), y observabilidad (confirmar que el usuario recibe la app).
* La "entrega" no termina en el deploy: el rendimiento, la disponibilidad y la experiencia del usuario son parte del servicio entregado.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Código fuente (Git)
  │
  ▼
CI: lint, unit, integration, security, build
  │
  ▼
Artefacto (imagen v1.2.3)
  │
  ▼
Registry (publicación)
  │
  ▼
Promoción: staging → producción
  │
  ▼
Despliegue (strategy: rolling/canary)
  │
  ▼
Verificación (health checks, métricas, tráfico)
  │
  ▼
Usuario final recibe la aplicación
\`\`\`

### 💻 Ejemplo básico

Vista unificada de la entrega de una app web con todos los componentes:

\`\`\`text
Git push → CI (build+test) → Docker image
  → Container Registry → deploy staging
  → e2e en staging → aprobación → deploy producción
  → health check + métricas → CDN/load balancer → usuario
\`\`\`

Cada flecha es un paso del pipeline; Application Delivery es la gestión del flujo completo, no solo de un paso.

### 🏢 Caso de uso profesional

Una empresa de e-commerce mide su entrega de aplicaciones con un "value stream map": desde el commit hasta que el usuario ve la feature en producción pasan 45 minutos. Ese mapa revela que el 80% del tiempo se va en revisión manual y despliegue. Optimizan el flujo (PRs más pequeños, despliegue automatizado, canary), y el tiempo baja a 18 minutos: la entrega de la aplicación se vuelve una ventaja competitiva.

### ⚠️ Errores comunes

* Enfocarse solo en la infraestructura y olvidar el flujo de la aplicación.
* Considerar terminada la entrega en el deploy, sin verificación.
* No medir el flujo completo (solo el build, no el tiempo hasta el usuario).
* Optimizar pasos individuales sin mirar el proceso de entrega como un todo.

### 📋 Lo que debes recordar

* Application Delivery es el proceso completo: del código al usuario.
* Unifica código, validación, artefacto, publicación, despliegue y verificación.
* La entrega incluye la experiencia del usuario (disponibilidad, rendimiento).
* Se mide de punta a punta: tiempo de commit a usuario.

### 🧪 Autoevaluación rápida

1. ¿Qué diferencia a "entregar infraestructura" de "entregar la aplicación"?
2. ¿Por qué la entrega no termina en el deploy?
3. ¿Qué métrica mide la entrega de aplicaciones de punta a punta?

---

1. Entregar infraestructura es crear y configurar recursos; entregar la aplicación es el flujo completo que lleva el software validado hasta el usuario final, incluyendo despliegue y verificación.
2. Porque sin verificación (health checks, métricas, disponibilidad) no se sabe si el usuario realmente está recibiendo la aplicación; el servicio entregado incluye su funcionamiento.
3. El tiempo de commit a producción (lead time) o, más completo, el tiempo de commit a usuario con la feature funcionando y verificada.
`
export default content
