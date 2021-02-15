import { Kafka } from 'kafkajs'

type ICallback = (message: unknown) => Promise<void>

class Consumer {
  private client: Kafka

  private topic: string

  private groupId: string

  constructor (client: Kafka, groupId: string, topic: string) {
    this.client = client
    this.groupId = groupId
    this.topic = topic
  }

  public async execute (callback: ICallback): Promise<void> {
    const consumer = this.client.consumer({ groupId: this.groupId })

    await consumer.connect()

    await consumer.subscribe({ topic: this.topic })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`${topic}[${partition} | ${message.offset}] / ${message.timestamp}`)

        await callback(message.value.toString())
      }
    })
  }
}

export { Consumer }
