const content = `
## Módulo 7 — Infrastructure monitoring

### 🎯 Objetivos de aprendizaje

* Monitorear la infraestructura que soporta las aplicaciones.
* Observar hosts, clusters, redes y recursos cloud.
* Relacionar problemas de infraestructura con síntomas de la app.

### ❓ Problema real que resuelve

La app puede estar bien escrita y aun así degradarse si la infraestructura falla: un nodo lleno, una red congestionada, una BD sin espacio. El monitoreo de infraestructura observa los recursos base — CPU, memoria, disco, red, cluster — para detectar problemas antes de que degraden la aplicación o para explicar degradaciones que la app no causó.

### 💡 Analogía

El monitoreo de infraestructura es la inspección del edificio: los inquilinos (apps) pueden quejarse de que hace frío (latencia), pero el problema puede estar en la caldera (infraestructura). Los técnicos miden la caldera, las tuberías y la electricidad — no solo la temperatura de cada piso — para encontrar la causa.

### 📖 Explicación técnica

* Qué monitorear:
  * **Hosts/VMs**: CPU, memoria, disco, I/O, red — node_exporter + Prometheus.
  * **Kubernetes**: estado de nodos y pods, schedulability, resource usage por namespace (módulo 13 de nivel 14).
  * **Red**: latencia, pérdida de paquetes, throughput, DNS, balanceadores.
  * **Cloud**: quotas, costes, health de servicios gestionados (RDS, S3, etc.).
  * **Dependencias**: bases de datos (conexiones, réplicas), colas, caches.
* Métricas clave: utilización (saturation — módulo 3), tendencias de crecimiento (disco que se llena), errores de infra (fsck, OOM, network drops).
* Relación app↔infra: un error 503 puede ser la app... o el balanceador, o la red. El monitoreo de infra da el contexto para no culpar a la app.
* Buenas prácticas: alertas de capacidad (no esperar a que se llene), presupuestos por entorno, correlacionar métricas de infra con métricas de app (mismo dashboard), monitorear también los costes.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Agentes (node_exporter, kube-state-metrics, cloud APIs)
   ↓
Métricas de infra → Prometheus/cloud
   ↓
Dashboards (clusters, hosts, red, dependencias)
   ↓
Alertas de capacidad/saturación
   ↓
Correlación con síntomas de la app
\`\`\`

### 🧪 Ejercicios

1. Configura monitoreo de CPU/memoria/disco de tus hosts con Prometheus+Grafana.
2. Observa el uso de recursos de tu cluster Kubernetes por namespace.
3. Correlaciona un incidente de latencia con métricas de infraestructura (¿era la red? ¿el disco?).

### ⚠️ Errores comunes

* Monitorear solo la app (la infra falla sin explicación).
* Alertas de capacidad cuando ya es tarde (disco al 100% en vez de al 80%).
* Dashboards de infra sin correlación con la app (cada equipo mira su parte).
* Ignorar dependencias gestionadas (BD, colas) porque "las gestiona el cloud".

### 🔗 Conexión DevOps

El monitoreo de infraestructura conecta la capa de infraestructura (niveles 14-16) con la observabilidad: complementa el monitoreo de aplicación (módulo 6) y alimenta el troubleshooting (nivel 22).
`
export default content
