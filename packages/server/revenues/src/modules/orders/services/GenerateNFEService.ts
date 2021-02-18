import { IOrder } from '@modules/orders/dtos/OrdersDTO'

class GenerateNFEService {
  private paidOrders: IOrder[]

  constructor () {
    this.paidOrders = []
  }

  public async execute (order: IOrder): Promise<void> {
    const toPayOrder: IOrder = {
      ...order,
      nfe: `nfe_${order.productId}_${new Date().getFullYear()}.xml`
    }

    this.paidOrders.push(toPayOrder)

    console.log(this.paidOrders)
  }
}

export { GenerateNFEService }
