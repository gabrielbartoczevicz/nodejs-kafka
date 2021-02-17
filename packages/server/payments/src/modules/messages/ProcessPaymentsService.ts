import { PayOrderService } from '@modules/orders/services/PayOrderService'
import { IOrder } from '@modules/orders/dtos/OrdersDTO'
import { IEventConsumer } from '@nodejs-kafka/shared/src/infra/kafka/IEventConsumer'

class ProcessPaymentsService implements IEventConsumer {
  private payOrder: PayOrderService

  constructor (payOrder: PayOrderService) {
    this.payOrder = payOrder
  }

  public async execute (message: Map<string, unknown>): Promise<void> {
    const order: IOrder = {
      productId: String(message.get('productId')),
      quantity: Number(message.get('quantity')),
      price: Number(message.get('price')),
      paid: false
    }

    await this.payOrder.execute(order)
  }
}

export { ProcessPaymentsService }
