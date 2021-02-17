import { Producer } from '@nodejs-kafka/shared/src/infra/kafka/Producer'
import { client } from '@infra/kafka/client'

interface IOrder {
  productId: string;
  quantity: number;
  value: number;
}

class CreateOrdersService {
  private orders: IOrder[]

  private producer: Producer

  constructor () {
    this.producer = new Producer({ client, topic: 'ORDER_CREATED' })
    this.orders = []
  }

  public async execute (order: IOrder): Promise<IOrder> {
    this.orders.push(order)

    console.log(this.orders)

    await this.producer.execute(order)

    return order
  }
}

export { CreateOrdersService }
