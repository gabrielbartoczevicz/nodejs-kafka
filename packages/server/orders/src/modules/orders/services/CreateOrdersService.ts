import { Producer } from '@nodejs-kafka/shared/src/infra/Producer'
import { client } from '@infra/kafka/client'

interface IOrder {
  productId: string;
  quantity: number;
  value: string;
}

class CreateOrdersService {
  private orders: IOrder[]

  private producer: Producer

  constructor () {
    this.producer = new Producer(client, 'ORDER_CREATED')
    this.orders = []
  }

  public async execute (order: IOrder): Promise<IOrder> {
    this.orders.push(order)

    console.log(this.orders)

    this.producer.execute(order)

    return order
  }
}

export { CreateOrdersService }
