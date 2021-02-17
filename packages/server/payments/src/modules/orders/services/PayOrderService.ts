import { Producer } from '@nodejs-kafka/shared/src/infra/kafka/Producer'
import { client } from '@infra/kafka/client'
import { IOrder } from '@modules/orders/dtos/OrdersDTO'

class PayOrderService {
  private producer: Producer

  private paidOrders: IOrder[]

  constructor () {
    this.producer = new Producer({ client, topic: 'ORDER_PAID' })
    this.paidOrders = []
  }

  public async execute (order: IOrder): Promise<void> {
    const toPayOrder: IOrder = {
      ...order,
      paid: true
    }

    this.paidOrders.push(toPayOrder)

    await this.producer.execute(toPayOrder)

    console.log(this.paidOrders)
  }
}

export { PayOrderService }
