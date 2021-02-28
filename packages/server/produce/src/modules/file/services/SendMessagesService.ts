import { Producer } from '@nodejs-kafka/shared/src/infra/kafka/Producer'
import { client } from '@infra/kafka/client'
import { IMessageDTO } from '../dtos/IMessageDTO'

interface IConstructor {
  rate?: number | 1
}

class SendMessagesService {
  private producer: Producer

  private rate: number

  private sendWithDelay: boolean

  constructor ({ rate }: IConstructor) {
    this.producer = new Producer({ client, topic: 'CSV_MESSAGE' })
    this.rate = rate
  }

  execute (messages: IMessageDTO[], start?: number) {
    let i = start || 0

    this.sendWithDelay = this.rate === 0

    const length = messages.length

    do {
      if (i % 10000 === 0) {
        console.log(`Sent ${Math.round(i * 100 / length)}% (${i}/${length})`)
      }

      const message = messages[i].content

      this.producer.execute({ message })

      i = i + 1

      if (!this.sendWithDelay) {
        if (messages[i]) {
          const delay = messages[i].time - messages[i - 1].time

          setTimeout(() => this.execute(messages, i), delay / this.rate)
        }
      }
    } while (messages[i] && this.sendWithDelay)
  }
}

export { SendMessagesService }
