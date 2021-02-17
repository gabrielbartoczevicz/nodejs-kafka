import { Consumer } from '@nodejs-kafka/shared/src/infra/kafka/Consumer'
import { ProcessPaymentsService } from '@modules/messages/ProcessPaymentsService'
import { client } from '@infra/kafka/client'
import { PayOrderService } from '@modules/orders/services/PayOrderService'

const run = async () => {
  const consumer = new Consumer({
    client,
    groupId: 'payments-group',
    topic: 'ORDER_CREATED'
  })

  const payOrder = new PayOrderService()

  const processPayment = new ProcessPaymentsService(payOrder)

  await consumer.execute(processPayment)
}

run().catch(console.error)
