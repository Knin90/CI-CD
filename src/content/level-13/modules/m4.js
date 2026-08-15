const content = `
## Módulo 4 — Blue / Green

### 🎯 Objetivos de aprendizaje

* Definir la estrategia blue/green y su modelo de conmutación.
* Configurar dos ambientes paralelos y el switch de tráfico.
* Entender rollback instantáneo con blue/green.

### ❓ Problema real que resuelve

Con rolling, la versión vieja y la nueva conviven durante el despliegue, y si algo falla a mitad de camino la situación es confusa. Blue/green mantiene **dos entornos completos** (azul = actual, verde = nueva), despliega en verde sin tocar azul y, cuando todo está validado, conmuta el tráfico en un instante. El rollback es simplemente volver a conmutar.

### 💡 Analogía

Blue/green es el puente levadizo con dos calzadas: una en uso (azul) y otra nueva construida en paralelo (verde). Cuando la nueva calzada está probada y señalizada, se desvía todo el tráfico en un solo movimiento. Si el desvío sale mal, se vuelve a la calzada anterior — al instante.

### 📖 Explicación técnica

* **Blue/green**: dos entornos idénticos; el inactivo (green) recibe la nueva versión; al validarse, el router/balanceador conmuta el tráfico de blue a green.
* Componentes: dos conjuntos de instancias, un punto de conmutación (load balancer, Service de Kubernetes, registro DNS), health checks del entorno verde.
* Flujo: deploy a green → pruebas en green (sin tráfico real) → switch → tráfico a green → blue queda como standby.
* **Rollback instantáneo**: conmutar de vuelta a blue (que sigue con la versión anterior).
* Variantes: green se convierte en el nuevo blue tras estabilizarse; a veces blue se recicla o se deja un tiempo.
* Coste: el doble de infraestructura (o el coste de mantener el entorno standby). Requiere que la app no dependa de estado persistente ligado al entorno.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
BLUE (v1) ── tráfico actual
GREEN (v2) ── deploy + pruebas sin tráfico
   ↓
Validación de GREEN OK
   ↓
SWITCH: tráfico → GREEN (v2)
   ↓
BLUE queda en standby
   ↓
Falló → switch inverso (rollback instantáneo)
\`\`\`

### 🧪 Ejercicios

1. Diseña blue/green con dos Services + switch de selector en Kubernetes.
2. Valida en green antes del switch (smoke tests contra el entorno sin tráfico).
3. Simula un fallo tras el switch y haz rollback conmutando de nuevo.

### ⚠️ Errores comunes

* Dejar de mantener el entorno blue tras el switch (pierde valor como rollback).
* Bases de datos compartidas que rompen la independencia de los entornos.
* Switch sin health checks del entorno verde.
* Olvidar que el coste es doble (infra ociosa en standby).

### 🔗 Conexión DevOps

Blue/green es la estrategia preferida cuando el rollback instantáneo importa más que el coste de infraestructura. Se conecta con environments (nivel 12), Kubernetes Services (nivel 14) y zero downtime (módulo 11).
`
export default content
