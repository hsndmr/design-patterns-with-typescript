import { describe, expect, test } from 'vitest'
import { Order, OrderValidationHandler, ShippingHandler } from './chain-of-responsibility'

describe('chain-of-responsibility', () => {
  test('order validation handler should set order status to shipped status when order is valid and handled by shipping handler', () => {
    const orderValidationHandler = new OrderValidationHandler()
    const shippingHandler = new ShippingHandler()

    orderValidationHandler.setNextHandler(shippingHandler)

    const order = new Order(1, 100, 'pending')

    orderValidationHandler.handle(order)

    expect(order.status).toEqual('shipped')
  })

  test('order validation handler should throw an error when order amount is invalid', () => {
    const orderValidationHandler = new OrderValidationHandler()
    const shippingHandler = new ShippingHandler()

    orderValidationHandler.setNextHandler(shippingHandler)

    const order = new Order(1, -100, 'pending')

    expect(() => { orderValidationHandler.handle(order) }).toThrowError('Invalid order amount')
  })
})
