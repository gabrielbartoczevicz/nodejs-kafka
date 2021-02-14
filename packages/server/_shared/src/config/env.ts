import path from 'path'
import dotenv from 'dotenv'

dotenv.config({
  path: path.resolve(__dirname, '..', '..', '..', '..', '..', '.env')
})

const kafkaPort = process.env.KAFKA_PORT
const kafkaHost = process.env.KAFKA_HOST

export {
  kafkaPort,
  kafkaHost
}
