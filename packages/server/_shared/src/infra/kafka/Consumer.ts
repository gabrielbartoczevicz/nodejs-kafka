import { Kafka } from 'kafkajs'
import { IEventConsumer } from './IEventConsumer'

interface IConstructor {
  client: Kafka
  groupId: string
  topic: string
}

class Consumer {
  private client: Kafka

  private groupId: string

  private topic: string

  constructor ({ client, groupId, topic }: IConstructor) {
    this.client = client
    this.groupId = groupId
    this.topic = topic
  }

  public async execute (eventConsumer: IEventConsumer): Promise<void> {
    const consumer = this.client.consumer({ groupId: this.groupId })

    await consumer.connect()

    await consumer.subscribe({ topic: this.topic })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`${topic}[${partition} | ${message.offset}] / ${message.timestamp}`)

        const json = JSON.parse(message.value.toString())

        const map = new Map(Object.entries(json))

        await eventConsumer.execute(map)
      }
    })
  }
}

export { Consumer }
