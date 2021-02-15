import { Kafka } from 'kafkajs'

type ICallback = (message: unknown) => Promise<void>

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

  public async execute (callback: ICallback): Promise<void> {
    const consumer = this.client.consumer({ groupId: this.groupId })

    await consumer.connect()

    await consumer.subscribe({ topic: this.topic })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`${topic}[${partition} | ${message.offset}] / ${message.timestamp}`)

        const jsonVal = JSON.parse(message.value.toString())

        const value = new Map(Object.entries(jsonVal))

        await callback(value)
      }
    })
  }
}

export { Consumer }
