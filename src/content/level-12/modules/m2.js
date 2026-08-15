const content = `
## Módulo 2 — Testing

### 🎯 Objetivos de aprendizaje

* Definir el entorno de testing y su diferencia con development.
* Ejecutar pruebas de integración, funcionales y E2E contra un entorno estable.
* Mantener el entorno de testing reproducible y aislado.

### ❓ Problema real que resuelve

Las pruebas unitarias corren sin entorno, pero las de integración y E2E necesitan una aplicación desplegada y dependencias reales (BD, colas, servicios). El entorno de testing es ese lugar estable donde las pruebas encuentran una app en ejecución. Sin él, las pruebas E2E se ejecutan contra el local de cada quien: resultados inconsistentes.

### 💡 Analogía

Testing es la pista de pruebas del fabricante: igual que la pista real, pero sin clientes. Ahí se prueban frenos a fondo, curvas y condiciones extremas. Si el coche pasa la pista, está listo para staging; si no, vuelve al taller (dev).

### 📖 Explicación técnica

* **Entorno de testing (QA)**: despliegue estable y controlado donde se ejecutan suites de pruebas contra la app real.
* Diferencia con dev: dev cambia con cada commit; testing se actualiza bajo control (por ejemplo, en cada merge o bajo demanda).
* Tipos de pruebas que corren aquí: integración, funcionales, E2E, smoke, regresión, rendimiento básico.
* Requisitos: datos de prueba versionados (seeds), bases de datos reproducibles, servicios mock realistas, red aislada.
* En CI/CD: un stage de tests E2E dispara el deploy al entorno de testing y ejecuta la suite; los resultados bloquean staging.
* Buenas prácticas: test data como código (fixtures), reset automático entre runs, parallelización, entorno limpio por pipeline.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Artifact validado en CI
   ↓
Deploy a TESTING
   ↓
Seed de datos de prueba
   ↓
Suite E2E + integración
   ↓
Resultados + reports
   ↓
¿Pass? → staging    ¿Fail? → bloqueo + alerta
\`\`\`

### 🧪 Ejercicios

1. Diseña un entorno de testing con base de datos reproducible (fixtures versionados).
2. Configura un stage que despliegue a testing y ejecute pruebas E2E automáticamente.
3. Crea un reporte de resultados (JUnit/HTML) que se publique como artifact.

### ⚠️ Errores comunes

* Ejecutar E2E contra dev (inestable) o contra producción (riesgo).
* Datos de prueba "a mano" que nadie sabe cómo se generaron.
* Entorno de testing sin reset: tests que dependen del estado de la run anterior.
* Mezclar el entorno de testing con staging (difieren en propósito y control).

### 🔗 Conexión DevOps

El entorno de testing es donde la calidad se convierte en dato: si las pruebas pasan aquí, la promoción a staging es automática. Esto conecta Testing Automation (nivel 7) con la cadena de entornos y calidad.
`
export default content
