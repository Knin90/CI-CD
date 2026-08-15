const content = `
## Módulo 12 — Environment isolation

### 🎯 Objetivos de aprendizaje

* Definir aislamiento de entornos y sus niveles.
* Aislar datos, red, credenciales e infraestructura entre entornos.
* Evitar fugas entre entornos (datos, tráfico, config).

### ❓ Problema real que resuelve

Si los entornos comparten base de datos, red o credenciales, los problemas se contagian: un test de staging borra datos de dev, un tráfico de prueba toca producción, un cambio de config afecta a todos. El aislamiento de entornos garantiza que lo que pasa en un entorno no afecta a los demás — como debe ser para poder experimentar con seguridad.

### 💡 Analogía

El aislamiento de entornos son los departamentos del hospital: cada uno con sus propias instalaciones, su propio personal y sus propios suministros. La UCI (producción) no comparte jeringas con el área de pruebas. Si algo falla en un departamento, los demás siguen funcionando.

### 📖 Explicación técnica

* Dimensiones del aislamiento:
  * **Datos**: bases de datos, caches y colas separadas por entorno.
  * **Red**: VPCs/subredes/namespaces separados; sin ruta entre dev y prod.
  * **Credenciales**: secrets e identidades por entorno (módulo 10).
  * **Infraestructura**: recursos físicos/virtuales distintos (o namespaces con límites en Kubernetes).
  * **Configuración**: valores por entorno, sin acoplamiento.
* Niveles: aislamiento total (infraestructura separada) vs aislamiento lógico (namespaces/quota en un cluster compartido).
* Trade-off: aislamiento total = más costo y consistencia; lógico = más barato pero con menos garantías.
* Buenas prácticas: defaults que no apunten a producción (un error de config no debe caer en prod), firewalls por entorno, datos sintéticos en entornos no productivos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
DEV ── red A ── BD dev ── creds dev
TESTING ── red B ── BD testing ── creds testing
PROD ── red C ── BD prod ── creds prod
        (sin rutas cruzadas)
\`\`\`

### 🧪 Ejercicios

1. Audita qué comparten tus entornos hoy (BD, red, credenciales).
2. Aísla al menos una dimensión (por ejemplo, base de datos separada).
3. Verifica que un cambio de config en dev no afecta a producción.

### ⚠️ Errores comunes

* Todos los entornos contra la misma base de datos de producción.
* Credenciales compartidas "porque cuesta gestionarlas".
* Red plana: desde el runner de dev se llega a producción.
* Entornos lógicos sin límites de recursos (un entorno consume todo el cluster).

### 🔗 Conexión DevOps

El aislamiento es la base de la confianza en los entornos: sin él, los entornos "paralelos" son en realidad un solo sistema con múltiples nombres. Conecta environments (nivel 12), security (nivel 10) y Kubernetes (nivel 14).
`
export default content
