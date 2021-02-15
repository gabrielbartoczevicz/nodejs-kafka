import { Controller } from '@nodejs-kafka/shared/src/infra/http/Controller'

import { CreateOrdersService } from '@modules/orders/services/CreateOrdersService'

class CreateOrdersController extends Controller {
  private createOrderService: CreateOrdersService

  constructor (createOrderService: CreateOrdersService) {
    super()

    this.createOrderService = createOrderService
  }

  protected async executeImpl (): Promise<any> {
    const requestOrder = this.request.body

    const order = await this.createOrderService.execute(requestOrder)

    return this.ok(order)
  }
}

export { CreateOrdersController }
