const content = `
## Módulo 2 — Logs

### 🎯 Objetivos de aprendizaje

* Centralizar y gestionar logs de la aplicación y la infraestructura.
* Buscar y correlacionar logs en incidentes.
* Evitar logs inútiles, ruidosos o con datos sensibles.

### ❓ Problema real que resuelve

Cuando algo falla, los logs son la primera fuente de verdad: qué pasó, en qué orden, con qué errores. Pero los logs dispersos (cada servidor en su archivo) son inútiles en la práctica. La gestión centralizada de logs los reúne, indexa y hace buscables — convirtiendo el caos en evidencia accionable.

### 💡 Analogía

Los logs centralizados son la caja negra del avión: no se revisan en cada vuelo, pero cuando algo pasa, se recuperan todas las grabaciones de todos los sensores en un solo lugar y en orden cronológico. Sin caja negra centralizada, cada sensor guardaría sus datos en su propio rincón — imposible de reconstruir.

### 📖 Explicación técnica

* **Logs**: eventos discretos con timestamp (quién/quién llamó, qué pasó, resultado). La base de la observabilidad.
* **Centralización**: agentes en los hosts/pods envían logs a un agregador (ELK/Elasticsearch, Loki+Grafana, Datadog, CloudWatch) — buscables, con retención.
* Estructura: logs **estructurados** (JSON con campos: timestamp, level, service, trace_id) en lugar de texto libre — permiten filtros y correlación.
* **Correlación**: con trace_id y request_id, los logs de una petición se siguen a través de servicios (conecta con traces — módulo 4).
* En CI/CD: los logs de los pipelines y de las apps desplegadas se observan para debugging (nivel 22) y verificación post-deploy (módulo 1).
* Buenas prácticas: niveles claros (debug/info/warn/error), logs accionables (el mensaje dice qué hacer), **nunca secretos en logs** (nivel 11), retención definida por requisito, redactar PII.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
App/host genera log (JSON estructurado)
   ↓
Agente lo envía al agregador
   ↓
Indexado + retención
   ↓
Búsqueda: filtro por service/trace_id/nivel
   ↓
Evidencia para debug/incidentes
\`\`\`

### 🧪 Ejercicios

1. Configura logs estructurados (JSON) en tu app y un agregador para buscarlos.
2. Correlaciona los logs de una petición con su trace_id.
3. Audita tus logs: ¿hay secretos o datos sensibles? ¿hay logs ruidosos que nadie lee?

### ⚠️ Errores comunes

* Logs en texto libre (no filtrables, no correlacionables).
* Secretos en logs (nivel 11 — la fuga más común).
* Logs infinitos sin retención ni rotación (costo y desorden).
* Logs "por si acaso" sin dueño: nadie los consulta pero todos pagan por ellos.

### 🔗 Conexión DevOps

Los logs son el primer pilar de la observabilidad: conectan debugging (nivel 22), monitoreo de despliegues (módulo 1), seguridad (nivel 10 — auditoría) y las métricas (módulo 3).
`
export default content
