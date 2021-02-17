import { Kafka } from 'kafkajs'

interface IConstructor {
  client: Kafka
  topic: string
}

class Producer {
  private client: Kafka

  private topic: string

  constructor ({ client, topic }: IConstructor) {
    this.client = client
    this.topic = topic
  }

  public async execute (message: unknown) {
    const producer = this.client.producer()

    await producer.connect()

    await producer.send({
      topic: this.topic,
      messages: [{
        value: JSON.stringify(message)
      }]
    })

    await producer.disconnect()
  }
}

export { Producer }
