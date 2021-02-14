import express from 'express'

import { createOrdersController } from '@modules/orders/infra/http/controllers'

const createOrderRoutes = express.Router()

createOrderRoutes.post('/', (request, response) => {
  createOrdersController.execute(request, response)
})

export { createOrderRoutes }
