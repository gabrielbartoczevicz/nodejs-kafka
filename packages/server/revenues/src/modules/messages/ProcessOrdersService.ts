import { GenerateNFEService } from '@modules/orders/services/GenerateNFEService'
import { IOrder } from '@modules/orders/dtos/OrdersDTO'
import { IEventConsumer } from '@nodejs-kafka/shared/src/infra/kafka/IEventConsumer'

class ProcessOrdersService implements IEventConsumer {
  private generateNFE: GenerateNFEService

  constructor (generateNFE: GenerateNFEService) {
    this.generateNFE = generateNFE
  }

  public async execute (message: Map<string, unknown>): Promise<void> {
    const order: IOrder = {
      productId: String(message.get('productId')),
      quantity: Number(message.get('quantity')),
      price: Number(message.get('price')),
      paid: Boolean(message.get('paid'))
    }

    await this.generateNFE.execute(order)
  }
}

export { ProcessOrdersService }
