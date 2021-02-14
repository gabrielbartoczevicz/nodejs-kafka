import { Kafka, logLevel } from 'kafkajs'

import { kafkaHost, kafkaPort } from '@nodejs-kafka/shared/src/config/env'

const client = new Kafka({
  brokers: [`${kafkaHost}:${kafkaPort}`],
  logLevel: logLevel.INFO,
  clientId: 'orders'
})

export { client }
