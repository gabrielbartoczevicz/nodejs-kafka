interface IOrder {
  productId: string;
  quantity: number;
  value: string;
}

class CreateOrdersService {
  private orders: IOrder[]

  constructor () {
    this.orders = []
  }

  public async execute (order: IOrder): Promise<IOrder> {
    this.orders.push(order)

    console.log(this.orders)

    return order
  }
}

export { CreateOrdersService }
