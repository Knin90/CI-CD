const content = `
## Módulo 10 — Environment isolation

### 🎯 Objetivos de aprendizaje

* Aislar entornos (dev, staging, prod) de verdad.
* Separar recursos, credenciales y datos.
* Evitar que los entornos se pisen entre sí.

### ❓ Problema real que resuelve

Dev, staging y prod comparten la base de datos, la cola o el cloud: un test en dev borra datos de prod, un deploy a staging toca recursos de producción, y los bugs "aleatorios" son en realidad entornos que se pisan (nivel 17 de 22). El aislamiento de entornos (nivel 12 y 23) separa recursos, credenciales y datos para que cada entorno sea un mundo aparte.

### 💡 Analogía

El aislamiento de entornos son los pisos con llaves separadas del edificio: el piso de ensayo (staging) tiene su propia cocina, agua y electricidad (recursos), y no comparte cañerías con el piso de los clientes (prod). Si los pisos compartieran las cañerías, un problema en el ensayo inundaría el piso de abajo — y el arreglo "en el piso de ensayo" afectaría a los clientes.

### 📖 Explicación técnica

* **Aislamiento por capas**:
  * **Recursos**: bases de datos, colas, caches, cloud accounts/proyectos separados por entorno (nivel 12 y 15).
  * **Credenciales**: secrets y permisos por entorno (nivel 11-12) — prod solo se accede desde el pipeline de prod (nivel 16 de 22).
  * **Datos**: datos sintéticos en dev/staging, sin tocar datos reales (nivel 12 y 17 de 22).
  * **Red**: segmentación (VPC/namespace por entorno — nivel 14-15), sin rutas cruzadas innecesarias.
* Niveles de aislamiento: desde namespaces en el mismo cluster (nivel 14) hasta cloud accounts separadas (nivel 15) — el nivel depende del riesgo del entorno.
* Beneficios: probar sin miedo (nivel 20), diagnosticar sin tocar prod (nivel 17 de 22), y gates confiables (módulo 15 de este nivel: un rojo en staging significa staging, no prod).
* Buenas prácticas: entorno efímero por PR cuando sea viable (nivel 20), promoción de artefactos entre entornos aislados (módulo 9), y verificación cruzada de que ningún entorno referencia recursos de otro.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Cada entorno = recursos, credenciales y datos propios
   ↓
Dev: BD sintética, cloud dev, secrets dev
   ↓
Staging: BD staging, cloud staging, secrets staging
   ↓
Prod: BD prod, cloud prod, secrets prod
   ↓
Sin rutas cruzadas (red, credenciales)
   ↓
Un fallo en staging NO toca prod
\`\`\`

### 🧪 Ejercicios

1. Audita tus entornos: ¿comparten alguna base de datos o cuenta cloud?
2. Separa las credenciales de prod del acceso de dev/staging.
3. Documenta el mapa de aislamiento de tus entornos (recursos, datos, red).

### ⚠️ Errores comunes

* Compartir la base de datos entre entornos (el clásico — nivel 17 de 22).
* Credenciales de prod accesibles desde dev (nivel 11-12).
* "Es solo staging, no importa" (staging roto = gates rotos — módulo 15).
* Aislamiento de recursos pero no de datos (los datos se cruzan igual).

### 🔗 Conexión DevOps

El aislamiento conecta con environments (nivel 12), secrets y permisos (nivel 11), Kubernetes (nivel 14), Terraform (nivel 15), environment problems (nivel 22) y quality gates (módulo 15). Es la arquitectura que hace que los entornos digan la verdad sobre el código.
`
export default content
