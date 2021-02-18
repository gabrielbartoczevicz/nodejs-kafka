import { Consumer } from '@nodejs-kafka/shared/src/infra/kafka/Consumer'
import { ProcessOrdersService } from '@modules/messages/ProcessOrdersService'
import { client } from '@infra/kafka/client'
import { GenerateNFEService } from '@modules/orders/services/GenerateNFEService'

const run = async () => {
  const consumer = new Consumer({
    client,
    groupId: 'revenues-group',
    topic: 'ORDER_PAID'
  })

  const generateNFE = new GenerateNFEService()

  const processPayment = new ProcessOrdersService(generateNFE)

  await consumer.execute(processPayment)
}

run().catch(console.error)
