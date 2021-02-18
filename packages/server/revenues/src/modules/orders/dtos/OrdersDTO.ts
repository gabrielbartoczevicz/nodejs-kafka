export interface IOrder {
  productId: string
  quantity: number
  price: number
  paid: boolean
  nfe?: string
}
