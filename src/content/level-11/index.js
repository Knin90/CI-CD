export const meta = {
  id: 11,
  title: 'Variables, Secrets y Credentials',
  stage: 3,
  description: 'Nivel obligatorio: variables de entorno, secretos, secret stores, masking, rotación, OIDC y el principio de nunca commitear credenciales.',
  prerequisite: 'Nivel 10 — Security en CI/CD',
  next: 'Nivel 12 — Environments',
}

export const modules = [
  { id: 1, title: 'Environment variables' },
  { id: 2, title: 'Pipeline variables' },
  { id: 3, title: 'Secrets' },
  { id: 4, title: 'Credentials' },
  { id: 5, title: 'Secret stores' },
  { id: 6, title: 'Secret masking' },
  { id: 7, title: 'Secret rotation' },
  { id: 8, title: 'Short-lived credentials' },
  { id: 9, title: 'OIDC' },
  { id: 10, title: 'Cloud credentials' },
  { id: 11, title: 'SSH keys' },
  { id: 12, title: 'Registry credentials' },
  { id: 13, title: 'Vault integration' },
  { id: 14, title: 'Secret exposure' },
]
