const content = `
## Módulo 14 — Secret exposure

### 🎯 Objetivos de aprendizaje

* Identificar las vías de exposición de secretos en CI/CD.
* Detectar fugas y responder correctamente.
* Prevenir con políticas y herramientas.

### ❓ Problema real que resuelve

Los secretos se exponen por vías predecibles: repos (historial), logs, artefactos, imágenes, variables visibles, terceros. Reconocer esas vías permite prevenirlas y, cuando ocurren, responder rápido. Un secreto expuesto sin detección es una cuenta comprometida que nadie sabe que perdió.

### 💡 Analogía

La exposición de secretos es como el agua en un barco: se filtra por varios agujeros (repo, logs, artefactos, imágenes) y no todos son visibles. El barco profesional tiene detectores (escaneos) y parches (políticas): encuentra cada fuga temprano y la sella antes de que se hunda (incidente). El barco sin detectores se hunde sin saber por dónde entró el agua.

### 📖 Explicación técnica

Vías de exposición:

1. **Repositorio**: commitear \`.env\`, tokens en código, configs. → Secret scanning + pre-commit + política.
2. **Logs**: scripts que imprimen variables. → Masking + no imprimir variables.
3. **Artefactos**: configs con secretos empaquetadas. → Escaneo de artefactos + no incluirlos.
4. **Imágenes**: secretos en capas (ARG/ENV con credenciales). → Escaneo de imágenes + build args seguros.
5. **Variables visibles**: secretos como variables normales (UI, logs). → Solo secret store.
6. **Terceros**: proveedores con acceso, dependencias maliciosas. → SCA, auditoría de terceros.
7. **Cache**: secretos en cachés compartidas. → Nunca cachear credenciales.

Respuesta (runbook):

1. **Detectar** (scanning automático + alertas).
2. **Rotar** el secreto YA (revocar, regenerar).
3. **Contener**: purgar historial, revocar accesos, revisar logs de uso.
4. **Auditar** el alcance (qué pudo leerse con el secreto).
5. **Prevenir**: política + herramienta que cierre la vía.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Fuga detectada (secret scanning / alerta)
  │
  ▼
1. Rotar: revocar el token/proveedor YA
  │
  ▼
2. Contener: purgar del historial, revocar accesos
  │
  ▼
3. Auditar: ¿qué se pudo leer con el secreto?
  │
  ▼
4. Prevenir: política (solo secret store) + escaneos
  │
  ▼
5. Verificar: el mismo patrón no vuelve a pasar
\`\`\`

### 💻 Ejemplo básico

Checklist de exposición:

\`\`\`text
☐ ¿Hay secretos en el repo o historial? → gitleaks + purga
☐ ¿Se imprimen variables en logs? → masking + política
☐ ¿Los artefactos llevan configs con secretos? → escaneo
☐ ¿Las imágenes tienen secretos en capas? → escaneo
☐ ¿Los secretos viven en el secret store? → política
☐ ¿La rotación funciona? → prueba periódica
\`\`\`

### 🏢 Caso de uso profesional

Un equipo detecta un token de API de terceros en un log de hace 2 semanas (un script de debug lo imprimió). Aunque el masking falló (el valor se transformó), el escaneo de logs lo detectó. Rotan el token en el proveedor, auditan el uso (la API confirma 3 llamadas no autorizadas, todas rechazadas por permisos) y la política cambia: nunca imprimir variables completas. El incidente quedó contenido y documentado.

### ⚠️ Errores comunes

* "Es un repo privado, no importa" — los repos se comparten y se clonan.
* Rotar tarde (el atacante ya usó el secreto).
* Solo borrar el commit sin purgar el historial.
* No auditar el alcance (¿qué expuso el secreto?).
* Confiar en el masking para todo.

### 📋 Lo que debes recordar

* Vías: repo, logs, artefactos, imágenes, variables, terceros, caché.
* Detección automática (scanning) + respuesta por runbook.
* Rotar SIEMPRE ante cualquier sospecha.
* Cerrar la vía con política y herramientas.

### 🧪 Autoevaluación rápida

1. ¿Qué vías de exposición de secretos existen en CI/CD?
2. ¿Cuál es el primer paso ante una fuga?
3. ¿Qué cubre el masking y qué no?

---

1. Repositorio (historial), logs, artefactos, imágenes, variables visibles, terceros y cachés compartidas.
2. Rotar el secreto inmediatamente (revocar y regenerar) — la contención empieza por invalidar la credencial.
3. El masking cubre valores exactos en los logs; no cubre valores transformados, archivos, artefactos ni las demás vías.
`
export default content
