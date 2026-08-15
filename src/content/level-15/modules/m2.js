const content = `
## Módulo 2 — terraform fmt

### 🎯 Objetivos de aprendizaje

* Formatear código Terraform de forma consistente.
* Usar \`terraform fmt\` y \`-check\` en CI.
* Entender por qué el formato uniforme importa en equipos.

### ❓ Problema real que resuelve

Cada desarrollador formatea el HCL "a su manera": indentaciones distintas, alineación distinta, comillas distintas. Los diffs se llenan de ruido de formato que oculta los cambios reales y dificulta las revisiones. \`terraform fmt\` normaliza el formato — y en CI, \`-check\` rechaza el código mal formateado antes de que llegue a revisión.

### 💡 Analogía

\`terraform fmt\` es el estilo de redacción del periódico: todos los periodistas escriben con las mismas reglas (indentación, comillas, espacios) para que los lectores (revisores) se fijen en el contenido y no en el formato. El código mal formateado en un PR es como un artículo sin signos de puntuación: molesto de leer y lleno de falsos diffs.

### 📖 Explicación técnica

* **\`terraform fmt\`**: formatea archivos HCL (.tf) según el estilo oficial (indentación de 2 espacios, alineación de \`=\`, orden de bloques).
* **\`terraform fmt -check\`**: no modifica; devuelve exit code distinto de 0 si hay archivos mal formateados (ideal para CI).
* **\`terraform fmt -recursive\`**: formatea subdirectorios y módulos.
* En CI: el primer paso del pipeline de IaC — si \`fmt -check\` falla, el PR no avanza (o se auto-corrige con un bot que ejecuta fmt y commitea).
* Beneficios: diffs limpios (solo cambios reales), revisiones más rápidas, menos conflictos de merge, convención sin discusión.
* Buenas prácticas: correr fmt localmente antes de commitear, gate en CI, pre-commit hook (nivel 1 — Git hooks) para formatear automáticamente.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Código HCL
   ↓
terraform fmt -check (CI)
   ↓
¿Mal formateado? → CI falla / bot lo corrige
   ↓
¿OK? → terraform validate (módulo 3)
\`\`\`

### 🧪 Ejercicios

1. Ejecuta \`terraform fmt\` sobre un archivo mal formateado y observa los cambios.
2. Añade \`terraform fmt -check\` a tu CI como gate.
3. Configura un pre-commit hook que formatee automáticamente.

### ⚠️ Errores comunes

* Formatear a mano "cuando me acuerdo" (el estilo se degrada).
* \`fmt\` sin \`-check\` en CI: formatea en la máquina local y nadie se entera.
* Diffs llenos de cambios de formato que mezclan con cambios reales.
* Ignorar módulos externos en el formateo (\`-recursive\`).

### 🔗 Conexión DevOps

\`terraform fmt\` es la higiene básica del IaC: conecta con code review (nivel 1), Git hooks (nivel 1) y el pipeline de IaC (módulo 1). Un código bien formateado es la base para revisiones efectivas.
`
export default content
