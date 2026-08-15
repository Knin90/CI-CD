const content = `
## Módulo 13 — Network failure

### 🎯 Objetivos de aprendizaje

* Diagnosticar fallos de red en el pipeline.
* Resolver problemas de DNS, conectividad y timeouts.
* Distinguir red del pipeline de red de la aplicación.

### ❓ Problema real que resuelve

"Connection timed out", "Could not resolve host", "connection refused": la red es la causa invisible de muchos fallos de CI/CD. El runner no llega al registry, el job no alcanza la API, el deploy no conecta con el servicio. Diagnosticar red — DNS, conectividad, puertos, proxies — ordenadamente evita horas de búsqueda en el lugar equivocado.

### 💡 Analogía

La red es la carretera entre el restaurante (pipeline) y los proveedores (registry, APIs, cluster). Si la carretera está cortada (firewall), la señal está mal (DNS), o el camión se queda sin combustible a mitad de camino (timeout), el pedido no llega — y el problema no está ni en la cocina ni en el proveedor, sino en el camino. Hay que trazar la ruta completa para encontrarlo.

### 📖 Explicación técnica

* Fallos típicos:
  * **DNS**: \`Could not resolve host\` — el resolver no encuentra el nombre (registro, DNS interno, \`/etc/hosts\`).
  * **Conectividad**: \`connection refused\` (puerto cerrado, servicio caído, firewall), \`timed out\` (red/firewall que descarta paquetes).
  * **Proxies**: el runner detrás de un proxy que no está configurado (HTTP_PROXY, NO_PROXY).
  * **Firewall/security groups**: puertos bloqueados entre entornos (nivel 16).
  * **VPN/peering**: los entornos en redes distintas que no se alcanzan.
* Método: traza la ruta: ¿qué comando falla y contra qué host? → \`curl -v\` (verboso) para ver dónde muere (DNS, TCP, TLS, HTTP) → \`dig\`/nslookup para DNS → \`ping\`/nc para conectividad → revisa proxy y firewall → separa "red del pipeline" (runner → servicio) de "red de la app" (servicio → dependencia).
* Buenas prácticas: registros DNS correctos, endpoints internos en vez de públicos, timeouts con diagnóstico (el error debe decir qué host y qué puerto), y \`curl -v\` como primera herramienta.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Job intenta alcanzar un host (registry, API, cluster)
   ↓
curl -v → ¿dónde muere?
   ↓
DNS: dig / nslookup / resolve.conf
   ↓
TCP: nc / ping / puerto abierto
   ↓
TLS/HTTP: certificado, auth, respuesta
   ↓
¿Proxy? ¿Firewall? ¿VPN?
   ↓
Corrige DNS, red, o configuración del runner
\`\`\`

### 🧪 Ejercicios

1. Provoca un fallo de DNS (host inexistente) y observa el mensaje exacto.
2. Usa \`curl -v\` contra un servicio y explica dónde muere la conexión.
3. Documenta los saltos de red entre tu runner y el registry.

### ⚠️ Errores comunes

* Asumir "problema de red" sin trazar la ruta (curl -v dice dónde).
* Confundir DNS con conectividad (mensajes distintos, causas distintas).
* Ignorar proxies en runners (el error parece de DNS pero es de proxy).
* Diagnosticar la app cuando el fallo es del pipeline (o al revés).

### 🔗 Conexión DevOps

La red conecta con firewall (nivel 16), timeouts (módulo 14), runners (módulo 5), registries (módulo 9) y cloud networking (nivel 15). Es la capa transversal: aparece en casi todos los demás fallos, por eso diagnosticarla bien ahorra tiempo en todo el nivel.
`
export default content
