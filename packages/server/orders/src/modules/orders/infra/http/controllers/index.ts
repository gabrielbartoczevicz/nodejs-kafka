import { CreateOrdersController } from '@modules/orders/infra/http/controllers/CreateOrdersController'

import { CreateOrdersService } from '@modules/orders/services/CreateOrdersService'

const createOrdersService = new CreateOrdersService()

const createOrdersController = new CreateOrdersController(createOrdersService)

export { createOrdersController }
