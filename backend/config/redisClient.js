import { createClient } from 'redis'
import config from '../config/config.js'

const redisUrl = config.REDIS_URL // Set this in your Render environment variables
const client = createClient({ 
    url: redisUrl,
    socket:{
        tls: {}
    }
 })

client.connect().catch(console.error)

export default client