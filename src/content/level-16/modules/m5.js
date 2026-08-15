const content = `
## Módulo 5 — Automated tests

### 🎯 Objetivos de aprendizaje

* Testear la configuración de los hosts automáticamente.
* Verificar el estado final con assertions.
* Integrar tests de configuración en el pipeline.

### ❓ Problema real que resuelve

El playbook "corrió sin errores" no significa que la configuración sea correcta: un servicio puede estar instalado pero no corriendo, un puerto abierto pero con la config equivocada. Los tests automatizados verifican el **estado resultante** de los hosts — como los tests de la app verifican su comportamiento.

### 💡 Analogía

Los tests de configuración son la prueba del agua del grifo tras la instalación del fontanero: el fontanero dice "instalado" (playbook OK), pero el cliente abre el grifo y comprueba que sale agua caliente y fría (tests). Instalado no es lo mismo que funcionando.

### 📖 Explicación técnica

* **Tests de configuración**: assertions sobre el estado de los hosts tras aplicar el playbook.
* Herramientas:
  * **Ansible assertions**: \`ansible.builtin.assert\` dentro del playbook (verificar hechos al final).
  * **Molecule**: framework de testing de roles — provisiona contenedores/VMs, aplica el rol, testea el estado, destruye.
  * **ServerSpec/Testinfra/Goss**: tests declarativos sobre el host (¿puerto 443 escuchando? ¿paquete instalado? ¿servicio enabled?).
* Qué testear: servicios activos (systemd), puertos abiertos, configs con valores correctos, usuarios/grupos, permisos de archivos, firewall rules.
* En CI: Molecule corre en el pipeline (contenedores Docker como hosts de prueba); los tests de integración corren en hosts de staging tras el run.
* Buenas prácticas: testear cada rol con Molecule, tests que reflejen requisitos reales, correr en CI por cada cambio del rol.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Rol / playbook
   ↓
Molecule: crear contenedor de prueba
   ↓
Aplicar rol (converge)
   ↓
Tests: Goss/Testinfra (servicio, puerto, config)
   ↓
¿Pass? → CI verde   ¿Fail? → CI rojo
   ↓
Destroy del contenedor
\`\`\`

### 🧪 Ejercicios

1. Configura Molecule para uno de tus roles (create → converge → verify → destroy).
2. Escribe tests con Goss o Testinfra: servicio activo, puerto escuchando, valor de config.
3. Integra los tests del rol en el pipeline CI.

### ⚠️ Errores comunes

* Playbook "verde" sin tests: nadie verifica el estado real.
* Tests triviales (el servicio "existe" pero no corre).
* Tests que solo corren en la máquina del desarrollador.
* Molecule sin destroy: contenedores de prueba acumulados.

### 🔗 Conexión DevOps

Los tests de configuración aplican el nivel 7 (Testing Automation) a la capa de Ansible: conectan roles (módulo 1), verificación (nivel 13) y quality gates. Configuración sin tests es una promesa sin comprobación.
`
export default content
