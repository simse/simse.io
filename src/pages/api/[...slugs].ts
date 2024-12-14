import server from '@lib/server'

const handle = ({ request }: { request: Request }) => server.handle(request)

export const GET = handle
export const POST = handle
