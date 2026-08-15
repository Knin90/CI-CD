const content = `
## Módulo 4 — Self-hosted runners

### 🎯 Objetivos de aprendizaje

* Explicar qué son los runners self-hosted y cuándo elegirlos.
* Instalar y registrar un runner en tu infraestructura.
* Conocer los costos de operación: mantenimiento, seguridad y escalado.

### ❓ Problema real que resuelve

Hay cargas que los hosted runners no cubren: acceso a redes privadas (bases de datos corporativas), hardware específico (GPUs), software propietario, o costos de facturación altos. Los runners self-hosted corren en **tu** infraestructura: control total del entorno, de los permisos y de la ubicación, con el costo de que **tú** los mantienes.

### 💡 Analogía

Self-hosted es tener tu propia cocina: puedes cocinar lo que quieras (software propietario), con tus ingredientes (red privada), sin pagar alquiler por uso. Pero debes mantenerla: limpiarla (parches), reparar la nevera (hardware) y contratar seguridad (aislamiento). Hosted es el restaurante por horas: sin mantenimiento, pero con sus reglas.

### 📖 Explicación técnica

Instalación (GitHub Actions):

\`\`\`bash
# Descargar el runner en la máquina
mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64.tar.gz -L \\
  https://github.com/actions/runner/releases/download/v2.319.1/actions-runner-linux-x64.tar.gz
tar xzf actions-runner-linux-x64.tar.gz

# Registrar contra el repositorio/org
./config.sh --url https://github.com/org/repo \\
  --token <REGISTRATION_TOKEN>

# Arrancar (como servicio para persistencia)
sudo ./svc.sh install
sudo ./svc.sh start
\`\`\`

Consideraciones críticas:

* **Seguridad**: los runners self-hosted ejecutan código de PRs de terceros — un PR malicioso puede ejecutar código en tu infraestructura. Mitigaciones: no usar self-hosted para PRs no confiables (solo \`pull_request_target\` de fuentes confiables o restringir a ramas conocidas), runners efímeros, aislamiento por VM/contenedor.
* **Mantenimiento**: parches de SO, actualización del runner, espacio en disco, limpieza de cachés.
* **Escalado**: capacidad manual o autoescalado (pools elásticos, K8s autoscaler).
* **Labels**: describir el runner (OS, arquitectura, capacidades) para dirigir jobs.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Máquina propia (VM/bare metal/K8s)
  │
  ├── actions-runner instalado
  ├── registrado contra el repo/org
  └── conectado por long-polling
  │
  ▼
Job asignado (por labels) → ejecución local
  │
  ▼
Acceso a red privada / hardware / software propietario
  │
  ▼
Reporte del resultado
\`\`\`

### 💻 Ejemplo básico

Job dirigido a un runner self-hosted:

\`\`\`yaml
jobs:
  deploy:
    runs-on: [self-hosted, linux, internal]
    steps:
      - run: ./deploy.sh --env production
\`\`\`

El job solo corre en runners con esos tres labels.

### 🏢 Caso de uso profesional

Un banco no puede enviar código a la nube pública (compliance): todos sus pipelines corren en runners self-hosted dentro de su red privada. Los runners viven en VMs efímeras que se crean por job (autoescalado), se registran, ejecutan y se destruyen — aislamiento total. Los deploys acceden a las bases de datos internas sin salir de la red.

### ⚠️ Errores comunes

* Ejecutar PRs de terceros en runners self-hosted (riesgo de RCE).
* Runners sin parchear ni actualizar: herramientas viejas y vulnerables.
* Sin autoescalado: colas cuando hay picos.
* Permisos excesivos en la máquina del runner (ver runner security).
* Mezclar runners de staging y producción sin aislamiento.

### 📋 Lo que debes recordar

* Self-hosted = control total, pero mantenimiento tuyo.
* Instalación: descargar, configurar con token, arrancar como servicio.
* Seguridad crítica: no ejecutar PRs no confiables en self-hosted.
* Labels dirigen los jobs; autoescalado para capacidad.

### 🧪 Autoevaluación rápida

1. ¿Cuándo conviene elegir runners self-hosted?
2. ¿Qué pasos requiere instalar un runner?
3. ¿Cuál es el mayor riesgo de seguridad de los self-hosted?

---

1. Cuando se necesita acceso a redes privadas, hardware específico, software propietario o se quiere control total y reducir costos de facturación.
2. Descargar el binario, ejecutar \`config.sh\` con URL y token de registro, e instalar/arrancar como servicio.
3. Que ejecutan código de PRs de terceros en tu infraestructura: un PR malicioso puede comprometer la máquina; hay que restringir fuentes y aislar.
`
export default content
