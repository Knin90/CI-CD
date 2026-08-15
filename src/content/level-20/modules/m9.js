const content = `
## Módulo 9 — Security testing

### 🎯 Objetivos de aprendizaje

* Testear la seguridad del propio pipeline.
* Verificar permisos, secretos y configuración segura.
* Aplicar DevSecOps al pipeline mismo.

### ❓ Problema real que resuelve

El pipeline es un objetivo: quien lo controle controla el despliegue. El testing de seguridad del pipeline verifica que la configuración es segura — permisos mínimos, secretos protegidos, acciones/plugins verificados, sin secretos en la definición — cerrando las puertas antes de que un atacante las abra.

### 💡 Analogía

El security testing del pipeline es la inspección de seguridad del banco antes de abrir: se revisan las puertas (permisos), la caja fuerte (secretos), los empleados (acciones/plugins) y los procedimientos (configuración). No se espera a que haya un robo para descubrir que la puerta trasera estaba abierta.

### 📖 Explicación técnica

* Qué testear en el pipeline:
  * **Permisos** (nivel 10): el pipeline usa permisos mínimos (GitHub: \`permissions: read-all\` por defecto; sin \`write-all\`), tokens con scope mínimo.
  * **Secretos** (nivel 11): no hay secretos en la definición ni en logs; los secrets se referencian por nombre; los archivos con secretos se escanean (gitleaks, trufflehog).
  * **Dependencias del pipeline**: actions/plugins verificados (pin por SHA — supply chain, nivel 10), sin versiones "latest" sin control.
  * **Configuración**: branches protegidos (nivel 1), entornos protegidos (nivel 12), approvals requeridos.
  * **Entrada**: no ejecutar código de PRs no confiables sin revisión (pull_request_target mal usado — vector clásico).
* Herramientas: gitleaks (secret scanning — nivel 10), actionlint con reglas de seguridad, scorecards (OpenSSF), dependabot para actions.
* Buenas prácticas: escaneo de secretos en CI (nivel 10), permisos por defecto restrictivos, revisión de cambios al pipeline con ojos de seguridad (nivel 1).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Definición del pipeline
   ↓
Análisis: permisos, secretos, actions, config
   ↓
gitleaks: ¿secretos en el repo/definición?
   ↓
scorecards/actionlint: ¿dependencias verificadas?
   ↓
¿Hallazgos? → bloquear   ¿Limpio? → pipeline seguro
\`\`\`

### 🧪 Ejercicios

1. Revisa los permisos de tus pipelines: ¿usa write-all o mínimos?
2. Configura gitleaks para escanear el repo y los cambios de configuración.
3. Audita tus actions/plugins: ¿están pinneados por SHA y verificados?

### ⚠️ Errores comunes

* Permisos write-all por defecto (el pipeline puede modificarse a sí mismo).
* Actions con "latest" o tags mutables (supply chain — nivel 10).
* pull_request_target sin controles (ejecuta código de PRs no confiables).
* Secretos detectados pero no rotados (un leak sigue siendo un leak).

### 🔗 Conexión DevOps

El security testing del pipeline es DevSecOps aplicado al CI/CD mismo: conecta seguridad (nivel 10), secrets (nivel 11), supply chain (nivel 10) y las buenas prácticas (nivel 23).
`
export default content
