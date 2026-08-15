const content = `
## Módulo 5 — Plan artifacts

### 🎯 Objetivos de aprendizaje

* Generar y guardar planfiles como artifacts.
* Aplicar exactamente el plan aprobado.
* Auditar qué se aplicó y cuándo.

### ❓ Problema real que resuelve

Aprobar un plan en el PR y luego ejecutar un apply "recién calculado" rompe la promesa: lo que se aprueba no es lo que se aplica (el estado pudo cambiar). Guardar el plan como artifact (\`-out=planfile\`) y aplicarlo después garantiza que la infraestructura recibe exactamente el plan revisado — trazable y auditable.

### 💡 Analogía

El plan artifact es la receta firmada por el chef: el cocinero (revisor) prueba la receta y la firma (aprueba); después, el ayudante (pipeline) cocina exactamente con esa receta firmada, no con una reescrita al momento. Si algo sale mal, se sabe qué receta exacta se usó.

### 📖 Explicación técnica

* **Planfile**: salida binaria de \`terraform plan -out=planfile\` — contiene el plan exacto calculado.
* Flujo en CI/CD:
  1. CI ejecuta plan y genera el planfile.
  2. El planfile se guarda como **artifact** del pipeline (nivel 8).
  3. El plan se publica para revisión.
  4. Tras la aprobación, el job de apply descarga el planfile y ejecuta \`terraform apply planfile\`.
* Beneficios: lo aprobado = lo aplicado; auditoría (qué plan, de qué commit, aprobado por quién); reproducibilidad.
* Precauciones: el planfile expira en validez (si el estado cambia mucho, el apply puede fallar); el planfile puede contener datos sensibles (proteger como artifact).
* Buenas prácticas: nombrar el planfile con commit/env (\`plan-prod-abc123.tfplan\`), retener el artifact (nivel 8), loguear el hash del planfile.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
CI: terraform plan -out=plan-prod.tfplan
   ↓
Artifact guardado + plan publicado
   ↓
Revisión → aprobación del PR
   ↓
CD: descargar plan-prod.tfplan
   ↓
terraform apply plan-prod.tfplan (exacto)
\`\`\`

### 🧪 Ejercicios

1. Genera un planfile y publícalo como artifact de tu pipeline.
2. Aplica el planfile aprobado (no un plan recalculado).
3. Diseña el naming y retención de planfiles en tu organización.

### ⚠️ Errores comunes

* Aprobar un plan y aplicar otro recalculado (rompe la trazabilidad).
* Planfiles sin retención: no se puede auditar qué se aplicó hace 3 meses.
* Planfile con datos sensibles accesible a cualquiera.
* Aplicar planfiles viejos sobre estados muy cambiados (fallos de drift).

### 🔗 Conexión DevOps

Los plan artifacts unen Terraform con artifacts y package management (nivel 8) y approval gates (nivel 12): el plan se convierte en un entregable revisable y auditable como cualquier artifact del pipeline.
`
export default content
