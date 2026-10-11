import IsoFigure from './IsoFigure'
import { stageFigures } from './stageFigures'

export default function StageFigure({ stageId, color, fig }) {
  const build = stageFigures[stageId]
  if (!build) return null
  return <IsoFigure build={build} color={color} fig={fig} />
}
