import { AXIOM_DATASET, AXIOM_TOKEN } from 'astro:env/server'
import pino from 'pino'
import pinoPretty from 'pino-pretty'

const isProd = import.meta.env.PROD

const logger = pino(
  { level: 'info' },
  pino.multistream([
    // Stream to stdout
    !isProd && pinoPretty({}),
    // Stream to Axiom
    pino.transport({
      target: '@axiomhq/pino',
      options: {
        dataset: AXIOM_DATASET,
        token: AXIOM_TOKEN,
      },
    }),
  ]),
)

export default logger
