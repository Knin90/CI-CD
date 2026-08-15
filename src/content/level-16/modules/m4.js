const content = `
## Módulo 4 — Check mode

### 🎯 Objetivos de aprendizaje

* Usar \`--check\` para simular cambios sin aplicarlos.
* Revisar el impacto de un playbook antes de ejecutarlo.
* Combinar check mode con diff.

### ❓ Problema real que resuelve

Antes de cambiar servidores hay que saber qué se va a cambiar. \`ansible-playbook --check\` simula la ejecución: los módulos reportan qué cambios harían, sin aplicarlos. Es la "previsualización" que permite revisar el impacto (paquetes a instalar, servicios a reiniciar, archivos a modificar) antes de tocar nada.

### 💡 Analogía

El check mode es el ensayo con los actores leyendo sus líneas pero sin moverse del sitio: todos ven cómo sería la obra (qué cambiaría), sin montar el escenario. Si el guion dice "derribar la pared del salón" (un cambio destructivo), se descubre en el ensayo, no en el estreno.

### 📖 Explicación técnica

* **\`--check\`**: los módulos reportan \`changed\` si detectarían un cambio, sin ejecutarlo. Algunos módulos (comandos) no soportan check y reportan \`skipped\`.
* **\`--diff\`**: muestra las diferencias concretas (archivos, configs) que se aplicarían — combinado con \`--check\` da la previsualización completa.
* Limitaciones: módulos que no soportan check (\`command\`, \`shell\`, scripts) — no se puede simular su efecto; tareas condicionadas a registros pueden comportarse distinto en check.
* En CI/CD: el check mode corre en el PR o antes del deploy — el revisor ve "qué cambiaría" sin riesgo; en entornos sensibles, el check mode es un gate previo al run real.
* Buenas prácticas: check mode en staging primero, diff en cambios de configuración, documentar las tareas que no soportan check.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Playbook + --check --diff
   ↓
Módulos simulan: ¿cambiaría? (sin aplicar)
   ↓
Reporte: + changed, + diff de archivos
   ↓
Revisión del impacto
   ↓
¿OK? → run real   ¿Riesgo? → ajustar playbook
\`\`\`

### 🧪 Ejercicios

1. Ejecuta tu playbook con \`--check --diff\` y revisa qué cambiaría.
2. Identifica tareas que no soportan check (\`skipped\`) y su impacto.
3. Usa check mode como gate antes del run en staging.

### ⚠️ Errores comunes

* Saltarse el check mode e ir directo al run (cambios sorpresa).
* Confiar en el check mode para módulos que no lo soportan (no simulan nada).
* Check sin diff: se sabe "qué cambia" pero no "cómo".
* Creer que check mode = sin riesgo (las tareas skipped no se validan).

### 🔗 Conexión DevOps

El check mode es el equivalente del terraform plan (nivel 15): la previsualización que habilita la revisión. Conecta el pipeline (módulo 1), approval (nivel 12) y la verificación de impacto.
`
export default content
