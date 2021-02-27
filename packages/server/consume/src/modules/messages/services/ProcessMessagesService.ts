import { IEventConsumer } from '@nodejs-kafka/shared/src/infra/kafka/IEventConsumer'

class ProcessMessagesService implements IEventConsumer {
  private messages: number

  constructor () {
    this.messages = 0
  }

  public async execute (message: Map<string, unknown>): Promise<void> {
    if (message.size > 0) {
      this.messages++
      console.log(`Messages: ${this.messages}`)

      const entries = message.entries()

      console.log(entries)
    }
  }
}

export { ProcessMessagesService }
