const content = `
## Módulo 5 — Dynamic pipelines

### 🎯 Objetivos de aprendizaje

* Definir pipelines dinámicos generados en runtime.
* Generar jobs según cambios, configuraciones o inputs.
* Equilibrar dinamismo y mantenibilidad.

### ❓ Problema real que resuelve

A veces el pipeline no se conoce de antemano: los jobs dependen de qué cambió (solo 3 de 10 microservicios), de una configuración, o de un input del usuario. Los pipelines dinámicos se generan en runtime — el pipeline se "calcula" al ejecutarse en lugar de estar escrito estáticamente.

### 💡 Analogía

El pipeline dinámico es el menú del día del restaurante según el mercado: el cocinero no imprime un menú fijo; al abrir, mira qué pescado llegó (cambios) y escribe el menú de hoy (jobs generados). El menú se adapta a la realidad del día en lugar de ser siempre el mismo.

### 📖 Explicación técnica

* **Pipeline dinámico**: la definición del pipeline se genera durante la ejecución, en lugar de estar fijada en el YAML/Jenkinsfile estático.
* Técnicas:
  * **Script que genera YAML**: un step inicial analiza los cambios y genera la configuración de jobs (GitHub/Azure permiten YAML generado; Jenkinsfile es Groovy — código dinámico nativo).
  * **Jenkins declarativo con programación Groovy**: el Jenkinsfile calcula stages según condiciones.
  * **Archivos de configuración**: un config en el repo define qué componentes construir; el pipeline lo lee y genera los jobs (ideal para monorepos — módulo 15).
* Beneficios: solo se ejecuta lo necesario (tiempo/coste), adaptabilidad a configuraciones cambiantes, pipelines "inteligentes".
* Riesgos: debugging más difícil (el pipeline no es estático — nivel 22), errores en runtime (la generación falla), menos visibilidad (los tools muestran el pipeline ya generado), complejidad de mantenimiento.
* Buenas prácticas: la lógica de generación debe estar bien testeada (nivel 20), output claro (qué jobs se generaron y por qué), fallar con mensajes útiles, no abusar (el pipeline estático es más simple cuando basta).

### ⚙️ ¿Qué ocurre internualmente?

\`\`\`text
Trigger
   ↓
Step de generación: analiza cambios/config
   ↓
Genera la definición de jobs (dinámica)
   ↓
Plataforma ejecuta los jobs generados
   ↓
Resultado: solo lo relevante, adaptado al contexto
\`\`\`

### 🧪 Ejercicios

1. Identifica en tu proyecto qué parte del pipeline varía según el contexto.
2. Genera dinámicamente jobs a partir de un archivo de configuración de componentes.
3. Compara: ¿el pipeline dinámico aporta más de lo que complica en tu caso?

### ⚠️ Errores comunes

* Dinamismo por dinamismo (el pipeline estático habría bastado y es más simple).
* Generación sin tests (los errores aparecen en producción del pipeline).
* Debugging imposible (sin logs de la generación).
* Cambios de comportamiento no documentados (nadie sabe por qué corren ciertos jobs).

### 🔗 Conexión DevOps

Los pipelines dinámicos conectan la generación de jobs con la ejecución condicional (módulo 8) y el testing de pipelines (nivel 20). Son la herramienta adecuada para monorepos y configuraciones complejas.
`
export default content
