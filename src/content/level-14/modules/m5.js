const content = `
## Módulo 5 — Services

### 🎯 Objetivos de aprendizaje

* Definir el recurso Service y su función de red.
* Configurar Service types (ClusterIP, NodePort, LoadBalancer).
* Entender cómo el Service conecta usuarios con pods.

### ❓ Problema real que resuelve

Los pods son efímeros: nacen, mueren y cambian de IP constantemente. Un consumidor no puede "apuntar" a una IP de pod. El Service es la dirección estable que agrupa pods por labels y reparte tráfico — el consumidor habla con el Service, y este con los pods sanos.

### 💡 Analogía

El Service es la centralita telefónica de la empresa: los empleados (pods) cambian de despacho (IP), pero la centralita tiene un número fijo (Service) que siempre contesta y deriva la llamada al empleado correcto (pod sano). Llamas al número de siempre y no te importa dónde está cada empleado hoy.

### 📖 Explicación técnica

* **Service**: recurso que expone un conjunto de pods (seleccionados por selector/labels) con una IP y nombre DNS estables.
* Tipos:
  * **ClusterIP** (default): IP interna del cluster, accesible solo dentro.
  * **NodePort**: expone el Service en un puerto de cada nodo (acceso externo básico).
  * **LoadBalancer**: provisiona un balanceador del cloud provider que enruta al Service.
  * **ExternalName**: alias DNS a un servicio externo.
* El Service usa **Endpoints** (lista actual de IPs de pods que coinciden con el selector) y reparte el tráfico.
* En CI/CD: tras aplicar el Deployment, el Service expone la app; el Ingress (HTTP) o LoadBalancer la hace pública.
* Verificación en pipeline: \`kubectl get endpoints\` — si no hay endpoints, el selector no matchea (error clásico).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Service (selector app=api) creado
   ↓
Endpoints: IPs de pods con app=api (actualizado en vivo)
   ↓
Tráfico → Service (IP estable) → Endpoints → pods
   ↓
Pod muere → endpoint se quita → tráfico a pods sanos
\`\`\`

### 🧪 Ejercicios

1. Crea un Service ClusterIP para tu Deployment y verifica los endpoints.
2. Expón la app con LoadBalancer (o NodePort en local) y accede desde fuera.
3. Rompe el selector a propósito y observa endpoints vacíos (error típico).

### ⚠️ Errores comunes

* Selector del Service que no coincide con los labels de los pods (endpoints vacíos).
* Confundir Service con Deployment (exponer vs gestionar pods).
* Exponer con NodePort en producción en lugar de LoadBalancer/Ingress.
* Puertos mal configurados (targetPort ≠ puerto del pod).

### 🔗 Conexión DevOps

El Service es el puente entre el despliegue y los usuarios: conecta Deployments (módulo 4), health checks (módulo 11 — readiness retira pods no sanos del Service) y las estrategias blue/green o canary (nivel 13) que conmutan tráfico a nivel de Service.
`
export default content
