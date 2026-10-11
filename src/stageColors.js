// Colores funcionales de las etapas (paleta terminal)
export const stageColor = {
  green: '#00DF82',
  cyan: '#2EC4A0',
  yellow: '#f0e68c',
  red: '#f85149',
  blue: '#58a6ff',
  purple: '#bc8cff',
  orange: '#f0883e',
}

export const colorOf = stage => stageColor[stage?.color] || '#2EC4A0'
