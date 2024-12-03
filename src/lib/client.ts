import { treaty } from '@elysiajs/eden'
import type { Server } from '@lib/server'

const client = treaty<Server>('localhost:4321')

export default client
