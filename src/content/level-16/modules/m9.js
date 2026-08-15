const content = `
## Módulo 9 — Rolling deployments

### 🎯 Objetivos de aprendizaje

* Desplegar por lotes con Ansible (rolling).
* Controlar velocidad y pausas entre lotes.
* Aplicar la estrategia rolling (nivel 13) en infraestructura de VMs.

### ❓ Problema real que resuelve

Cambiar 50 servidores de golpe multiplica el riesgo: si el playbook falla a mitad, la mitad de la flota quedó a medias. El rolling deployment con Ansible aplica el cambio por lotes: un grupo de hosts a la vez, verificando cada lote antes de continuar — limitando el blast radius y permitiendo frenar.

### 💡 Analogía

El rolling con Ansible es la renovación del alumbrado público por manzanas: no se apaga toda la ciudad para cambiar las bombillas; se trabaja manzana a manzana (lote), se comprueba que cada manzana quedó iluminada y se continúa. Si una manzana falla, solo esa manzana está a oscuras — y se detiene el plan.

### 📖 Explicación técnica

* **Serial**: \`serial: 5\` en el play — Ansible ejecuta el play completo sobre 5 hosts, espera y continúa con los siguientes 5.
* Opciones: \`serial: 1\` (uno a uno — máxima cautela), \`serial: 20%\` (porcentaje), \`serial: [1, 5, 10]\` (progresión creciente: 1, luego 5, luego 10 — canary de configuración).
* Control: entre lotes, Ansible espera el final del lote; se puede combinar con pausas (\`pause\`) o gates manuales.
* Verificación por lote: health checks post-lote (módulo 5) — si el lote falla, se detiene el rollout (los hosts restantes no se tocan).
* En CI/CD: el run rolling se dispara desde el pipeline con el inventario del entorno; en prod, con approval previo (nivel 12).
* Buenas prácticas: empezar con serial bajo, verificar cada lote, tener runbook de aborto (\`--limit\` para aislar hosts rotos), monitorear durante el rollout.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Play con serial: 5 (inventario: 20 hosts)
   ↓
Lote 1 (hosts 1-5) → aplicar → verificar
   ↓
¿OK? → Lote 2 (hosts 6-10) → aplicar → verificar
   ↓
¿Fallo? → detener (hosts 11-20 intactos)
   ↓
Completado: todos los hosts en el estado deseado
\`\`\`

### 🧪 Ejercicios

1. Añade \`serial: 1\` a un play y ejecútalo contra 5 hosts de prueba.
2. Simula un fallo en el lote 2 y observa que el rollout se detiene.
3. Diseña una progresión canary con \`serial: [1, 5, rest]\`.

### ⚠️ Errores comunes

* Sin serial: cambio masivo (blast radius completo).
* Serial alto "para ir rápido": el riesgo vuelve a concentrarse.
* No verificar cada lote: el rollout sigue aunque un lote quedó roto.
* Abortar mal: sin plan de aislamiento (\`--limit\`) para los hosts rotos.

### 🔗 Conexión DevOps

El rolling deployment aplica la estrategia rolling (nivel 13) a la infraestructura de VMs: conecta serial/verificación (módulos 5 y 9), inventarios (módulo 8) y la automatización del pipeline.
`
export default content
