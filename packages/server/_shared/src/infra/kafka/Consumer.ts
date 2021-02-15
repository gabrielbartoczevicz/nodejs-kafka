import { Kafka } from 'kafkajs'

class Consumer {
  private client: Kafka

  private topic: string

  private groupId: string

  constructor (client: Kafka, groupId: string, topic: string) {
    this.client = client
    this.groupId = groupId
    this.topic = topic
  }

  public async execute (callback: (message: any) => Promise<void>): Promise<void> {
    const consumer = this.client.consumer({ groupId: this.groupId })

    await consumer.connect()

    await consumer.subscribe({ topic: this.topic })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic,
          partition,
          offset: message.offset,
          timestamp: message.timestamp
        })

        callback(message.value.toString())
      }
    })
  }
}

export { Consumer }
