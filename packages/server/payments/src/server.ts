import { Consumer } from '@nodejs-kafka/shared/src/infra/kafka/Consumer'
import { client } from '@infra/kafka/client'
import { ProcessMessagesService } from '@modules/messages/ProcessMessagesService'

const run = async () => {
  const consumer = new Consumer(client, 'payments-group', 'ORDER_CREATED')

  const processMessageService = new ProcessMessagesService()

  await consumer.execute(processMessageService.execute)
}

run().catch(console.error)
