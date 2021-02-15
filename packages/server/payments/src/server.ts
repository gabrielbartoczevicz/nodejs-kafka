import { Consumer } from '@nodejs-kafka/shared/src/infra/kafka/Consumer'
import { client } from '@infra/kafka/client'
import { ProcessPaymentsService } from '@modules/messages/ProcessPaymentsService'

const run = async () => {
  const consumer = new Consumer(client, 'payments-group', 'ORDER_CREATED')

  const processPayment = new ProcessPaymentsService()

  await consumer.execute(processPayment.execute)
}

run().catch(console.error)
