const content = `
## Módulo 2 — ansible-lint

### 🎯 Objetivos de aprendizaje

* Usar ansible-lint para mejores prácticas y estilo.
* Configurar reglas y excepciones.
* Integrar el lint como gate del pipeline.

### ❓ Problema real que resuelve

Los playbooks funcionan, pero escritos de formas inconsistentes y con malas prácticas: tareas sin nombre, comandos en lugar de módulos idempotentes, shell en vez de módulos específicos, YAML descuidado. ansible-lint unifica el estilo y detecta prácticas que rompen la idempotencia o la mantenibilidad — antes de que el playbook toque un host.

### 💡 Analogía

ansible-lint es el corrector de estilo del periódico: la noticia puede ser cierta (el playbook funciona), pero sin las reglas de estilo (tareas nombradas, módulos correctos) es difícil de mantener y cualquiera la rompe. El corrector revisa la forma antes de publicar (ejecutar).

### 📖 Explicación técnica

* **ansible-lint**: linter de playbooks/roles basado en reglas (mejores prácticas de Ansible + estilo).
* Qué detecta: tareas sin \`name\`, uso de \`command\`/\`shell\` cuando existe un módulo específico (\`yum\`, \`service\`, \`file\`), playbooks sin hosts, YAML no canónico, comandos no idempotentes (\`chmod\`, \`mkdir\` en shell), secrets potenciales.
* Configuración: \`.ansible-lint\` (reglas, excepciones, paths); reglas por severidad (error/warning).
* En CI: gate en cada PR — el merge se bloquea con errores de lint; las excepciones se justifican en el config (no con \`# noqa\` masivo).
* Beneficios: código más consistente y mantenible, menos bugs de idempotencia, revisiones más rápidas.
* Buenas prácticas: empezar con el default, ajustar reglas al contexto del equipo, excepciones documentadas, correr lint local + CI.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Playbooks en el PR
   ↓
ansible-lint (reglas configuradas)
   ↓
¿Errores? → CI falla (feedback en el PR)
   ↓
¿OK? → syntax-check → check mode → run
\`\`\`

### 🧪 Ejercicios

1. Ejecuta ansible-lint sobre tus playbooks y clasifica los hallazgos.
2. Configura \`.ansible-lint\` con tus reglas y excepciones justificadas.
3. Añade el lint como gate del pipeline (bloquear merge con errores).

### ⚠️ Errores comunes

* Lint sin gate: se ejecuta pero no bloquea nada.
* Suprimir reglas con \`# noqa\` por doquier (el lint pierde valor).
* Ignorar warnings de idempotencia (son los que rompen los re-runs).
* Configurar el lint "para que pase" en lugar de para mejorar el código.

### 🔗 Conexión DevOps

ansible-lint es la higiene del código Ansible: conecta code review (nivel 1), el pipeline (módulo 1) y la idempotencia (módulo 1). Playbooks limpios son playbooks que se pueden ejecutar con confianza.
`
export default content
