const content = `
## Módulo 10 — Deployment frequency

### 🎯 Objetivos de aprendizaje

* Definir deployment frequency y por qué importa.
* Medir cuántas veces se despliega a producción.
* Aumentar la frecuencia con seguridad (pequeños cambios).

### ❓ Problema real que resuelve

Desplegar poco (una vez al mes) convierte cada release en un evento gigante: muchos cambios juntos, mucho que revisar, mucho que puede fallar. La deployment frequency mide cuánto se despliega — y desplegar seguido con cambios pequeños es la señal de un proceso sano: menos riesgo por release, rollbacks más fáciles, feedback más rápido.

### 💡 Analogía

La deployment frequency es la frecuencia de reparto del camión de reparto: repartir una vez al mes significa cajas gigantes que pueden caerse al moverlas (releases grandes que rompen); repartir a diario significa cajas pequeñas, manejables y que llegan a tiempo. La frecuencia no es el objetivo en sí — es la señal de que el proceso es ágil y seguro.

### 📖 Explicación técnica

* **Deployment frequency** (DORA — módulo 9): número de despliegues a producción por unidad de tiempo.
* Niveles DORA: Elite (múltiples deploys al día / on-demand), High (semanal a mensual), Medium (mensual a cada 6 meses), Low (cada 6 meses a 1 año).
* Cómo medir: eventos de deploy en la plataforma CI/CD, marcados por commit/versión.
* Cómo aumentarla con seguridad:
  * **Trunk-based development** (nivel 1): cambios pequeños y frecuentes a main.
  * **Feature flags** (nivel 13): desplegar código inactivo y liberar después.
  * **Despliegues automatizados y verificados** (niveles 13/18): deploy rápido + confirmación de salud.
  * **Rollbacks fáciles** (nivel 13): desplegar seguido da miedo si no se puede volver atrás.
* Relación con CFR (módulo 12): aumentar frecuencia sin reducir fallos es acelerar el desastre; la frecuencia sana crece junto con la estabilidad.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Cambios pequeños y frecuentes (trunk-based)
   ↓
Pipeline rápido y verificado
   ↓
Deploys frecuentes (diarios o más)
   ↓
Cada deploy: pequeño diff, rollback fácil
   ↓
Feedback rápido (módulo 14)
\`\`\`

### 🧪 Ejercicios

1. Calcula tu deployment frequency del último trimestre.
2. Identifica qué impide desplegar más seguido (proceso, miedo, técnica).
3. Propón un plan para aumentar la frecuencia sin subir el CFR.

### ⚠️ Errores comunes

* Perseguir frecuencia sin estabilidad (el CFR sube y el caos crece).
* Releases "empaquetados" (10 cambios de golpe) que mantienen la frecuencia baja.
* Medir deploys "a mano" (el dato real está en la plataforma).
* Confundir frecuencia con "desplegar sin verificar" (verificación — módulo 1).

### 🔗 Conexión DevOps

La deployment frequency es la primera de las DORA metrics: conecta trunk-based (nivel 1), despliegues (nivel 13), verificación (módulo 1) y el feedback loop (módulo 14).
`
export default content
