const content = `
## Módulo 3 — Configuration testing

### 🎯 Objetivos de aprendizaje

* Testear la configuración del pipeline (variables, secrets, triggers).
* Verificar que la configuración produce el pipeline esperado.
* Detectar configuraciones incorrectas antes de ejecutar.

### ❓ Problema real que resuelve

El pipeline puede ser sintácticamente válido pero configurado mal: una variable que apunta al entorno equivocado, un trigger que nunca se dispara, un secret que no existe. El configuration testing verifica que la configuración — variables, condiciones, entornos — produce el pipeline que realmente quieres.

### 💡 Analogía

El configuration testing es la prueba del sistema de navegación del barco: el mapa (configuración) puede estar bien impreso (sintaxis válida) pero con el destino equivocado (variable mala) o el rumbo desactivado (trigger mal). Antes de zarpar, el capitán verifica que la configuración lleva a donde dice.

### 📖 Explicación técnica

* Qué testear:
  * **Variables**: existen, tienen el valor/entorno correcto, no son secretos en claro (nivel 11).
  * **Triggers** (nivel 2): el evento correcto dispara el pipeline correcto (¿push a main dispara el deploy? ¿el schedule corre?).
  * **Condiciones** (nivel 19): las condiciones evalúan lo esperado (¿el job de prod solo corre en main?).
  * **Entornos**: los entornos referenciados existen y están protegidos (nivel 12).
  * **Secrets**: los secretos referenciados existen en el entorno (un secret inexistente rompe en runtime).
* Técnicas: testear la definición renderizada (el YAML final con variables), scripts de verificación de configuración, tests de triggers (simular eventos), validación contra schemas propios.
* En el flujo: parte del testing de pipelines (nivel 20) — junto con la validación (módulo 1) y el linting (módulo 4).
* Buenas prácticas: centralizar la configuración (nivel 19 — templates), testear los valores por entorno, revisar diffs de configuración en PRs.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Configuración del pipeline
   ↓
Render (variables aplicadas)
   ↓
Tests: ¿variables existen? ¿triggers correctos? ¿secrets presentes?
   ↓
¿Fallo? → corregir antes de ejecutar
   ↓
¿OK? → el pipeline se comportará como se espera
\`\`\`

### 🧪 Ejercicios

1. Lista las variables/secrets que tu pipeline referencia y verifica que existen por entorno.
2. Simula tus triggers: ¿qué evento dispara qué pipeline?
3. Escribe un test que verifique la configuración renderizada de tu pipeline.

### ⚠️ Errores comunes

* Configuración "que funciona" pero con valores equivocados (el entorno de prod usa variables de dev).
* Secrets inexistentes: el pipeline falla a mitad (configuración no testeada).
* Triggers que nunca disparan (el pipeline existe pero no corre).
* Condiciones que nunca evalúan verdadero (jobs muertos silenciosos).

### 🔗 Conexión DevOps

El configuration testing conecta variables/secrets (nivel 11), triggers (nivel 2), entornos (nivel 12) y el testing de pipelines (nivel 20). Configuración no testeada es un incidente esperando.
`
export default content
