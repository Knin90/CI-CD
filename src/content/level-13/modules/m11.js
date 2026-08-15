const content = `
## Módulo 11 — Zero downtime

### 🎯 Objetivos de aprendizaje

* Definir zero downtime deployment y sus requisitos.
* Combinar estrategias para eliminar la indisponibilidad.
* Entender qué sí y qué no garantiza el zero downtime.

### ❓ Problema real que resuelve

Los usuarios y consumidores de la API no aceptan cortes: cada segundo de indisponibilidad es dinero, clientes o reputación. El zero downtime deployment busca que la versión cambie sin que el servicio deje de responder — usando estrategias que mantienen instancias sirviendo mientras otras se actualizan.

### 💡 Analogía

El zero downtime es el cambio de ruedas en la Fórmula 1: el coche no se detiene, los mecánicos cambian las cuatro ruedas en dos segundos mientras el coche pasa por el pit lane a velocidad mínima. El servicio (el coche) nunca se detiene por completo.

### 📖 Explicación técnica

* **Zero downtime**: el servicio permanece disponible durante todo el despliegue.
* Estrategias que lo permiten: rolling (nivel 2), blue/green (nivel 4), canary (nivel 5).
* Requisitos en la aplicación:
  * **Múltiples instancias** (al menos 2) detrás de un balanceador.
  * **Health checks** que el balanceador respeta (retirar instancias no sanas).
  * **Terminación elegante** (graceful shutdown): la instancia vieja termina peticiones en curso antes de morir.
  * **Compatibilidad entre versiones**: durante rolling conviven v1 y v2.
  * **Migraciones compatibles**: la BD soporta ambas versiones (expand/contract).
* El zero downtime se mide: si hay una ventana en que el balanceador no tiene instancias sanas, hubo downtime aunque "nadie se quejó".
* Buenas prácticas: probar el despliegue con tráfico real (load test durante el deploy), monitorear el error rate durante la transición.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
2+ instancias + balanceador + health checks
   ↓
Rolling/blue-green/canary
   ↓
Instancia nueva → health OK → recibe tráfico
   ↓
Instancia vieja → termina requests → se retira
   ↓
En ningún momento 0 instancias sanas
\`\`\`

### 🧪 Ejercicios

1. Verifica que tu app tiene graceful shutdown (termina peticiones antes de morir).
2. Mide el downtime de un deploy con tu estrategia actual (¿hay ventana sin instancias sanas?).
3. Diseña un despliegue con 2 instancias + balanceador que garantice zero downtime.

### ⚠️ Errores comunes

* "Tenemos zero downtime" sin health checks que el balanceador respete.
* Migraciones incompatibles que rompen la versión vieja durante el rolling.
* Graceful shutdown ausente: las peticiones se cortan a mitad.
* Escalar a 0 durante el deploy (recreate) creyendo que es zero downtime.

### 🔗 Conexión DevOps

Zero downtime une deployments (nivel 13), health checks y Kubernetes (nivel 14). Es un requisito de producto que condiciona toda la arquitectura de despliegues — y se verifica con observabilidad (nivel 18).
`
export default content
