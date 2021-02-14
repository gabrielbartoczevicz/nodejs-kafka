import express from 'express'

import { createOrderRoutes } from '@modules/orders/infra/http/routes/CreateOrdersRoute'

const router = express.Router()

router.use('/orders', createOrderRoutes)

export { router }
