import { Kafka } from 'kafkajs'

class Producer {
  private client: Kafka

  private topic: string

  constructor (client: Kafka, topic: string) {
    this.client = client
    this.topic = topic
  }

  public async execute (message: any) {
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
