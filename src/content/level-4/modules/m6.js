const content = `
## Módulo 6 — Runner registration

### 🎯 Objetivos de aprendizaje

* Explicar el proceso de registro de un runner contra la plataforma.
* Usar tokens de registro y entender su caducidad.
* Gestionar la lista de runners registrados.

### ❓ Problema real que resuelve

Un runner debe identificarse y autenticarse ante la plataforma para recibir jobs: eso es el **registro**. Un registro mal hecho (token vencido, URL equivocada) deja runners huérfanos que nunca reciben trabajo, o peor, runner duplicados. Entender el registro permite instalar, reemplazar y auditar runners con confianza.

### 💡 Analogía

El registro es el alta de un empleado en la empresa: recibe su credencial (token), se le asigna al departamento (repo/org/pool) y aparece en el directorio (lista de runners). Si la credencial caduca o el alta se hace dos veces, el empleado aparece duplicado o no puede entrar a trabajar.

### 📖 Explicación técnica

Proceso de registro:

1. **Obtener token de registro**: en la UI de la plataforma (Settings → Actions → Runners) o por API; caduca en ~1 hora.
2. **Ejecutar \`config.sh\`** con: URL de la organización/repo, token y opciones (name, labels, work folder, replace).
3. El runner genera su **certificado/credencial de autenticación** (persistente) en \`.credentials\` y \`.credentials_rsaparams\`.
4. El runner aparece en la lista de la plataforma (online).
5. **Autenticación posterior**: ya no usa el token de registro; usa la credencial persistente para conectarse.
6. **Desregistro**: \`./config.sh remove --token <TOKEN>\` o eliminarlo desde la UI.

Detalles:

* \`--replace\`: reemplaza un runner con el mismo nombre.
* \`--labels\`: etiquetas iniciales (se pueden cambiar después).
* \`--unattended\`: registro sin prompts (para automatización/autoescalado).
* Los runners registrados se listan en la plataforma con estado online/offline, labels y versión.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Obtener token de registro (caduca ~1h)
  │
  ▼
./config.sh --url <URL> --token <TOKEN>
  │
  ├── Valida el token contra la plataforma
  ├── Genera credencial persistente (.credentials)
  └── Se registra en la lista de runners
  │
  ▼
Runner online → recibe jobs (long-polling)
  │
  ▼
Auditoría: lista de runners, labels, estado
\`\`\`

### 💻 Ejemplo básico

Registro automático (unattended):

\`\`\`bash
./config.sh --url https://github.com/org \
  --token <REG_TOKEN> \
  --name runner-prod-01 \
  --labels self-hosted,linux,internal \
  --unattended --replace
\`\`\`

### 🏢 Caso de uso profesional

Un equipo de plataforma automatiza el registro de runners efímeros: cada VM que arranca ejecuta \`config.sh --unattended --labels\` con un token obtenido por API, se registra, ejecuta un job y se destruye. La lista de runners nunca crece sin control, porque cada runner efímero se desregistra al terminar.

### ⚠️ Errores comunes

* Token vencido al registrar (caduca en ~1 hora).
* Registros duplicados con el mismo nombre (usar \`--replace\`).
* Runners offline por credenciales corruptas o red.
* No usar \`--unattended\` en scripts: prompts que cuelgan la automatización.
* Olvidar desregistrar runners temporales: la lista se llena de muertos.

### 📋 Lo que debes recordar

* Registro = alta + credencial persistente.
* Token de registro caduca (~1h); la credencial generada es la que persiste.
* \`--unattended\` y \`--replace\` para automatización.
* Audita la lista de runners: online/offline, labels, versiones.

### 🧪 Autoevaluación rápida

1. ¿Qué pasos requiere registrar un runner?
2. ¿Qué diferencia hay entre el token de registro y la credencial generada?
3. ¿Para qué sirve \`--replace\`?

---

1. Obtener un token de registro (UI/API), ejecutar \`config.sh\` con URL, token y opciones, y verificar que el runner aparece online.
2. El token de registro solo sirve para el alta y caduca en ~1 hora; la credencial generada (en \`.credentials\`) autentica al runner en adelante.
3. Para reemplazar un runner existente con el mismo nombre, evitando registros duplicados.
`
export default content
