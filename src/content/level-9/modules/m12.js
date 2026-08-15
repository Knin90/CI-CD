const content = `
## Módulo 12 — Container testing

### 🎯 Objetivos de aprendizaje

* Probar el contenedor, no solo el código.
* Ejecutar tests dentro del contenedor (smoke, funcionales).
* Validar salud, config y comportamiento en el runtime real.

### ❓ Problema real que resuelve

El código puede pasar todos los tests y el contenedor estar roto: el binario no arranca con la configuración del contenedor, falta un archivo, los permisos fallan, la imagen no tiene lo que la app necesita. Probar el CONTENEDOR (el artefacto real) valida el runtime: arranca, responde, se comporta como en producción.

### 💡 Analogía

Los tests del código prueban el motor; el container testing prueba el coche ensamblado: arranca al girar la llave (docker run), las luces encienden (health), y conduce (responde a peticiones). Un motor perfecto puede estar en un coche que no arranca por la batería (configuración del contenedor).

### 📖 Explicación técnica

Qué se prueba del contenedor:

* **Arranque**: \`docker run\` inicia sin errores y el proceso principal queda vivo.
* **Salud**: el HEALTHCHECK responde (endpoint /health).
* **Funcionalidad**: smoke del endpoint real dentro del contenedor (curl a localhost:puerto).
* **Configuración**: variables de entorno, secretos, archivos de config montados.
* **Permisos**: el usuario no-root puede ejecutar la app y escribir lo necesario.
* **Comportamiento**: logs de arranque correctos, puertos expuestos.

En el pipeline:

* Job de \`container-test\` tras el build: levanta el contenedor, espera el health, ejecuta smoke tests.
* Tests dentro del contenedor: \`docker run --entrypoint npm test\` (usar la imagen como entorno de test).
* Análisis de la imagen: \`docker inspect\`, tamaños, capas, config (distroless, root?).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
docker build → app:build
  │
  ▼
docker run -d -p 8080:8080 app:build
  │
  ▼
Esperar health (curl retry):
  ├── GET /health → 200 → OK
  └── timeout → FALLO (el contenedor no arranca bien)
  │
  ▼
Smoke funcional: GET /api/v1/products → 200 + datos
  │
  ▼
docker stop / rm → reporte → ¿publicar?
\`\`\`

### 💻 Ejemplo básico

Smoke del contenedor en CI:

\`\`\`bash
docker run -d --name app -p 8080:8080 -e NODE_ENV=test app:build
for i in \$(seq 1 30); do
  curl -fsS http://localhost:8080/health && break
  sleep 1
done
curl -fsS http://localhost:8080/api/v1/products | grep -q '"data"'
docker stop app
echo "CONTAINER OK"
\`\`\`

### 🏢 Caso de uso profesional

Un equipo detecta en producción una app que arrancaba pero fallaba al conectar a la DB porque el contenedor no incluía las variables de entorno del entorno. Agregan container testing al pipeline: el contenedor se levanta con la config real de staging y el smoke verifica la conexión. El mismo bug ya no puede pasar: el artefacto se valida en su runtime real.

### ⚠️ Errores comunes

* Probar solo el código, nunca el contenedor.
* Smoke que no espera el arranque (timeout falso).
* Contenedores que dependen de servicios no levantados en el test.
* No verificar permisos/root (funciona como root en CI, falla como no-root en prod).
* Tests dentro del contenedor que asumen herramientas que la imagen final no tiene (multi-stage).

### 📋 Lo que debes recordar

* Probar el artefacto (contenedor), no solo el código.
* Arranque + salud + smoke funcional con la config real.
* Verificar permisos y runtime (no-root).
* El container testing es el puente entre build y deploy.

### 🧪 Autoevaluación rápida

1. ¿Qué valida el container testing que el unit testing no?
2. ¿Cómo se verifica la salud del contenedor?
3. ¿Qué riesgo hay si el smoke no espera el arranque?

---

1. El runtime real: que la imagen arranca, responde, tiene la configuración correcta y funciona con los permisos del contenedor.
2. Esperando que el HEALTHCHECK o el endpoint /health respondan 200 (con retry y timeout).
3. Falsos negativos: el test falla aunque el contenedor solo tarde en arrancar (o pasa sin verificar nada real).
`
export default content
