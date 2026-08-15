const content = `
## Módulo 1 — Git workflow: el ciclo del desarrollador

### 🎯 Objetivos de aprendizaje

* Recorrer el ciclo completo del desarrollador: de editar código a integrarlo en la rama principal.
* Identificar en qué puntos del ciclo dispara el pipeline de CI/CD.
* Entender por qué cada paso del flujo es un punto de control.

### ❓ Problema real que resuelve

Sin un flujo de trabajo definido, cada desarrollador integra como quiere: algunos commitean directo a main, otros fusionan ramas viejas sin actualizar, otros nunca hacen Pull Request. El resultado es un caos difícil de auditar y un pipeline que dispara en momentos impredecibles. El Git workflow estándar ordena el ciclo — editar, commitear, pushear, abrir PR, integrar — y cada paso se convierte en un punto donde CI/CD agrega valor.

### 💡 Analogía

Una cadena de producción con estaciones de control: cada estación (commit, push, PR, merge) inspecciona la pieza antes de dejarla pasar. Si una pieza falla la inspección, se detiene y se corrige ahí mismo, no al final de la línea. El Git workflow es la definición de esas estaciones y su orden.

### 📖 Explicación técnica

Ciclo estándar del desarrollador:

1. **Actualizar** la rama base (\`git pull\`/rebase) para partir de un estado reciente.
2. **Crear rama** (\`git checkout -b feature/x\`) con un nombre descriptivo.
3. **Editar y commitear** cambios pequeños y atómicos (un cambio lógico por commit).
4. **Pushear** la rama (\`git push -u origin feature/x\`).
5. **Abrir Pull Request** contra la rama base (main).
6. **CI valida** el PR (build, tests, security) y reporta el status.
7. **Revisión** humana (code review) + status en verde.
8. **Merge** a la rama base (protegida) y **borrar** la rama.
9. El merge dispara el **pipeline de despliegue** (CD).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Developer
  │
  ▼
git commit (cambios pequeños y atómicos)
  │
  ▼
git push (sube la rama)
  │
  ▼
Pull Request (propuesta de integración)
  │
  ▼
CI: status check en el PR (build, tests, security)
  │
  ├── Verde → revisión humana
  │            │
  │            ▼
  │          Merge a main (protegida)
  │            │
  │            ▼
  │          CD: despliegue automático
  └── Rojo → se corrige en la rama → nuevo push
\`\`\`

### 💻 Ejemplo básico

Secuencia de comandos del ciclo:

\`\`\`bash
git checkout main
git pull origin main
git checkout -b feature/checkout-fix
# ... editar código ...
git add .
git commit -m "fix(checkout): corrige cálculo del total"
git push -u origin feature/checkout-fix
# Abrir el PR en la plataforma → CI corre → revisar → merge
\`\`\`

### 🏢 Caso de uso profesional

En un equipo de 15 personas, todo cambio pasa por este ciclo. El pipeline de CI corre en cada push del PR y en cada merge a main; el merge a main dispara el despliegue a staging. La trazabilidad es completa: cada feature, cada fix y cada deploy están ligados a un PR con su revisión y sus checks en verde.

### ⚠️ Errores comunes

* Commitear directo a main: sin revisión ni pipeline de PR.
* Ramas largas sin actualizar: conflictos masivos al integrar.
* Commits gigantes: difíciles de revisar y de revertir.
* Ignorar el status check rojo y mergear igual.
* No borrar la rama tras el merge: proliferación de ramas muertas.

### 📋 Lo que debes recordar

* Ciclo: rama → commits pequeños → push → PR → CI → review → merge → CD.
* Cada push del PR y cada merge a main disparan validaciones.
* La rama principal debe estar protegida: solo entra por PR en verde.
* El flujo es el esqueleto sobre el que CI/CD agrega validación automática.

### 🧪 Autoevaluación rápida

1. ¿En qué dos momentos del ciclo se disparan típicamente el pipeline de CI?
2. ¿Por qué los commits deben ser pequeños y atómicos?
3. ¿Qué garantiza la protección de la rama principal?

---

1. En cada push a una rama con Pull Request (validación de la integración) y en cada merge a la rama principal (validación final + disparo de CD).
2. Porque facilitan la revisión, la integración y la reversión: un commit atómico puede revertirse sin arrastrar otros cambios.
3. Que el código solo entra a main a través de PRs revisados y con los checks en verde, manteniendo la rama principal siempre estable y desplegable.
`
export default content
