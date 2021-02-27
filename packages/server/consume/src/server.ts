import { Consumer } from '@nodejs-kafka/shared/src/infra/kafka/Consumer'
import { client } from '@infra/kafka/client'
import { ProcessMessagesService } from '@modules/messages/services/ProcessMessagesService'

const run = async () => {
  const consumer = new Consumer({
    client,
    groupId: 'csv-group',
    topic: 'CSV_MESSAGE'
  })

  const processMessages = new ProcessMessagesService()

  await consumer.execute(processMessages)
}

run().catch(console.error)
