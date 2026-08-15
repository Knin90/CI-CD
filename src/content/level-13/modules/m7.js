const content = `
## Módulo 7 — Feature flags

### 🎯 Objetivos de aprendizaje

* Definir feature flags y separar deploy de release.
* Usar flags para activar funciones sin desplegar.
* Gestionar el ciclo de vida de una flag (crear, activar, limpiar).

### ❓ Problema real que resuelve

El código llega a producción, pero la función no debe activarse todavía — o debe activarse solo para algunos usuarios. Los feature flags separan el despliegue (código en producción) de la liberación (función visible): una función desplegada pero apagada se enciende con un flag, sin tocar el pipeline. También permiten apagar funciones rotas al instante.

### 💡 Analogía

El feature flag es el interruptor de la luz de la nueva habitación: el cableado (código) está instalado, pero la luz no se enciende hasta que alguien acciona el interruptor. Y si la luz empieza a parpadear (fallo), se apaga con el mismo interruptor, sin volver a cablear.

### 📖 Explicación técnica

* **Feature flag**: condición en runtime que activa/desactiva una funcionalidad sin redeploy.
* Flujo típico: desarrollar detrás de la flag → desplegar el código con la flag OFF → activar para pruebas internas → rollout gradual → 100% → limpiar la flag.
* Tipos: booleanas (on/off), por porcentaje, por segmento (usuario, país), kill switches (apagar funciones que fallan).
* Implementaciones: flags propias (variables de entorno + lógica), librerías (LaunchDarkly, Unleash, Flagsmith) con SDK y consola de gestión.
* **Riesgo**: flags muertas (código muerto en producción), flags que nadie limpia, flags sin dueño.
* Buenas prácticas: flags con nombre claro y dueño, plan de limpieza, métricas del uso de cada flag, mínimo número de flags (cada una es superficie de estado).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Código con flag NEW_CHECKOUT (OFF)
   ↓
Deploy a producción (código presente, función oculta)
   ↓
Activación de flag → función visible
   ↓
Rollout gradual (10% → 100%)
   ↓
Fallo → kill switch: flag OFF al instante
   ↓
Estable → limpiar flag (eliminar código condicional)
\`\`\`

### 🧪 Ejercicios

1. Envuelve una función nueva en un feature flag y despliega con la flag apagada.
2. Actívala solo para un segmento (tu usuario) y verifica el comportamiento.
3. Planifica la limpieza de la flag: ¿cuándo y quién elimina el código condicional?

### ⚠️ Errores comunes

* Flags que viven para siempre (código muerto y decisiones ocultas).
* Flags sin dueño: nadie sabe quién la creó ni para qué.
* Flag para cada cosa: complejidad de estado descontrolada.
* Confiar en flags para "lo que debería resolverse con testing".

### 🔗 Conexión DevOps

Los feature flags son la pieza que une deploy con release: permiten canary (módulo 5), A/B (módulo 6) y progressive delivery (módulo 8) sin tocar el pipeline. Son herramientas de producto y de operaciones a la vez.
`
export default content
