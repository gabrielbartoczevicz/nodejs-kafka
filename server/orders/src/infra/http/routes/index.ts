import express from 'express'

const router = express.Router()

type IRequest = express.Request
type IResponse = express.Response

router.get('/orders', async (_: IRequest, response: IResponse): Promise<IResponse> => {
  return response.json({ message: 'Hello world' })
})

export { router }
