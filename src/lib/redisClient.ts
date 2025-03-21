import { createClient, RedisClientType } from 'redis'

const redisUrl =
  'rediss://red-ctg43fpu0jms73adjdjg:RbmnfD2Dv1ec4xfjl6DyGHsJSWft1qkp@singapore-redis.render.com:6379'

let redisClient: RedisClientType | undefined

export function getRedisClient(): RedisClientType {
  if (!redisClient) {
    redisClient = createClient({ url: redisUrl })

    redisClient.on('error', (error: Error) => {
      console.error('Redis connection error:', error)
    })

    // Connect in the background
    redisClient.connect().catch((error: Error) => {
      console.error('Failed to connect to Redis:', error)
    })
  }

  return redisClient
}

export default getRedisClient()
