const content = `
## Módulo 12 — Supply chain security

### 🎯 Objetivos de aprendizaje

* Entender la cadena de suministro del software y sus eslabones.
* Proteger cada eslabón: dependencias, build, registry, firma.
* Aplicar SLSA y verificaciones de integridad.

### ❓ Problema real que resuelve

El software se construye con piezas de terceros (dependencias), herramientas y plataformas: un atacante puede comprometer cualquiera de esos eslabones — un paquete malicioso, un runner comprometido, un registry envenenado, un artefacto alterado. La seguridad de la cadena de suministro protege TODO el camino del código a producción, verificando cada eslabón.

### 💡 Analogía

La cadena de suministro del software es como la cadena de producción de un medicamento: la materia prima (dependencias), la fábrica (build), el transporte (registry) y la farmacia (despliegue). Un contaminante en cualquier punto envenena el medicamento final. La seguridad exige verificar cada eslabón: de dónde viene cada ingrediente, quién lo procesó y si llegó intacto.

### 📖 Explicación técnica

Eslabones y protecciones:

1. **Dependencias**: verificar origen (registries oficiales/proxy), hashes (go.sum), SCA, evitar typosquatting.
2. **Herramientas y plataforma**: runners seguros, acciones/pasos con versiones fijas (pin por SHA), revisión de acciones de terceros.
3. **Build**: reproducible, en entorno hermético; sin secretos en el proceso.
4. **Publicación**: firmar artefactos (cosign/GPG); SBOM.
5. **Consumo**: verificar firmas y digests antes de desplegar; políticas de admisión (image policies).

Estándares:

* **SLSA** (Supply chain Levels for Software Artifacts): marco de niveles de integridad (build reproducible, firmado, proveniencia).
* **SBOM**: inventario de componentes (CycloneDX, SPDX).
* **Proveniencia**: registro de cómo se construyó el artefacto (SLSA provenance).
* **Firma de verificación**: cosign con keyless (OIDC) para verificar artefactos.

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Dependencias verificadas (hashes, SCA)
  │
  ▼
Build reproducible + acciones con SHA fijo
  │
  ▼
Artefacto firmado (cosign) + SBOM + proveniencia
  │
  ▼
Registry (con políticas de admisión)
  │
  ▼
Despliegue: verificación de firma y digest
\`\`\`

### 💻 Ejemplo básico

Firmar y verificar con cosign (keyless):

\`\`\`bash
# Firmar la imagen (OIDC)
cosign sign registry/app:v1.4.0

# Verificar antes de desplegar
cosign verify --certificate-identity "https://github.com/org/.github/workflows/release.yml@refs/tags/v1.4.0" registry/app:v1.4.0
\`\`\`

### 🏢 Caso de uso profesional

Una empresa adopta SLSA nivel 2+: builds reproducibles, artefactos firmados con cosign keyless y proveniencia publicada. Cuando un incidente de seguridad global compromete un paquete popular, la empresa verifica que ninguna de sus imágenes usa la versión afectada (SBOM) y que todo lo desplegado está firmado y trazado — responden con datos, no con pánico.

### ⚠️ Errores comunes

* Confiar ciegamente en acciones/paquetes de terceros (sin pin por SHA ni revisión).
* Artefactos sin firmar.
* Sin SBOM (no sabes qué contiene tu software).
* Registries sin políticas de admisión (cualquiera publica).
* Desplegar sin verificar firma/digest.

### 📋 Lo que debes recordar

* La cadena tiene eslabones: deps, build, publicación, consumo.
* SLSA: niveles de integridad del artefacto.
* Firma + SBOM + proveniencia = verificación de cada eslabón.
* Pin por SHA las herramientas; verifica antes de consumir.

### 🧪 Autoevaluación rápida

1. ¿Qué eslabones forman la cadena de suministro del software?
2. ¿Qué es SLSA?
3. ¿Cómo se verifica un artefacto antes de desplegarlo?

---

1. Dependencias, herramientas/plataforma, build, publicación (registry) y consumo (despliegue).
2. Un marco de niveles de integridad para artefactos de software: builds reproducibles, firmados y con proveniencia.
3. Verificando la firma (cosign) y el digest, y contrastando el SBOM con la política de seguridad.
`
export default content
