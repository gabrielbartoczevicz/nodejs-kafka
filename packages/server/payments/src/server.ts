import { client } from '@infra/kafka/client'

const consumer = client.consumer({ groupId: 'payments-group' })

const run = async () => {
  await consumer.connect()

  await consumer.subscribe({ topic: 'ORDER_CREATED' })

  await consumer.run({
    eachMessage: async ({ topic: _, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString()
      })
    }
  })
}

run().catch(console.error)
