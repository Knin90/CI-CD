const content = `
## Módulo 4 — Declarative infrastructure

### 🎯 Objetivos de aprendizaje

* Definir infraestructura declarativa y su diferencia con la imperativa.
* Describir qué se quiere, no cómo lograrlo.
* Aplicar el modelo declarativo a Kubernetes y Terraform.

### ❓ Problema real que resuelve

La configuración imperativa (comandos que "hacen cosas": \`kubectl create\`, \`kubectl scale\`) funciona, pero no documenta el resultado: nadie sabe qué se ejecutó y en qué orden. La infraestructura declarativa describe **el resultado deseado** y la herramienta decide cómo lograrlo — reproducible, versionable y auto-mantenible.

### 💡 Analogía

Declarativo vs imperativo es pedir comida en un restaurante vs dar instrucciones al cocinero: "quiero una pizza margarita" (declarativo) vs "coge harina, añade agua, amasa 10 minutos, ..." (imperativo). Con la primera, el cocinero (sistema) decide el cómo y garantiza el resultado; con la segunda, cada variación del proceso puede romper el plato.

### 📖 Explicación técnica

* **Declarativo**: especificas el estado final (\`replicas: 3\`, imagen X); la herramienta calcula y ejecuta los pasos.
* **Imperativo**: especificas los pasos (\`kubectl scale deploy app --replicas=3\`, \`kubectl create ...\`).
* En Kubernetes: los manifests son declarativos — el controlador reconcilia hacia el estado descrito.
* En Terraform: \`main.tf\` declara recursos; \`plan/apply\` calcula el cómo.
* Ventajas del declarativo: idempotencia (aplicar N veces = mismo resultado), reversibilidad (el diff muestra los cambios), auto-reparación (el sistema corrige desviaciones), revisión (PRs sobre el "qué").
* Buenas prácticas: describir el estado completo, evitar comandos imperativos (el cluster se vuelve inmanejable), usar herramientas declarativas (kubectl apply, helm, terraform, kustomize).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Manifest declarativo (estado deseado)
   ↓
kubectl apply / controller
   ↓
Sistema calcula: ¿qué falta / sobra / cambia?
   ↓
Crea / modifica / elimina (solo lo necesario)
   ↓
Estado actual = estado deseado
\`\`\`

### 🧪 Ejercicios

1. Escribe el mismo resultado de forma imperativa y declarativa: compara.
2. Aplica un manifest declarativo y luego cambia solo un campo: observa el diff.
3. Identifica comandos imperativos en tu historial (\`kubectl scale\`, \`kubectl set\`) que deberían ser declarativos.

### ⚠️ Errores comunes

* Mezclar declarativo e imperativo (el estado se vuelve confuso).
* "Declarar" con comandos sueltos sin versionar (no es infraestructura como código).
* Manifests que no reflejan la realidad (drift por cambios manuales).
* Confundir declarativo con "no hacer nada": el sistema actúa solo hacia el deseado.

### 🔗 Conexión DevOps

La infraestructura declarativa es la base de GitOps y de IaC: conecta manifests (nivel 14), Terraform (nivel 15) y el estado deseado (módulo 2). Todo el modelo pull (módulo 6) depende de que el estado sea declarativo.
`
export default content
