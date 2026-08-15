export const stages = [
  { id: 1, title: 'Fundamentos de CI/CD', color: 'green' },
  { id: 2, title: 'Integración Continua', color: 'cyan' },
  { id: 3, title: 'Calidad y Seguridad', color: 'yellow' },
  { id: 4, title: 'Entrega y Despliegue', color: 'red' },
  { id: 5, title: 'Infraestructura y GitOps', color: 'blue' },
  { id: 6, title: 'Pipelines Avanzados', color: 'purple' },
  { id: 7, title: 'Proyecto Profesional', color: 'orange' },
]

export const levels = [
  // Etapa 1 — Fundamentos de CI/CD
  { id: 0, stage: 1, title: 'Fundamentos de CI/CD y DevOps', status: 'available', moduleCount: 15 },
  { id: 1, stage: 1, title: 'Git y flujo de trabajo', status: 'available', moduleCount: 15 },
  { id: 2, stage: 1, title: 'CI/CD Pipeline', status: 'available', moduleCount: 14 },
  { id: 3, stage: 1, title: 'YAML y configuración de pipelines', status: 'available', moduleCount: 12 },
  // Etapa 2 — Integración Continua
  { id: 4, stage: 2, title: 'Runners y Agents', status: 'available', moduleCount: 14 },
  { id: 5, stage: 2, title: 'Jobs y Stages', status: 'available', moduleCount: 14 },
  { id: 6, stage: 2, title: 'Build Automation', status: 'available', moduleCount: 14 },
  { id: 7, stage: 2, title: 'Testing Automation', status: 'available', moduleCount: 14 },
  { id: 8, stage: 2, title: 'Artifacts y Package Management', status: 'available', moduleCount: 13 },
  // Etapa 3 — Calidad y Seguridad
  { id: 9, stage: 3, title: 'Docker en CI/CD', status: 'available', moduleCount: 14 },
  { id: 10, stage: 3, title: 'Security en CI/CD', status: 'available', moduleCount: 15 },
  { id: 11, stage: 3, title: 'Variables, Secrets y Credentials', status: 'available', moduleCount: 14 },
  // Etapa 4 — Entrega y Despliegue
  { id: 12, stage: 4, title: 'Environments', status: 'available', moduleCount: 12 },
  { id: 13, stage: 4, title: 'Deployment Strategies', status: 'available', moduleCount: 12 },
  { id: 14, stage: 4, title: 'Kubernetes y CI/CD', status: 'available', moduleCount: 14 },
  // Etapa 5 — Infraestructura y GitOps
  { id: 15, stage: 5, title: 'Terraform y CI/CD', status: 'available', moduleCount: 13 },
  { id: 16, stage: 5, title: 'Ansible y CI/CD', status: 'available', moduleCount: 12 },
  { id: 17, stage: 5, title: 'GitOps', status: 'available', moduleCount: 13 },
  { id: 18, stage: 5, title: 'Observability y Feedback', status: 'available', moduleCount: 14 },
  // Etapa 6 — Pipelines Avanzados
  { id: 19, stage: 6, title: 'Advanced Pipelines', status: 'available', moduleCount: 16 },
  { id: 20, stage: 6, title: 'Testing de Pipelines', status: 'available', moduleCount: 12 },
  { id: 21, stage: 6, title: 'CI/CD Cloud', status: 'available', moduleCount: 12 },
  { id: 22, stage: 6, title: 'Troubleshooting profesional', status: 'available', moduleCount: 20 },
  // Etapa 7 — Proyecto Profesional
  { id: 23, stage: 7, title: 'Buenas prácticas y arquitectura', status: 'available', moduleCount: 20 },
  { id: 24, stage: 7, title: 'Proyecto profesional', status: 'available', moduleCount: 8 },
  { id: 25, stage: 7, title: 'Evaluación profesional', status: 'available', moduleCount: 5 },
]

export function getLevel(id) {
  return levels.find(l => l.id === Number(id))
}
