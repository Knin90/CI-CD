const content = `
## Módulo 14 — Artifact signing

### 🎯 Objetivos de aprendizaje

* Explicar por qué se firman los artefactos.
* Firmar imágenes y paquetes en el pipeline (cosign, GPG).
* Verificar firmas antes de desplegar.

### ❓ Problema real que resuelve

Un registry comprometido o un atacante con acceso podría publicar un artefacto malicioso con el nombre de tu producto: sin firma, nadie puede distinguir lo auténtico. La firma ata el artefacto a su origen (el pipeline legítimo) mediante criptografía: los consumidores verifican la firma y rechazan lo no firmado. Es la garantía de autenticidad de la cadena de suministro.

### 💡 Analogía

La firma del artefacto es el sello notarial del documento: certifica quién lo emitió y que no fue alterado. Un documento con sello falso se detecta al verificar el sello (clave pública). Los artefactos firmados llevan ese sello criptográfico: cualquiera puede verificar que salieron del pipeline legítimo y que su contenido no cambió.

### 📖 Explicación técnica

* **Firma**: operación criptográfica con una clave privada que produce una firma verificable con la clave pública.
* **cosign** (sigstore): el estándar moderno para imágenes de contenedor. **Keyless**: firma con OIDC — sin gestionar claves privadas; la identidad del workflow queda en el certificado.
* **GPG/sign**: para paquetes (npm, deb, rpms) y commits.
* Flujo:
  1. El pipeline firma el artefacto (clave privada o keyless OIDC).
  2. La firma se publica junto al artefacto (registry, rekor).
  3. Los consumidores verifican con la clave pública o la política de identidad.
* Políticas: verificación obligatoria antes del deploy (admission policies en Kubernetes: verify-images).

### ⚙️ ¿Qué ocurre internamente?

\`\`\`text
Pipeline (release)
  │
  ▼
cosign sign registry/app:v1.4.0 (keyless: OIDC)
  │  ├── Certificado con identidad del workflow
  │  └── Firma publicada (rekor, registry)
  │
  ▼
Registry: imagen + firma
  │
  ▼
Kubernetes (policy verify-images):
  cosign verify → ¿identidad correcta? → admitir
  │
  └── No firmada / identidad incorrecta → RECHAZADA
\`\`\`

### 💻 Ejemplo básico

Firmar y verificar:

\`\`\`bash
# Firmar (keyless, en el pipeline)
cosign sign --yes registry/app:v1.4.0

# Verificar (en el despliegue o policy)
cosign verify --certificate-identity \\
  "https://github.com/org/app/.github/workflows/release.yml@refs/tags/v1.4.0" \\
  --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \\
  registry/app:v1.4.0
\`\`\`

### 🏢 Caso de uso profesional

Una empresa con compliance estricto firma todas sus imágenes con cosign keyless: el certificado identifica el workflow y el tag exacto. Kubernetes aplica una policy de verificación: solo se admiten imágenes firmadas por el pipeline legítimo. Un atacante que lograra publicar en el registry no podría desplegar: la imagen no pasaría la verificación.

### ⚠️ Errores comunes

* Firmar sin verificar en el consumo (firma decorativa).
* Claves privadas mal gestionadas (en el repo, sin rotación).
* Verificación sin identidad (cualquier firma vale).
* Firmar después de publicar (el artefacto ya circuló sin firma).
* No firmar paquetes ni commits (eslabones sin sello).

### 📋 Lo que debes recordar

* La firma ata el artefacto a su origen e integridad.
* cosign keyless (OIDC): firma sin gestionar claves.
* Verificar antes de desplegar (políticas de admisión).
* Sin firma verificable = no confiar.

### 🧪 Autoevaluación rápida

1. ¿Qué garantiza la firma de un artefacto?
2. ¿Qué es la firma keyless de cosign?
3. ¿Dónde se verifica la firma en el consumo?

---

1. Autenticidad (proviene del pipeline legítimo) e integridad (no fue alterado).
2. Firma con OIDC: el certificado contiene la identidad del workflow, sin necesidad de gestionar claves privadas.
3. En el despliegue: políticas de admisión (verify-images) o \`cosign verify\` antes de admitir la imagen en el clúster.
`
export default content
