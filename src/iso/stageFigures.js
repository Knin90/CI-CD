import pipelineLine from './figures/pipelineLine'
import runnerPlotter from './figures/runnerPlotter'
import qualityLock from './figures/qualityLock'
import canarySplit from './figures/canarySplit'
import gitopsDrawers from './figures/gitopsDrawers'
import matrixBed from './figures/matrixBed'
import rubricGauge from './figures/rubricGauge'

// Una figura por etapa del curso (id de etapa → constructor)
export const stageFigures = {
  1: pipelineLine,
  2: runnerPlotter,
  3: qualityLock,
  4: canarySplit,
  5: gitopsDrawers,
  6: matrixBed,
  7: rubricGauge,
}
