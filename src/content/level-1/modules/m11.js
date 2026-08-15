const content = `
## Módulo 11 — Feature branches

### 🎯 Objetivos de aprendizaje

* Definir el flujo de feature branches: crear, desarrollar, validar e integrar.
* Explicar cuándo usar feature branches y cuándo evitarlas.
* Conectar las feature branches con el pipeline de PR.

### ❓ Problema real que resuelve

Desarrollar directamente sobre main hace imposible aislar el trabajo: una feature a medias rompe main y bloquea a todos. Las feature branches aíslan cada pieza de trabajo, permiten desarrollarla y validarla (CI sobre la rama) sin afectar a nadie, y se integran solo cuando están completas y verificadas.

### 💡 Analogía

Una feature branch es como un andamio alrededor de un edificio: permite trabajar en una zona sin molestar a los que viven dentro, y se retira cuando el trabajo está terminado y verificado. Sin andamio, cualquier obra obligaría a desalojar todo el edificio (main).

### 📖 Explicación técnica

Flujo de feature branch:

1. Partir de \`main\` actualizado (\`git checkout -b feature/x\`).
2. Desarrollar con commits pequeños; mantener la rama al día con main (\`git merge main\` o rebase frecuente).
3. Pushear y abrir PR; el CI corre sobre la rama con cada push.
4. Revisión y correcciones (más pushes → más CI).
5. Merge a main (squash) y borrar la rama.

Reglas para que funcionen:

* **Vida corta**: días, no semanas. Una rama larga se convierte en una integración diferida.
* **Un propósito por rama**: una feature o un fix, no cinco cosas.
* **CI sobre la rama**: la validación ocurre antes del merge, no después.
* **Buen nombre**: \`feature/pago-tarjeta\`, \`fix/login-timeout\`, \`chore/actualizar-deps\`.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
main ──●──────────●──────────●
       \\          /          /
feature/x  ──●──●─┘   (2 días de vida)
             │  │
             │  └── CI en cada push (PR)
             └── Merge + borrado
\`\`\`

### 💻 Ejemplo básico

Ciclo completo de una feature branch:

\`\`\`bash
git checkout main && git pull
git checkout -b feature/checkout-fix
git commit -am "fix(checkout): total incorrecto con cupones"
git push -u origin feature/checkout-fix
# PR → CI (status checks) → aprobación → merge squash
git branch -d feature/checkout-fix
\`\`\`

### 🏢 Caso de uso profesional

Un equipo de 10 personas usa feature branches con vida máxima de 3 días. El CI corre en cada push: 6 minutos de lint, unit e integration. Si una rama pasa de 3 días, un bot la marca y el equipo la divide. El resultado: los PRs son pequeños, la revisión es real y main siempre está verde.

### ⚠️ Errores comunes

* Ramas eternas: la integración se aplaza y el conflicto crece.
* Una rama para todo: mezcla de features que no se pueden revisar ni revertir por separado.
* No actualizar la rama con main: conflictos evitables al final.
* Nombres poco descriptivos: imposible saber qué hay en cada rama.
* Borrar la rama antes de que el CI confirme el merge.

### 📋 Lo que debes recordar

* Feature branch = aislamiento + validación propia + integración controlada.
* Vida corta, un propósito, buen nombre.
* El CI sobre la rama valida antes del merge.
* Tras el merge: borrar la rama (su trabajo vive en main).

### 🧪 Autoevaluación rápida

1. ¿Cuál es el beneficio principal de las feature branches?
2. ¿Qué longitud de vida deberían tener y por qué?
3. ¿Qué sucede con el pipeline cuando se pushea a una feature branch con PR?

---

1. Aislar el trabajo en curso para desarrollarlo y validarlo sin afectar a main, integrándolo solo cuando está completo y verificado.
2. Días (idealmente menos de 3): una rama larga aplaza la integración, crece el riesgo de conflictos y el CI valida código que se aleja de main.
3. El pipeline de CI corre sobre el PR con cada push, mostrando status checks (build, tests, security) antes de que se permita el merge.
`
export default content
