import { treaty } from '@elysiajs/eden'
import type { Server } from '../../../src/lib/server'

// @ts-expect-error - should be fine hehe
const client = treaty<Server>('https://simse.io')

export default client