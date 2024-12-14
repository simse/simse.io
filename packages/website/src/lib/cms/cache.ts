import TTLCache from '@isaacs/ttlcache'

export const cache = new TTLCache({ ttl: 12 * 60 * 60 * 1000 })
